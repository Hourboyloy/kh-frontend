import React from "react";
import Image from "next/image";
import user from "@/assets/user-icon.png";
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

function AccountSetting({
  account,
  profile,
  isOpenBtn,
  handleToggleButtonDelete,
  handleOpenBtn,
  t,
}) {
  return (
    <div>
      <Link
        href={`/${account?.username}`}
        prefetch={true}
        className="bg-white select-none focus:outline-none flex items-center justify-between pl-[12px] pr-[12.5px] py-[10.2px] cursor-pointer"
      >
        <div className="flex items-center space-x-[9px]">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <Image
              src={profile?.photoProfile ? profile?.photoProfile : user}
              className="w-full h-full object-cover object-center"
              width={1000}
              height={1000}
              alt="profile picture"
            />
          </div>
          <div className=" space-y-[2.5px] pt-[1px]">
            <h1 className=" font-bold text-gray-900 capitalize">
              {profile?.firstName} {profile?.lastName}
            </h1>
            <p className="text-xs text-gray-500">
              {account?.username && "@" + account?.username}
            </p>
          </div>
        </div>
        <div>
          <MdArrowForwardIos className="text-gray-500 text-lg translate-y-[1.5px]" />
        </div>
      </Link>
      <p className="uppercase text-[14px] font-semibold text-gray-500 pl-[12px] pt-[13px] pb-[12px]">
        {t("accountSetting")}
      </p>

      <section className="bg-white select-none">
        <Link
          href="/setting/edit-profile"
          prefetch={true}
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
        >
          {t("editProfile")}
        </Link>

        <Link
          href="/setting/change-pw"
          prefetch={true}
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[12.5px] text-[14.5px] border-gray-100 flex items-center border-b"
        >
          {t("changePw")}
        </Link>

        <Link
          href="/setting/change-username"
          prefetch={true}
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.5px] text-[14.5px] border-gray-100 flex items-center border-b justify-between"
        >
          <span> {t("changeUsername")}</span>
          <div
            className={`flex items-center space-x-[6.5px] ${
              account?.username ? "block" : "hidden"
            }`}
          >
            <p>{account?.username}</p>
            <span className="text-xs text-gray-400">
              <MdArrowForwardIos />
            </span>
          </div>
        </Link>

        <Link
          href="/setting/change-phone-number"
          prefetch={true}
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b justify-between"
        >
          <span> {t("changePhoneNum")}</span>
          <div
            className={`flex items-center space-x-[6.5px] ${
              account?.phoneNum ? "block" : "hidden"
            }`}
          >
            <p>{account?.phoneNum}</p>
            <span className="text-xs text-gray-400">
              <MdArrowForwardIos />
            </span>
          </div>
        </Link>

        <div className="h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b justify-between">
          <span>{t("autoUpdateProfile")}</span>
          <div className="flex items-center">
            <button
              onClick={handleOpenBtn}
              className={`cursor-pointer w-[47px] h-[26px] rounded-full ${
                isOpenBtn ? "bg-[#028DCF]" : "bg-[#CCCCCC]"
              }`}
            >
              <p
                className={`bg-white h-[18px] w-[18px] rounded-full translate-x-[1.5px] transition-all transform duration-200 ${
                  isOpenBtn ? "translate-x-[27.4px]" : "translate-x-[1.5px]"
                }`}
              ></p>
            </button>
          </div>
        </div>

        <div
          onClick={handleToggleButtonDelete}
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b justify-between"
        >
          {t("deleteAccount")}
        </div>

        <Link
          href="/"
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b"
        >
          {t("privacy")}
        </Link>

        <Link
          href="/"
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b"
        >
          {t("membershipInfor")}
        </Link>

        <Link
          href="/billing-addresses"
          className="focus:outline-none h-[47.30px] pl-[14px] pr-[11.1px] text-[14.5px] border-gray-100 flex items-center border-b"
        >
          {t("billingAddress")}
        </Link>
      </section>
    </div>
  );
}

export default AccountSetting;
