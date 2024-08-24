import React from "react";
import { useState } from "react";
import service from "../../appwrite/config";
import conf from "../../conf/conf";
import { v4 } from "uuid";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";

const ApplicationForm = ({ setApplications }) => {
  const [activePage, setActivePage] = useState("newApplication");
  const [isSubmitting, setIsSubmitting] = useState(false); //added while testing

  // const handleAdd = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   const payload = {
  // fullName: formData.get("fullName"),
  // fathersName: formData.get("fathersName"),
  // mothersName: formData.get("mothersName"),
  // birthDate: formData.get("birthDate"),
  // gender: formData.get("gender"),
  // fathersOccupation: formData.get("fathersOccupation"),
  // fathersIncome: formData.get("fathersIncome"),
  // communicationAddress: formData.get("communicationAddress"),
  // twelfthMarks: formData.get("12thMarks"),
  // firstYearMarks: formData.get("firstYearMarks"),
  // secondYearMarks: formData.get("secondYearMarks"),
  // thirdYearMarks: formData.get("thirdYearMarks"),
  // lastYearMarks: formData.get("lastYearMarks"),
  // collegeName: formData.get("collegeName"),
  // feesReceipt: formData.get("feesReceipt"),
  // beneficiaryDetails: formData.get("beneficiaryDetails"),
  // aadharCard: formData.get("aadharCard"),
  // rationCard: formData.get("rationCard"),
  // marksheets: formData.get("marksheets"),
  // incomeCertificate: formData.get("incomeCertificate"),
  // familyPhoto: formData.get("familyPhoto"),
  //   };

  //   try {
  //     const response = await service.db.studentApplications.create(payload);
  //     setApplications((prevState) => [response, ...prevState]);

  //     e.target.reset();
  //   } catch (error) {
  //     console.error(error);
  //   }

  // gemini code start here.

  const [formData, setFormData] = useState({
    fullName: "",
    email_ID: "", //added on demand
    mobile_no: "", //added on demand
    fathersName: "",
    mothersName: "",
    birthDate: "",
    gender: "",
    fathersOccupation: "",
    fathersIncome: "",
    communicationAddress: "",
    tenthMarks: "", //added on demand
    twelfthMarks: "",
    firstYearMarks: "",
    secondYearMarks: "",
    thirdYearMarks: "",
    lastYearMarks: "",
    entrance_exam: "", //added on demand
    Entrance_exam_rank_or_marks: "", //added on demand
    collegeName: "",
    feesReceipt: null,
    beneficiaryDetails: "",
    Other_Scholarships: "", //added on demand
    aadharCard: null,
    rationCard: null,
    marksheets: null,
    incomeCertificate: null,
    familyPhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit clicked");

    // Disable the submit button
    setIsSubmitting(true); //added while testing

    setIsLoading(true);
    setError(null);

    try {
      const {
        aadharCard,
        rationCard,
        feesReceipt,
        marksheets,
        incomeCertificate,
        familyPhoto,
        ...data
      } = formData;

      console.log(data); // data without files
      console.log(formData); // dadta with files

      const response = await service.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionIdStudentApplications,
        ID.unique(),
        // import.meta.env.VITE_APPWRITE_COLLECTION_STUDENTAPPLICATIONS_ID ||
        //   "6687e6c40011b514f380",
        data
      );

      const fileUploads = async () => {
        // Function scope starts here
        const promises = [];
        const fileUrls = {}; // To store the file URLs

        console.table([
          aadharCard,
          rationCard,
          feesReceipt,
          familyPhoto,
          feesReceipt,
          marksheets,
        ]); //checking is files are stored in respective variables

        console.log(formData.marksheets instanceof File); // should log true
        console.log(formData.marksheets); // should log the File object

        if (aadharCard) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                aadharCard
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls[aadharCard] = fileUrl; //changed fieldName to aadharCard
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { aadharCard: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        if (rationCard) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                rationCard
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                let fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls["rationCard"] = fileUrl; //changed fieldName to rationCard
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { rationCard: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        if (feesReceipt) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                feesReceipt
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls[feesReceipt] = fileUrl; //changed fieldName to feesReceipt
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { feesReceipt: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        if (marksheets) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                marksheets
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls["marksheets"] = fileUrl; //changed fieldName to marksheets
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { marksheets: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        if (incomeCertificate) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                incomeCertificate
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls["incomeCertificate"] = fileUrl; //changed fieldName to incomeCertificate
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { incomeCertificate: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        if (familyPhoto) {
          promises.push(
            service.bucket
              .createFile(
                conf.appwriteBucketId || "667ad1fa002e2a54fe23",
                ID.unique(),
                familyPhoto
              )
              .then((fileResponse) => {
                const fileId = fileResponse.$id;
                const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`; // Construct the file URL

                // Store the file URL in the fileUrls object
                fileUrls["familyPhoto"] = fileUrl; //changed fieldName to familyPhoto
                console.log("file url stored in array"); //databases() "()"  removed
                service.databases
                  .updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionIdStudentApplications ||
                      "6687e6c40011b514f380",
                    response.$id,
                    { familyPhoto: fileUrl }
                  ) //added one more .then() handler

                  .then((updateResponse) => {
                    console.log(
                      "Document updated with file URL:",
                      updateResponse
                    );
                    console.table([fileId, fileUrl]);
                  })
                  .catch((error) => {
                    console.error(
                      "Error during file upload or document update:",
                      error
                    );
                  });
              })
          );
        }

        // below 5 upload document code is to be commented out soon
        // if (rationCard) {
        //   promises.push(
        //     service.bucket
        //       .createFile(
        //         conf.appwriteBucketId || "667ad1fa002e2a54fe23",
        //         // rationCard.name,
        //         ID.unique(),
        //         rationCard
        //       )
        //       .then((fileResponse) =>
        //         service
        //           .databases()
        //           .updateDocument(
        //             conf.appwriteCollectionIdStudentApplications ||
        //               "6687e6c40011b514f380",
        //             response.id,
        //             { rationCardId: fileResponse.id }
        //           )
        //       )
        //   );
        // }
        // if (feesReceipt) {
        //   promises.push(
        //     service.bucket
        //       .createFile(
        //         conf.appwriteBucketId || "667ad1fa002e2a54fe23",
        //         // feesReceipt.name,
        //         ID.unique(),
        //         feesReceipt
        //       )
        //       .then((fileResponse) =>
        //         service.databases().updateDocument(
        //           conf.appwriteCollectionIdStudentApplications ||
        //             "6687e6c40011b514f380",
        //           response.id, //checking
        //           { feesReceiptId: fileResponse.id }
        //         )
        //       )
        //   );
        // }
        // if (marksheets) {
        //   promises.push(
        //     service.bucket
        //       .createFile(
        //         conf.appwriteBucketId || "667ad1fa002e2a54fe23",
        //         // marksheets.name,
        //         ID.unique(),
        //         marksheets
        //       )
        //       .then((fileResponse) =>
        //         service
        //           .databases()
        //           .updateDocument(
        //             conf.appwriteCollectionIdStudentApplications ||
        //               "6687e6c40011b514f380",
        //             response.id,
        //             { marksheetsId: fileResponse.id }
        //           )
        //       )
        //   );
        // }
        // if (incomeCertificate) {
        //   promises.push(
        //     service.bucket
        //       .createFile(
        //         conf.appwriteBucketId || "667ad1fa002e2a54fe23",
        //         // incomeCertificate.name,
        //         ID.unique(),
        //         incomeCertificate
        //       )
        //       .then((fileResponse) =>
        //         service
        //           .databases()
        //           .updateDocument(
        //             conf.appwriteCollectionIdStudentApplications ||
        //               "6687e6c40011b514f380",
        //             response.id,
        //             { incomeCertificateId: fileResponse.id }
        //           )
        //       )
        //   );
        // }
        // if (familyPhoto) {
        //   promises.push(
        //     service.bucket
        //       .createFile(
        //         conf.appwriteBucketId || "667ad1fa002e2a54fe23",
        //         // familyPhoto.name,
        //         ID.unique(),
        //         familyPhoto
        //       )
        //       .then((fileResponse) =>
        //         service
        //           .databases()
        //           .updateDocument(
        //             conf.appwriteCollectionIdStudentApplications ||
        //               "6687e6c40011b514f380",
        //             response.id,
        //             { familyPhotoId: fileResponse.id }
        //           )
        //       )
        //   );
        // }
        // ... add promises for other file uploads
        await Promise.allSettled(promises);
      }; // Function scope ends here

      await fileUploads();

      console.log("Document created successfully");
      setShowPopup(true); // Show the popup on successful submission

      // Re-enable the button after a successful upload
      setIsSubmitting(false); //added while testing
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
      // If there's an error, re-enable the button
      setIsSubmitting(false);
    } finally {
      setIsLoading(false); // Optional: Reset loading state even on error
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/"); // Redirect to the home screen
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("handleSubmit clicked");

  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const {
  //       aadharCard,
  //       rationCard,
  //       feesReceipt,
  //       marksheets,
  //       incomeCertificate,
  //       familyPhoto,
  //       ...data
  //     } = formData;

  //     console.log(formData);

  //     const response = await service.databases.createDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionIdStudentApplications,
  //       ID.unique(),
  //       data
  //     );

  //     const fileUploads = async () => {
  //       const promises = [];
  //       const fileUrls = {}; // To store the file URLs

  //       const uploadFile = async (file, fieldName) => {
  //         if (file) {
  //           const fileResponse = await service.bucket.createFile(
  //             conf.appwriteBucketId,
  //             ID.unique(),
  //             file
  //           );
  //           const fileId = fileResponse.$id;
  //           fileUrls[
  //             fieldName
  //           ] = `${conf.appwriteEndpoint}/v1/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
  //           console.log(`File URL for ${fieldName}: ${fileUrls[fieldName]}`);
  //           await service.databases.updateDocument(
  //             conf.appwriteCollectionIdStudentApplications,
  //             response.$id,
  //             { [`${fieldName}Id`]: fileId }
  //           );
  //         }
  //       };

  //       await uploadFile(aadharCard, "aadharCard");
  //       await uploadFile(rationCard, "rationCard");
  //       await uploadFile(feesReceipt, "feesReceipt");
  //       await uploadFile(marksheets, "marksheets");
  //       await uploadFile(incomeCertificate, "incomeCertificate");
  //       await uploadFile(familyPhoto, "familyPhoto");

  //       await Promise.all(promises);
  //     };

  //     await fileUploads();

  //     console.log("Document created successfully");
  //   } catch (error) {
  //     console.log(error);
  //     setError(error);
  //   } finally {
  //     setIsLoading(false); // Optional: Reset loading state even on error
  //   }
  // };

  return (
    <div className="flex max-w-full mx-auto bg-green-200 p-8 rounded-lg shadow-lg ">
      {/* aside */}
      <aside className=" hidden lg:block w-64 bg-white shadow-lg rounded-xl">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Options</h2>
          <ul>
            <li className="mb-2">
              <button
                onClick={() => setActivePage("newApplication")}
                className="w-full text-left p-2 hover:bg-gray-200 rounded-lg"
              >
                New Application
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActivePage("pastApplications")}
                className="w-full text-left p-2 hover:bg-gray-200 rounded-lg"
              >
                My Past Applications
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setActivePage("fundsReceived")}
                className="w-full text-left p-2 hover:bg-gray-200 rounded-lg"
              >
                Funds Received
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* main body of application form */}
      <main className="w-full">
        <h1 className="text-center text-2xl font-bold mb-6 break-words">
          New Application Form
        </h1>
        <form
          id="applicationForm"
          className="space-y-6 w-full mx-auto px-10"
          onSubmit={handleSubmit}
        >
          {/* Personal Information */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">Personal Information</legend>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="fullName" className="block font-semibold mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* added on demand */}
              <div className="form-group">
                <label htmlFor="email_ID" className="block font-semibold mb-1">
                  Your Email ID:
                </label>
                <input
                  type="text"
                  id="email_ID"
                  name="email_ID"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* added on demand */}
              <div className="form-group">
                <label htmlFor="mobile_no" className="block font-semibold mb-1">
                  Contact number (should be currently active) :
                </label>
                <input
                  type="text"
                  id="mobile_no"
                  name="mobile_no"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="fathersName"
                  className="block font-semibold mb-1"
                >
                  Father’s Name:
                </label>
                <input
                  type="text"
                  id="fathersName"
                  name="fathersName"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="mothersName"
                  className="block font-semibold mb-1"
                >
                  Mother’s Name:
                </label>
                <input
                  type="text"
                  id="mothersName"
                  name="mothersName"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="block font-semibold mb-1">
                  Birth Date:
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="block font-semibold mb-1">
                  Gender:
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="fathersOccupation"
                  className="block font-semibold mb-1"
                >
                  Father’s Occupation:
                </label>
                <input
                  type="text"
                  id="fathersOccupation"
                  name="fathersOccupation"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="fathersIncome"
                  className="block font-semibold mb-1"
                >
                  Total family Income:
                </label>
                <input
                  type="number"
                  id="fathersIncome"
                  name="fathersIncome"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="communicationAddress"
                  className="block font-semibold mb-1"
                >
                  Communication Address:
                </label>
                <textarea
                  id="communicationAddress"
                  name="communicationAddress"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </fieldset>

          {/* Education Details */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">Education Details</legend>
            <div className="space-y-4">
              {/* 10th marks added on demand */}
              <div className="form-group">
                <label htmlFor="10thMarks" className="block font-semibold mb-1">
                  10th: Total Marks (In ...% - only Integer value) "Enter 0 if
                  not available"
                </label>
                <input
                  type="text"
                  id="tenthMarks"
                  name="tenthMarks"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="12thMarks" className="block font-semibold mb-1">
                  12th: Total Marks (In ...% - only Integer value) "Enter 0 if
                  not available"
                </label>
                <input
                  type="text"
                  id="twelfthMarks"
                  name="twelfthMarks"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="firstYearMarks"
                  className="block font-semibold mb-1"
                >
                  1st Year: Total Marks (In ...% / GCPA - only Integer value)
                  "Enter 0 if not available"
                </label>
                <input
                  type="text"
                  id="firstYearMarks"
                  name="firstYearMarks"
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="secondYearMarks"
                  className="block font-semibold mb-1"
                >
                  2nd Year: Total Marks (In ...% / CGPA - only Integer value)
                  "Enter 0 if not available"
                </label>
                <input
                  type="text"
                  id="secondYearMarks"
                  name="secondYearMarks"
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="thirdYearMarks"
                  className="block font-semibold mb-1"
                >
                  3rd Year: Total Marks (In ...% / CGPA - only Integer value)
                  "Enter 0 if not available"
                </label>
                <input
                  type="text"
                  id="thirdYearMarks"
                  name="thirdYearMarks"
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lastYearMarks"
                  className="block font-semibold mb-1"
                >
                  Final Year: Total Marks (In ...% / CGPA - only numerical
                  value) "Enter 0 if not available"
                </label>
                <input
                  type="text"
                  id="lastYearMarks"
                  name="lastYearMarks"
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                />
              </div>

              {/* entrance exam name added on demand */}
              <div className="form-group">
                <label
                  htmlFor="entrance_exam"
                  className="block font-semibold mb-1"
                >
                  Name of Entrance Exam you given: (along with the Date of
                  appearing for Exam - DD/MM/YYYY ) eg. MHT-CET - 06/08/2024
                </label>
                <input
                  type="text"
                  id="entrance_exam"
                  name="entrance_exam"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* added on demand */}
              <div className="form-group">
                <label
                  htmlFor="Entrance_exam_rank_or_marks"
                  className="block font-semibold mb-1"
                >
                  Your rank / %le / marks in your Entrance Exam:
                </label>
                <input
                  type="text"
                  id="Entrance_exam_rank_or_marks"
                  name="Entrance_exam_rank_or_marks"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="collegeName"
                  className="block font-semibold mb-1"
                >
                  Your alloted College Name:
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Past Beneficiary Details */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">
              Have you got benifit from MAVS before ?
            </legend>
            <div className="form-group">
              <label
                htmlFor="beneficiaryDetails"
                className="block font-semibold mb-1"
              >
                Enter details if you have. (Enter "None" if not available)
              </label>
              <textarea
                id="beneficiaryDetails"
                name="beneficiaryDetails"
                className="w-full p-2 border rounded-md"
                required
                onChange={handleChange}
              ></textarea>
            </div>

            {/* added on demand */}
            <div className="form-group">
              <label
                htmlFor="Other_Scholarships"
                className="block font-semibold mb-1"
              >
                Have you got any other scholarship ? (mention if any otherwise
                write "None")
              </label>
              <textarea
                id="Other_Scholarships"
                name="Other_Scholarships"
                className="w-full p-2 border rounded-md"
                required
                onChange={handleChange}
              ></textarea>
            </div>
          </fieldset>

          {/* Documents */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">
              Documents (Size &lt; 200kb )
            </legend>
            <div className="space-y-4">
              <div className="form-group">
                <label
                  htmlFor="aadharCard"
                  className="block font-semibold mb-1"
                >
                  Aadhar Card:
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="aadharCard"
                  name="aadharCard"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="rationCard"
                  className="block font-semibold mb-1"
                >
                  Ration Card:
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="rationCard"
                  name="rationCard"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="marksheets"
                  className="block font-semibold mb-1"
                >
                  Marksheets: make a single .pdf of 10th, 12th and other
                  Entrance Exam marklists, CGPA(if available)
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="marksheets"
                  name="marksheets"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="incomeCertificate"
                  className="block font-semibold mb-1"
                >
                  Income Certificate:
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="incomeCertificate"
                  name="incomeCertificate"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="familyPhoto"
                  className="block font-semibold mb-1"
                >
                  Family Photo:
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="familyPhoto"
                  name="familyPhoto"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="feesReceipt"
                  className="block font-semibold mb-1"
                >
                  Attach College Fees Receipt:
                </label>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  id="feesReceipt"
                  name="feesReceipt"
                  className="w-full p-2 border rounded-md"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting} //added while testing
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {isSubmitting ? "Submitting...." : "Submit"}
          </button>
        </form>

        {/* added later on demand */}
        {isSubmitting ? (
          <div className="text-red-500 text-lg">
            Do not refresh or exit the window/tab untill "Success" popup comes.
            Otherwise form will not be submitted
          </div>
        ) : (
          ""
        )}
        {showPopup && (
          <Popup
            message="Application submitted successfully!"
            onClose={handlePopupClose}
          />
        )}
      </main>
    </div>
  );
};

export default ApplicationForm;
