import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from '../../storage/userStorage';
import { deleteUser, fetchUsers } from '../../store/usersSlice';
import ActionDialog from '../actionDialog';

const User = () => {
  const [modalState, setModalState] = useState({ body: "", openModal: false, title: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const loginUser = getLoggedInUser()

  useEffect(() => {
    dispatch(fetchUsers()).then((response) => {
      if (response.payload.status) {
        alert(response.payload?.message)
        navigate("/");
      } else {
        setLoading(false);
        setUsers(response?.payload)
      }
    }).catch((error) => {
      alert(error)
    })
  }, []);
  const handleClick = (actionType, value) => {
    const editPath = `./edituser/${value.id}`;
    if (actionType === 'edit') {
      navigate(editPath)
    }
    else {
      handleOpenModal("Are you sure ?", "Confirm User Deletion", { "id": value.id })
    }
  };

  const handleModalAction = (params) => {
    const { id } = params
    dispatch(deleteUser(id)).then(() => dispatch(fetchUsers()).then((response) => {
      setModalState({ openModal: false });
      setUsers(response?.payload);
      setLoading(false);
    }).catch((error) => {
      alert(error)
    }))
  };

  const handleOpenModal = (body, title, params) => {
    setModalState({ body, openModal: true, title, params: params });
  };

  const handleCloseModal = () => {
    setModalState({ openModal: false });
  };

  return <div className='content-alignment'>
    {loading && <div>Loading...</div>}
    {!loading && (
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
            users.map((item, index) => (
              <tr key={index}>
                <td>{item.fullname}</td>
                <td>{item.email}</td>
                <td>
                  <button className='link-button' onClick={() => handleClick('edit', item)}>
                    Edit
                  </button>
                  {loginUser.email !== item.email && <span> | </span>}
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
    )}
    <ActionDialog {...modalState} onCloseModal={handleCloseModal} onAction={handleModalAction}></ActionDialog>
  </div>
}
export default User;