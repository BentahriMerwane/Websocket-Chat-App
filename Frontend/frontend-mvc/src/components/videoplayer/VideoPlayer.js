import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';

// Establish the socket connection
const socket = io('http://localhost:33000'); // Update with your server address if different

const VideoPlayer = ({ room }) => {
  const [isPlaying, setIsPlaying] = useState();
  console.log(room)

  useEffect(() => {
    // Listen for pause events
    socket.on('pause', (receivedRoom) => {

      console.log(receivedRoom)
      //console.log(room)

      console.log(`Pause command in room ${receivedRoom}`);
      if (receivedRoom === room) {
        setIsPlaying(false);
      }
    });

    // Listen for play events
    socket.on('play', (receivedRoom) => {
    
      console.log(`Play command in room ${receivedRoom}`);
     
      if (receivedRoom === room) {
        setIsPlaying(true);
      }
    });

    // Cleanup listeners on component unmount
    return () => {
      socket.off('sendPause');
      socket.off('sendPlay');
    };
  }, [room]);
  
  const handlePause = () => {
    console.log('Sending pause command');
    socket.emit('sendPause', room);
  };
  
  const handlePlay = () => {
    console.log('Sending play command');
    socket.emit('sendPlay', room);
  };
  

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url='https://www.w3schools.com/html/mov_bbb.mp4'
        playing={isPlaying}
     
      />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <p>Status: {isPlaying ? 'Playing' : 'Paused'}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
