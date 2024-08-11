// src/components/Popup.jsx
import React from "react";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Success!</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
