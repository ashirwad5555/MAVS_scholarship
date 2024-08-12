import React from "react";
import img1 from "../assets/student1.jpg";
import img2 from "../assets/student2.jpg";
import img3 from "../assets/student3.jpg";

function Benificeries() {
  return (
    <div className="py-8">
      <h2 className="text-3xl  font-bold text-center mb-8 ">
        Past Beneficiaries
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-80">
          <img
            src={img1}
            alt="Student 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">ABC</h3>
            <p className="text-gray-700">
              "This scholarship has changed my life. Thank you for your
              support!"
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-80">
          <img
            src={img2}
            alt="Student 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">XYZ</h3>
            <p className="text-gray-700">
              "I couldn't have achieved my dreams without this program."
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-80">
          <img
            src={img3}
            alt="Student 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-2">PQR</h3>
            <p className="text-gray-700">
              "A big thank you to everyone involved in the scholarship program."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benificeries;
