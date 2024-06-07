import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';
import './videoplayer.css'; // Import the CSS for VideoPlayer

const socket = io('http://localhost:33000');

const VideoPlayer = ({ room }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    socket.on('pause', (receivedRoom) => {
      if (receivedRoom === room) {
        setIsPlaying(false);
      }
    });

    socket.on('play', (receivedRoom) => {
      if (receivedRoom === room) {
        setIsPlaying(true);
      }
    });

    return () => {
      socket.off('pause');
      socket.off('play');
    };
  }, [room]);

  const handlePause = () => {
    socket.emit('sendPause', room);
  };

  const handlePlay = () => {
    socket.emit('sendPlay', room);
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="https://www.w3schools.com/html/mov_bbb.mp4"
        playing={isPlaying}
        
        width="100%"
        height="100%"
      />
      <div className="player-controls">
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
