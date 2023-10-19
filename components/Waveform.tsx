import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Divider } from '@chakra-ui/react';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md'; 

interface WaveformProps {
    url: string;
}

const Waveform: React.FC<WaveformProps> = ({ url }) => {
    const [windowWidth, setWindowWidth] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);

    // Handle window resize
    useEffect(() => {
        // Only runs once the component is mounted, and 'window' is available
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        
        // Clean-up function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Initialize WaveSurfer
    useLayoutEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#0b507a',
                progressColor: '#032033'
            });

            wavesurfer.current.load(url);
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, [url]);

    const togglePlayPause = () => {
        if (wavesurfer.current) {
            setIsPlaying(!isPlaying);
            wavesurfer.current.playPause();
        }
    };

    const stopAudio = () => {
        if (wavesurfer.current) {
            setIsPlaying(false);
            wavesurfer.current.stop();
        }
    };

    // Adjusting the waveform's width based on the window width
    let waveformWidth = '100%'; // Default width
    if (windowWidth <= 480) {
        waveformWidth = '250%';
    } else if (windowWidth <= 768) {
        waveformWidth = '150%';
    }

    // Define the styles for the buttons
    const buttonStyle = {
        padding: '10px',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s ease',
        width: '40px', // Ensure the buttons are circles by having equal width and height
        height: '40px'
    };

    // Determine the button color based on the play state
    const playButtonColor = isPlaying ? 'linear-gradient(135deg, #0d47a1, black)' : 'linear-gradient(135deg, #00695c, black)';
    const stopButtonColor = 'linear-gradient(135deg, #b71c1c, black)';

    // Clone and override specific styles for play and stop buttons
    const playButtonStyle = {
        ...buttonStyle,
        background: playButtonColor, // Gradient color based on playing state
        color: 'white'
    };

    const stopButtonStyle = {
        ...buttonStyle,
        background: stopButtonColor, // Red to black gradient
        color: 'white'
    };

    return (
        <div style={{ width: waveformWidth, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={waveformRef} style={{ width: '100%', height: '100px' }}></div>
            <div style={{ width: '50%', margin: 'auto' }}> 
              <Divider borderColor="gray.300" mb={4} mt={10}/>
            </div>            
            <div style={{ display: 'flex', gap: '30px', marginTop: '4px' }}> 
                <button 
                    onClick={togglePlayPause} 
                    style={playButtonStyle}
                >
                    {isPlaying ? <MdPause size={24}/> : <MdPlayArrow size={24}/>}
                </button>
                <button 
                    onClick={stopAudio} 
                    style={stopButtonStyle}
                >
                    <MdStop size={24}/> {/* Stop icon */}
                </button>
            </div>
        </div>
    );
};

export default Waveform;