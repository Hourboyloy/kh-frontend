"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IoMdLink } from "react-icons/io";
import { useTranslations } from "next-intl";

const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);

function ShareOption({ toggleShareOption, setToggleShareOption, linkCopy }) {
  const t = useTranslations("btnNameAndTitle");
  const shareOptionRef = useRef(null);
  const [alert, setAlert] = useState(false);

  const handleClickCopy = () => {
    const domain = window.location.origin;
    const fullUrl = `${domain}/details/${linkCopy}`;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setAlert(true);
        setToggleShareOption(false);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleShareOption(false);
      }
    },
    [setToggleShareOption]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareOptionRef.current &&
        !shareOptionRef.current.contains(event.target)
      ) {
        setToggleShareOption(false);
      }
    };

    if (toggleShareOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleShareOption, setToggleShareOption, shareOptionRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleShareOption) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleShareOption, handleKeyDown]);

  return (
    <div className="font-battambang">
      <div
        className={`fixed inset-0 mt-2 z-30 w-fit h-fit mx-auto bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          alert ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <AlertSuccessWarning
          text="Link copied to clipboard"
          alert={alert}
          icons={"success"}
          handleIsAlert={() => setAlert(false)}
        />
      </div>

      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleShareOption ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 lg:inset-0 z-20 text-lg flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          toggleShareOption
            ? "opacity-100 bottom-0 lg:translate-y-[120px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-[60px] pointer-events-none"
        }`}
      >
        <section
          ref={shareOptionRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20 space-y-4"
        >
          <div className="bg-white w-full rounded-xl overflow-hidden *:bg-white *:px-5">
            <h1 className="h-[49.3px] flex items-center justify-center border-b">
              {t("shareTitle")}
            </h1>
            <button
              onClick={handleClickCopy}
              className="w-full h-[59.05px] select-none outline-none focus:outline-none hover:bg-[#f5f5f5] transition-all ease-in-out flex items-center space-x-3.5"
            >
              <span className="bg-[#8c8c8c] rounded-full w-[37px] h-[37px] text-white flex items-center justify-center">
                <IoMdLink size={19} />
              </span>
              <span className="">{t("copyLink")}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setToggleShareOption(false)}
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

export default ShareOption;
