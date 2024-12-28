import React, { useState } from "react";

interface PopupProps {
  roomID: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ roomID, onClose }) => {
  const [roomId, setRoomId] = useState(roomID);
  const [username, setUsername] = useState("");

  const handleStartGame = () => {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white focus:outline-none"
        >
          &#x2715;
        </button>
        <h2 className="text-lg font-semibold mb-4">Join Game</h2>
        <div className="mb-4">
          <label htmlFor="roomId" className="block text-sm font-medium mb-1">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleStartGame}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded focus:outline-none"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Popup;
