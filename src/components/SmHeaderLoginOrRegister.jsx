"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";

function SmHeaderLoginOrRegister({ name, locale }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between bg-[#028dce] text-white pl-3.5 pr-4 py-[10px] space-x-4">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => router.back()}
          className="select-none focus:outline-none active:text-gray-300 transition-all duration-300"
        >
          <LuArrowLeft className="text-2xl" />
        </button>
        <h2
          className={`capitalize font-semibold text-lg -translate-y-[1.5px] ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          {name}
        </h2>
      </div>
      <div>
        <Link href={"/setting"} className="select-none focus:outline-none">
          <IoMdSettings className="text-white active:text-gray-300 transition-all duration-300 text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default SmHeaderLoginOrRegister;
