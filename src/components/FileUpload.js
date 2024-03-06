import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb, RangeSliderMark, Box, Badge, Text, Flex
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
const FileUpload = ({ onFileUpload, handleFileDelete, count, setCount }) => {
    const [selectedFile, setSelectedFile] = useState([]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile([file, ...selectedFile]);
        console.log(selectedFile);
        onFileUpload(file);
        const reader = new FileReader();
        reader.onload = function (e) {
            const audio = new Audio(e.target.result);
            audio.onloadedmetadata = function () {
                // console.log(3 + parseInt(audio.duration.toFixed(2)));
                count += 1;
                setCount(count);
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box border={"2px dashed black"} cursor={"pointer"} _hover={{ bg: "white" }} minH={"15vh"} p={"10px"} borderRadius={"10px"} color={"#747264"}>
            <Dropzone onDrop={onDrop} accept="audio/*" multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop an audio file here, or click to select one</p>

                    </div>

                )}
            </Dropzone>
            <Flex alignItems={"center"} gap={"5px"}>
                {selectedFile[0] && <Text color={"black"}>Selected File: {selectedFile[0].name}</Text>}
                {selectedFile[0] && <SmallCloseIcon onClick={() => { handleFileDelete(0); setSelectedFile([...selectedFile.filter((element) => element !== selectedFile[0])]); }} alignItems={"center"} bgColor={"grey"} textColor="white" p={"2px"} borderRadius={"lg"} boxSize={5} color={"black"}>Selected File: {selectedFile.name}</SmallCloseIcon>}
            </Flex>

        </Box >
    );
};

export default FileUpload;
