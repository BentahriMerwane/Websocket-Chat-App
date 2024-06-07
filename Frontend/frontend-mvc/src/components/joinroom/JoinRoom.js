import React, { useState } from 'react';
import './joinroom.css'; // Import the CSS for JoinRoom

const JoinRoom = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = () => {
    if (username && room) {
      onJoin(username, room);
    }
  };

  return (
    <div className="join-room">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room"
      />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
