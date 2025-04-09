"use client";
import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppContext } from "@/context/GlobalContext";
import { TiArrowSortedDown } from "react-icons/ti";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

// Dynamic imports for components
const SettingAccount = dynamic(() => import("@/components/AccountSetting"), {
  ssr: false,
});
const ButtonDeleteAccount = dynamic(
  () => import("@/components/buttons/ButtonDeleteAccount"),
  { ssr: false }
);
const ButtonLogout = dynamic(
  () => import("@/components/buttons/ButtonLogout"),
  { ssr: false }
);
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});
const DropdownLanguage = dynamic(
  () => import("@/components/DropdownLanguage"),
  { ssr: false }
);

function Setting() {
  const locale = useLocale();
  const t = useTranslations("SettingsPage");
  const { profile, account } = useAppContext();
  const dropdownLanguageRef = useRef(null);
  const BtnLogoutRef = useRef(null);
  const BtnDeleteRef = useRef(null);
  const [isOpenBtn, setIsOpenBtn] = useState(true);
  const [dropdownLanguage, setDropdownLanguage] = useState(false);
  const [ToggleButtonDelete, setToggleButtonDelete] = useState(false);
  const [ToggleButtonLogout, setToggleButtonLogout] = useState(false);

  const handleToggleButtonLogout = useCallback(() => {
    setToggleButtonLogout((prev) => !prev);
  }, []);
  const handleDropdownLanguage = () => {
    setDropdownLanguage(!dropdownLanguage);
  };

  const handleOpenBtn = useCallback(() => {
    setIsOpenBtn((prev) => !prev);
  }, []);

  const handleToggleButtonDelete = useCallback(() => {
    setToggleButtonDelete((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((e) => {
    if (
      dropdownLanguageRef.current &&
      !dropdownLanguageRef.current.contains(e.target)
    ) {
      setDropdownLanguage(false);
    }
    if (BtnLogoutRef.current && !BtnLogoutRef.current.contains(e.target)) {
      setToggleButtonLogout(false);
    }
    if (BtnDeleteRef.current && !BtnDeleteRef.current.contains(e.target)) {
      setToggleButtonDelete(false);
    }
  }, []);

  useEffect(() => {
    if (dropdownLanguage || ToggleButtonLogout || ToggleButtonDelete) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, [
    dropdownLanguage,
    ToggleButtonLogout,
    ToggleButtonDelete,
    handleClickOutside,
  ]);

  return (
    <div className="">
      <DropdownLanguage
        dropdownRef={dropdownLanguageRef}
        handleDropdownLanguage={handleDropdownLanguage}
        dropdownLanguage={dropdownLanguage}
        setDropdownLanguage={setDropdownLanguage}
        t={t}
      />
      <ButtonDeleteAccount
        BtnDeleteRef={BtnDeleteRef}
        ToggleButtonDelete={ToggleButtonDelete}
        setToggleButtonDelete={setToggleButtonDelete}
        handleToggleButtonDelete={handleToggleButtonDelete}
        t={t}
      />
      <ButtonLogout
        BtnLogoutRef={BtnLogoutRef}
        ToggleButtonLogout={ToggleButtonLogout}
        setToggleButtonLogout={setToggleButtonLogout}
        handleToggleButtonLogout={handleToggleButtonLogout}
        t={t}
      />

      <div className="lg:hidden sticky top-0 z-[9]">
        <SmNavNormal name={t("settingTitle")} />
      </div>

      <div className="max-w-[820px] mx-auto lg:pt-5 pb-6 lg:pb-0">
        {/* account setting */}
        {account && (
          <SettingAccount
            account={account}
            profile={profile}
            isOpenBtn={isOpenBtn}
            handleToggleButtonDelete={handleToggleButtonDelete}
            handleOpenBtn={handleOpenBtn}
            t={t}
          />
        )}
        <p className="uppercase text-[14px] font-semibold text-gray-500 pl-[12px] pt-[13px] pb-[12px]">
          {t("appSetting")}
        </p>

        <div className="bg-white select-none">
          <div
            onClick={handleDropdownLanguage}
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.5px] text-[14.5px] border-gray-100 flex items-center border-b justify-between cursor-pointer"
          >
            <span> {t("language")}</span>
            <div className="flex items-center space-x-[2px] text-gray-500">
              <p>{locale == "en" ? "English" : "ខ្មែរ"}</p>
              <span className="text-[16.5px] text-gray-400 translate-y-[2px]">
                <TiArrowSortedDown />
              </span>
            </div>
          </div>
        </div>

        <p className="uppercase text-[14px] font-semibold text-gray-500 pl-[12px] pt-[13px] pb-[12px]">
          {t("spp")}
        </p>

        <section className="bg-white select-none">
          <Link
            href="/"
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
          >
            {t("postingRules")}
          </Link>
          <Link
            href="/"
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
          >
            {t("privacyPolicy")}
          </Link>
          <Link
            href="/"
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
          >
            {t("contactUs")}
          </Link>
          <Link
            href="/"
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
          >
            {t("saftyTips")}
          </Link>

          <Link
            href="/"
            className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
          >
            {t("feedback")}
          </Link>
        </section>

        <div
          className={`flex items-center justify-center pt-[14px] px-10 md:px-0 ${
            account ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div
            onClick={handleToggleButtonLogout}
            className="h-[47px] lg:w-[730px] md:w-[530px] w-full bg-white rounded-full flex items-center justify-center select-none focus:outline-none text-red-600 font-semibold transition-all duration-300 hover:bg-[#F1F1F1] text-[16.5px] cursor-pointer"
          >
            {t("logout")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
