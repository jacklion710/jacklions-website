import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
    src: string;
    isVisible: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ src, isVisible }) => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Initialize WaveSurfer
    useLayoutEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: 'violet', // as per your preference
                progressColor: 'purple' // as per your preference
            });
            wavesurfer.current.load(src);
        }

        return () => {
            // Check if wavesurfer.current is not null before calling destroy
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, [src]);

    const togglePlayPause = () => {
        // Check if wavesurfer.current is not null before calling playPause
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
            {isVisible && (
                <button onClick={togglePlayPause} style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    background: 'linear-gradient(45deg, violet, purple)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    fontWeight: '600'
                }}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            )}
        </div>
    );
};

export default Waveform;
