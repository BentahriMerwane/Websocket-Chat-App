const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');



const home = require('./routers/homerouter'); 
const about = require('./routers/aboutrouter'); 
const contact = require('./routers/contactrouter'); 
  
const app = express(); 
  
app.use(home); 
app.use(about); 
app.use(contact); 

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


//API 

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 
app.get('/about', (req, res) => {
    res.send('Welcome to about us page');
});
 
app.get('/contact', (req, res) => {
    res.send('Welcome to contact us page');
});

io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        socket.username = username;
        console.log(`User ${username} joined room: ${room}`);
    });

    socket.on('sendMessage', ({ room, message }) => {
        console.log(`Message in room ${room} from ${socket.username}: ${message}`);
        io.to(room).emit('message', `${socket.username}: ${message}`);
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
        console.log('User disconnected', socket.id);
    });
});


const PORT = process.env.PORT || 33000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
