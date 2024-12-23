// Player.js
class Player {
    constructor(playerId, username, socketId) {
      this.socketId = socketId;  // Socket ID of the player
      this.playerId = playerId;  // Unique player identifier (socket ID or generated ID)
      this.username = username;  // Username of the player
      this.isGuesser = false;    // Whether the player is the guesser in the round
    }
  
    // Method to get player's details
    getDetails() {
      return {
        socketId:this.socketId,
        playerId: this.playerId,
        username: this.username,
        isGuesser: this.isGuesser
      };
    }
  
    // Set player as the guesser
    setGuesser(isGuesser) {
      this.isGuesser = isGuesser;
    }
  
    // Check if the player is the guesser
    isGuesser() {
      return this.isGuesser;
    }
  }
  
  export default Player;  // Using ES6 export
  