import React, { useState, useRef, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const AudioPlayer = ({ audioUrl, turn, setTurn, index, startTime = 5, endTime = 10 }) => {
    const audioRef = useRef(null);
    // const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement && turn == index) {
            audioElement.currentTime = startTime;
            audioElement.play();
            setTimeout(() => {
                audioRef.current.pause();
                setTurn(turn + 1);
            }, (endTime - startTime + 1) * 1000);
        } else {
        }
    }, [turn]);


    return (
        <Box height={"30px"} width={"20%"} border={"1px solid black"}>
            <audio ref={audioRef} src={audioUrl} />
        </Box>
    );
};

export default AudioPlayer;
