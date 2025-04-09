"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";
function DropdownLanguage({
  dropdownLanguage,
  handleDropdownLanguage,
  setDropdownLanguage,
  dropdownRef,
  t,
}) {
  const router = useRouter();
  const changeLanguage = (newLocale) => {
    if (!router) return;
    setDropdownLanguage();
    const currentPath = window.location.pathname.replace(
      /^\/(kh|en)/,
      `/${newLocale}`
    );
    router.push(currentPath);
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setDropdownLanguage();
      }
    },
    [setDropdownLanguage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (dropdownLanguage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [dropdownLanguage, handleKeyDown]);

  return (
    <div>
      {/* dropdown language */}
      <div
        className={`fixed  inset-0 z-10 bg-[#2d2727] bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          dropdownLanguage ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed lg:inset-0 z-20 flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          dropdownLanguage
            ? "opacity-100 bottom-0 lg:translate-y-[60px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-0 pointer-events-none"
        }`}
      >
        <section
          ref={dropdownRef}
          className={`px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] z-20 h-[260px]`}
        >
          <div className="bg-white w-full rounded-xl shadow">
            <h1 className="h-[50.30px] font-semibold text-lg flex items-center justify-center">
              {t("language")}
            </h1>
            <p
              onClick={() => changeLanguage("en")}
              className="h-[61.80px] border-t border-gray-100 text-[#0096DE] cursor-pointer font-semibold flex items-center justify-center"
            >
              English
            </p>
            <p
              onClick={() => changeLanguage("kh")}
              className="h-[61.80px] border-t border-gray-100 text-[#0096DE] cursor-pointer font-semibold flex items-center justify-center"
            >
              ខ្មែរ
            </p>
          </div>
          <div className="mt-3.5">
            <button
              onClick={handleDropdownLanguage}
              className=" outline-none focus:outline-none select-none h-[61.80px] w-full font-semibold text-lg text-red-600 bg-white flex justify-center items-center rounded-xl shadow"
            >
              {t("cancelBtn")}
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default DropdownLanguage;
