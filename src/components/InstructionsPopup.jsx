import React from "react";

const InstructionsPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg z-60">
        <h3 className="text-2xl font-bold mb-4">General Instructions</h3>
        <ul className="list-disc list-inside text-left mb-6">
          <li>
            Please read the application form carefully while filling your
            details.
          </li>
          <li>
            Please be ready with a sigle .pdf file containing 10th , 12th /
            diploma , Entrance Exams marklists.{" "}
          </li>
          <li>
            Please make sure that the size of all uploading files should be less
            than 256 kb.
          </li>
          <li>Please upload required documents in .pdf form only.</li>
          <li>
            Make sure that your details provided in your application form are
            true and authenticated.
          </li>
          <li>
            After submitting a form don't refresh or exit the tab/window untill
            "Success" popup comes.
          </li>
        </ul>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InstructionsPopup;
