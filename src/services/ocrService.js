import Tesseract from 'tesseract.js';

export const convertImageToText = async (imageFile) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imageFile,
            'ara', // Arabic language
            {
                logger: info => console.log(info) // Optional: log progress
            }
        );
        return text;
    } catch (error) {
        console.error('Error during OCR processing:', error);
        throw error;
    }
};

export const convertPdfToText = async (pdfFile) => {
    try {
        const pdfData = await pdfFile.arrayBuffer();
        const { data: { text } } = await Tesseract.recognize(
            pdfData,
            'ara', // Arabic language
            {
                logger: info => console.log(info) // Optional: log progress
            }
        );
        return text;
    } catch (error) {
        console.error('Error during PDF OCR processing:', error);
        throw error;
    }
};

export const convertFileToText = async (file) => {
    try {
        if (file.type === 'application/pdf') {
            return await convertPdfToText(file);
        } else {
            return await convertImageToText(file);
        }
    } catch (error) {
        console.error('Error converting file:', error);
        throw error;
    }
};
