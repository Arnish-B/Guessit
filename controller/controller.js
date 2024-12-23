import { nanoid } from 'nanoid';
import Room from '../models/Room.js';  // Assuming Room is the default export

// Create a hashmap with room_id as key and room object as value
export const rooms = new Map();

export const createRoomId = (req, res) => {
    const room_id = nanoid(5);  // Generate a unique room ID
    const room = new Room(room_id);  // Create a new room with the generated ID

    // Add room to the map
    rooms.set(room_id, room);

    // Send the room object in response
    res.json({ message: 'Room created successfully', roomId: room_id, room: room });
};

export const joinRoom = (req, res) => {
    const { roomId } = req.body;  // Assuming the roomId is sent in the request body

    // Check if the room exists
    if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        // Add the player to the room (assuming we have a method to handle this)
        room.addPlayer(req.body.username);  // Add the player (you should implement this method in the Room class)
        res.json({ message: `Joined room ${roomId} successfully!`, room: room });
    } else {
        res.status(404).json({ message: `Room with ID ${roomId} not found.` });
    }
};
