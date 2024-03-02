import React, { useState, useEffect } from 'react';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb, RangeSliderMark,
} from '@chakra-ui/react';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';


const SliderApp = ({ dur }) => {

    const [duration, setDuration] = useState(0);

    const arrayRange = (start, stop, step) =>
        Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
        );

    console.log(arrayRange(0, 360, 10));

    useEffect(() => {

    }, []);



    return (
        <RangeSlider
            defaultValue={[120, 240]} min={0} max={300} step={30}
            onChangeEnd={(val) => console.log(val)}
        >
            <RangeSliderMark value={280} >
                50%
            </RangeSliderMark>
            <RangeSliderTrack bg='red.100'>
                <RangeSliderFilledTrack bg='tomato' />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
        </RangeSlider >
    );
};

export default SliderApp;
