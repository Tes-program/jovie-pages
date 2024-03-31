import React, { useState } from 'react';
import { supabase } from '../config/supabase';

const OTPInputPage : React.FC = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle OTP submission logic here
    // console.log('OTP submitted:', otp);


    try {

      const { error } = await supabase.from("otp").insert([{otp}]);

      if ( error )
      {
        throw error;
      }
      else
      {
        console.log("OTP Verified successfully");
      }

    } catch (error) {
      console.log("Error:", error);
    }
    // finally {
    //   setLoading(false);
    //   setIsButtonDisabled(false);
    // }

  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Enter OTP</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="otp" className="block mb-2 font-medium">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleChange}
              placeholder="Enter the OTP"
              className="w-full border border-gray-300 rounded-lg py-2 px-3"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPInputPage;