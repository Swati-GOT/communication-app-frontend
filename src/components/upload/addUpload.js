import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { createUpload, editUpload, getUploadById } from '../../storage/uploadStorage';
import './upload.css';


const AddUpload = (props) => {
    const { openPopup, onAction, actionType, handleClose, params } = props;
    const [upload, setUpload] = useState({ label: "", fileName: "" });
    const [errors, setErrors] = useState({ label: "", fileName: "" });

    useEffect(() => {
        if (actionType === "edit") {
            const fileData = getUploadById(params?.id)
            setUpload({ ...fileData });
        } else {
            setUpload({ label: "", fileName: "" });
        }
    }, [actionType, params?.id]);


    const changeHandler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "label":
                errors.label = (value === '') ? 'Label cannot be blank' : "";
                break;
            case "fileName":
                errors.fileName = (value === '') ? 'File Name cannot be blank' : "";
                break;

        }
        setErrors({ ...errors })
        setUpload({ ...upload, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (upload.label === '' || upload.fileName === '') {
            alert('All fields are required');
            return false;
        }

        upload.fileName = upload.fileName.split("\\").pop();
        if(actionType === "edit"){
            editUpload(upload);
        }else{
            createUpload(upload);
        }
        
        onAction();
    }

    return (
        <>
            <Modal className="UploadModal" show={openPopup} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
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
                                        <input className="input-class" type="file" id="fileName" name="fileName" onChange={changeHandler} />
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