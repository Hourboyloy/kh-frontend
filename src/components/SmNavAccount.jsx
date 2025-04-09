"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdSettings } from "react-icons/io";
import userIcons from "@/assets/user-icon.png";

function SmNavAccount({ url, name }) {
  return (
    <div className="flex items-center justify-between bg-[#028dce] text-white pl-3.5 pr-4 py-[6.5px] space-x-4">
      <div className="flex items-center space-x-3">
        <Link href={"/setting/edit-profile"}>
          <div className=" w-[39px] h-[39px] overflow-hidden border-[2.2px] border-gray-50 rounded-full">
            <Image
              className="h-full w-full object-cover object-center"
              src={url ? url : userIcons}
              width={1000}
              height={500}
              alt=""
            />
          </div>
        </Link>
        <h2 className="capitalize font-semibold font-sans text-lg -translate-y-[1.5px]">
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

export default SmNavAccount;
