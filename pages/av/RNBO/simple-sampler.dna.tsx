import { 
 Box, 
 Flex, 
 ChakraProvider, 
 useColorMode, 
 useColorModeValue, 
 Text, 
 Button 
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";
import Head from 'next/head';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import p5 from 'p5';
import { FaPlay, FaStop, FaVolumeUp, FaMousePointer, FaHandPointer, FaBell, FaBellSlash, FaArrowRight } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

let context: AudioContext | null = null;
let devices: any[] = [];
let sliders: any[] = [];
let outputNode: GainNode | null = null;
let analyser: AnalyserNode;

declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
        RNBO: any;
        createSlider: any;
    }
}

let resumeContextListener: (() => void) | null = null;

function webAudioContextSetup() {
    context = new (window.AudioContext || window.webkitAudioContext)();

    if (context) {
        console.log("Audio Context Created");
        console.log("Initial Audio Context State:", context.state);
        
        // Create the global output node
        outputNode = context.createGain();
        outputNode.connect(context.destination);
    }

    // Define the event listener
    resumeContextListener = () => {
        if (context) {
            const currentContext = context;
            currentContext.resume().then(() => {
                console.log("Audio Context State After Click:", currentContext.state);
            });
        } else {
            console.error("Audio Context is not initialized.");
        }
    }

    document.body.removeEventListener('click', resumeContextListener);
    document.body.removeEventListener('touchstart', resumeContextListener);


    if ('ontouchstart' in window) {
        document.body.addEventListener('touchstart', resumeContextListener);
    } else {
        document.body.addEventListener('click', resumeContextListener);
    }    

}

function createOutputNode() {
    if (!context || context.state !== 'running') {
        console.error("Audio Context is not running or not initialized.");
        return;
    }

    // Create gain node and connect it to audio output
    const outputNode = context.createGain();
    outputNode.connect(context.destination);
    try {
        if (devices.length && devices[devices.length - 1].node) {
            devices[devices.length - 1].node.connect(outputNode);
        } else {
            console.error("Device or its node not initialized yet.");
            return;
        }
    } catch (err) {
        console.error("Detailed error while initializing RNBO device:", err);
        console.error("Error creating device:", err);
    }

    let isVolumeOn = true;

    window.addEventListener('keydown', event => {
        if (event.code === 'Space') {
            isVolumeOn = !isVolumeOn;
            console.log("keydown event");
            
            const currentGain = outputNode.gain.value;
            const targetGain = isVolumeOn ? 1 : 0;
            const rampDuration = 0.1;
    
            // Check for context existence before accessing its properties
            if (context) {
                outputNode.gain.cancelScheduledValues(context.currentTime);
                outputNode.gain.setValueAtTime(currentGain, context.currentTime);
                outputNode.gain.linearRampToValueAtTime(targetGain, context.currentTime + rampDuration);
            } else {
                console.error("Audio Context is not initialized.");
            }
        }
    });
}

async function RNBOsetup(patchFileURL: string, context: AudioContext): Promise<any> {
    console.log("RNBO setup working");

    // If devices exist, return the existing device rather than reinitializing
    if (devices.length > 0) {
        console.log("Using existing RNBO device.");
        return devices[0]; // Assuming only one device
    }

    let response = await fetch(patchFileURL);
    let patcher = await response.json();
    
    if (!window.RNBO) {
        await loadRNBOScript(patcher.desc.meta.rnboversion);
    }

    let dependenciesResponse = await fetch("/export/simple-sampler/dependencies.json");
    let dependencies = await dependenciesResponse.json();
    dependencies = dependencies.map((d: any) => d.file ? Object.assign({}, d, { file: d.file }) : d);

    let device;
    try {
        device = await (window as any).RNBO.createDevice({ context, patcher });
        if (device) {
            console.log("Directly connecting RNBO device to audio output for testing");
            device.node.connect(context.destination);
    
            // Create an analyser node and connect the device's node to it
            analyser = context.createAnalyser();
            device.node.connect(analyser);
    
            devices.push(device);
            
            if (dependencies.length) {
                await device.loadDataBufferDependencies(dependencies);
            }

            console.log(device.parameters);  

        } else {
            console.error("Device creation failed. Device is undefined.");
        }
        console.log("Device created in RNBOsetup:", device);
    } catch (err) {
        console.error("Error creating device:", err);
    }
    return device;
}

