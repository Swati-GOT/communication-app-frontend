import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from "react-router-dom";
import ActionDialog from '../actionDialog';
import AddUpload from './addUpload';
import { deleteUploadById, getUploads } from '../../storage/uploadStorage';

const Upload = () => {
  const [data, setData] = useState(getUploads());

  const [modalState, setModalState] = useState({ body: "", openModal: false, title: "" });
  const [popupState, setPopupState] = useState({ openPopup: false });

  const handleClick = (actionType, value) => {

    if (actionType === 'add') {
      handleOpenPopup("add", {})
    } else if (actionType === 'edit') {
      handleOpenPopup("edit", { "id": value.id })
    } else {
      handleOpenModal("Are you sure ?", "Confirm File Deletion", { "id": value.id })
    }
  };

  const handleModalAction = (params) => {
    const { id } = params
    deleteUploadById(id);
    setData(getUploads());
    setModalState({ openModal: false });
  };

  const handleOpenModal = (body, title, params) => {
    setModalState({ body, openModal: true, title, params: params });
  };

  const handleCloseModal = () => {
    setModalState({ openModal: false });
  };

  const handlePopupAction = (params) => {
    setData(getUploads());
    setPopupState({ openPopup: false });
  };

  const handleOpenPopup = (actionType, params) => {
    setPopupState({ openPopup: true, actionType, params });
  };

  const handleClosePopup = () => {
    setPopupState({ openPopup: false });
  };


  return <>
    <div className="d-flex justify-content-end mt-3">
      {/* <AddUpload onAction={handlePopupAction}/> */}
      <Button onClick={() => handleClick('add', {})}>
        + Add Upload
      </Button>
    </div>
    <div className='content-alignment'>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Label</th>
            <th>File Upload</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.label}</td>
                <td>{item.fileName}</td>
                <td>
                  <button onClick={() => handleClick('edit', item)} className="link-button">
                    Edit
                  </button>
                  <span> | </span>
                  <button onClick={() => handleClick('delete', item)} className="link-button">
                    Delete
                  </button>
                 
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <ActionDialog {...modalState} onCloseModal={handleCloseModal} onAction={handleModalAction}></ActionDialog>
      <AddUpload {...popupState} handleClose={handleClosePopup} onAction={handlePopupAction} />
    </div>
  </>
}
export default Upload;