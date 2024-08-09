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
      <div className="bg-white p-6 rounded-lg shadow-md relative max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
        <div className="overflow-y-auto max-h-96">
          {fieldsToDisplay.map((field) => (
            <div key={field} className="mb-2 flex justify-between items-center">
              <p>
                <strong>{field}:</strong>
                {fieldsWithViewButton.includes(field) ? (
                  // Display only the "View" button
                  <a
                    href={application[field]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    View
                  </a>
                ) : (
                  // Display the content for other fields
                  <span> {application[field]}</span>
                )}
              </p>
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
