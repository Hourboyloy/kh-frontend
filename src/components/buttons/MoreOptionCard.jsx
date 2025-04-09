"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";
import { PiShareFat } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useTranslations } from "next-intl";

function MoreOptionCard({
  toggleMoreOptionCard,
  setToggleMoreOptionCard,
  handleClickShare,
  handleSave,
  username,
  accID,
  proUserID,
  handleRemoveSave,
  userSaved,
  currentPathAtViewAccount,
}) {
  const t = useTranslations("btnNameAndTitle");
  const toggleMoreOptionRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleMoreOptionCard();
      }
    },
    [setToggleMoreOptionCard]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleMoreOptionRef.current &&
        !toggleMoreOptionRef.current.contains(event.target)
      ) {
        setToggleMoreOptionCard(false);
      }
    };

    if (toggleMoreOptionCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMoreOptionCard, setToggleMoreOptionCard, toggleMoreOptionRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleMoreOptionCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleMoreOptionCard, handleKeyDown]);

  return (
    <div className="font-battambang">
      {/* Background overlay */}
      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleMoreOptionCard ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 lg:inset-0 z-20 text-lg flex justify-center w-full h-fit transition-all duration-200 ease-in-out ${
          toggleMoreOptionCard
            ? "opacity-100 bottom-0 lg:translate-y-[120px]"
            : "opacity-0 -bottom-4 lg:translate-y-[60px] pointer-events-none"
        }`}
      >
        <section
          ref={toggleMoreOptionRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20 space-y-4"
        >
          <div className="bg-white w-full rounded-xl overflow-hidden *:bg-white *:px-5">
            {currentPathAtViewAccount ? (
              ""
            ) : (
              <Link
                href={`/${username}`}
                className="w-full h-[61.80px] select-none outline-none focus:outline-none hover:bg-[#f5f5f5] transition-all ease-in-out flex items-center border-b space-x-3.5"
              >
                <FaRegUser size={19} />
                <span className="">{t("viewProfileBtn")}</span>
              </Link>
            )}

            <button
              onClick={handleClickShare}
              className="w-full h-[61.80px] select-none outline-none focus:outline-none hover:bg-[#f5f5f5] transition-all ease-in-out flex items-center border-b space-x-3.5"
            >
              <PiShareFat size={21} />
              <span className="">{t("shareBtn")}</span>
            </button>

            {accID === proUserID ? (
              ""
            ) : userSaved?.includes(accID) ? (
              <button
                onClick={handleRemoveSave}
                className="w-full h-[61.80px] select-none outline-none focus:outline-none hover:bg-[#f5f5f5] transition-all ease-in-out flex items-center space-x-3.5"
              >
                <FaBookmark size={19} className="text-gray-800" />
                <span className="">{t("unsavedBtn")}</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-full h-[61.80px] select-none outline-none focus:outline-none hover:bg-[#f5f5f5] transition-all ease-in-out flex items-center space-x-3.5"
              >
                <FaRegBookmark size={19} />
                <span className="">{t("saveBtn")}</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setToggleMoreOptionCard(false)}
              className="w-full h-[61px] font-medium select-none outline-none focus:outline-none text-gray-800 bg-white hover:bg-[#f5f5f5] transition-all ease-in-out flex justify-center items-center rounded-xl border"
            >
              {t("cancelBtn")}
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default MoreOptionCard;
