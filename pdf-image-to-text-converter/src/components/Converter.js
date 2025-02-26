import React, { useState } from 'react';
import { convertFileToText } from '../services/ocrService';
import { validateFileType } from '../utils/fileUtils';

const Converter = () => {
    const [file, setFile] = useState(null);
    const [textOutput, setTextOutput] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (validateFileType(selectedFile)) {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Invalid file type. Please upload a PDF or image file.');
        }
    };

    const handleConvert = async () => {
        if (file) {
            try {
                const text = await convertFileToText(file);
                setTextOutput(text);
                setError('');
            } catch (err) {
                setError('Error converting file. Please try again.');
            }
        } else {
            setError('Please select a file to convert.');
        }
    };

    return (
        <div className="converter">
            <h2>Convert PDF/Image to Text</h2>
            <input type="file" accept=".pdf, .jpg, .jpeg, .png" onChange={handleFileChange} />
            <button onClick={handleConvert}>Convert</button>
            {error && <p className="error">{error}</p>}
            {textOutput && (
                <div className="output">
                    <h3>Converted Text:</h3>
                    <p>{textOutput}</p>
                </div>
            )}
        </div>
    );
};

export default Converter;