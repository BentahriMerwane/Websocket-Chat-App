import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './components/videoplayer/VideoPlayer';
import JoinRoom from './components/joinroom/JoinRoom';

// Establish the socket connection
const socket = io('http://localhost:33000'); // Update with your server address if different

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);

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

  const joinRoom = (username, room) => {
    if (username && room) {
      socket.emit('joinRoom', { username, room });
      setIsInRoom(true);
      setRoom(room);
      setUsername(username);
    }
  };

  const sendMessage = () => {
    if (room && messageText) {
      socket.emit('sendMessage', { room, message: messageText });
      setMessageText('');
    }
  };

  return (
    <div>
      <h1>MoviesConnexion Back</h1>
      {!isInRoom ? (
        <JoinRoom onJoin={joinRoom} />
      ) : (
        <>
          <div className="messages">
            {messages.map((message, index) => (
              <div key={index}>
                <strong>{message}</strong>
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
          </div>
          <VideoPlayer room={room} />
        </>
      )}
    </div>
  );
};

export default App;
