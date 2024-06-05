import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './VideoPlayer';

// Establish the socket connection
const socket = io('http://localhost:33000'); // Update with your server address if different

const App = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (msg) => {
      console.log('Received message:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

   

    // Cleanup listeners on component unmount
    return () => {
      socket.off('message');
     
    };
  }, []);

  // Emit a new message
  const sendMessage = () => {
    socket.emit('sendMessage', messageText);
    setMessageText('');
  };

  // Emit a pause command
  const sendPause = () => {
    socket.emit('sendPause', 'Pause command');
  };

  // Emit a play command
  const sendPlay = () => {
    socket.emit('sendPlay', 'Play command');
  };

  return (
    <div>
      <h1>MoviesConnexion Back</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <strong> {message}</strong>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send Message</button>
        
      <VideoPlayer />
      
      </div>
      
      <p>Status: {status}</p>
    </div>
  );
};

export default App;

