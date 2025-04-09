"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { RiErrorWarningFill } from "react-icons/ri";
import dynamic from "next/dynamic";
import { IoMdArrowBack } from "react-icons/io";
import { useLocale } from "next-intl";
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });
function Page() {
  const router = useRouter();
  const locale = useLocale();
  const keyword = useSearchParams().get("keyword");
  return (
    <div>
      <div className="top-0 sticky z-[9] lg:hidden w-full">
        <div className="w-full bg-[#028DCE] flex items-center space-x-3 px-3 py-[9.2px]">
          <button
            onClick={() => router.back()}
            className="outline-none focus:outline-none select-none flex items-center"
          >
            <IoMdArrowBack size={24} className="text-white" />
          </button>
          <div className="text-white text-lg">
            {locale == "en" ? (
              <span className="font-sans">Search:</span>
            ) : (
              <span className="font-battambang">ស្វែងរក:</span>
            )}
            <span className="pl-1.5 font-sans">{keyword}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center leading-none pt-4 space-y-2">
        <RiErrorWarningFill className="text-[#9A9A9A] text-7xl" />
        <p className="text-[#9A9A9A] font-sans">No result!</p>
      </div>

      <div className="md:mb-28 lg:mb-20"></div>

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Page;
