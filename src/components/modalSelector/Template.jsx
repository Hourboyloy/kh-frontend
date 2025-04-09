"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

function Template({
  toggle,
  value,
  setValue,
  handleToggle,
  array,
  path,
  title,
  name,
  setErrors,
  errorsName,
  errors,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleToggle(); // Close the modal
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [toggle, handleToggle]);

  return (
    <div className=" font-sans">
      <div
        className={`h-screen fixed inset-0 z-20 bg-[#2d2727] bg-opacity-60 transition-opacity duration-200 ${
          toggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 md:inset-0 w-full border-t rounded-t-xl md:rounded-none lg:border h-[509.8px] md:h-screen flex md:justify-center md:items-center z-20 transition-all ease-in-out duration-300 ${
          toggle
            ? "opacity-100 bottom-0 md:translate-y-0"
            : "opacity-0 bottom-10 md:bottom-0 md:-translate-y-10 pointer-events-none"
        }`}
      >
        <div
          ref={modalRef} // Attach the ref to the modal container
          className="w-full md:w-[500px] border-t md:border bg-white rounded-t-xl md:rounded-md overflow-hidden shadow-lg"
        >
          {/* Header */}
          <div className="h-[42.8px] flex items-center justify-between bg-[#f1f1f1] px-4 border-b border-gray-300">
            <IoMdClose
              onClick={handleToggle}
              className="text-lg cursor-pointer"
            />
            <h2 className="text-sm text-gray-800 capitalize">{title}</h2>
            <button
              onClick={() => {
                setValue((prev) => ({ ...prev, [name]: "" }));

                handleToggle();
              }}
              className="text-sm text-blue-400 select-none"
            >
              Close
            </button>
          </div>

          {/* Content */}
          <div className="w-full md:h-[458.83px] h-[467px] overflow-y-scroll">
            <ul className="pb-4 font-sans">
              {array?.length > 0 &&
                array.map((item, i) => (
                  <li
                    key={item + i}
                    onClick={() => {
                      setValue((prev) => ({ ...prev, [name]: item.name }));
                      if (errorsName && errors[errorsName]) {
                        setErrors((prev) => ({ ...prev, [errorsName]: false }));
                      }
                      handleToggle();
                    }}
                  >
                    <section className="py-1.5 hover:bg-gray-50 px-3 flex items-center justify-between border-b">
                      <div className="flex items-center space-x-3">
                        <div className="w-[45px] h-[45px]">
                          <Image
                            className="w-full h-full object-cover object-center"
                            src={require(`@/assets/${path}/${item.url}`)}
                            width={500}
                            height={500}
                            alt="Icon"
                          />
                        </div>
                        <p>{item.name}</p>
                      </div>
                      <div
                        className={`text-[#028dcf] ${
                          value == item.name ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <IoCheckmarkCircleSharp size={20} />
                      </div>
                    </section>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Template;