function loadRNBOScript(version: string) {
    return new Promise((resolve, reject) => { 
        if (/^\\d+\\.\\d+\\.\\d+-dev$/.test(version)) { 
            throw new Error("Patcher exported with a Debug Version!\\nPlease specify the correct RNBO version to use in the code.");
        }
        const el = document.createElement("script");
        el.src = "https://c74-public.nyc3.digitaloceanspaces.com/rnbo/" + encodeURIComponent(version) + "/rnbo.min.js";
        el.onload = resolve;
        el.onerror = function(err) {
            console.log(err);
            reject(new Error("Failed to load rnbo.js v" + version));
        };
        document.body.append(el);
    });
}

const P5WrapperWithNoSSR = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});
  
const Index = () => {
    const { setColorMode } = useColorMode();
    const [isAudioActive, setIsAudioActive] = useState(false);
    const p5Ref = useRef<p5 | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    let ellipseX: number | null = null; 
    let ellipseY: number | null = null; 
    let dragging = false; // Whether the ellipse is being dragged

    function limitChange(oldValue: number, newValue: number, maxChange: number): number {
        let change = newValue - oldValue;
        change = Math.max(-maxChange, Math.min(maxChange, change));
        return oldValue + change;
    }    

    function toneMap(y: number, p: p5): p5.Color {
        const mappedBrightness = p.map(y, 0, p.height, 0, 1);
        const baseColor = p.color(255, 25, 0); // Gold color
        return p.color(p.red(baseColor) * mappedBrightness, p.green(baseColor) * mappedBrightness, p.blue(baseColor) * mappedBrightness);
    }
      
    const sketch = (p: p5) => {
        let startColor = p.color(0, 128, 255);
        let endColor = p.color(255, 0, 128);
        let amplitude = 100; 
        let glitchFactor = 0;
        let protrusionFactor = 0;
        let dnaFactor = 0;
        let time = 0;
        let touchX = null;
        let touchY = null;
        let vhsGlitch = false; 
        let previousTouchY: number = 0;
    
        const updateCanvasSize = () => {
            const canvasWidth = canvasContainerRef.current?.clientWidth ?? 500;
            const canvasHeight = canvasContainerRef.current?.clientHeight ?? 500;
            let startColor: p5.Color;
            let endColor: p5.Color;
            let amplitude: number;
            
            p.resizeCanvas(canvasWidth, canvasHeight);

            // If the ellipse position hasn't been set yet, center it.
            if (ellipseX === null) {
                ellipseX = p.width / 2;
            } else {
                // If the ellipse has been moved by the user, make sure it stays within the canvas bounds.
                ellipseX = p.constrain(ellipseX!, 0, p.width);  // The ! after ellipseX asserts that it's not null.
            }

            if (ellipseY === null) {
                ellipseY = p.height / 2;
            } else {
                ellipseY = p.constrain(ellipseY!, 0, p.height);  // The ! after ellipseY asserts that it's not null.
            }
        };

        p.setup = function() {
            p5Ref.current = p;
            p.createCanvas(p.windowWidth, p.windowHeight);
            updateCanvasSize(); // Adjust the canvas size right after its creation
            startColor = p.color(0, 128, 255);
            endColor = p.color(255, 0, 128);
            amplitude = 200;  // Adjust this based on the audio input
            
            // Get the canvas DOM element
            const canvasElement = (p as any).canvas;

            // Attach touchstart event listener to canvas
            canvasElement.addEventListener('touchstart', (event: TouchEvent) => {
                const touch = event.touches[0];
                updateParameters(touch.clientX, touch.clientY);
                event.preventDefault();
            });

            // Attach touchmove event listener to canvas
            canvasElement.addEventListener('touchmove', (event: TouchEvent) => {
                const touch = event.touches[0];
                let normalizedTouchY = p.map(touch.clientY, 0, p.height, 0, 6000);
                let smoothTouchY = limitChange(previousTouchY, normalizedTouchY, 50);
                previousTouchY = smoothTouchY;
                
                updateParameters(touch.clientX, touch.clientY);
                event.preventDefault();
            });
        };

        p.windowResized = function() {
            updateCanvasSize();
        };

        interface Particle {
            x: number;
            y: number;
            speedX: number;
            speedY: number;
        }
        
        let particles: Particle[] = [];
    
        p.draw = function() {
            // Updated Colors
            let tealColor = p.color(0, 64, 128);
            let orangeColor = p.color(255, 105, 0);
        
            // Background Gradient
            p.background(50, 50, 50, 0.5);
            for (let y = 0; y < p.height; y++) {
                let distanceFromEllipse = p.dist(ellipseX!, ellipseY!, p.width/2, y);
                let lerpAmt = p.map(distanceFromEllipse, 0, p.width, 0, 1);
                lerpAmt = p.constrain(lerpAmt, 0, 1);
                let gradientNoise = p.noise(y * 0.1);
                let gradientColor = p.lerpColor(tealColor, orangeColor, lerpAmt + gradientNoise * 0.3);
        
                p.stroke(gradientColor);
                p.line(0, y, p.width, y);
            }
        
            let timeScaleFactor = p.map(p.mouseY, 0, p.height, 0.5, 2);
            time = p.millis() * 0.001 * timeScaleFactor;
            let lineSpacing = p.map(p.mouseY, 0, p.height, 15, 30);  // Adjust line spacing
        
            // DNA Drawing
            let dnaStrokeWeight = 4;
            let dnaStrokeColor = p.color(255, 255, 255);
        
            if (dnaFactor > 0) {
                dnaStrokeWeight = 6;
                dnaStrokeColor = p.color(255, 210, 0);  // Glowing color
            }
        
            for (let y = 0; y < p.height; y += lineSpacing) {
                let noiseValue = p.noise(y * 0.05, time * 0.2);
                
                // Tweak the sin and cos values to better represent the double helix structure
                let sinValue = p.sin(time + y * 0.1) * noiseValue * amplitude * 0.7;  // Modified frequency for more turns
                let cosValue = p.cos(time + y * 0.1 + Math.PI/2) * noiseValue * amplitude * 0.7;  // Added a phase difference of PI/2 to make the helix structure more evident
            
                let glitchShift = glitchFactor * p.noise(time * 0.1, y * 0.05) * 50;
            
                let x1 = p.width / 2 + sinValue + glitchShift;
                let x2 = p.width / 2 + cosValue + glitchShift;
            
                let mappedColor = toneMap(y, p);
                let lerpedColor = p.lerpColor(dnaStrokeColor, mappedColor, noiseValue); // Gold color for the "god-like" appearance
                p.stroke(lerpedColor);
                p.strokeWeight(dnaStrokeWeight);
            
                // Enhanced Glow effect for DNA for a more "god-like" appearance
                p.drawingContext.shadowBlur = 15;  // Increased blur for more glow
                p.drawingContext.shadowColor = "rgba(255, 215, 0, 0.5)";  // Gold glow color
            
                p.line(x1, y, x2, y);
            }
            // Calculate mouse proximity to the left or right edge
            let distanceToLeft = p.mouseX;
            let distanceToRight = p.width - p.mouseX;

            let closestEdgeDistance = Math.min(distanceToLeft, distanceToRight);
            let proximityFactor = p.map(closestEdgeDistance, 0, p.width / 2, 1, 0);
            proximityFactor = p.constrain(proximityFactor, 0, 1);

            let numSpirals = p.floor(p.map(proximityFactor, 0, 4, 2, 1));  // Increase number of spirals based on proximity

            // Enhanced glow based on proximity
            let glowIntensity = p.map(proximityFactor, 0, 1, 300, 80);
            p.drawingContext.shadowBlur = glowIntensity;
            p.drawingContext.shadowColor = "rgba(255, 215, 0, 0.5)";
            // Introduce an offset factor to create the illusion of DNA splitting.
            let splitOffset = p.map(proximityFactor, 0, 2, 0, amplitude / 2);

            // Modify the DNA drawing to incorporate the split effect.
            for (let spiral = 0; spiral < numSpirals; spiral++) {
                for (let y = 0; y < p.height; y += lineSpacing) {
                    let noiseValue = p.noise(y * 0.05, time * 0.2);
                    let sinValue = p.sin(time + y * 0.1 + spiral * Math.PI/numSpirals) * noiseValue * amplitude * 0.7;
                    let cosValue = p.cos(time + y * 0.1 + spiral * Math.PI/numSpirals + Math.PI/2) * noiseValue * amplitude * 0.7;
                    let glitchShift = glitchFactor * p.noise(time * 0.1, y * 0.05) * 50;

                    let x1 = p.width / 2 + sinValue + glitchShift - splitOffset;  // subtract splitOffset from x1
                    let x2 = p.width / 2 + cosValue + glitchShift + splitOffset;  // add splitOffset to x2

                    let lerpedColor = p.lerpColor(dnaStrokeColor, p.color(255, 215, 0), noiseValue);
                    p.stroke(lerpedColor);
                    p.strokeWeight(dnaStrokeWeight);

                    p.line(x1, y, x2, y);
                }
            }
            // Resetting shadow after drawing DNA
            p.drawingContext.shadowBlur = 0;
        
            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                let particle = particles[i];
                particle.x += particle.speedX;
                particle.y += particle.speedY;
        
                let particleColor = p.color(255, 255, 255, 150);
                p.fill(particleColor);
                p.ellipse(particle.x, particle.y, 2, 2);
        
                // Remove particles if they move off the canvas
                if (particle.x < 0 || particle.x > p.width || particle.y < 0 || particle.y > p.height) {
                    particles.splice(i, 1);
                }
            }
        };
    
        p.mousePressed = function() {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                dragging = true;
                amplitude += p.random(-100, 100); // randomly change the amplitude
            }
        };

        p.mouseReleased = function() {
            dragging = false;
        };

        p.mouseDragged = function() {
            let constrainedMouseX = p.constrain(p.mouseX, 0, p.width);
            let constrainedMouseY = p.constrain(p.mouseY, 0, p.height);
        
            if (dragging) {
                glitchFactor = p.map(constrainedMouseX, 0, p.width, -1, 1);
                protrusionFactor = p.map(constrainedMouseY, 0, p.height, 0, 1);
                
                // Update the RNBO device's parameters
                if (devices.length) {
                    devices[0].parameters[0].value = glitchFactor;
                    devices[0].parameters[1].value = protrusionFactor;
                    devices[0].parameters[2].value = (glitchFactor + protrusionFactor) / 2;
                }
            }
        };

        let previousNormalizedMouseX = 0;  // Outside of mouseMoved to persist across calls
        let previousMouseY = 0;

        p.mouseMoved = function() {
            // If RNBO parameter range is from 0 to 6000
            let normalizedMouseY = p.map(p.mouseY, 0, p.height, 0, 6000);
            
            // Use the previous value to limit the change
            let smoothMouseY = limitChange(previousMouseY, normalizedMouseY, 50);  // For example, max change of 50
        
            // Update the previous value for the next call
            previousMouseY = smoothMouseY;
            let normalizedMouseX = (p.mouseX - 0) / (p.width - 0);
            
            // Use the previous value to limit the change
            let smoothMouseX = limitChange(previousNormalizedMouseX, normalizedMouseX, 0.05);

            // Update the previous value for the next call
            previousNormalizedMouseX = smoothMouseX;
        
            glitchFactor = p.map(smoothMouseX, 0, 1, -1, 1);

            let constrainedMouseX = p.constrain(p.mouseX, 0, p.width);
            let constrainedMouseY = p.constrain(p.mouseY, 0, p.height);
        
            // Map the constrainedMouseX to the glitchFactor
            glitchFactor = p.map(constrainedMouseX, 0, p.width, -1, 1);
            
            // Map the constrainedMouseY directly to devices[0].parameters[2].value
            const yMappedToParam = p.map(constrainedMouseY, 0, p.height, 0, 6000);        
        
            // Update the RNBO device's parameters
            if (devices.length) {
                devices[0].parameters[0].value = glitchFactor;
                devices[0].parameters[2].value = yMappedToParam; // directly using the y position
            }
            // Visual distortion based on mouse position
            let distortion = p.map(p.mouseX, 0, p.width, 0, 0.5); 
            dnaFactor += distortion;
        };
        
        p.keyPressed = function() {
            if (p.key === 'Shift') {
                dnaFactor = 20;
            }
        };

        p.keyReleased = function() {
            if (p.key === 'Shift') {
                dnaFactor = 0;
            }
        };
        
        type TouchPoint = {
            x: number;
            y: number;
            id: number;
        };
        
        // Utility function to check if a point is inside the canvas
        function isInsideCanvas(x: number, y: number): boolean {
            const withinWidth = x >= 0 && x <= p.width;
            const withinHeight = y >= 0 && y <= p.height;
            return withinWidth && withinHeight;
        }
        
                                 
        // p.touchStarted = function() {
        //     if (p.touches.length > 0) {
        //         const touchPoint: TouchPoint = p.touches[0] as TouchPoint;
        //         const rect = (p as any).canvas.getBoundingClientRect();
                
        //         // Translate touch point to relative canvas coordinates
        //         const touchX = touchPoint.x - rect.left;
        //         const touchY = touchPoint.y - rect.top;
        
        //         if (isInsideCanvas(touchX, touchY)) {
        //             updateParameters(touchX, touchY);
        //             return false; // prevent default only if inside the canvas
        //         }
        //     }
        //     return true;
        // };          
        
        // let previousTouchY = 0;  // Outside of any function to persist across calls

        // p.touchMoved = function() {
        //     if (p.touches.length > 0) {
        //         const touchPoint: TouchPoint = p.touches[0] as TouchPoint;
        //         const rect = (p as any).canvas.getBoundingClientRect();
        
        //         // Translate touch point to relative canvas coordinates
        //         const touchX = touchPoint.x - rect.left;
        //         const touchY = touchPoint.y - rect.top;
        
        //         if (isInsideCanvas(touchX, touchY)) {
        //             let normalizedTouchY = p.map(touchY, 0, p.height, 0, 6000);
        //             let smoothTouchY = limitChange(previousTouchY, normalizedTouchY, 50);
        //             previousTouchY = smoothTouchY;
        
        //             updateParameters(touchX, touchY);
        //             return false; // prevent default
        //         }
        //     }
        //     return true;
        // };
              

        // p.touchEnded = function() {
        //     // Check if there are any touches
        //     if (p.touches.length > 0) {
        //         const touchPoint: TouchPoint = p.touches[0] as TouchPoint;
        //         const rect = (p as any).canvas.getBoundingClientRect();
        
        //         // Translate touch point to relative canvas coordinates
        //         const touchX = touchPoint.x - rect.left;
        //         const touchY = touchPoint.y - rect.top;
        
        //         // If touch ends outside of the canvas, ignore it
        //         if (!isInsideCanvas(touchX, touchY)) {
        //             return false;
        //         }   
        //     }
        //     return true;
        // };         
        
        function updateParameters(touchX: number, touchY: number) {
            let constrainedTouchX = p.constrain(touchX, 0, p.width);
            let constrainedTouchY = p.constrain(touchY, 0, p.height);
            // Map constrainedTouchX to glitchFactor and constrainedTouchY to protrusionFactor
            const glitchFactor = p.map(constrainedTouchX, 0, p.width, 0, 1);
            const protrusionFactor = p.map(constrainedTouchY, 0, p.height, 0, 1);
            const yMappedToParam = p.map(constrainedTouchY, 0, p.height, 0, 6000);

            // Update the RNBO device's parameters
            if (devices.length) {
                devices[0].parameters[0].value = glitchFactor;
                devices[0].parameters[1].value = protrusionFactor;
                devices[0].parameters[2].value = yMappedToParam;
            }
        }        
    };

    const [showFlashMessage, setShowFlashMessage] = useState(true);

    const hideMessage = () => {
        setShowFlashMessage(false);
    }

    useEffect(() => {
        // Add the event listeners when the component mounts
        document.addEventListener('click', hideMessage);
        document.addEventListener('touchstart', hideMessage);
        
        // Remove the event listeners and stop/close the Audio Context when the component unmounts
        return () => {
            document.removeEventListener('click', hideMessage);
            document.removeEventListener('touchstart', hideMessage);
    
            if (context) {
                // If you want to simply suspend the audio
                context.suspend();
    
                // If you want to close the audio context completely
                context.close();
                console.log("Audio Context Stopped/Closed");
            }
        };
    }, []); 

    const [showAudioIndicator, setShowAudioIndicator] = useState(true);

    async function handleStartButtonClick(event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        // Ensure audio context is set up
        if (!context) {
            webAudioContextSetup();
        }
    
        // Check for context existence before accessing its properties or methods
        if (context) {
            // Resume the AudioContext if it's suspended
            if (context.state === "suspended") {
                await context.resume();
            }
        } else {
            console.error("Audio Context is not initialized.");
        }
        
        // Audio start/stop logic
        if (!isAudioActive) {
            // If no devices are set up yet, initiate RNBO setup
            if (devices.length === 0) {
                console.log("Initializing RNBO setup...");
                if (context) {
                    await RNBOsetup("/export/simple-sampler/patch.simple-sampler.json", context);
                    console.log("RNBO setup completed.");
                } else {
                    console.error("Audio Context is not initialized, cannot set up RNBO.");
                }
            }
            
            // Connect the RNBO device's node to the output node
            if (devices.length && devices[devices.length - 1].node && outputNode) {
                devices[devices.length - 1].node.connect(outputNode);
            }
            setIsAudioActive(true);
        } else {
            console.log("Stopping audio...");

            // Refresh the page for all users, both mobile and desktop
            location.reload();

            if (resumeContextListener) {
                document.body.removeEventListener('click', resumeContextListener);
                document.body.removeEventListener('touchstart', resumeContextListener);
            }
            
            if (resumeContextListener) {
                document.body.removeEventListener('click', resumeContextListener);
                document.body.removeEventListener('touchstart', resumeContextListener);
            }
    
            // Logic to stop the audio: Disconnect ALL device nodes, but do NOT clear the devices array
            devices.forEach(device => {
                if (device.node) {
                    device.node.disconnect();
                }
            });
    
            // Clear the existing sliders
            sliders.forEach(slider => slider.remove());
            sliders = [];
            
            // Clear the devices array
            devices = [];
    
            // Close the current audio context and create a new one to avoid clashes when replaying
            if (context) {
                context.close();
                context = null;
            }
            
            setIsAudioActive(false);
        }
        setShowAudioIndicator(false);
    }

    const playButtonBg = useColorModeValue("green.500", "green.200");
    const stopButtonBg = useColorModeValue("red.500", "red.200");

    return (
        <ChakraProvider>
            <Helmet>
                <title>Interactive Audio Experience | Jack Lion's Studio</title>
                <meta name="description" content="Dive into an interactive audio experience crafted by Jack Lion. Explore the dynamic DNA structures and immerse yourself in sound." />
                <meta name="keywords" content="Jack Lion, Interactive Audio, DNA Visuals, Sound Experience, Dynamic Audio, Music Visualization" />
                <meta property="og:url" content="https://jacklion.xyz/av/RNBO/simpl-sampler.dna" /> 
                <link rel="canonical" href="https://jacklion.xyz/av/RNBO/simpl-sampler.dna" />
            </Helmet>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />
            <Script src="https://cdn.cycling74.com/rnbo/latest/rnbo.min.js"/>
            <Navbar />
            <Flex direction="column" minHeight="100vh" alignItems="center" width="100%">
            <Box 
                ref={canvasContainerRef} 
                id="p5CanvasContainer" 
                border="1px solid gray" 
                width={["80%", "80%", "90%", "90%"]} 
                height={["55vh", "50vh", "75vh", "80vh"]} 
                maxW={["100%", "100%", "90vw", "90vw"]} 
                maxH={["55vh", "50vh", "80vh", "80vh"]} 
                my="10px"
                >
                    <P5WrapperWithNoSSR sketch={sketch} />
                </Box>

                <Box id="slidersContainer" mt="20px" width="100%" maxW="500px" mb="0px">
                    {/* This will contain the sliders */}
                </Box>

                <Flex 
                    width="100%" 
                    maxWidth="500px" 
                    justifyContent="center" 
                    alignItems="center" 
                    mt="10px"
                >
                    <Box 
                        as="button" 
                        onClick={handleStartButtonClick} 
                        onTouchEnd={handleStartButtonClick}
                        w="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor={isAudioActive ? stopButtonBg : playButtonBg}
                        borderRadius="md"
                    >
                        {isAudioActive ? <FaStop size="24px" color="white"/> : <FaPlay size="24px" color="white"/>}
                    </Box>

                </Flex>

                {showFlashMessage && (
                    <Flex 
                        position="fixed" 
                        top={0} 
                        left={0} 
                        right={0} 
                        bottom={0} 
                        zIndex={1000} 
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="rgba(0, 0, 0, 0.7)" // Semi-transparent background
                        flexDirection="column" // Stack the icons and the text vertically
                    >
                        {'ontouchstart' in window ? 
                            <Flex alignItems="center" style={{ marginBottom: '10px' }}>
                                <FaBellSlash color="white" size="80px" />
                                <FaArrowRight color="white" size="30px" />
                                <FaBell color="white" size="80px" style={{ marginLeft: '4px', marginRight: '4px' }} /> 
                                <FaArrowRight color="white" size="30px" />
                                <FaVolumeUp color="white" size="80px" style={{ marginLeft: '4px' }} />  
                            </Flex>
                            :
                            <FaVolumeUp color="white" size="80px" style={{ marginBottom: '10px' }} />
                        }

                        <Text color="white" fontSize="xl" textAlign="center" style={{ marginBottom: '20px' }}>
                            {'ontouchstart' in window ? 
                                "Ensure audio (for iOS users) is enabled by setting your ringer switch to on and adjusting your volume to comfortable listening levels for the best experience."
                                : 
                                <>
                                 Ensure audio is enabled.<br />Set your volume to comfortable listening levels for the best experience.
                                </>
                            }
                        </Text>

                        {'ontouchstart' in window ? 
                            <>
                                <FaHandPointer color="white" size="80px" style={{ marginBottom: '10px' }} />
                                <Text color="white" fontSize="xl" textAlign="center"> 
                                    Touch and slide across the screen to interact.<br />
                                    When you are ready for immersion<br />
                                    tap the screen.
                                </Text>
                            </>
                            :
                            <>
                                <FaMousePointer color="white" size="80px" style={{ marginBottom: '10px' }} />
                                <Text color="white" fontSize="xl" textAlign="center"> 
                                    Use your mouse to interact.<br />
                                    When you are ready for immersion<br />
                                    click the screen.
                                </Text>
                            </>
                        }
                    </Flex>
                )}
        
                {/* This will push the footer to the bottom and stretch it */}
                <Box marginTop="auto" width="100%">
                    <Footer />
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(Index), {ssr: false})