import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import conf from "../../conf/conf";

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

  return (
    <div className="container mx-auto mt-12 px-4 relative">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Past Applications
      </h1>

      {/* Total applications count */}
      <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-md">
        Total Applications: {applications.length}
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
