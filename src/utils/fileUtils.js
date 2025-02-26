export const validateFileType = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
};

export const getFileSizeInMB = (file) => {
    return file.size / (1024 * 1024);
};

export const isFileSizeValid = (file, maxSizeMB) => {
    return getFileSizeInMB(file) <= maxSizeMB;
};

export const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsDataURL(file);
    });
};