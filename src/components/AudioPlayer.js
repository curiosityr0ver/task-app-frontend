import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
// import styled from 'styled-components';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const Waveform = ({ audioUrl, turn, setTurn, index, startTime = 0, endTime = 5 }) => {
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
        });
        waveSurfer.load(audioUrl);

        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer;
            waveSurfer.seekTo(startTime / waveSurfer.getDuration());
        });
        waveSurfer.on('finish', () => {
            console.log(index, turn);
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
        if (turn == index) {
            waveSurferRef.current.playPause();
            setTimeout(() => {
                setTurn(turn + 1);
                waveSurferRef.current.playPause();
            }, (endTime - startTime) * 1000);
        }
    }, [turn]);


    return (
        <div>
            <div ref={containerRef} />
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
