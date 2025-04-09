"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDateRange, MdOutlineMoreHoriz } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import userIcon from "@/assets/user-icon.png";

function HeadProfileViewAccount({
  profile,
  account,
  formattedDate,
  handleOpenHomeProfile,
  handleOpenAbouutProfile,
  toggleBtn,
  locale,
  t,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  // Function បើក Modal
  const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={`scroll-smooth ${locale == "en" ? " font-sans" : ""}`}>
      {/* Modal Viewer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 h-screen transition-all lg:duration-500 duration-300 ease-in-out ${
          isOpen && selectedImage
            ? " opacity-100"
            : "opacity-0 pointer-events-none duration-1000"
        }`}
      >
        {isOpen && selectedImage && (
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        )}

        {/* <div className="h-full w-full flex justify-center items-center overflow-auto snap-center">
          {isOpen && selectedImage && (
            <Image
              ref={modalRef}
              src={selectedImage}
              alt="Zoomed Image"
              width={800}
              height={500}
              className="w-full h-auto lg:w-9/12 xl:w-10/12 2xl:w-[68%] lg:h-full object-cover transition-transform duration-300 ease-in-out"
            />
          )}
        </div> */}

        <div className="flex justify-center items-center h-[95vh] md:h-[90vh] lg:h-[95vh]">
          {isOpen && selectedImage && (
            <Image
              ref={modalRef}
              src={selectedImage}
              alt="Zoomed Image"
              width={800}
              height={500}
              className="h-[85vh] md:h-[90vh] lg:h-[95vh] w-auto object-contain"
              priority
            />
          )}
        </div>
      </div>

      {/* Profile Cover */}
      <div
        className={`relative w-full flex items-center justify-center overflow-hidden ${
          profile?.photoCover
            ? "h-[225px] md:h-[380px] lg:h-[430px] cursor-pointer"
            : "h-[150px] bg-[#028DCF]"
        }`}
        onClick={() => profile?.photoCover && openModal(profile?.photoCover)}
      >
        <div
          className="absolute bg-cover bg-center blur-[50px] inset-0 scale-y-110 scale-x-105 transition-all duration-300 ease-in-out"
          style={{ backgroundImage: `url(${profile?.photoCover})` }}
        ></div>
        {profile?.photoCover && (
          <Image
            className="relative h-full object-cover object-center lg:object-contain lg:object-center transition-opacity duration-300"
            width={800}
            height={500}
            src={profile?.photoCover}
            alt="Profile Cover"
          />
        )}
      </div>

      <section className="lg:h-[232px] h-[278px]">
        <div className="bg-white space-y-0.5 shadow">
          <div className="relative px-[17px]">
            <div
              className="w-[90px] h-[90px] cursor-pointer rounded-full overflow-hidden border-4 border-white shadow-sm bg-white absolute top-[-45px] left-[17px]"
              onClick={() =>
                openModal(
                  profile?.photoProfile ? profile?.photoProfile : userIcon
                )
              }
            >
              <Image
                className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out"
                src={profile?.photoProfile ? profile?.photoProfile : userIcon}
                width={1000}
                height={600}
                loading="lazy"
                alt="User Profile"
              />
            </div>

            <h1 className="capitalize font-semibold text-[20px] text-gray-900 pt-[50px]">
              {profile?.firstName} {profile?.lastName}
            </h1>
          </div>

          <div className="lg:flex lg:justify-between lg:items-end px-[17px] border-b border-gray-100 pb-[8px]">
            <div className="space-y-0.5 h-full">
              <h5 className="text-sm text-gray-500">
                {profile && "@" + profile?.username}
              </h5>
              <div className="text-[13px] text-gray-700 flex items-center space-x-[5px]">
                <p>0 {t("followers")}</p>
                <span className="text-lg translate-y-[3px]">•</span>
                <p>0 {t("following")}</p>
              </div>

              <div className="text-[13px] text-gray-700 flex items-center space-x-[5px]">
                <IoMdCheckmarkCircleOutline size={14} />
                {account?.isVerify ? (
                  <p>{t("verified")}</p>
                ) : (
                  <p className="text-gray-700">{t("notVerified")}</p>
                )}
              </div>

              <div className="text-[13px] text-gray-700 flex items-center space-x-[5px]">
                <MdOutlineDateRange size={14} />
                <p>
                  {t("joined")} {formattedDate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 lg:pt-0 pb-0.5 select-none">
              <button className="w-full lg:w-auto focus:outline-none outline-none flex items-center justify-center gap-1.5 bg-[#028DCF] text-white rounded-full px-3.5 h-[37px] font-normal">
                <IoMdShareAlt size={20} />
                <span>{t("share")}</span>
              </button>
              <button className="w-[44px] lg:w-[37px] h-[37px] focus:outline-none outline-none flex items-center justify-center border border-[#028DCF] rounded-full">
                <MdOutlineMoreHoriz size={22} className="text-[#028DCF]" />
              </button>
            </div>
          </div>

          <div className="flex items-center font-semibold select-none h-[44.10px]">
            <button
              onClick={handleOpenHomeProfile}
              className={`focus:outline-none outline-none w-full h-full border-b-2 transition-all duration-200 ease-in-out ${
                toggleBtn ? "text-[#006DA1] border-[#006DA1]" : "border-white"
              }`}
            >
              {t("home")}
            </button>
            <button
              onClick={handleOpenAbouutProfile}
              className={`focus:outline-none outline-none w-full h-full border-b-2 duration-200 ease-in-out font-battambang ${
                toggleBtn ? "border-white" : "text-[#006DA1] border-[#006DA1]"
              }`}
            >
              {t("about")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeadProfileViewAccount;
