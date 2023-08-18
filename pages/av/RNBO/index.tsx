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
    let ellipseX = 250; // Initial x position of the ellipse
    let ellipseY = 250; // Initial y position of the ellipse
    let dragging = false; // Whether the ellipse is being dragged
      
    const sketch = (p: p5) => {
        const updateCanvasSize = () => {
            const canvasWidth = canvasContainerRef.current?.clientWidth ?? 500;
            const canvasHeight = canvasContainerRef.current?.clientHeight ?? 500;
            p.resizeCanvas(canvasWidth, canvasHeight);
        };
        
        p.setup = function() {
            p5Ref.current = p;
            updateCanvasSize();
            p.background(200);
            console.log("Devices length:", devices.length);
        };        

        p.windowResized = function() {
            updateCanvasSize();
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
                ellipseX = p.constrain(p.mouseX, 0, p.width); // Keep ellipse within canvas width
                ellipseY = p.constrain(p.mouseY, 0, p.height); // Keep ellipse within canvas height
        
                // Update the RNBO device's parameters when the ellipse is dragged
                if (devices.length) {
                    devices[0].parameters[0].value = ellipseX;
                    devices[0].parameters[1].value = ellipseY;
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
                ellipseX = p.constrain(touchPoint.x, 0, p.width); // Keep ellipse within canvas width
                ellipseY = p.constrain(touchPoint.y, 0, p.height); // Keep ellipse within canvas height
        
                // Update the RNBO device's parameters when the ellipse is dragged
                if (devices.length) {
                    devices[0].parameters[0].value = ellipseX;
                    devices[0].parameters[1].value = ellipseY;
                }
            }
            return false; // prevent default
        };
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
            {/* <Navbar /> */}
            <Flex direction="column" minHeight="100vh" alignItems="center">
                <Box ref={canvasContainerRef} id="p5CanvasContainer" border="1px solid gray" width="100%" maxW="500px" height="500px" my="20px">
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
                
                <Footer />
            </Flex>
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(Index), {ssr: false})