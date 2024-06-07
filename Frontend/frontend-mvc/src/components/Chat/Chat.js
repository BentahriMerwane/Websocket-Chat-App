import React, { useState } from 'react';
import Message from '../Message/Message';
import './chat.css'; // Import the CSS for Chat

const Chat = ({ messages, sendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} text={message} />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send Message</button>
      </div>
    </div>
  );
};

export default Chat;
