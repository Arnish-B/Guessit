"use client";

import React, { useState } from "react";
import axios from "axios";
import { GoInfo } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import Popup from "../components/Popup";

const LandingPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const [roomId, setRoomId] = useState("");

  const handleInfoClick = () => {
    setShowRulesPopup(true);
  };

  const handleCloseClick = () => {
    setShowPopup(false);
  };

  const handleRulesCloseClick = () => {
    setShowRulesPopup(false);
  };

  const handleCreateRoomClick = () => {
    axios
      .get("http://localhost:3000/room/create")
      .then((response) => {
        console.log(response.data.roomId);
        setRoomId(response.data.roomId);
        setShowPopup(true);
      })
      .catch((error) => {
        console.error("Error fetching room ID:", error);
      });
  };

  const handleJoinRoomClick = () => {
    setRoomId("");
    setShowPopup(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8 flex items-center justify-center">
          Welcome To Guessit!
          <GoInfo className="ml-2 w-4 mb-4" onClick={handleInfoClick} />
        </h1>
        <div className="space-y-4">
          <button
            className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleCreateRoomClick}
          >
            Create Room
          </button>
          <br />
          <button
            className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleJoinRoomClick}
          >
            Join Room
          </button>
        </div>
      </div>
      {showPopup && <Popup roomID={roomId || ""} onClose={handleCloseClick} />}
      {showRulesPopup && <RulesPopup onClose={handleRulesCloseClick} />}
    </div>
  );
};

const RulesPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-md text-center relative text-white">
        <AiOutlineClose
          className="absolute top-2 right-2 cursor-pointer text-white"
          onClick={onClose}
        />
        <h2 className="text-2xl font-bold mb-4">Game Rules</h2>
        <p className="mb-4">Here are the rules for the game...</p>
      </div>
    </div>
  );
};

export default LandingPage;
