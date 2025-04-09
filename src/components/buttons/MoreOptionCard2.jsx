"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Link from "next/link";
import { IoMdLink } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useTranslations } from "next-intl";

function MoreOptionCard2({
  toggleOptionCard,
  setToggleOptionCard,
  title,
  proID,
  handleToggleDeleteReason,
  handleClickAutoRenew,
}) {
  const t = useTranslations("btnNameAndTitle");
  const toggleMoreOptionRef = useRef(null);
  const [alert, setAlert] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleOptionCard(false);
      }
    },
    [setToggleOptionCard]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleMoreOptionRef.current &&
        !toggleMoreOptionRef.current.contains(event.target)
      ) {
        setToggleOptionCard(false);
      }
    };

    if (toggleOptionCard) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleOptionCard, setToggleOptionCard, toggleMoreOptionRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleOptionCard) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleOptionCard, handleKeyDown]);

  return (
    <div className="font-battambang">
      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleOptionCard ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 lg:inset-0 z-20 text-lg flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          toggleOptionCard
            ? "opacity-100 bottom-0 lg:translate-y-[120px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-[60px] pointer-events-none"
        }`}
      >
        <section
          ref={toggleMoreOptionRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20 space-y-4"
        >
          <div className="bg-white w-full rounded-xl overflow-hidden *:bg-white *:px-5 text-[16.6px]">
            <h1 className="h-[46.6px] flex items-center justify-center border-b text-nowrap text-gray-500">
              {title.length > 45 ? title.slice(0, 45) + "..." : title}
            </h1>
            <Link
              href={`/post/${proID}`}
              className="w-full h-[61px] select-none outline-none focus:outline-none text-[#1372fd] transition-all ease-in-out lg:hidden flex items-center space-x-2"
            >
              <BiEdit size={20} />
              <span className="">{t("editBtn")}</span>
            </Link>
            <button
              onClick={() => handleToggleDeleteReason(null)}
              className="w-full h-[61px] select-none outline-none focus:outline-none text-[#1372fd] transition-all ease-in-out lg:hidden flex items-center space-x-2"
            >
              <RiDeleteBin6Line size={20} />
              <span className="">{t("deleteBtn")}</span>
            </button>

            <button
              onClick={handleClickAutoRenew}
              className="w-full h-[61px] select-none outline-none focus:outline-none text-[#1372fd] transition-all ease-in-out flex items-center space-x-2"
            >
              <MdHistory size={20} />
              <span className="">{t("autoRenewBtn")}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setToggleOptionCard(false)}
              className="w-full h-[61px] font-medium select-none outline-none focus:outline-none text-[#1372fd] bg-white hover:bg-[#f5f5f5] transition-all ease-in-out flex justify-center items-center rounded-xl border"
            >
              {t("cancelBtn")}
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default MoreOptionCard2;
