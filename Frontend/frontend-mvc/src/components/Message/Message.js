import React from 'react';
import './message.css'; // Import the CSS for Message

const Message = ({ text }) => {
  return (
    <div className="message">
      <strong>{text}</strong>
    </div>
  );
};

export default Message;
