import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import conf from "../../conf/conf";
import * as XLSX from "xlsx"; // added on demand Import XLSX library

const DB = service.databases;

function PastApplications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await DB.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionIdStudentApplications
    );

    // Sort applications by creation date in descending order
    const sortedApplications = response.documents.sort((a, b) => {
      return new Date(b.$createdAt) - new Date(a.$createdAt);
    });

    setApplications(sortedApplications);
  };

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // added on demand Function to generate and download the XLS file
  const downloadXLS = () => {
    // Define the fields to be included in the export
    const fieldsToExport = [
      "fullName",
      "email_ID",
      "mobile_no",
      "fathersName",
      "mothersName",
      "birthDate",
      "gender",
      "fathersOccupation",
      "fathersIncome",
      "communicationAddress",
      "tenthMarks",
      "twelfthMarks",
      "firstYearMarks",
      "secondYearMarks",
      "thirdYearMarks",
      "lastYearMarks",
      "entrance_exam",
      "Entrance_exam_rank_or_marks",
      "collegeName",
      "feesReceipt",
      "beneficiaryDetails",
      "Other_Scholarships",
      "aadharCard",
      "rationCard",
      "marksheets",
      "incomeCertificate",
      "familyPhoto",
    ];

    // Prepare data for export
    const exportData = applications.map((app) => {
      // Create a new object for each application with all fields
      const rowData = {};
      fieldsToExport.forEach((field) => {
        rowData[field] = app[field] || "N/A"; // Fill missing fields with "N/A"
      });

      // Add links for fields with URLs
      rowData.aadharCard = app.aadharCard
        ? `View Document (${app.aadharCard})`
        : "N/A";
      rowData.rationCard = app.rationCard
        ? `View Document (${app.rationCard})`
        : "N/A";
      rowData.marksheets = app.marksheets
        ? `View Document (${app.marksheets})`
        : "N/A";
      rowData.incomeCertificate = app.incomeCertificate
        ? `View Document (${app.incomeCertificate})`
        : "N/A";
      rowData.familyPhoto = app.familyPhoto
        ? `View Document (${app.familyPhoto})`
        : "N/A";
      rowData.feesReceipt = app.feesReceipt
        ? `View Document (${app.feesReceipt})`
        : "N/A";

      return rowData;
    });

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData, {
      header: fieldsToExport,
    });

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, "Past_Applications.xlsx");
  };

  return (
    <div className="container mx-auto mt-12 px-4 relative">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Past Applications
      </h1>

      {/* Total applications count */}
      <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md">
        Total Applications: {applications.length}
      </div>

      {/*added on demand Download XLS button */}
      <div className="absolute top-4 right-4 mt-12">
        <button
          onClick={downloadXLS}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
        >
          Download XLS
        </button>
      </div>

      {/* Scrollable container for the list of applications */}
      <div className="overflow-y-auto max-h-[500px] mt-10">
        <ul className="space-y-6">
          {applications.map((application) => (
            <li
              key={application.$id}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-lg border border-transparent hover:border-indigo-300 cursor-pointer transition-all duration-300"
              onClick={() => handleOpenModal(application)}
            >
              <h2 className="text-2xl font-semibold text-white">
                {application.fullName}
              </h2>
              <p className="mt-2 text-white text-sm">
                Submitted on{" "}
                {new Date(application.$createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <ApplicationDetailsModal
          onClose={handleCloseModal}
          application={selectedApplication}
        />
      )}
    </div>
  );
}

export default PastApplications;
