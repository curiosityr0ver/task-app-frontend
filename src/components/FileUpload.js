import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const FileUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileUpload(file);
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
