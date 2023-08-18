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

declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
        RNBO: any;
        createSlider: any;
    }
}

function webAudioContextSetup() {
    context = new (window.AudioContext || window.webkitAudioContext)();

    if (context) {
        console.log("Audio Context Created");
        console.log("Initial Audio Context State:", context.state);
        
        // Create the global output node
        outputNode = context.createGain();
        outputNode.connect(context.destination);
    }

    document.body.onclick = () => {
        context.resume().then(() => {
            console.log("Audio Context State After Click:", context.state);
        });
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
            outputNode.gain.cancelScheduledValues(context.currentTime);
            outputNode.gain.setValueAtTime(currentGain, context.currentTime);
            outputNode.gain.linearRampToValueAtTime(targetGain, context.currentTime + rampDuration);
        }
    }); 
}

async function RNBOsetup(patchFileURL: string, context: AudioContext): Promise<any> {
    console.log("RNBO setup working");

    let response = await fetch(patchFileURL);
    let patcher = await response.json();
    
    if (!window.RNBO) {
        // Ensure that the function awaits the completion of loadRNBOScript
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

function makeP5jsSliders(p: p5, deviceIndex: number) {
    console.log("makeP5jsSliders is being invoked");

    const device = devices[deviceIndex];

    // Check if sliders are already created. If they are, do not proceed.
    if (sliders.length > 0) return;

    console.log("Number of parameters (sliders):", device.parameters.length);

    // Use the 'slidersContainer' for appending sliders
    const targetContainer = document.getElementById('slidersContainer');
    if(!targetContainer) {
        console.error("Target container not found!");
        return;
    }
    console.log(`Appending sliders to slidersContainer`, targetContainer);

    device.parameters.forEach((param: any, index: number) => {
        console.log(`Creating slider for parameter ${index + 1}`);
        let slider = p.createSlider(param.min, param.max, param.min);
        targetContainer.appendChild(slider.elt);
        slider.position(10, index * 30);
        if(targetContainer) {
            targetContainer.appendChild(slider.elt);
        }

        (slider as any).input(() => {
            let parameterValue = slider.value();
            console.log("Device structure:", device);
            console.log("Is setParameter a prototype method?", 'setParameter' in device && !device.hasOwnProperty('setParameter'));
            console.log("device.parameters structure:", device.parameters);
            device.parameters[index].value = parameterValue;
            console.log(`Parameter ${param.name} set to ${parameterValue}`);
        });

        sliders.push(slider);
    });
    console.log("Device used in makeP5jsSliders:", device);
}


const P5WrapperWithNoSSR = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});
  
