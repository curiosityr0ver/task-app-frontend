import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = ({ onFileUpload, duration, setDuration, count, setCount }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileUpload(file);
        const reader = new FileReader();
        reader.onload = function (e) {
            const audio = new Audio(e.target.result);
            audio.onloadedmetadata = function () {
                // console.log(3 + parseInt(audio.duration.toFixed(2)));
                duration += parseInt(audio.duration.toFixed(2));
                count += 1;
                setDuration(duration);
                setCount(count);
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <Dropzone onDrop={onDrop} accept="audio/*" multiple={false}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop an audio file here, or click to select one</p>
                    </div>
                )}
            </Dropzone>
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
        </div>
    );
};

export default FileUpload;
