
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { addChat, getChats } from '../../storage/chatStorage';
import { getLoggedInUser } from '../../storage/userStorage';
import './chat.css';

const Chat = () => {
  const { fullname } = getLoggedInUser()
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const storedChats = getChats();
    setChatList(storedChats);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      const chat_message = `[${new Date().toLocaleString()}]  ${fullname}: ${message}`
      const updatedChatList = [...chatList, chat_message];
      setChatList(updatedChatList);
      addChat(chat_message);
      setMessage('');
    }
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
