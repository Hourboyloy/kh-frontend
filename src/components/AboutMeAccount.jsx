import React, { useState, useEffect } from "react";
import { TbWorld } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from "next/link";

function AboutMeAccount({ t, account, locale }) {
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);
  return (
    <div
      className={`h-[156.55px] bg-white shadow px-[17px] font-sans flex flex-col pt-[19px] pb-[16px] ${
        locale == "en" ? "" : "font-battambang"
      }`}
    >
      <div className="mb-auto space-y-3 pb-[8px]">
        <h2 className="font-semibold text-gray-900 text-xl">{t("overview")}</h2>
        <p className="flex items-center space-x-2 ">
          <IoMdCheckmarkCircleOutline size={20} />
          <span className="text-[16px] text-gray-800">
            {account?.isVerify ? (
              <span>{t("verified")}</span>
            ) : (
              <span className="text-gray-700">{t("notVerified")}</span>
            )}
          </span>
        </p>
      </div>
      <div className="border-t border-gray-200 pt-[13px]">
        <Link href={``} target="_blank" className="flex items-center space-x-2">
          <TbWorld />
          <span className="text-[#028DCF] text-[15px]">
            {baseUrl}/{account?.username}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default AboutMeAccount;
