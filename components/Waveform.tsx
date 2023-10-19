import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Divider } from '@chakra-ui/react';

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

    // Adjusting the waveform's width based on the window width
    let waveformWidth = '100%'; // Default width
    if (windowWidth <= 480) {
        waveformWidth = '250%';
    } else if (windowWidth <= 768) {
        waveformWidth = '150%';
    }

    return (
        <div style={{ width: waveformWidth, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div ref={waveformRef} style={{ width: '100%', height: '100px' }}></div>
            <div style={{ width: '50%', margin: 'auto' }}> 
            <Divider borderColor="gray.300" mb={4} mt={8}/>
            </div>            
            <button 
                onClick={togglePlayPause} 
                style={{
                    marginTop: '4px', 
                    padding: '10px 20px',
                    background: 'linear-gradient(45deg, #032033, #0b507a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    fontWeight: '600'
                }}
            >
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    );
};

export default Waveform;
