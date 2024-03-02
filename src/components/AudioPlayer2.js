import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ audioUrl, turn, setTurn, index, startTime = 0, endTime = 3 }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.currentTime = startTime;
            audioElement.play().then(() => {
                setIsPlaying(true);
            });
            setTimeout(() => {
                audioRef.current.pause();
                alert('Audio has finished playing!');
            }, 3000);


        }
    }, [startTime]);

    const handlePlayPause = () => {
        const audioElement = audioRef.current;

        if (audioElement.paused) {
            audioElement.play();
            setIsPlaying(true);
        } else {
            audioElement.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div>
            <audio ref={audioRef} src={audioUrl} />
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    );
};

export default AudioPlayer;
