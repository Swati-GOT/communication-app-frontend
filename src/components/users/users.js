import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from "react-router-dom";
import ActionDialog from '../actionDialog';
import { deleteUser, getUsers,loggedInUser } from '../../storage/userStorage';

const User = () => {
  const [data, setData] = useState(getUsers());
  const [modalState, setModalState] = useState({ body: "", openModal: false, title: "" });
  const navigate = useNavigate();
  const loginUser = loggedInUser() 


  const handleClick = (actionType, value) => {
    const editPath = `./edituser/${value.id}`;
    if(actionType === 'edit'){
      navigate(editPath)
    }
    else{
      handleOpenModal("Are you sure ?", "Confirm User Deletion",{"id": value.id})
    }
  };

  const handleModalAction = (params) => {
    const {id} = params
    deleteUser(id);
    setData(getUsers());
    setModalState({ openModal: false });
  };

  const handleOpenModal = (body, title,params) => {
    setModalState({ body, openModal: true, title ,params:params});
  };

  const handleCloseModal = () => {
    setModalState({ openModal: false });
  };

  return <div className='content-alignment'>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>User Email ID</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {
          data.map((item, index) => (
            <tr key={index}>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>
                <button className='link-button' onClick={() => handleClick('edit', item)}>
                  Edit
                </button>
                {loginUser.email !== item.email &&<span> | </span>}
                {loginUser.email !== item.email &&
                  <button className='link-button' onClick={() => handleClick('delete', item)}>
                    Delete
                  </button>
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>

    <ActionDialog {...modalState} onCloseModal={handleCloseModal} onAction={handleModalAction}></ActionDialog>
  </div>
}
export default User;