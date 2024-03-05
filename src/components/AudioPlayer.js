import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import {
    Button, Box
} from '@chakra-ui/react';

const colors = [
    {
        primary: "#CBF1F5",
        secondary: "#A6E3E9"
    },
    {
        primary: "#EAFFD0",
        secondary: "#95E1D3"
    },
    {
        primary: "#FFC7C7",
        secondary: "#FFE2E2"
    },
];

const Waveform = ({ audioUrl, turn, setTurn, playing, setPlaying, index }) => {
    const containerRef = useRef();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    });

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: true,
            barWidth: 2,
            barHeight: 10,
            cursorWidth: 0,
            progressColor: colors[0].primary,
            waveColor: colors[0].secondary
        });
        waveSurfer.load(audioUrl);

        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer;
        });
        waveSurfer.on('finish', () => {
            setTurn(turn + 2);
            // if (turn == index) {
            //     waveSurfer.seekTo(startTime / waveSurfer.getDuration());
            //     waveSurferRef.current.playPause();
            // }
        });
        return () => {
            waveSurfer.destroy();
        };
    }, [audioUrl]);

    useEffect(() => {
        // console.log(turn);
        if (turn == -20) {
            waveSurferRef.current.seekTo(0);
            waveSurferRef.current.pause();
            setPlaying(false);
            setTurn(-1);
        }

        else if (turn == index) {
            waveSurferRef.current.play();
            setPlaying(true);
        } else {
            if (waveSurferRef.current.isPlaying()) {
                waveSurferRef.current.pause();
            }
        }
    }, [turn]);
    useEffect(() => {
        if (turn == index) {
            if (playing) {
                waveSurferRef.current.play();
                setPlaying(true);
            } else {
                waveSurferRef.current.pause();
                setPlaying(false);
            }
        }



    }, [playing]);



    return (
        <div>
            <Box margin={"10px"} onClick={() => { setPlaying(false); setTurn(index); setPlaying(true); }} ref={containerRef} />
        </div>
    );
};

Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
};

// const WaveSurferWrap = styled.div`
//   display: grid;
//   grid-template-columns: 40px 1fr;
//   align-items: center;

//   button {
//     width: 40px;
//     height: 40px;
//     border: none;
//     padding: 0;
//     background-color: white;
//   }
// `;


export default Waveform;
