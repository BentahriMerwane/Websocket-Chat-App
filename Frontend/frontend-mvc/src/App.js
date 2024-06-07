import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import VideoPlayer from './components/videoplayer/VideoPlayer';
import JoinRoom from './components/joinroom/JoinRoom';
import Chat from './components/Chat/Chat';
import './App.css'; // Import the CSS for App

const socket = io('http://localhost:33000');

const App = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

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

  const sendMessage = (messageText) => {
    if (room && messageText) {
      socket.emit('sendMessage', { room, message: messageText });
    }
  };

  return (
    <div>
      
      {!isInRoom ? (
        <JoinRoom onJoin={joinRoom} />
      ) : (
        <div className="container">
         
            <VideoPlayer room={room} />
          
          <div className="chat-container">
          <h1 className='roomtitlejoin'>The room : {room}</h1>
            <Chat messages={messages} sendMessage={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
