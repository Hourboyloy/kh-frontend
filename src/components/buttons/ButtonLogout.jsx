"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { handleLogout } from "@/helper/Logout";
import { useAppContext } from "@/context/GlobalContext";

function ButtonLogout({
  ToggleButtonLogout,
  setToggleButtonLogout,
  handleToggleButtonLogout,
  BtnLogoutRef,
  t,
}) {
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
      router,
      setToggleButtonLogout,
      setAccount,
      setProfile,
      setToken,
      handleToggleButtonLogout,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (ToggleButtonLogout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [ToggleButtonLogout, handleKeyDown]);

  return (
    <div
      className={`fixed px-8 md:px-10 lg:px-0 opacity-0 h-screen w-full flex justify-center pt-52  inset-0 z-10 bg-[#0f0d0d] bg-opacity-70 transition-opacity duration-300 ease-in-out 
    ${ToggleButtonLogout ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
    >
      <div
        ref={BtnLogoutRef}
        className="h-[115px] md:h-[101.25px] lg:w-[820px] w-full bg-white shadow pl-[17px] pt-[17.5px] pb-[15px] pr-[16px] flex flex-col rounded"
      >
        <h1 className=" mb-auto text-[17px]">{t("logoutQuestion")}</h1>
        <div className="flex items-center justify-end space-x-[34px] select-none pr-4 text-[17px]">
          <button
            onClick={() =>
              handleLogout(
                setAccount,
                setProfile,
                setToken,
                handleToggleButtonLogout,
                () => router.push("/")
              )
            }
            className="text-red-600"
          >
            {t("logout")}
          </button>
          <button onClick={handleToggleButtonLogout} className="text-[#0d6efd]">
            {t("cancelBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ButtonLogout;
