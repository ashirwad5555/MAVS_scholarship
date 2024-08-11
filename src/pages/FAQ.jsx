import React from "react";
import { useState } from "react";

const faqsStudents = [
  {
    question: "How to apply for financial assistance?",
    answer:
      "Once a year, during the academic admission period, we invite applications. Students can apply typically in July or August by visiting our website and filling up the form.",
  },
  {
    question: "What is the process of selection?",
    answer:
      "We will review all the applications received, shortlist candidates for an interview, and then decide the final selection.",
  },
  {
    question: "What is the criteria for selection?",
    answer:
      "Overall academic excellence, securing admission in top-rated colleges, and financial challenges to pay the fees.",
  },
  {
    question: "Do students need to return the financial assistance?",
    answer:
      "Yes, students have to return the assistance within two years after completing the course.",
  },
  {
    question:
      "I got financial assistance in my first year of Graduation, will I get it again for remaining years?",
    answer:
      "Yes, you are eligible to apply. You need to apply every year, and it will be reviewed again.",
  },
];

const faqsDonors = [
  {
    question: "How can I contribute to the program?",
    answer:
      "You can join the WhatsApp group and start donating online OR click on the donate link on the website.",
  },
  {
    question: "What is the mode of donation?",
    answer: "It is strictly online; cash is not accepted.",
  },
  {
    question: "Can I recommend a needy student?",
    answer:
      "Yes, your help is also required to spread awareness about the program and share the website link with students.",
  },
  {
    question: "How much can I contribute?",
    answer: "We request a minimum contribution of ₹2400 per year.",
  },
  {
    question: "What education courses do we support?",
    answer:
      "We support all professional and vocational courses like BE, Diploma, BCA, MCA, ME, MBBS, BDS, B-Arch. Preference is given to students pursuing courses from top-rated private and government colleges.",
  },
];

function FAQ() {
  const [showStudentsFAQs, setShowStudentsFAQs] = useState(false);
  const [showDonorsFAQs, setShowDonorsFAQs] = useState(false);

  return (
    <div className="max-w-5xl mx-auto my-12 p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Frequently Asked Questions
      </h2>

      {/* Students FAQs Section */}
      <div className="mb-12">
        <h3
          onClick={() => setShowStudentsFAQs(!showStudentsFAQs)}
          className="text-2xl font-semibold text-blue-700 mb-6 border-b-2 border-blue-200 pb-2 cursor-pointer flex justify-between items-center"
        >
          FAQs for Students
          <span
            className={`transition-transform duration-300 ${
              showStudentsFAQs ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </h3>
        {showStudentsFAQs && (
          <div className="space-y-6">
            {faqsStudents.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-blue-600">
                  {faq.question}
                </h4>
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Donors/Supporters FAQs Section */}
      <div>
        <h3
          onClick={() => setShowDonorsFAQs(!showDonorsFAQs)}
          className="text-2xl font-semibold text-green-700 mb-6 border-b-2 border-green-200 pb-2 cursor-pointer flex justify-between items-center"
        >
          FAQs for Donors/Supporters
          <span
            className={`transition-transform duration-300 ${
              showDonorsFAQs ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </h3>
        {showDonorsFAQs && (
          <div className="space-y-6">
            {faqsDonors.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-green-600">
                  {faq.question}
                </h4>
                <p className="text-gray-700 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
