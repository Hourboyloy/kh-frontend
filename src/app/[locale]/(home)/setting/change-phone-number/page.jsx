"use client";
import React, { useState, useRef, useEffect, useCallback } from "react"; // Import useCallback
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { PiWarningCircleLight } from "react-icons/pi";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";
const AlertFailed = dynamic(() => import("@/components/alerts/AlertFailed"), {
  srr: false,
});
const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { srr: false }
);
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  srr: false,
});

function ChangePhoneNumberPage() {
  const t = useTranslations("changePhoneNumberPage");
  const router = useRouter();

  const { domain, account, token, setAccount } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [isPending, setIsPending] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertFailed, setAlertFailed] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState(false);

  // Refs for input fields
  const phoneNumRef = useRef(null);
  const alertFailedRef = useRef(alertFailed);
  const alertFailedElementRef = useRef(null);

  // Memoizing functions to prevent unnecessary re-renders
  const handleChangePhoneNum = useCallback((e) => {
    setPhoneNum(e.target.value);
    setErrors(false);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (phoneNum === "") {
        phoneNumRef?.current.focus();
        setErrors(true);
        return;
      }
      setIsPending(true);
      let updates = {
        phoneNum: phoneNum,
      };
      try {
        const res = await axios.put(
          `${domain}${
            account?.type == TYPE ? "/manager" : "/user"
          }/update/account/${account._id}`,
          { updates },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setIsPending(false);
          if (res.data.message === "Phone number already exists") {
            setText("This phone number is already used in another account.");
            setTimeout(() => {
              setAlertFailed(true);
            }, 500);
          } else {
            setTimeout(() => {
              setAlertSuccess(true);
            }, 100);
            setAccount(res.data.account);
            localStorage.setItem("account", JSON.stringify(res.data.account));
          }
        }
      } catch (error) {
        setIsPending(false);
        setAlertFailed(true);
        setText("Error for change phone number.");
      } finally {
        setIsPending(false);
      }
    },
    [phoneNum, domain, account, token, setAccount, TYPE]
  );

  const handleIsAlertSuccess = useCallback(() => {
    setAlertSuccess(false);
  }, []);

  const handleCloseAlertFailed = useCallback(() => {
    setAlertFailed(false);
  }, []);

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
    const accountLocal = localStorage.getItem("account");
    if (!accountLocal) {
      router.push("/login");
    } else if (account) {
      setPhoneNum(account?.phoneNum);
    }
  }, [router, account]);

  useEffect(() => {
    alertFailedRef.current = alertFailed;
  }, [alertFailed]);

  useEffect(() => {
    if (phoneNum && phoneNum !== account?.phoneNum) {
      const handleKeyDown = (e) => {
        if (!alertFailedRef.current) {
          if (e.key === "Enter") {
            handleSubmit(e);
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [phoneNum, account?.phoneNum, handleSubmit]);

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
        <SmNavNormal name={"Change Phone Number"} />
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
          text={"Change phone number successful."}
          handleIsAlert={handleIsAlertSuccess}
        />
      </div>

      <div className="">
        <AlertFailed
          alert={alertFailed}
          text={text}
          close={handleCloseAlertFailed}
          alertFailedRef={alertFailedElementRef}
        />
      </div>

      <div>{isPending && <Loading isPending={isPending} />}</div>

      <div className="w-full md:w-[560px] lg:bg-white mx-auto px-[17px] lg:pt-4 pb-[20px] space-y-[13px] rounded border">
        <div className="lg:space-y-[17.5px]">
          <h1 className="font-semibold text-gray-900 text-[22px] text-center hidden lg:block">
            {t("title")}
          </h1>
          <p className="text-center text-[17px] px-10">{t("description")}</p>
        </div>

        <div className="space-y-[17px] pt-[17px]">
          {/* username Input */}
          <section className="leading-0">
            <div className="relative">
              <input
                ref={phoneNumRef}
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 ${
                  errors
                    ? "border-red-600 focus:ring-red-200"
                    : "focus:ring-[#C9DFFF]"
                }`}
                type="text"
                value={phoneNum}
                onChange={handleChangePhoneNum}
                placeholder={`${t("phoneNum")}`}
              />
              {errors && (
                <PiWarningCircleLight className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 text-[23px]" />
              )}
            </div>
            {errors && (
              <p className="text-red-600 text-[12px] tracking-wide pt-[3px]">
                Please enter your phone number
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

export default ChangePhoneNumberPage;
