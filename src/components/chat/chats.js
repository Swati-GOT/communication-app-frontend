
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../../storage/userStorage';
import { createChat, fetchChats } from '../../store/chatSlice';
import './chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullname, id } = getLoggedInUser()
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    getAllChats();
  }, []);

  const getAllChats = () => {
    dispatch(fetchChats()).then((response) => {
      if (response.payload.status) {
        alert(response.payload?.message)
        navigate("/");
      } else {
        const data = response?.payload;
        setChatList(data.map((chat) => `[${chat.createdAt.toLocaleString()}]  ${chat.User?.fullname}: ${chat.message}`))
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Please enter a message');
      return false;
    }
    const chatData = {
      message: message.trim(),
      userId: id,
      username: fullname
    }
    dispatch(createChat(chatData)).then(() => {
      getAllChats();
      setMessage('');
    })
    // if (message.trim()) {
    //   const chat_message = `[${new Date().toLocaleString()}]  ${fullname}: ${message}`
    //   const updatedChatList = [...chatList, chat_message];
    //   setChatList(updatedChatList);
    //   addChat(chat_message);
    //   setMessage('');
    // }
  };

  return (
    <>
      <Card className='card-container'>
        <Card.Header className='card-header'>Group Chat</Card.Header>
        <Card.Body className="chat-list">
          {chatList.map((chat, index) => (
            <div key={index}>
              <p>{chat}</p>
            </div>
          ))}
        </Card.Body>
        <Card.Footer>
          <div>
            <form className="chat-form" onSubmit={handleSendMessage}>
              <label htmlFor="message">{fullname}</label>
              <input
                className='chat-input'
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
              <button>Refresh</button>
            </form>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Chat;
