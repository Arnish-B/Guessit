import { Router } from 'express';
import { createRoomId, joinRoom } from '../controller/controller.js';

const routes = Router();

// Create and join room routes
routes.get('/room/create', createRoomId);   // Route for creating a room
routes.post('/room/join', joinRoom);        // Route for joining a room

export default routes;
