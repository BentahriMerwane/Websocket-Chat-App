import React, { useState } from 'react';

const JoinRoom = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = () => {
    if (username && room) {
      onJoin(username, room);
    }
  };

  return (
    <div>
      <div>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          type="text"
          placeholder="Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="">-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>
        <button onClick={handleJoin}>Join Room</button>
      </div>
    </div>
  );
};

export default JoinRoom;
