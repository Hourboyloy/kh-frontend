"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "@/css/LoadingForBtn.css";
import { useTranslations } from "use-intl";
import { useLocale } from "use-intl";

import { PiEyeLight, PiEyeSlash, PiWarningCircleLight } from "react-icons/pi";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAppContext } from "@/context/GlobalContext";

const SmHeaderLoginOrRegister = dynamic(
  () => import("@/components/SmHeaderLoginOrRegister"),
  {
    ssr: false,
  }
);

function Register() {
  const locale = useLocale();
  const t = useTranslations("registerPage");
  const router = useRouter();
  const { setAccount, setToken, setProfile, domain } = useAppContext();
  const [registerByform, setRegisterByform] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    password: "",
    comfirmPw: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showComfirmPassword, setShowComfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNum: false,
    password: false,
    comfirmPw: false,
    passwNotMatch: false,
  });

  const handleSetRegisterAccountByForm = (e) => {
    const { name, value } = e.target;
    setRegisterByform((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));

    // Check if 'comfirmPw' is being updated, and if so, reset the 'passwNotMatch' error
    if (name === "comfirmPw") {
      setErrors((prev) => ({
        ...prev,
        passwNotMatch: value && registerByform.password !== value,
      }));
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNum, password, comfirmPw } =
      registerByform;

    // Create error object based on conditions
    const newErrors = {
      firstName: !firstName,
      lastName: !lastName,
      phoneNum: !phoneNum,
      password: !password,
      comfirmPw: !comfirmPw,
      passwNotMatch: comfirmPw && password !== comfirmPw,
    };
    setErrors(newErrors);

    // Stop if any error is present
    if (Object.values(newErrors).some((error) => error)) return;
    setIsPending(true);
    try {
      const res = await axios.post(`${domain}/register`, registerByform);
      if (res.status === 200) {
        setTimeout(() => {
          alert(res.data.message);
        }, 500);
        setIsPending(false);
        if (res.data.message === "Account registered successfully") {
          setIsPending(false);
          setRegisterByform({
            firstName: "",
            lastName: "",
            phoneNum: "",
            password: "",
            comfirmPw: "",
          });
          setAccount(res.data.account);
          setProfile(res.data.profile);
          setToken(res.data.access_token);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("profile", JSON.stringify(res.data.profile));
          localStorage.setItem("account", JSON.stringify(res.data.account));
          router.push("/account");
        }
      }
    } catch (error) {
      // Handle error
      setIsPending(false);
      setTimeout(() => {
        alert("Registration failed. Please try again.");
      }, 100);
    }
  };

  return (
    <div className="lg:pt-5 mb-[74px] min-h-screen">
      <div className="lg:hidden sticky top-0 z-[9]">
        <SmHeaderLoginOrRegister name={t("registerTitle")} />
      </div>

      <section
        className={`lg:max-w-[560px] py-4 mx-auto lg:border rounded lg:bg-white `}
      >
        <div className="text-center font-semibold md:text-xl text-lg pt-0.5 px-2">
          <div className="">{t("title")}</div>
          <div className="border-b pt-[15px] border-gray-300"></div>
        </div>

        {/* form */}
        <section
          className={`px-[25.5px] pt-[18px] space-y-[17px] ${
            locale == "en" ? "font-sans" : ""
          }`}
        >
          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("firstName")}
              <span className="text-red-600 font-bold"> *</span>
            </label>
            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] ${
                  errors.firstName
                    ? "border-red-600 focus:border-red-600"
                    : "focus:border-[#8DBAFA]"
                }`}
                name="firstName"
                type="text"
                value={registerByform.firstName}
                onChange={handleSetRegisterAccountByForm}
              />
              {errors.firstName && (
                <PiWarningCircleLight className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 text-[23px]" />
              )}
            </div>
            {errors.firstName && (
              <p className="text-red-600 text-[12px] tracking-wide">
                {t("errorFirstName")}
              </p>
            )}
          </div>

          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("lastName")}
              <span className="text-red-600 font-bold"> *</span>
            </label>
            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] ${
                  errors.lastName
                    ? "border-red-600 focus:border-red-600"
                    : "focus:border-[#8DBAFA]"
                }`}
                name="lastName"
                type="text"
                value={registerByform.lastName}
                onChange={handleSetRegisterAccountByForm}
              />
              {errors.lastName && (
                <PiWarningCircleLight className="absolute top-1/2 -translate-y-1/2 right-2 text-red-600 text-[23px]" />
              )}
            </div>
            {errors.lastName && (
              <p className="text-red-600 text-[12px] tracking-wide">
                {t("errorLastName")}
              </p>
            )}
          </div>

          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("phoneNum")}
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
                value={registerByform.phoneNum}
                onChange={handleSetRegisterAccountByForm}
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
                value={registerByform.password}
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] 
                  ${
                    errors.password
                      ? "border-red-600 focus:border-red-600"
                      : "focus:border-[#8DBAFA]"
                  }`}
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={(e) => handleSetRegisterAccountByForm(e)}
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

          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              {t("comfirmPw")}
              <span className="text-red-600 font-bold"> *</span>
            </label>

            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] 
                 ${
                   errors.comfirmPw || errors.passwNotMatch
                     ? "border-red-600 focus:border-red-600"
                     : "focus:border-[#8DBAFA]"
                 }`}
                type={showComfirmPassword ? "text" : "password"}
                name="comfirmPw"
                value={registerByform.comfirmPw}
                onChange={(e) => handleSetRegisterAccountByForm(e)}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-600 text-[21px] cursor-pointer"
                onClick={() => setShowComfirmPassword(!showComfirmPassword)}
              >
                {showComfirmPassword ? <PiEyeSlash /> : <PiEyeLight />}
              </div>
            </div>
            {(errors.comfirmPw || errors.passwNotMatch) && (
              <p className="text-red-600 text-[12px] tracking-wide">
                {errors.comfirmPw
                  ? t("errorComfirmPw")
                  : t("errorComfirmPwNotMatch")}
              </p>
            )}
          </div>

          <div className=" space-y-[16.5px]">
            <button
              onClick={handleSubmitRegister}
              className="bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center gap-1"
            >
              <span>{t("submit")}</span>
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
          </div>
        </section>

        <section className="px-[25.5px] pt-[12px]">
          {/* line */}
          <div className="hidden space-x-3">
            <p className="border-b border-gray-300  w-full"></p>
            <p className=" translate-y-1 text-gray-800">{t("or")} </p>
            <p className="border-b border-gray-300  w-full"></p>
          </div>

          {/* logo media login */}
          <div className="hidden items-center justify-center space-x-4 mt-6">
            <button className="select-none focus:outline-none bg-[#03469E] rounded-full w-[38px] h-[38px] flex items-center justify-center text-white">
              <FaFacebookF />
            </button>
            <button className="select-none focus:outline-none bg-[#4285F4] rounded-full w-[38px] h-[38px] flex items-center justify-center text-white">
              <FaGoogle />
            </button>
          </div>

          {/* line */}
          <div className="flex space-x-3 mt-[12px]">
            <p className="border-b border-gray-300  w-full"></p>
            <p className=" translate-y-1 text-gray-800">{t("or")}</p>
            <p className="border-b border-gray-300  w-full"></p>
          </div>
        </section>

        <section
          className={`px-[25.5px] space-y-4 pt-[18px] ${
            locale == "en" ? " font-sans" : ""
          }`}
        >
          <div className="space-y-1">
            <p className="text-[17px]">{t("question")}</p>
            <Link
              href="/login"
              className="bg-[#0096DE] hover:bg-[#0081c0] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center"
            >
              {t("loginBtn")}
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
              {t("description.description_part_4")}{" "}
            </Link>
            {t("description.description_part_5")}
          </p>
        </section>
      </section>
    </div>
  );
}

export default Register;
