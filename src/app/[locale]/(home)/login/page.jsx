"use client";
import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/css/LoadingForBtn.css";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

import { PiEyeLight, PiEyeSlash, PiWarningCircleLight } from "react-icons/pi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAppContext } from "@/context/GlobalContext";

const SmHeaderLoginOrRegister = dynamic(
  () => import("@/components/SmHeaderLoginOrRegister"),
  {
    ssr: false,
  }
);

function Login() {
  const t = useTranslations("LoginPage");
  const locale = useLocale();
  const router = useRouter();
  const { setAccount, setToken, setProfile, domain } = useAppContext();
  const [loginAccount, setLoginAccount] = useState({
    phoneNum: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ phoneNum: false, password: false });

  const handleSetLoginAccountByForm = (e) => {
    const { name, value } = e.target;
    setLoginAccount((prev) => ({ ...prev, [name]: value }));
    // Validation for each field
    if (name === "phoneNum") {
      setErrors((prev) => ({
        ...prev,
        phoneNum: value.trim() === "",
      }));
    }
    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value.trim() === "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { phoneNum, password } = loginAccount;
    if (!phoneNum || !password) {
      setErrors({ phoneNum: !phoneNum, password: !password });
      return;
    }

    setIsPending(true);
    try {
      const res = await axios.post(`${domain}/login`, loginAccount);
      if (res.status === 200 && res.data.message === "Login successful") {
        setIsPending(false);
        setLoginAccount({
          phoneNum: "",
          password: "",
        });
        setAccount(res.data.account);
        setProfile(res.data.profile);
        setToken(res.data.access_token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        localStorage.setItem("account", JSON.stringify(res.data.account));
        router.push("/account");
      } else {
        setIsPending(false);
        setTimeout(() => {
          alert(res.data.message);
        }, 300);
      }
    } catch (error) {
      setIsPending(false);
      alert(error);
    }
  };

  return (
    <div className="lg:pt-5 h-screen ">
      <div className="lg:hidden sticky top-0 z-[9]">
        <SmHeaderLoginOrRegister name={"Login"} />
      </div>
      <section
        className={`lg:max-w-[560px] py-4 mx-auto lg:border rounded lg:bg-white ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        <div className="text-center font-semibold md:text-xl text-lg pt-0.5 px-2">
          <div className=" text-gray-800">{t("title")}</div>
          <div className="border-b pt-[15px] border-gray-300"></div>
        </div>

        {/* form */}
        <section className="px-[25.5px] pt-[18px] space-y-5">
          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("number")}
              <span className="text-red-600 font-bold"> *</span>
            </label>

            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] ${
                  errors.phoneNum
                    ? "border-red-600 focus:border-red-600"
                    : "focus:border-[#8DBAFA]"
                }`}
                name="phoneNum"
                type="text"
                value={loginAccount.phoneNum}
                onChange={handleSetLoginAccountByForm}
              />
              {errors.phoneNum && (
                <PiWarningCircleLight className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 text-[23px]" />
              )}
            </div>
            {errors.phoneNum && (
              <p className="text-red-600 text-[12px] tracking-wide">
                {t("errorPhoneNum")}
              </p>
            )}
          </div>

          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("password")}
              <span className="text-red-600 font-bold"> *</span>
            </label>

            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] 
                  ${
                    errors.password
                      ? "border-red-600 focus:border-red-600"
                      : "focus:border-[#8DBAFA]"
                  }`}
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginAccount.password}
                onChange={(e) => handleSetLoginAccountByForm(e)}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 text-[21px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeSlash /> : <PiEyeLight />}
              </div>
            </div>

            {errors.password && (
              <p className="text-red-600 text-[12px] tracking-wide">
                {t("errorPw")}
              </p>
            )}
          </div>

          <div className=" space-y-[16.5px]">
            <button
              onClick={handleSubmit}
              className="bg-[#0096DE] hover:bg-[#0081c0] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center gap-1"
            >
              <span> {t("loginBtn")}</span>
              {isPending && (
                <div className="spinner">
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                  <div className="spinner-blade"></div>
                </div>
              )}
            </button>
            <div className="text-[#016B9D] text-sm flex items-center justify-end">
              <Link href="/register" className="focus:outline-none">
                {t("forgetAccount")}
              </Link>
            </div>
          </div>
        </section>

        <section className="px-[25.5px] pt-[12px]">
          {/* line */}
          <div className="flex space-x-3">
            <p className="border-b border-gray-300  w-full"></p>
            <p className=" translate-y-1 text-gray-800"> {t("or")}</p>
            <p className="border-b border-gray-300  w-full"></p>
          </div>
          {/* logo media login */}
          <div className="hidden items-center justify-center space-x-4 mt-6 ">
            <button className="select-none focus:outline-none bg-[#03469E] rounded-full w-[38px] h-[38px] flex items-center justify-center text-white">
              <FaFacebookF />
            </button>
            <button className="select-none focus:outline-none bg-[#4285F4] rounded-full w-[38px] h-[38px] flex items-center justify-center text-white">
              <FaGoogle />
            </button>
          </div>

          {/* line */}
          <div className="hidden space-x-3 mt-[12px]">
            <p className="border-b border-gray-300  w-full"></p>
            <p className=" translate-y-1 text-gray-800"> {t("or")}</p>
            <p className="border-b border-gray-300  w-full"></p>
          </div>
        </section>

        <section className="px-[25.5px] space-y-4 pt-[18px]">
          <div className="space-y-1">
            <p className="text-[17px]"> {t("question")}</p>
            <Link
              href="/register"
              className="bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center"
            >
              {t("registerBtn")}
            </Link>
          </div>

          <p className="text-center text-sm text-gray-900">
            {t("description.description_part_1")}{" "}
            <Link href="" className="text-[#0096DE]">
              {" "}
              {t("description.description_part_2")}{" "}
            </Link>{" "}
            {t("description.description_part_3")}{" "}
            <Link href="" className="text-[#0096DE]">
              {" "}
              {t("description.description_part_4")}
            </Link>{" "}
            {t("description.description_part_5")}
          </p>
        </section>
      </section>
    </div>
  );
}

export default Login;
