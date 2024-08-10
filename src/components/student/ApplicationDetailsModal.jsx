import React from "react";

function ApplicationDetailsModal({ onClose, application }) {
  if (!application) {
    return null;
  }

  // Define the fields to display
  const fieldsToDisplay = [
    "fullName",
    "fathersName",
    "mothersName",
    "birthDate",
    "gender",
    "fathersOccupation",
    "fathersIncome",
    "communicationAddress",
    "twelfthMarks",
    "firstYearMarks",
    "secondYearMarks",
    "thirdYearMarks",
    "lastYearMarks",
    "collegeName",
    "feesReceipt",
    "beneficiaryDetails",
    "aadharCard",
    "rationCard",
    "marksheets",
    "incomeCertificate",
    "familyPhoto",
  ];

  // Fields that contain URLs for viewing files
  const fieldsWithViewButton = [
    "aadharCard",
    "rationCard",
    "marksheets",
    "incomeCertificate",
    "familyPhoto",
    "feesReceipt",
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-lg shadow-md relative"
        style={{
          width: "85%", // Custom width
          maxWidth: "800px", // Max width
          height: "90%", // Increased custom height
          maxHeight: "95%", // Increased max height
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
        <div className="overflow-y-auto max-h-full">
          {fieldsToDisplay.map((field) => (
            <div key={field} className="mb-2 flex justify-between items-center">
              <div className="flex-1 text-left">
                <p className="text-gray-700 font-medium">
                  <strong className="text-xl">{field}:</strong>
                  {fieldsWithViewButton.includes(field) ? null : (
                    <span> {application[field]}</span>
                  )}
                </p>
              </div>
              {fieldsWithViewButton.includes(field) && (
                <div className="ml-4">
                  <a
                    href={application[field]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ApplicationDetailsModal;
