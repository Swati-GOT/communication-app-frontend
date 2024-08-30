import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createUploads, getUploadById, updateUploads } from '../../store/uploadSlice';
import './upload.css';

const AddUpload = (props) => {
    const dispatch = useDispatch();
    const { openPopup, onAction, actionType, handleClose, params } = props;
    const [upload, setUpload] = useState({ label: '', file_name: '' });
    const [errors, setErrors] = useState({ label: "", fileName: "" });
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    useEffect(() => {
        if (actionType === "edit") {
            dispatch(getUploadById(params?.id)).then((response) => {
                setUpload(response.payload);
                setFileName(response.payload.file_name);
            })
        } else {
            setUpload({ label: "", file_name: "" });
        }
    }, [actionType, params?.id]);


    const changeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "label":
                errors.label = (value === '') ? 'Label cannot be blank' : "";
                break;
            case "file_name":
                setSelectedFile(event.target.files[0]);
                setFileName(event.target.files[0].name)
                break;
        }
        setErrors({ ...errors })
        setUpload({ ...upload, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (upload.label === '' || upload.file_name === '') {
            alert('All fields are required');
            return false;
        }

        const formData = new FormData();
        if (!selectedFile && !fileName) {
            alert('Please select a file to upload.');
            return false;
        } else {
            formData.append('file_name', selectedFile);
        }

        formData.append('label', upload.label);

        if (actionType === "edit") {
            dispatch(updateUploads({ formData, id: params?.id })).then(() => {
                onAction();
            })
        } else {
            dispatch(createUploads(formData)).then(() => {
                onAction();
            })
        }
    }

    return (
        <>
            <Modal className="uploadModal" show={openPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} >
                        <table >
                            <tbody>
                                <tr>
                                    <td >
                                        <label className="input-label me-2" htmlFor="label">Label</label>
                                    </td>
                                    <td>
                                        <input className="input-class" type="text" id="label" name="label" defaultValue={upload.label} onChange={changeHandler} />
                                        <p className='error-message'>{errors.label}</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td >
                                        <label className="input-label" htmlFor="fileName">File Name</label>
                                    </td>
                                    <td>
                                        <input className="input-class" type="file" id="file_ame" name="file_name" onChange={changeHandler} />
                                        {/* <span className="file-name" id='file-text'>{fileName}</span> */}
                                        <p className='error-message'>{errors.fileName}</p>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                        <input className='rounded-button' type="submit" value="Upload Now" />
                        <input className='rounded-button' type='button' value="Cancel" onClick={handleClose} />
                    </form>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddUpload;