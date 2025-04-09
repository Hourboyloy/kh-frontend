"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

function ActionUser({
  toggleAction,
  handleClick,
  user,
  handleChange,
  setUpdates,
  handleEditSave,
  handleDelete,
}) {
  const closeRef = useRef(null);
  const [field, setField] = useState("Phone Number");
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (closeRef.current && !closeRef.current.contains(e.target)) {
        handleClick();
      }
    };

    if (toggleAction) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [toggleAction, handleClick]);

  const handleSwitch = (val) => {
    setField(val);
    setUpdates({});
  };
  return (
    <div
      className={`h-screen z-40 font-sans fixed transition-all duration-300 bg-black bg-opacity-50 inset-0 flex items-center justify-center ${
        toggleAction ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={closeRef}
        className="w-[550px] h-[320px] border bg-white rounded-md relative overflow-auto mx-4 md:mx-0"
      >
        <button
          onClick={handleClick}
          className="p-0.5 rounded absolute top-2 right-2 text-xl bg-red-800 text-white"
        >
          <IoMdClose />
        </button>

        <div className="flex w-full h-full">
          <section className="w-[200px] border-r h-full shadow px-3 py-5 flex flex-col">
            <h1 className="text-gray-800 font-semibold pb-2">User fields</h1>
            <hr />
            <ul className="space-y-1 pt-4 text-gray-800 select-none mb-auto cursor-pointer">
              <li
                onClick={() => handleSwitch("Phone Number")}
                className="py-0.5 hover:bg-gray-200 transition-all duration-200 px-1.5"
              >
                Phone Number
              </li>
              <li
                onClick={() => handleSwitch("Password")}
                className="py-0.5 hover:bg-gray-200 transition-all duration-200 px-1.5"
              >
                Password
              </li>
              <li
                onClick={() => handleSwitch("Verified")}
                className="py-0.5 hover:bg-gray-200 transition-all duration-200 px-1.5"
              >
                Verified
              </li>
              <li
                onClick={() => handleSwitch("Premium")}
                className="py-0.5 hover:bg-gray-200 transition-all duration-200 px-1.5"
              >
                Premium
              </li>
            </ul>

            <div className="flex flex-col gap-1 border-t pt-2 select-none mt-auto">
              <h3 className="text-sm font-semibold text-gray-800">
                Delete user account
              </h3>
              <button
                onClick={handleDelete}
                className=" focus:outline-none hover:translate-y-1 transition-all w-[120px] text-center py-1 bg-red-600 rounded-md font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </section>

          <section className="w-[350px] bg-gray-100 h-full px-3 py-5 flex flex-col">
            <div className="text-gray-800 font-semibold text-lg">{field}</div>
            <div className="mb-auto mt-2.5 pr-5">
              {field === "Phone Number" && (
                <input
                  placeholder="Enter new phone number"
                  type="text"
                  value={user?.phoneNum || ""}
                  name="phoneNum"
                  onChange={handleChange}
                  className="w-full focus:outline-none border py-1 px-2 text-gray-800 placeholder:text-gray-500"
                />
              )}

              {field === "Password" && (
                <input
                  placeholder="Enter new password"
                  type="text"
                  name="password"
                  onChange={handleChange}
                  className="w-full focus:outline-none border py-1 px-2 text-gray-800 placeholder:text-gray-500"
                />
              )}

              {field === "Verified" && (
                <div className="flex items-center space-x-3 text-lg">
                  <div className=" space-x-1 flex items-center">
                    <label htmlFor="no">No</label>
                    <input
                      id="no"
                      value={"false"}
                      type="radio"
                      name="isVerify"
                      onChange={handleChange}
                      checked={user?.isVerify == false}
                    />
                  </div>
                  <div className="space-x-1 flex items-center">
                    <label htmlFor="yes">Yes</label>
                    <input
                      id="yes"
                      value={"true"}
                      type="radio"
                      name="isVerify"
                      onChange={handleChange}
                      checked={user?.isVerify == true}
                    />
                  </div>
                </div>
              )}

              {field === "Premium" && (
                <div className="flex items-center space-x-3 text-lg">
                  <div className=" space-x-1 flex items-center">
                    <label htmlFor="nop">No</label>
                    <input
                      id="nop"
                      value={"false"}
                      type="radio"
                      name="isPremium"
                      onChange={handleChange}
                      checked={user?.isPremium == false}
                    />
                  </div>
                  <div className="space-x-1 flex items-center">
                    <label htmlFor="yesp">Yes</label>
                    <input
                      id="yesp"
                      value={"true"}
                      type="radio"
                      name="isPremium"
                      onChange={handleChange}
                      checked={user?.isPremium == true}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-end border-t pt-2 select-none">
              <button
                onClick={handleEditSave}
                className="relative hover:translate-y-1 transition-all focus:outline-none w-[120px] text-center py-1 bg-green-600 rounded-md font-semibold text-white"
              >
                Save Edit
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
  F;
}

export default ActionUser;
