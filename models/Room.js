import { nanoid } from 'nanoid';
import {add_to_options,get_options,vote,reset_options,get_option_winner} from '../controller/voteLogic.js'

import { getDenner } from '../controller/gameLogic.js';
class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.players = [];  // This will store player objects with their socket IDs
        this.hints = [];  // This will store hints submitted by players
    }

    // Method to get and upadte hints
    getHints() {
        return this.hints;
    }

    checkGuess(guess) {
        if(guess==="Apple"){
            return true;
        }
        return false;
    }

    // Method to add a hint to the room
    addHint(playerId, hint) {
        this.hints.push({ playerId,hint });
    }

    // Method to add a player to the room
    addPlayer(username, socketId) {
        const playerId = nanoid(10);  // Generate a unique player ID
        const player = { playerId, username, socketId };
        this.players.push(player);
    }

    // Method to get all players in the room
    getPlayers() {
        return this.players;
    }

    // Method to get a player by socketId
    getPlayerBySocketId(socketId) {
        return this.players.find(player => player.socketId === socketId);
    }
    beginVote(roomId){
        // Start the voting logic here
        add_to_options('Apple');
        add_to_options('Banana');
        add_to_options('Cherry');

        return get_options();
    }
    get_options(){
        return get_options();
    }
    beginGame(room){
       return getDenner(room);
    }
}

export default Room;
