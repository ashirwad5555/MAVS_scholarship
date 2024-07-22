import React, { useState, useEffect } from "react";
import service from "../../appwrite/config";

const DB = service.db;

function PastApplications() {
  const [applications, setApplications] = useState([]);
  const [expandedApplicationId, setExpandedApplicationId] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // const response = await service.databases.listDocuments(
    //   import.meta.env.VITE_APPWRITE_DATABASE_ID,
    //   import.meta.env.VITE_APPWRITE_COLLECTION_STUDENTAPPLICATIONS_ID
    // );
    const response = await service.db.studentApplications.list();
    setApplications(response.documents);
  };

  const toggleExpand = (id) => {
    setExpandedApplicationId(expandedApplicationId === id ? null : id);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Past Applications</h1>
      <ul className="space-y-4">
        {applications.map((application) => (
          <li
            key={application.$id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 cursor-pointer"
            onClick={() => toggleExpand(application.$id)}
          >
            <h2 className="text-xl font-semibold">{application.fullName}</h2>
            {expandedApplicationId === application.$id && (
              <div className="mt-4">
                <p className="text-gray-700 mb-1">
                  <strong>Father's Occupation:</strong>{" "}
                  {application.FatherOccupation}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Date of Birth:</strong> {application.DOB}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Gender:</strong> {application.gender}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Income:</strong> {application.income}
                </p>
                {/* Add any other details you want to display here */}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PastApplications;
