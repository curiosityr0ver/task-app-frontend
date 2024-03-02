import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
// import styled from 'styled-components';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const Waveform = ({ audioUrl, turn, setTurn, index }) => {
    const containerRef = useRef();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);

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
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [audioUrl]);

    useEffect(() => {
        if (turn != index && isPlaying) {
            waveSurferRef.current.playPause();
            toggleIsPlaying(waveSurferRef.current.isPlaying());
        }
    }, [turn]);


    return (
        <div>
            <button
                onClick={() => {
                    waveSurferRef.current.playPause();
                    toggleIsPlaying(waveSurferRef.current.isPlaying());
                    setTurn(index);
                }}
                type="button"
            >
                {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
            </button>
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
