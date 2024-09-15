import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageBox = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to home page

  // Show the message box when the component mounts
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 500); // Delay the appearance of the message for half a second
  }, []);

  // Function to handle closing the message box
  const handleClose = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showMessage ? "opacity-100 scale-100" : "opacity-0 scale-75"
      } transform transition-all duration-700 ease-out`}
    >
      <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 animate-sad relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-red-600 hover:text-red-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">😢 Oops!</h2>
          <p className="text-lg">
            Extremely sorry, Applications are closed now!!!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
