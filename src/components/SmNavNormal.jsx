"use client";
import React from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

function SmNavNormal({ name }) {
  const router = useRouter();
  const locale = useLocale();

  return (
    <div className="flex items-center bg-[#028dce] text-white pl-3.5 py-3 space-x-4">
      <button
        onClick={() => router.back()}
        className="select-none focus:outline-none active:text-gray-300 transition-all duration-300"
      >
        <LuArrowLeft className="text-2xl" />
      </button>
      <h2
        className={`capitalize font-semibold font-sans text-lg ${
          locale == "en" ? " font-sans" : " font-battambang"
        }`}
      >
        {name}
      </h2>
    </div>
  );
}

export default SmNavNormal;
