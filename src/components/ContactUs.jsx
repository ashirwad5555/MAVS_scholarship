import React from "react";

function ContactUs() {
  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 py-16">
      <div className="container mx-auto px-6">
        <div className="mt-12 text-center bg-green-300 rounded-2xl py-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Get in Touch with MAVS{" "}
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            You can reach us via email.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <p className="text-lg text-blue-600 mt-2">
                <a href="mailto:mavs.vidya.adhar@gmail.com">
                  mavs.vidya.adhar@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center bg-green-200 rounded-2xl py-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Developer's Contact
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">
                Email me:
              </h3>
              <p className="text-lg text-blue-600 mt-2">
                <a href="mailto:ashirwadkatkamwar@gmail.com">
                  ashirwadkatkamwar@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">
                {" "}
                LinkedIn:{" "}
              </h3>
              <p className="text-lg text-blue-600 mt-2">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/ashirwad-katkamwar-672495203/"
                >
                  Ashirwad Rajeshwar Katkamwar.{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
