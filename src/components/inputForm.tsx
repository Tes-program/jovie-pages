/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { supabase } from "../config/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const InputForm: React.FC = () => {
  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);

  const handleFrontFileClick = () => {
    frontFileInputRef.current.click();
  };

  const handleBackFileClick = () => {
    backFileInputRef.current.click();
  };


  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    ssn: "",
    gender: "",
    dob: "",
    front_id: File,
    back_id: File,
  });
  

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fileType: string) => {
    setFormData({ ...formData, [fileType]: e.target.files[0] });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true); 

    try {

    // Generate unique file names
    const frontFileName = `${uuidv4()}_${formData.front_id.name}`;
    const backFileName = `${uuidv4()}_${formData.back_id.name}`;

    // Upload front file to Supabase Storage
    const frontFileUpload = await supabase.storage
      .from("jovie")
      .upload(`front/${frontFileName}`, formData.front_id[0], {
        cacheControl: "3600",
        upsert: false,
      });

    console.log("frontFileUpload", frontFileUpload);

    // Upload back file to Supabase Storage
    const backFileUpload = await supabase.storage
      .from("jovie")
      .upload(`back/${backFileName}`, formData.back_id[0], {
        cacheControl: "3600",
        upsert: false,
      });

    // Get the public URLs for the uploaded files
    const frontFileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${frontFileUpload.data?.path}`;
    const backFileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${backFileUpload.data?.path}`;

    console.log("frontFileUrl", frontFileUrl);
    console.log("backFileUrl", backFileUrl);
    const { error } = await supabase.from("user_information").insert([
      {
        ...formData,
        front_id: frontFileUrl,
        back_id: backFileUrl,
      },
    ]);

    if (error) {
      console.error("Error saving data:", error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log("Data saved successfully!");
      toast.success("Data saved successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/success")
    }
  } catch (error) {
    console.error("Error saving data:", error);
    toast.error("An error occurred while saving data.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } finally {
    setLoading(false); // Set loading state to false
  }
};

  return (
    <div className="sm:m-6 my-10 mx-4 flex justify-center">
      <div className="flex justify-center bg-white sm:p-10 p-6 overflow-hidden flex-col rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.2)] sm:w-[470px] w-fit">
        <form onSubmit={handleSubmit}>
        <div className="pb-6">
          <h1 className="text-[#2e3f51] font-semibold text-[26px] text-center">
            Application Form
          </h1>
        </div>
        <div className="flex justify-start pb-4">
          <p className="text-start text-sm">* Indicates a required field</p>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#2e3f51]">
              FirstName*
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="border-2 border-[#949494] sm:w-[185px] w-[135px] min-[425px]:w-[160px] p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
              placeholder="Enter your first name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#2e3f51]">
              LastName*
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="border-2 border-[#949494] sm:w-[185px] w-[135px] min-[425px]:w-[160px] p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="py-5">
          <label className="text-sm font-semibold text-[#2e3f51]">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-[#949494] w-full p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
            placeholder="Enter your personal email address"
          />
        </div>
        <div className="">
          <label className="text-sm font-semibold text-[#2e3f51]">Phone*</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="border-2 border-[#949494] w-full p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
            placeholder="(000) 000-0000"
          />
        </div>
        <div className="py-5">
          <label className="text-sm font-semibold text-[#2e3f51]">
            Social Security Number*
          </label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleChange}
            id=""
            className="border-2 border-[#949494] w-full p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
            placeholder=""
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-[#2e3f51]">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            id="gender_field"
            className="border-2 border-[#949494] w-full p-3 rounded-md text-sm"
          >
            <option value="">Please Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="py-5">
          <label className="text-sm font-semibold text-[#2e3f51]">
            Date of birth*
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            id=""
            className="border-2 border-[#949494] w-full p-3 rounded-md focus-visible:border-blue-600 focus-visible:border-3 focus-visible:outline-double"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-700 text-xs font-semibold mb-2">
              Driver's License/State ID FRONT
              <span className="text-xs text-amber-800 inline-flex items-center pr-5">
                make sure it is clear
              </span>
            </label>
            <div
              className="border-2 border-gray-600 border-dashed rounded-md p-2"
              onClick={handleFrontFileClick}
            >
              <div className="flex flex-col items-center space-y-1">
                <img
                  src="https://jovie-job.pages.dev/preform/assets/icons/login/upload.png"
                  width="40px"
                />
                <h4 className="text-[#2e3f51] font-semibold">Browse Files</h4>
                <span className="text-gray-500 text-sm font-semibold">
                  Choose a file
                </span>
              </div>
            </div>
            <input
              type="file"
              ref={frontFileInputRef}
              name="front_id"
              id="front_id"
              onChange={(e) => handleFileChange(e, "front_id")}
              hidden
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2">
              Driver's License/State ID BACK
              <span className="text-xs text-amber-800 inline-flex items-center pr-5">
                make sure it is clear
              </span>{" "}
            </label>
            <div
              className="border-2 border-gray-600 border-dashed rounded-md p-4"
              onClick={handleBackFileClick}
            >
              <div className="flex flex-col items-center space-y-1">
                <img
                  src="https://jovie-job.pages.dev/preform/assets/icons/login/upload.png"
                  width="40px"
                />
                <h4 className="text-[#2e3f51] font-semibold">Browse Files</h4>
                <span className="text-gray-500 text-sm font-semibold">
                  Choose a file
                </span>
                <input type="file" name="" id="" hidden />
              </div>
            </div>
            <input
              type="file"
              ref={backFileInputRef}
              name="back_id"
              id="back_id"
              onChange={(e) => handleFileChange(e, "back_id")}
              hidden
            />
          </div>
        </div>
        <div className="py-8">
          <div className="flex items-center">
            <input type="checkbox" name="" id="" className="p-4" />
            <label className="text-[#2e3f51] text-sm ml-2">
              I accept jovie's{" "}
              <a href="" className="underline text-blue-600">
              Terms of Service
                </a> and {" "}
                <a href="" className="underline text-blue-600">
                 Privacy Policy 
                 </a>*
            </label>
          </div>
        </div>
        <div className="flex justify-center py-6">
          <button className="bg-blue-600 font-semibold text-white p-3 rounded-md w-full"
          type="submit" disabled={loading}
          >
            {loading ? (
      <span className="flex items-center justify-center">
        {/* <svg
          className="animate-spin h-5 w-5 mr-3"
          viewBox="0 0 24 24"
        >
        </svg> */}
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" className="animate-spin h-10"
  viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
      <animateTransform 
         attributeName="transform" 
         attributeType="XML" 
         type="rotate"
         dur="1s" 
         from="0 50 50"
         to="360 50 50" 
         repeatCount="indefinite" />
  </path>
</svg>
      </span>
    ) : (
      "APPLY NOW"
    )}
          </button>
        </div>
        </form>
        <ToastContainer/>
      </div>
    </div>
  );
};
