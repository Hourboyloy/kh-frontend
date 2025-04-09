"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppContext } from "@/context/GlobalContext";
import { handleLogout } from "@/helper/Logout";
import { useTranslations } from "next-intl";

function SmBtnLogout({
  ToggleButtonLogout,
  setToggleButtonLogout,
  handleToggleButtonLogout,
  dropdownBtnLogoutRef,
}) {
  const t = useTranslations("btnNameAndTitle");
  const router = useRouter();
  const { setAccount, setProfile, setToken } = useAppContext();

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "Enter":
          handleLogout(
            setAccount,
            setProfile,
            setToken,
            handleToggleButtonLogout,
            () => router.push("/")
          );
          break;
        case "Escape":
          setToggleButtonLogout(false);
          break;
        default:
          break;
      }
    },
    [
      setAccount,
      setProfile,
      setToken,
      handleToggleButtonLogout,
      setToggleButtonLogout,
      router,
    ]
  );

  useEffect(() => {
    const handleOverflow = () => {
      document.body.style.overflow = ToggleButtonLogout ? "hidden" : "auto";
    };
    // Add keydown event listener if the modal is visible
    if (ToggleButtonLogout) {
      window.addEventListener("keydown", handleKeyDown);
    }
    // Manage body overflow
    handleOverflow();
    return () => {
      // Remove event listener and reset overflow on cleanup
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Reset overflow to default
    };
  }, [ToggleButtonLogout, handleKeyDown]);

  return (
    <div className="">
      <section
        className={`fixed opacity-0 h-screen w-full flex justify-center inset-0 z-10 bg-[#0f0d0d] bg-opacity-70 transition-opacity duration-300 ease-in-out 
    ${ToggleButtonLogout ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
      >
        <section
          className={`w-full z-10 transition-transform ease-in-out duration-500 
          ${ToggleButtonLogout ? "translate-y-[203px]" : "translate-y-36"}`}
        >
          <div
            ref={dropdownBtnLogoutRef}
            className={`w-[500px] h-[132px] mx-auto bg-white shadow flex flex-col rounded`}
          >
            <div className="w-full h-[59.50px] flex items-center justify-center border-b">
              <h1 className="text-[17px]">{t("questionLogout")}</h1>
            </div>
            <div className="w-full px-4 my-auto flex items-center justify-center space-x-[34px] select-none text-[17px] text-white">
              <button
                onClick={() => {
                  handleLogout(
                    setAccount,
                    setProfile,
                    setToken,
                    handleToggleButtonLogout,
                    () => router.push("/")
                  );
                }}
                className=" w-full bg-[#0096de] py-1.5 rounded-md focus:outline-none select-none"
              >
                {t("logoutBtn")}
              </button>
              <button
                onClick={handleToggleButtonLogout}
                className="w-full bg-[#ff9800] py-1.5 rounded-md focus:outline-none select-none"
              >
                {t("cancelBtn")}
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default SmBtnLogout;
