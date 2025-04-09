"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppContext } from "@/context/GlobalContext";
import axios from "axios";
import Loading from "@/components/Loading";

function ButtonDeleteAccount({
  ToggleButtonDelete,
  setToggleButtonDelete,
  handleToggleButtonDelete,
  BtnDeleteRef,
  t,
}) {
  const router = useRouter();
  const { setAccount, setProfile, setToken, profile, token, domain, account } =
    useAppContext();
  const [isPending, setIsPending] = useState(false);
  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "Escape":
          setToggleButtonDelete(false);
          break;
        default:
          break;
      }
    },
    [setToggleButtonDelete]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (ToggleButtonDelete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [ToggleButtonDelete, handleKeyDown]);

  const handleDeleteAccount = async () => {
    setToggleButtonDelete(false);
    setIsPending(true);
    try {
      const res = await axios.delete(
        `${domain}/user/remove/account/${account._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        setProfile(null);
        setAccount(null);
        setToken(null);
        localStorage.removeItem("account");
        localStorage.removeItem("profile");
        localStorage.removeItem("token");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      setIsPending(false);
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div>
      {isPending && <Loading isPending={isPending} />}
      <div
        className={`fixed opacity-0 h-screen w-full inset-0 z-10 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out 
    ${ToggleButtonDelete ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
      ></div>
      <section
        className={`fixed lg:h-screen flex justify-center lg:inset-0 z-10 w-full transition-all duration-300 ${
          ToggleButtonDelete
            ? "opacity-100 -bottom-1 lg:bottom-0 lg:translate-y-[60px]"
            : "bottom-4 lg:bottom-0 lg:translate-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={BtnDeleteRef}
          className=" w-full lg:w-[500px] h-[287px] bg-white shadow pl-[17px] pt-[17.5px] pb-[15px] pr-[16px] flex flex-col rounded-t-lg md:rounded"
        >
          <h4 className="text-[16px] text-center mb-2">
            {t("deleteAccountTitle")}
          </h4>
          <hr />
          <div className="px-4 pt-4 mb-auto space-y-3.5">
            <h1 className="text-[19px] font-semibold capitalize">
              {profile?.firstName + " " + profile?.lastName}:{" "}
              {t("deleteAccountQuestion")}
            </h1>
            <p className="text-[16.4px]">{t("deleteAccountDescription")}</p>
          </div>
          <hr />
          <div className=" flex items-center justify-center space-x-3 pt-2 pb-3">
            <button
              onClick={handleToggleButtonDelete}
              className="bg-[#dfdfdf] w-full lg:w-[141.16px] h-[41px] select-none focus:outline-none border rounded-md md:rounded"
            >
              {t("cancelBtn")}
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-[#dc3545] w-full lg:w-[299.32px] h-[41px] select-none focus:outline-none text-white rounded-md md:rounded"
            >
              {t("deleteBtn")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ButtonDeleteAccount;
