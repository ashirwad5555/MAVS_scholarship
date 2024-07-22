import React from "react";

function FundsReceived() {
  const fundsData = [
    { year: "Year 1", amount: "-" },
    { year: "Year 2", amount: "-" },
    { year: "Year 3", amount: "-" },
    { year: "Year 4", amount: "-" },
  ];

  return (
    <div className="container mx-auto mt-8 p-6 bg-green-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Funds Received</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Year</th>
              <th className="py-3 px-6 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {fundsData.map((fund, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {fund.year}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {fund.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FundsReceived;
