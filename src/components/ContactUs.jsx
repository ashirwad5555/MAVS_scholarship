import React from "react";

function ContactUs() {
  return (
    <div className="bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 py-16">
      <div className="container mx-auto px-6">
        

        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-lg text-gray-600 mt-4">
            You can reach us via email or phone and WhatsApp
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">
                Email Us:
              </h3>
              <p className="text-lg text-blue-600 mt-2">
                <a href="mailto:mavs.vidya.adhar@gmail.com">
                  mavs.vidya.adhar@gmail.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Call Us:</h3>
              <p className="text-lg text-blue-600 mt-2">
                <a href="tel:+1234567890">+91 9850996369</a>
              </p>
            </div>
            <div>
              <a
                target="_blank"
                href="https://chat.whatsapp.com/GFGwN4HN6Bq7N6TTa53B0Q"
                className="text-xl font-bold text-green-500 bg-green-200 rounded-xl px-4 py-2"
              >
                Join our WhatsApp group
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
