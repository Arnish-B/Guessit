import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; // Correct import for socket.io

const app = express();
const server = http.createServer(app);  // Creating the HTTP server

// Configure CORS for Socket.io
const io = new Server(server, { // Create a new instance of Server
    cors: {
        origin: '*',  // Allows requests from any origin, adjust as needed
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});  // Initialize Socket.IO with the server
import routes from './routes/routes.js';
import { rooms } from './controller/controller.js';  // Import the rooms map
app.use(express.json());

// Use routes for creating and joining rooms
app.use(routes);
export const SOCKET=null;
// Handle socket connections
io.on('connection', (socket) => {
    console.log(`New player connected: ${socket.id}`);

    // Listen for players joining a room
    socket.on('joinRoom', (roomId, username) => {
        // Check if room exists in your rooms map
        if (rooms.has(roomId)) {
            const room = rooms.get(roomId);
            room.addPlayer(username, socket.id);  // Add player to the room using socket ID
            socket.join(roomId);  // Join the room using the room ID
            // Emit to the player joining, that they have successfully joined
            socket.emit('joinedRoom', roomId, username);

            // Broadcast to others in the room that a new player has joined
            socket.to(roomId).emit('newPlayerJoined', username);
        } else {
            // Room does not exist
            socket.emit('error', 'Room not found');
        }
    });

    socket.on('startVote', (roomId) => {
        // Check if room exists
        if (rooms.has(roomId)) {
            const room = rooms.get(roomId);
            // Start the game logic here
            const options=room.beginVote(roomId);
            console.log(options);
            io.to(roomId).local.emit('beginVote', Object.fromEntries(options));
            

        } else {
            // Room does not exist
            socket.emit('error', 'Room not found');
        }
    });

    socket.on("startGame", (roomId) => {
        if (rooms.has(roomId)) {
            const room = rooms.get(roomId);
    
            // Begin game and get the denner
            const denner = room.beginGame(room);
    
            if (denner) {
                console.log("Denner object:", denner);
                console.log("Denner Socket ID:", denner.socketId);
                // Check if socket is valid
                if (io.sockets.sockets.has(denner.socketId)) {
                    // Emit only to the denner
                    io.to(denner.socketId).emit("youDenner", denner);
                } else {
                    console.error(`Socket with ID ${denner.socketId} is not connected`);
                }
            } else {
                console.error("No denner returned from beginGame()");
            }
        } else {
            console.error(`Room with ID ${roomId} not found`);
        }
    });
    

    // Handle player disconnection
    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id}`);
        // You can handle player removal from rooms here
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
