"use client";
import React, { useEffect, useState, useCallback } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { RiCloseFill } from "react-icons/ri";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function AlertSuccessWarning({ alert, icons, text, handleIsAlert }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      handleIsAlert();
    }, 300);
  }, [handleIsAlert,setIsVisible]);

  useEffect(() => {
    if (alert) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert, handleClose]);

  return (
    <div
      className={`w-[348.40px] py-[9.9px] bg-white mx-auto shadow-md border rounded-t mt-[16px] flex items-center px-2.5 transform transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div>
        {icons === "success" ? (
          <IoCheckmarkCircleSharp className="text-[#198754] text-[24px]" />
        ) : (
          <PiWarningCircleFill className="text-[#DC3545] text-[24px]" />
        )}
      </div>
      <p className="text-gray-600 font-bold text-[15px] pl-1.5 pr-2.5">
        {text}
      </p>
      <button
        onClick={handleClose}
        className={`w-[25.4px] h-[27.4px] flex items-center justify-center text-gray-600 select-none focus:outline-none ${
          icons === "success"
            ? "border-2 border-gray-600 bg-[#F0F0F0]"
            : "text-lg"
        }`}
      >
        <RiCloseFill />
      </button>
    </div>
  );
}

export default AlertSuccessWarning;
