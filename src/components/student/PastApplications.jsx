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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Past Applications</h1>

      {/* Scrollable container for the list of applications */}
      <div className="overflow-y-auto max-h-96">
        {" "}
        {/* max-h-96 sets a maximum height of 384px */}
        <ul className="space-y-4">
          {applications.map((application) => (
            <li
              key={application.$id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
              onClick={() => handleOpenModal(application)}
            >
              <h2 className="text-xl font-semibold">{application.fullName}</h2>
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