const Index = () => {
    const [isAudioActive, setIsAudioActive] = useState(false);
    const p5Ref = useRef<p5 | null>(null);
    let ellipseX = 250; // Initial x position of the ellipse
    let ellipseY = 250; // Initial y position of the ellipse
    let dragging = false; // Whether the ellipse is being dragged
      
    const sketch = (p: p5) => {
        p.setup = function() {
            p5Ref.current = p;
            const canvasWidth = document.getElementById('canvasBox')?.clientWidth || 500;
            const canvasHeight = 500;
            const canvas = p.createCanvas(canvasWidth, canvasHeight);
            canvas.parent('canvasBox'); // Ensure the canvas is appended to the correct container
            p.background(200);
        
            console.log("Devices length:", devices.length);
        
            if (devices.length) {
                makeP5jsSliders(p, devices.length - 1);
            }
        };
    
        p.draw = function() {
            p.background(200); // Redraw background to clear previous ellipse position
            p.fill(255, 0, 0);
            p.ellipse(ellipseX, ellipseY, 50, 50);
        };
    
        p.mousePressed = function() {
            const d = p.dist(p.mouseX, p.mouseY, ellipseX, ellipseY);
            if (d < 25) { // Check if mouse is inside the ellipse (radius is 25)
                dragging = true;
            }
        };
    
        p.mouseReleased = function() {
            dragging = false;
        };
    
        p.mouseDragged = function() {
            if (dragging) {
                ellipseX = p.mouseX;
                ellipseY = p.mouseY;
                
                console.log("Dragging Ellipse to:", ellipseX, ellipseY); // Log the updated position
                
                // Update the RNBO device's parameters when the ellipse is dragged
                if (devices.length && numberOfDeviceParameters >= 2) {
                    console.log("Setting RNBO Parameters to:", ellipseX, ellipseY); // Log the values being set
                    devices[0].setParameter(devices[0].parameters[0].name, ellipseX);
                    devices[0].setParameter(devices[0].parameters[1].name, ellipseY);
                }
            }
        };
    
    
        p.touchStarted = function() {
            if (p.touches.length > 0) {
                const touchPoint = p.touches[0] as { x: number, y: number };
                const d = p.dist(touchPoint.x, touchPoint.y, ellipseX, ellipseY);
                if (d < 25) {
                    dragging = true;
                }
            }
            return false; // prevent default
        };
    
        p.touchEnded = function() {
            dragging = false;
            return false; // prevent default
        };
    
        p.touchMoved = function() {
            if (dragging && p.touches.length > 0) {
                const touchPoint = p.touches[0] as { x: number, y: number };
                ellipseX = touchPoint.x;
                ellipseY = touchPoint.y;
                
                // Update the RNBO device's parameters when the ellipse is dragged
                if (devices.length && numberOfDeviceParameters >= 2) {
                    devices[0].setParameter(devices[0].parameters[0].name, ellipseX);
                    devices[0].setParameter(devices[0].parameters[1].name, ellipseY);
                }
            }
            return false; // prevent default
        };
    };
    useEffect(() => {
        // Setup code that relies on external scripts
    }, []);

    async function handleStartButtonClick() {
        // Ensure audio context is set up
        if (!context) {
            webAudioContextSetup();
        }
        
        // If audio isn't active and no devices are set up yet, initiate RNBO setup
        if (!isAudioActive && devices.length === 0) {
            await RNBOsetup("/export/patch.simple-sampler.json", context);
            
            // Only proceed to make sliders if p5Ref is currently set
            if (p5Ref.current) {
                makeP5jsSliders(p5Ref.current, devices.length - 1);
            }
        }
        
        // Audio start/stop logic
        if (!isAudioActive) {
            // Connect the RNBO device's node to the output node
            if (devices.length && devices[devices.length - 1].node && outputNode) {
                devices[devices.length - 1].node.connect(outputNode);
            }
            setIsAudioActive(true);
        } else {
            // Logic to stop the audio
            if (devices.length && devices[devices.length - 1].node) {
                devices[devices.length - 1].node.disconnect(); // Disconnect the RNBO device's node from the output node
            }
            
            // Clear the existing sliders
            sliders.forEach(slider => slider.remove());
            sliders = [];
    
            setIsAudioActive(false);
        }
    }
    
    return (
        <ChakraProvider>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />
            <Script src="https://cdn.cycling74.com/rnbo/latest/rnbo.min.js"/>
            {/* <Navbar /> */}
            <Flex direction="column" minHeight="100vh">
                <Box id="p5CanvasContainer" display="flex" mt="auto" justifyContent="center" border="1px solid gray" width="100%" height="500px" margin="20px auto" flexGrow={1}>
                    <Box id="canvasBox" width="100%" maxW="500px">
                        <P5WrapperWithNoSSR sketch={sketch} />
                    </Box>
                </Box>
                <Box id="slidersContainer" display="flex" flexDirection="column" alignItems="center" mt="20px" width="100%" maxW="500px" mb="20px">
                    {/* This will contain the sliders */}
                </Box>
                <Box display="flex" mt="auto" justifyContent="center" width="100%" flexDirection="column" alignItems="center">
                    <Box mb="20px">
                        <button id="startButton" onClick={handleStartButtonClick}>
                            {isAudioActive ? "Stop Audio" : "Start Audio"}
                        </button> 
                    </Box>
                </Box>
                <Footer />
            </Flex>
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(Index), {ssr: false})