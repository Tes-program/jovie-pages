import React from "react";

export const SuccessPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Success!</h1>
        <p className="text-gray-700">
          Your information has been successfully submitted.
        </p>
      </div>
    </div>
  );
};