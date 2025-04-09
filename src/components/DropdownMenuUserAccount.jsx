import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { IoFolderOutline } from "react-icons/io5";
import { IoMdPower } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import user from "@/assets/user-icon.png";
import { useAppContext } from "@/context/GlobalContext";
import { useTranslations } from "next-intl";

function DropdownMenuUserAccount({
  handleToggleShowMenuUserAccount,
  handleToggleButtonLogout,
}) {
  const { profile } = useAppContext();
  const t = useTranslations("dropDownMenuUserAccount");

  return (
    <section className="w-[258.40px] border border-gray-300 rounded bg-white pb-0.5">
      <section className="px-5 pt-4 pb-1 mb-1 space-y-4 hover:bg-[#f8f9fa] transition-all duration-200 cursor-pointer">
        <Link
          onClick={handleToggleShowMenuUserAccount}
          href={"/account"}
          prefetch={true}
          className="flex space-x-2"
        >
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer border border-gray-500 translate-y-[2.5px]">
            <Image
              className="w-full h-full object-cover object-center"
              src={profile?.photoProfile ? profile?.photoProfile : user}
              width={400}
              height={400}
              alt=""
            />
          </div>
          <div className=" leading-none space-y-1">
            <h1 className="text-[#1C99D4] capitalize">
              {profile?.firstName} {profile?.lastName}
            </h1>
            <p className="text-gray-500 text-[12.5px]">@{profile?.username}</p>
          </div>
        </Link>
        <div className="">
          <Link
            onClick={handleToggleShowMenuUserAccount}
            href={"/account"}
            className="w-full h-[33px] flex items-center justify-center bg-[#EDF7FF] hover:bg-[#cee7fa] transition-all duration-200 text-[#1C99D4] rounded-md"
          >
            <p className=" -translate-y-0.5">{t("account")}</p>
          </Link>
        </div>
      </section>

      <hr />

      {/* my ads,likes,saves */}
      <div>
        <Link
          onClick={handleToggleShowMenuUserAccount}
          href={"/account"}
          prefetch={true}
          className="w-full flex items-center space-x-3.5 px-5 py-2 my-1 hover:bg-[#f8f9fa] transition-all duration-200 text-gray-600"
        >
          <IoFolderOutline className="text-xl" />
          <span className="text-[16px]">{t("myAd")}</span>
        </Link>

        <Link
          onClick={handleToggleShowMenuUserAccount}
          href={"/liked"}
          prefetch={true}
          className="w-full flex items-center space-x-3.5 px-5 py-2 my-1 hover:bg-[#f8f9fa] transition-all duration-200 text-gray-600"
        >
          <FaRegHeart className="text-xl text-gray-600" />
          <span className="text-[16px]">{t("liked")}</span>
        </Link>

        <Link
          onClick={handleToggleShowMenuUserAccount}
          href={"/saved"}
          prefetch={true}
          className="w-full flex items-center space-x-3.5 px-5 py-2 my-1 hover:bg-[#f8f9fa] transition-all duration-200 text-gray-600"
        >
          <FaRegBookmark className="text-xl  text-gray-600" />
          <span className="text-[16px]">{t("saved")}</span>
        </Link>
      </div>

      <hr />

      <Link
        onClick={handleToggleShowMenuUserAccount}
        href={"/setting"}
        prefetch={true}
        className="w-full flex items-center space-x-3.5 px-5 py-2 my-1 hover:bg-[#f8f9fa] transition-all duration-200 text-gray-600"
      >
        <IoSettingsOutline className="text-xl" />
        <span className="text-[16px]">{t("settings")}</span>
      </Link>
      <hr />
      <button
        onClick={handleToggleButtonLogout}
        className="w-full flex items-center space-x-3.5 px-5 py-2 my-1 hover:bg-[#f8f9fa] transition-all duration-200 text-gray-600"
      >
        <span className="">
          <IoMdPower className="text-xl" />
        </span>
        <span className="text-[16px]">{t("logout")}</span>
      </button>
    </section>
  );
}

export default DropdownMenuUserAccount;
