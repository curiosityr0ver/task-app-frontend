import React, { useState, useEffect } from 'react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb, RangeSliderMark, Box, Badge
} from '@chakra-ui/react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';


const SliderApp = ({ dur, count, setCount, finValues, setFinValues }) => {

    const [duration, setDuration] = useState(dur.reduce((a, b) => a + b, 0));
    const [values, setValues] = useState([]);

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    const countArray = () => {
        return arrayRange(0, count - 1, 1);
    };
    const pairArray = () => {
        return arrayRange(0, duration, duration / (count + 1));
    };
    const sliderArray = () => {
        return pairArray().slice(1, count + 1);
    };
    const steps = arrayRange(0, duration, 10);

    useEffect(() => {
        console.log(dur);
        setFinValues(sliderArray());
        console.log(count);


    }, [count]);

    // useEffect(() => {
    //     console.log(sliderArray);
    //     setValues(sliderArray());
    //     setFinValues(sliderArray());
    // }, []);



    return (
        <Box width={"100%"} p={"25px"}>
            <RangeSlider
                defaultValue={arrayRange(0, duration, duration / (count + 1)).slice(1, count + 1)} min={0} max={duration} step={1}
                onChange={(val) => setValues(val)}
                onChangeEnd={(val) => { console.log(val); setFinValues(val); }
                }
            >
                {steps.map(function (step, index) {
                    return (
                        <RangeSliderMark children={step} value={step} key={index} mt='4px' color='gray.300' fontSize='sm' />
                    );
                })}

                <RangeSliderTrack bg='red.200' />
                {
                    arrayRange(0, count - 1, 1).map(cnt => {
                        return (
                            <div>
                                <RangeSliderThumb boxSize={8} index={cnt} key={cnt} />
                            </div>

                        );
                    })
                }
                {/* {arrayRange(0, duration, duration / (count + 1)).slice(1, count + 1).map(function (step, index) {
                    return (
                        <RangeSliderThumb boxSize={8} index={index} key={index} opacity='70%'>
                            <RangeSliderMark
                                value={values[index]}
                                textAlign='center'
                                bg='blue.500'
                                color='white'
                                mt='-14'
                                ml='-2'
                                w='12'
                            >
                                {values[index]}
                            </RangeSliderMark>
                        </RangeSliderThumb>
                    );
                })} */
                }
            </RangeSlider >
        </Box >
    );
};

export default SliderApp;
