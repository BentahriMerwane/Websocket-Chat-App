const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');
    console.log(socket.id)

    socket.on('sendMessage', (message) => {
        console.log('Message:', message);
        io.emit('message', socket.id + " : " + message ); // Broadcast the message to all connected clients
    });

    socket.on('sendPause', (message) => {
        console.log('Pause:', message);
        io.emit('pause', message); // Broadcast the pause event to all connected clients
    });

    socket.on('sendPlay', (message) => {
        console.log('Play:', message);
        io.emit('play', message); // Broadcast the play event to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 33000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
