"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppContext } from "@/context/GlobalContext";
import { PiWarningCircleLight } from "react-icons/pi";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";

const AlertFailed = dynamic(() => import("@/components/alerts/AlertFailed"), {
  ssr: false,
});
const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

function ChangeUsernamePage() {
  const t = useTranslations("changeUsernamePage");
  const router = useRouter();
  const { domain, account, token, setAccount, setProfile } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [isPending, setIsPending] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(false);

  // Refs for input fields
  const usernameRef = useRef(null);
  const alertFailedRef = useRef(alertFailed);
  const alertFailedElementRef = useRef(null);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
    setErrors(false);
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (username === "") {
        usernameRef?.current.focus();
        setErrors(true);
        return;
      }
      // if (!alertFailed) return;
      setIsPending(true);
      try {
        const res = await axios.put(
          `${domain}${
            account?.type === TYPE ? "/manager" : "/user"
          }/update/account/${account._id}`,
          { updates: { username } },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 200) {
          if (res.data.message === "Username already exists") {
            setAlertFailed(true);
            setText("This username is already used in another account.");
          } else {
            setAlertSuccess(true);
            setAccount(res.data.account);
            setProfile(res.data.profile);
            localStorage.setItem("account", JSON.stringify(res.data.account));
            localStorage.setItem("profile", JSON.stringify(res.data.profile));
          }
        }
      } catch (error) {
        setAlertFailed(true); // or handle accordingly
        setText("Error for change username");
      } finally {
        setIsPending(false);
      }
    },
    [username, account, domain, token, setAccount, setProfile, TYPE]
  );

  useEffect(() => {
    const accountLocal = localStorage.getItem("account");
    if (!accountLocal) {
      router.push("/login");
    } else if (account) {
      setUsername(account?.username);
    }
  }, [router, account]);

  useEffect(() => {
    alertFailedRef.current = alertFailed;
  }, [alertFailed]);

  useEffect(() => {
    if (username !== account.username) {
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [username, account?.username, handleSubmit]);

  const handleIsAlertSuccess = () => {
    setAlertSuccess(false);
  };
  const handleCloseAlertFailed = () => {
    setAlertFailed(false);
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (
        alertFailed &&
        alertFailedElementRef.current &&
        !alertFailedElementRef.current.contains(e.target)
      ) {
        setAlertFailed(false);
      }
    },
    [alertFailed]
  );

  useEffect(() => {
    if (alertFailed) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup
    };
  }, [alertFailed, handleClickOutside]);
  return (
    <div className="lg:pt-5 mb-12">
      <div className="pb-4 lg:hidden z-10 sticky top-0">
        <SmNavNormal name={"Change Username"} />
      </div>

      <div
        className={`fixed top-0 left-1/2 z-20 -translate-x-1/2 transform transition-all duration-300 ${
          alertSuccess
            ? "opacity-100 scale-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <AlertSuccessWarning
          alert={alertSuccess}
          icons={"success"}
          text={"Change username successful."}
          handleIsAlert={handleIsAlertSuccess}
        />
      </div>

      <div className="">
        <AlertFailed
          alert={alertFailed}
          // text={"This username is already used in another account."}
          text={text}
          close={handleCloseAlertFailed}
          alertFailedRef={alertFailedElementRef}
        />
      </div>

      <div>{isPending && <Loading isPending={isPending} />}</div>

      <div className="w-full lg:w-[560px] lg:bg-white mx-auto px-[17px] lg:pt-4 pb-[20px] space-y-[13px] rounded">
        <div className="lg:space-y-[17.5px]">
          <h1 className="font-semibold text-gray-900 text-[22px] text-center">
            {t("title")}
          </h1>
          <p className="text-center text-[17px] px-10">{t("description")}</p>
        </div>

        <div className="space-y-[17px] pt-[17px]">
          {/* username Input */}
          <section className="leading-0">
            <div className="relative">
              <input
                ref={usernameRef}
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 ${
                  errors
                    ? "border-red-600 focus:ring-red-200"
                    : "focus:ring-[#C9DFFF]"
                }`}
                type="text"
                value={username}
                onChange={handleChangeUsername}
                placeholder={` ${t("username")}`}
              />
              {errors && (
                <PiWarningCircleLight className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 text-[23px]" />
              )}
            </div>
            {errors && (
              <p className="text-red-600 text-[12px] tracking-wide pt-[3px]">
                Please enter your username
              </p>
            )}
          </section>

          <button
            onClick={handleSubmit}
            className="text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
          >
            {t("submitBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeUsernamePage;
