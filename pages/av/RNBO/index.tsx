import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import dynamic from "next/dynamic";
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import p5 from 'p5';

let context: AudioContext;
let devices: any[] = [];
let numberOfDeviceParameters: number;
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
        context.resume().then(() => {
            console.log("Audio Context State After Click:", context.state);
        });
    }

    document.body.addEventListener('click', resumeContextListener);
    document.body.addEventListener('touchstart', resumeContextListener);  // add this line

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
            outputNode.gain.cancelScheduledValues(context.currentTime);
            outputNode.gain.setValueAtTime(currentGain, context.currentTime);
            outputNode.gain.linearRampToValueAtTime(targetGain, context.currentTime + rampDuration);
        }
    }); 
}

async function RNBOsetup(patchFileURL: string, context: AudioContext): Promise<any> {
    console.log("RNBO setup working");

    if (devices.length > 0) {
        console.warn("Devices already exist. Cleaning up before creating a new device.");
        devices[devices.length - 1].node.disconnect();
        devices = [];
    }

    let response = await fetch(patchFileURL);
    let patcher = await response.json();
    
    if (!window.RNBO) {
        await loadRNBOScript(patcher.desc.meta.rnboversion);
    }

    let dependenciesResponse = await fetch("/export/dependencies.json");
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
    const [isAudioActive, setIsAudioActive] = useState(false);
    const p5Ref = useRef<p5 | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement | null>(null);
    let ellipseX: number | null = null; 
    let ellipseY: number | null = null; 
    let dragging = false; // Whether the ellipse is being dragged
      
    const sketch = (p: p5) => {
        let startColor = p.color(0, 128, 255);
        let endColor = p.color(255, 0, 128);
        let amplitude = 100;  // You can adjust this based on the audio input
        let glitchFactor = 0;
        let protrusionFactor = 0;
        let dnaFactor = 0;
        let time = 0;
        let touchX = null;
        let touchY = null;

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
        };

        p.windowResized = function() {
            updateCanvasSize();
        };
    
        p.draw = function() {
            // Updated Colors
            let tealColor = p.color(0, 64, 128);
            let orangeColor = p.color(255, 105, 0);
        
            // Create a radial gradient centered around the ellipse
            for (let y = 0; y < p.height; y++) {
                let distanceFromEllipse = p.dist(ellipseX!, ellipseY!, p.width/2, y);
                let lerpAmt = p.map(distanceFromEllipse, 0, p.width, 0, 1);
                lerpAmt = p.constrain(lerpAmt, 0, 1);
                let gradientColor = p.lerpColor(tealColor, orangeColor, lerpAmt);
                p.stroke(gradientColor);
                p.line(0, y, p.width, y);
            }
        
            let timeScaleFactor = p.map(p.mouseY, 0, p.height, 0.5, 2);
            time = p.millis() * 0.001 * timeScaleFactor;
        
            let lineSpacing = p.map(p.mouseY, 0, p.height, 15, 30);  // Smaller line spacing for more prominence
            let strokeScaleFactor = p.map(p.mouseX, 0, p.width, 1, 4);
        
            for (let y = 0; y < p.height; y += lineSpacing) {
                let noiseValue = p.noise(y * 0.05, time * 0.2);  // Reduced granularity of noise for smoother transitions
                let sinValue = p.sin(time + y * 0.05) * noiseValue * 1.5 + glitchFactor * p.random(-1, 1);  // Increased amplitude
                let cosValue = p.cos(time + y * 0.05) * noiseValue * 1.5 + protrusionFactor * p.sin(time + y * 0.025);  // More harmonious waves
        
                let x1 = p.width / 2 + sinValue * amplitude;
                let x2 = p.width / 2 + cosValue * amplitude;
        
                if (p.keyIsPressed && p.key === 'Shift') {
                    x1 += dnaFactor * p.sin(y * 0.025 + noiseValue * 2);  // Increased complexity in DNA pattern
                    x2 += dnaFactor * p.sin(y * 0.025 + noiseValue * 2);
                }
        
                let lerpedColor = p.lerpColor(tealColor, orangeColor, noiseValue);
                p.stroke(lerpedColor);
                p.strokeWeight(3 * strokeScaleFactor);  // Thicker lines for more prominence
                p.line(x1, y, x2, y);
            }
        };
    
        p.mousePressed = function() {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                dragging = true;
            }
        };

        p.mouseReleased = function() {
            dragging = false;
        };

        p.mouseDragged = function() {
            if (dragging) {
                glitchFactor = p.map(p.mouseX, 0, p.width, -1, 1);
                protrusionFactor = p.map(p.mouseY, 0, p.height, 0, 1);
                
                // Update the RNBO device's parameters
                if (devices.length) {
                    devices[0].parameters[0].value = glitchFactor;
                    devices[0].parameters[1].value = protrusionFactor;
                    devices[0].parameters[2].value = (glitchFactor + protrusionFactor) / 2;
                }
            }
        };

        p.mouseMoved = function() {
            // Map the mouseX to the glitchFactor
            glitchFactor = p.map(p.mouseX, 0, p.width, -1, 1);
            console.log("mouseX:", p.mouseX, "glitchFactor:", glitchFactor);
            
            // Map the mouseY directly to devices[0].parameters[2].value
            const yMappedToParam = p.map(p.mouseY, 0, p.height, 0, 1); // Assuming the range you want is [0, 1]
        
            // Update the RNBO device's parameters
            if (devices.length) {
                devices[0].parameters[0].value = glitchFactor;
                devices[0].parameters[2].value = yMappedToParam; // directly using the y position
            }
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
        
        interface TouchPoint {
            x: number;
            y: number;
            // You can add other properties if needed
        }
        
        p.touchStarted = function() {
            // Initial touch logic remains the same
            if (p.touches.length > 0) {
                const touchPoint: TouchPoint = p.touches[0] as TouchPoint;
                touchX = touchPoint.x;
                touchY = touchPoint.y;
                
                updateParameters(touchX, touchY);
            }
            return false; // prevent default
        };
        
        p.touchMoved = function() {
            if (p.touches.length > 0) {
                const touchPoint: TouchPoint = p.touches[0] as TouchPoint;
                touchX = touchPoint.x;
                touchY = touchPoint.y;
                
                updateParameters(touchX, touchY);
            }
            return false; // prevent default
        };
        
        function updateParameters(touchX: number, touchY: number) {
            // Map touchX to glitchFactor and touchY to protrusionFactor
            const glitchFactor = p.map(touchX, 0, p.width, 0, 1);
            const protrusionFactor = p.map(touchY, 0, p.height, 0, 1);
            const yMappedToParam = p.map(touchY, 0, p.height, 0, 1);
            // Update the RNBO device's parameters
            if (devices.length) {
                devices[0].parameters[0].value = glitchFactor;
                devices[0].parameters[1].value = protrusionFactor;
                devices[0].parameters[2].value = yMappedToParam;
            }
        }        
        
    };

    useEffect(() => {
        // Setup code that relies on external scripts
    }, []);

    async function handleStartButtonClick(event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        // Ensure audio context is set up
        if (!context) {
            webAudioContextSetup();
        }
    
        // Resume the AudioContext if it's suspended
        if (context.state === "suspended") {
            await context.resume();
        }
        
        // Audio start/stop logic
        if (!isAudioActive) {
            // If no devices are set up yet, initiate RNBO setup
            if (devices.length === 0) {
                console.log("Initializing RNBO setup...");
                await RNBOsetup("/export/patch.simple-sampler.json", context);
                console.log("RNBO setup completed.");
            }
            
            // Connect the RNBO device's node to the output node
            if (devices.length && devices[devices.length - 1].node && outputNode) {
                devices[devices.length - 1].node.connect(outputNode);
            }
            setIsAudioActive(true);
        } else {
            console.log("Stopping audio...");
            
            if (resumeContextListener) {
                document.body.removeEventListener('click', resumeContextListener);
            }
            // Logic to stop the audio
            if (devices.length && devices[devices.length - 1].node) {
                devices[devices.length - 1].node.disconnect(); // Disconnect the RNBO device's node from the output node
            }
            
            // Clear the existing sliders
            sliders.forEach(slider => slider.remove());
            sliders = [];
            
            // Clear the devices array
            devices = [];

            setIsAudioActive(false);
        }
    }

    return (
        <ChakraProvider>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />
            <Script src="https://cdn.cycling74.com/rnbo/latest/rnbo.min.js"/>
            <Navbar />
            <Flex direction="column" minHeight="100vh" alignItems="center" width="100%">
            <Box 
                ref={canvasContainerRef} 
                id="p5CanvasContainer" 
                border="1px solid gray" 
                width={["80%", "80%", "90%", "90%"]} 
                height={["60vh", "50vh", "80vh", "80vh"]} 
                maxW={["100%", "100%", "90vw", "90vw"]} 
                maxH={["60vh", "50vh", "80vh", "80vh"]} 
                my="20px"
                >
                    <P5WrapperWithNoSSR sketch={sketch} />
                </Box>

                <Box id="slidersContainer" mt="20px" width="100%" maxW="500px" mb="20px">
                    {/* This will contain the sliders */}
                </Box>

                <Box mb="20px">
                    <button id="startButton" 
                    onClick={handleStartButtonClick}
                    onTouchStart={handleStartButtonClick}
                    >
                        {isAudioActive ? "Stop Audio" : "Start Audio"}
                    </button> 
                </Box>
                
                {/* This will push the footer to the bottom and stretch it */}
                <Box marginTop="auto" width="100%">
                    <Footer />
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(Index), {ssr: false})