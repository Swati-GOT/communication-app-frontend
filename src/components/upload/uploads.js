import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteUpload, downloadFile, fetchuploads } from '../../store/uploadSlice';
import ActionDialog from '../actionDialog';
import AddUpload from './addUpload';

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalState, setModalState] = useState({ body: "", openModal: false, title: "" });
  const [popupState, setPopupState] = useState({ openPopup: false });

  useEffect(() => {
    getUploads();
  }, []);

  const getUploads = () => {
    return dispatch(fetchuploads()).then((response) => {
      if (response.payload.status) {
        alert(response.payload?.message)
        navigate("/");
      } else {
        setLoading(false);
        setData(response?.payload)
      }
    }).catch((error) => {
      alert(error)
    })
  }

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
    const { id } = params;
    dispatch(deleteUpload(id)).then(() => {
      getUploads()
      setModalState({ openModal: false });
      setLoading(false);
    }).catch((error) => {
      alert(error)
    })
  };
  const handleOpenModal = (body, title, params) => {
    setModalState({ body, openModal: true, title, params: params });
  };

  const handleCloseModal = () => {
    setModalState({ openModal: false });
  };

  const handlePopupAction = (params) => {
    setPopupState({ openPopup: false });
    getUploads()
  };

  const handleOpenPopup = (actionType, params) => {
    setPopupState({ openPopup: true, actionType, params });
  };

  const handleClosePopup = () => {
    setPopupState({ openPopup: false });
  };

  const download = (file_name) => {
    dispatch(downloadFile(file_name)).then(() => {
      window.location.href = `${process.env.REACT_APP_API_URL}/download/${file_name}`;
    })
  }

  return <>
    <div className="d-flex justify-content-end mt-3">
      <Button onClick={() => handleClick('add', {})}>
        + Add Upload
      </Button>
    </div>
    <div className='content-alignment'>
      {loading && <div>Loading...</div>}
      {!loading && (
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
                  <td className='download-link text-primary'
                    onClick={() => download(item.file_name)}
                  >
                    {item.file_name}
                  </td>
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
      )}
      <ActionDialog {...modalState} onCloseModal={handleCloseModal} onAction={handleModalAction}></ActionDialog>
      <AddUpload {...popupState} handleClose={handleClosePopup} onAction={handlePopupAction} />
    </div>
  </>
}
export default Upload;