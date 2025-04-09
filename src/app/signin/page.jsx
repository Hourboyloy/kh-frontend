"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@/css/LoadingForBtn.css";

import { PiEyeLight, PiEyeSlash, PiWarningCircleLight } from "react-icons/pi";
import { useAppContext } from "@/context/GlobalContext";

function Login() {
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
        if (res.data.account.type === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/account");
        }
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
    <div className="pt-28 h-screen">
      <section className="max-w-[560px] py-4 mx-auto border rounded bg-white">
        <div className="text-center font-semibold text-xl pt-0.5 px-2">
          <h1 className="">Log in to manage website</h1>
          <div className="border-b pt-[15px] border-gray-300"></div>
        </div>

        <form method="post" className="px-[25.5px] pt-[18px] space-y-5">
          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              Phone Number
              <span className="text-red-600 font-bold">*</span>
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
                Please enter your phone number
              </p>
            )}
          </div>

          <div className="space-y-[4.62px]">
            <label className="text-[15px]">
              Password
              <span className="text-red-600 font-bold">*</span>
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
                Please enter your password
              </p>
            )}
          </div>

          <div className=" space-y-[16.5px]">
            <button
              onClick={handleSubmit}
              className="bg-[#0096DE] hover:bg-[#0081c0] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center gap-1"
            >
              <span>Submit</span>
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
              <Link href="/" className="focus:outline-none">
                Forgot Password Or Account
              </Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
