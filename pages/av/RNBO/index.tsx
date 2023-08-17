import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from "next/dynamic";
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import p5 from 'p5';
import { createDevice, MessageEvent } from "@rnbo/js";
import patcher from "@/public/export/patch.simple-sampler.json"

let context: AudioContext;
let devices: any[] = [];
let numberOfDeviceParameters: number;
let sliders: any[] = [];
let offset: number = 0;
let outputNode: GainNode | null = null;

declare function createSlider(min: number, max: number, value: number, step?: number): any;

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
        await loadRNBOScript(patcher.desc.meta.rnboversion);
    }

    let dependenciesResponse = await fetch("/export/dependencies.json");
    let dependencies = await dependenciesResponse.json();
    dependencies = dependencies.map((d: any) => d.file ? Object.assign({}, d, { file: d.file }) : d);

    let device;
    try {
        let device = await (window as any).RNBO.createDevice({ context, patcher });
        if (device) {
            console.log("Directly connecting RNBO device to audio output for testing");
            device.node.connect(context.destination);
        
            devices.push(device);
            
            if (dependencies.length) {
                await device.loadDataBufferDependencies(dependencies);
            }

            numberOfDeviceParameters = device.parameters.length;

        } else {
            console.error("Device creation failed. Device is undefined.");
        }
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
    const device = devices[deviceIndex];

    device.parameters.forEach((param: any, index: number) => {
        let slider = p.createSlider(param.min, param.max, param.min);
        slider.position(10, offset);

        (slider as any).input(() => {  // Type assertion to 'any'
            let parameterValue = slider.value();
            device.setParameter(param.name, parameterValue);
            console.log(`Parameter ${param.name} set to ${parameterValue}`);
        });

        sliders.push(slider);
        offset += 30;
    });
}



const P5WrapperWithNoSSR = dynamic(() => import('@/components/P5Wrapper'), {
  ssr: false
});
  
const sketch = (p: p5) => {
    p.setup = function() {
        p.createCanvas(400, 400);
        p.background(200);

        if (devices.length) {
            makeP5jsSliders(p, devices.length - 1); // This should be inside the sketch function
        }
    };

    p.draw = function() {
        p.fill(255, 0, 0);
        p.ellipse(50, 50, 50, 50);
    };
};


  
const Index = () => {
    const [isAudioActive, setIsAudioActive] = useState(false);


    useEffect(() => {
        // Your setup code that relies on external scripts
        // Moved RNBOsetup to the button click, so no need to call it here
    }, []);

    async function handleStartButtonClick() {
        if (!context) {
            webAudioContextSetup();
        }
        
        if (!isAudioActive) {
            if (devices.length === 0) {
                const device = await RNBOsetup("/export/patch.simple-sampler.json", context);
                if (device) {
                    devices.push(device);
                }
            }
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
            setIsAudioActive(false);
        }
    }    
    
    return (
        <ChakraProvider>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" />
            <Script src="https://cdn.cycling74.com/rnbo/latest/rnbo.min.js"/>
            {/* <Navbar /> */}

            <Box id="p5CanvasContainer" border="1px solid gray" width="100%" height="500px" margin="20px auto">

                <P5WrapperWithNoSSR sketch={sketch} />

                {/* Attach the event handler directly to the button */}
                <button id="startButton" onClick={handleStartButtonClick}>
                    {isAudioActive ? "Stop Audio" : "Start Audio"}
                </button>

            </Box>

            <Footer />
        </ChakraProvider>
    );
}

export default dynamic(() => Promise.resolve(Index), {ssr: false})