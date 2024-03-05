import React, { useState, useEffect } from 'react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb, RangeSliderMark, Box, Badge
} from '@chakra-ui/react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';


const SliderApp = ({ count, setCount, dur }) => {

    const [duration, setDuration] = useState(300);
    const [values, setValues] = useState([]);

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );
    const steps = arrayRange(0, duration, 20);
    const countArray = arrayRange(0, count - 1, 1);
    const sliderArray = arrayRange(0, duration, duration / (count + 1)).slice(1, count + 1);
    useEffect(() => {
        setValues(sliderArray);
    }, []);



    return (
        <Box width={"100%"} p={"30px"}>
            <RangeSlider
                defaultValue={sliderArray} min={0} max={duration} step={1}
                onChange={(val) => setValues(val)}
                onChangeEnd={(val) => console.log(val)}
            >
                {steps.map(function (step, index) {
                    return (
                        <RangeSliderMark value={step} key={index} >
                            {step}
                        </RangeSliderMark>
                    );
                })}

                <RangeSliderTrack bg='red.100'>
                    <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                {countArray.map(function (step, index) {
                    return (
                        <RangeSliderThumb boxSize={8} index={index} key={index} opacity={"70%"}>
                            <RangeSliderMark
                                value={20}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='-12'
                                ml='-2'
                                w='12'
                            >
                                {values[index]}
                            </RangeSliderMark>
                        </RangeSliderThumb>
                    );
                })}
            </RangeSlider >
        </Box >

    );
};

export default SliderApp;