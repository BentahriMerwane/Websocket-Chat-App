import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';
import './videoplayer.css';

// Establish the socket connection
const socket = io('http://localhost:33000'); // Update with your server address if different

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState();

  useEffect(() => {
    // Listen for pause events
    socket.on('pause', () => {
      console.log('Received pause');
      setIsPlaying(false);
    });
    console.log(socket.id)

    // Listen for play events
    socket.on('play', () => {
      console.log('Received play');
      setIsPlaying(true);
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('pause');
      socket.off('play');
    };
  }, []);

  const handlePause = () => {
    socket.emit('sendPause', 'Pause command');
  };

  const handlePlay = () => {
    socket.emit('sendPlay', 'Play command');
  };

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url='https://www.w3schools.com/html/mov_bbb.mp4'
        playing={isPlaying}
        controls={true}
      
      />
      <div className='controls'>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Play</button>
        <p>Status: {socket.id} + {isPlaying ? 'Playing' : 'Paused'}</p>
      </div>
      
    </div>
  );
};

export default VideoPlayer;
