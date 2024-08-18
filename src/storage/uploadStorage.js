export const createUpload = (upload) => {
    const uploads = localStorage.getItem("uploads") ? JSON.parse(localStorage.getItem("uploads")) : [];
    const isFileExist = uploads.some((item) => item.fileName === upload.fileName);
    if (isFileExist) {
       alert("File already exists");
       return;
    }
    const newUpload = { ...upload, id: Number(new Date()) };
    uploads.push(newUpload);
    localStorage.setItem("uploads", JSON.stringify(uploads));
    return newUpload;
}

export const editUpload = (upload) => {
    const uploads = getUploads();
    const index = uploads.findIndex(u => u.id == upload.id);
    if (index > -1) {
        const isFileExist = uploads.some((item) => item.fileName === upload.fileName && item.id != upload.id);
        if (isFileExist) {
        alert("File already exists");
        return;
        }
        uploads[index] = upload;
        localStorage.setItem("uploads", JSON.stringify(uploads));
    }
}

export const getUploads = () => {
    const uploads = localStorage.getItem("uploads") ? JSON.parse(localStorage.getItem("uploads")) : [];
    return uploads;
}

export const getUploadById = (id) => {
    const uploads = getUploads();
    return uploads.find((item) => item.id == id);
}

export const deleteUploadById = (id) => {
    const uploads = getUploads();
    const newUploads = uploads.filter((item) => item.id != id);
    localStorage.setItem("uploads", JSON.stringify(newUploads));
}
