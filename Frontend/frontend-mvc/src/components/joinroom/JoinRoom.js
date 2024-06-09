import React, { useState } from 'react';
import './joinroom.css'; // Import the CSS for JoinRoom

const JoinRoom = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  
  // Define room options
  const roomOptions = ["LOTR", "Star Wars", "Harry Potter", "Avengers"];
  
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
      {/* Dropdown menu for room selection */}
      <select
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room"
        className="room-select"
      >
        <option value="">Select a room</option>
        {roomOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
