import React from "react";
import { useState } from "react";
import service from "../../appwrite/config";

const ApplicationForm = ({ setApplications }) => {
  const [activePage, setActivePage] = useState("newApplication");

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      fullName: formData.get("fullName"),
      fathersName: formData.get("fathersName"),
      mothersName: formData.get("mothersName"),
      birthDate: formData.get("birthDate"),
      gender: formData.get("gender"),
      fathersOccupation: formData.get("fathersOccupation"),
      fathersIncome: formData.get("fathersIncome"),
      communicationAddress: formData.get("communicationAddress"),
      twelfthMarks: formData.get("12thMarks"),
      firstYearMarks: formData.get("firstYearMarks"),
      secondYearMarks: formData.get("secondYearMarks"),
      thirdYearMarks: formData.get("thirdYearMarks"),
      lastYearMarks: formData.get("lastYearMarks"),
      collegeName: formData.get("collegeName"),
      feesReceipt: formData.get("feesReceipt"),
      beneficiaryDetails: formData.get("beneficiaryDetails"),
      aadharCard: formData.get("aadharCard"),
      rationCard: formData.get("rationCard"),
      marksheets: formData.get("marksheets"),
      incomeCertificate: formData.get("incomeCertificate"),
      familyPhoto: formData.get("familyPhoto"),
    };

    try {
      const response = await service.db.studentApplications.create(payload);
      setApplications((prevState) => [response, ...prevState]);

      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex max-w-full mx-auto bg-green-200 p-8 rounded-lg shadow-lg ">
      {/* aside */}
      <aside className="w-64 bg-white shadow-lg rounded-xl">
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
        <h1 className="text-center text-2xl font-bold mb-6">
          New Application Form
        </h1>
        <form
          id="applicationForm"
          className="space-y-6 w-full mx-auto px-10"
          onSubmit={handleAdd}
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
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="fathersIncome"
                  className="block font-semibold mb-1"
                >
                  Father’s Annual Income:
                </label>
                <input
                  type="number"
                  id="fathersIncome"
                  name="fathersIncome"
                  className="w-full p-2 border rounded-md"
                  required
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
                ></textarea>
              </div>
            </div>
          </fieldset>

          {/* Education Details */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">Education Details</legend>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="12thMarks" className="block font-semibold mb-1">
                  12th: Total Marks (In percentage)
                </label>
                <input
                  type="number"
                  id="12thMarks"
                  name="12thMarks"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="firstYearMarks"
                  className="block font-semibold mb-1"
                >
                  First Year: Total Marks (In percentage)
                </label>
                <input
                  type="number"
                  id="firstYearMarks"
                  name="firstYearMarks"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="secondYearMarks"
                  className="block font-semibold mb-1"
                >
                  Second Year: Total Marks (In percentage)
                </label>
                <input
                  type="number"
                  id="secondYearMarks"
                  name="secondYearMarks"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="thirdYearMarks"
                  className="block font-semibold mb-1"
                >
                  Third Year: Total Marks (In percentage)
                </label>
                <input
                  type="number"
                  id="thirdYearMarks"
                  name="thirdYearMarks"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lastYearMarks"
                  className="block font-semibold mb-1"
                >
                  Last Year: Total Marks (In percentage)
                </label>
                <input
                  type="number"
                  id="lastYearMarks"
                  name="lastYearMarks"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="collegeName"
                  className="block font-semibold mb-1"
                >
                  College Name:
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Past Beneficiary Details */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">
              Past Beneficiary Details
            </legend>
            <div className="form-group">
              <label
                htmlFor="beneficiaryDetails"
                className="block font-semibold mb-1"
              >
                Year wise amount:
              </label>
              <textarea
                id="beneficiaryDetails"
                name="beneficiaryDetails"
                className="w-full p-2 border rounded-md"
                required
              ></textarea>
            </div>
          </fieldset>

          {/* Documents */}
          <fieldset className="p-4 border border-black rounded-md">
            <legend className="px-2 font-semibold">Documents</legend>
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
                  id="aadharCard"
                  name="aadharCard"
                  className="w-full p-2 border rounded-md"
                  required
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
                  id="rationCard"
                  name="rationCard"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="marksheets"
                  className="block font-semibold mb-1"
                >
                  Marksheets:
                </label>
                <input
                  type="file"
                  id="marksheets"
                  name="marksheets"
                  className="w-full p-2 border rounded-md"
                  required
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
                  id="incomeCertificate"
                  name="incomeCertificate"
                  className="w-full p-2 border rounded-md"
                  required
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
                  id="familyPhoto"
                  name="familyPhoto"
                  className="w-full p-2 border rounded-md"
                  required
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
                  id="feesReceipt"
                  name="feesReceipt"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default ApplicationForm;
