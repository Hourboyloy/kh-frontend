"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useAppContext } from "@/context/GlobalContext";
import Loading from "@/components/Loading";
import { useTranslations } from "next-intl";

const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { srr: false }
);
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  srr: false,
});

function ChangePasswordPage() {
  const t = useTranslations("changePwPage");
  const router = useRouter();
  const { domain, account, token } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [isPending, setIsPending] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [beforeSubmitFailed, setBeforeSubmitFailed] = useState(false);
  const [changePassword, setChangePassword] = useState({
    password: "",
    confirmPw: "",
  });
  const [errors, setErrors] = useState({
    password: false,
    confirmPw: false,
    passwNotMatch: false,
    passwTooShort: false,
  });
  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowConfirmPw, setShowConfirmPw] = useState(false);

  // Refs for input fields
  const passwordRef = useRef(null);
  const confirmPwRef = useRef(null);

  const handleChangePassword = useCallback(
    (e) => {
      const { name, value } = e.target;
      setChangePassword((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
      if (beforeSubmitFailed && name === "confirmPw") {
        setErrors((prev) => ({
          ...prev,
          passwNotMatch: value && changePassword.password !== value,
        }));
      } else if (beforeSubmitFailed && name === "password") {
        setErrors((prev) => ({
          ...prev,
          passwTooShort: value.length < 6,
        }));
      }
    },
    [beforeSubmitFailed, changePassword.password]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setBeforeSubmitFailed(true);
      const { password, confirmPw } = changePassword;
      const newErrors = {
        password: !password,
        confirmPw: !confirmPw,
        passwTooShort: password.length < 6,
        passwNotMatch: confirmPw && password !== confirmPw,
      };

      setErrors(newErrors);

      // Focus on the first field with an error
      if (newErrors.password) {
        passwordRef.current?.focus();
      } else if (newErrors.confirmPw) {
        confirmPwRef.current?.focus();
      } else if (newErrors.passwTooShort) {
        passwordRef.current?.focus();
      }

      if (Object.values(newErrors).some((error) => error)) return;
      setBeforeSubmitFailed(false);
      setIsPending(true);

      let updates = {
        password: changePassword.password,
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
          setTimeout(() => {
            setAlertSuccess(true);
          }, 100);
        }
      } catch (error) {
        setIsPending(false);
      } finally {
        setIsPending(false);
      }
    },
    [changePassword, domain, account, token, TYPE]
  );

  useEffect(() => {
    const accountLocal = localStorage.getItem("account");
    if (!accountLocal) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (changePassword?.password && changePassword?.confirmPw) {
      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [changePassword.password, changePassword.confirmPw, handleSubmit]);

  const handleIsAlert = () => {
    setAlertSuccess(false);
  };

  return (
    <div className="lg:pt-5 mb-12">
      <div className="pb-4 lg:hidden z-10 sticky top-0">
        <SmNavNormal name={"Change Password"} />
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
          text={"Change password successful."}
          handleIsAlert={handleIsAlert}
        />
      </div>

      <div>{isPending && <Loading isPending={isPending} />}</div>

      <div className="w-full md:w-[560px] lg:bg-white mx-auto px-[17px] md:pt-4 pb-[20px] space-y-[13px] rounded">
        <div className="lg:space-y-[17.5px]">
          <h1 className="font-semibold text-gray-900 text-[22px] text-center hidden md:block">
            {t("title")}
          </h1>
          <p className="text-center text-[17px] px-10">{t("description")}</p>
        </div>

        <div className="space-y-[17px] pt-[17px]">
          {/* Password Input */}
          <section className="leading-0">
            <div className="relative">
              <input
                ref={passwordRef} // Set ref for password input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 ${
                  errors.password || errors.passwTooShort
                    ? "border-red-600 focus:ring-red-200"
                    : "focus:ring-[#C9DFFF]"
                }`}
                type={isShowPassword ? "text" : "password"}
                name="password"
                value={changePassword.password}
                onChange={handleChangePassword}
                placeholder={`${t("password")}`}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 text-[21px] cursor-pointer"
                onClick={() => setShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <PiEyeSlash /> : <PiEyeLight />}
              </div>
            </div>
            {errors.password ? (
              <p className="text-red-600 text-[12px] tracking-wide pt-[3px]">
                Please enter new password
              </p>
            ) : errors.passwTooShort ? (
              <p className="text-red-600 text-[12px] tracking-wide pt-[3px]">
                Password must be at least 6 characters long
              </p>
            ) : (
              ""
            )}
          </section>

          {/* Confirm Password Input */}
          <section className="leading-0">
            <div className="relative">
              <input
                ref={confirmPwRef} // Set ref for confirm password input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 ${
                  errors.confirmPw || errors.passwNotMatch
                    ? "border-red-600 focus:ring-red-200"
                    : "focus:ring-[#C9DFFF]"
                }`}
                type={isShowConfirmPw ? "text" : "password"}
                name="confirmPw"
                value={changePassword.confirmPw}
                onChange={handleChangePassword}
                placeholder={`${t("cmPw")}`}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 text-[21px] cursor-pointer"
                onClick={() => setShowConfirmPw(!isShowConfirmPw)}
              >
                {isShowConfirmPw ? <PiEyeSlash /> : <PiEyeLight />}
              </div>
            </div>
            {errors.confirmPw && (
              <p className="text-red-600 text-[12px] tracking-wide pt[3px]">
                Please enter confirmation password
              </p>
            )}
            {errors.passwNotMatch && (
              <p className="text-red-600 text-[12px] tracking-wide pt[3px]">
                Passwords do not match
              </p>
            )}
          </section>

          <button
            onClick={handleSubmit}
            className="text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
          >
            {`${t("submitBtn")}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
