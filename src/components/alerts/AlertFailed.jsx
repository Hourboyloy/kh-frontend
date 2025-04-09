"use client";
import React, { useEffect } from "react";

function AlertFailed({ alert, text, close, alertFailedRef }) {
  useEffect(() => {
    if (alert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [alert]);
  return (
    <div
      className={`inset-0 bg-opacity-[0.69] h-screen fixed z-10 bg-[#0f0d0d] transition-all transform duration-300 ${
        alert ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={alertFailedRef}
        className="max-w-[820px] min-h-[101px] p-4 mx-auto bg-white flex flex-col translate-y-52 rounded-md shadow"
      >
        <p className="text-gray-900 mb-auto text-[17px]">{text}</p>
        <div className="flex items-center justify-end pr-5">
          <button onClick={close} className="text-blue-500 text-lg select-none focus:outline-none">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertFailed;
