"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { useAppContext } from "@/context/GlobalContext";

function SmFooter() {
  const { account } = useAppContext();
  const pathname = usePathname();

  return (
    <div className="lg:hidden border-t border-gray-200 bg-white w-full text-gray-500">
      <div className="flex items-center justify-between md:px-10 px-6 md:py-2 py-2 md:text-5xl text-[27px]">
        <Link
          href="/"
          className={`select-none focus:outline-none outline-none ${
            pathname === "/"
              ? "text-[#0096DE]"
              : "active:text-gray-400 transition-all duration-100"
          }`}
        >
          <FaHome />
        </Link>

        <Link
          href={"/notification"}
          className={`select-none focus:outline-none outline-none ${
            pathname === "/notification"
              ? "text-[#0096DE]"
              : "active:text-gray-400 transition-all duration-100"
          }`}
        >
          <IoMdNotifications className="" />
        </Link>

        <Link
          href={`${
            account !== undefined && account !== null ? "/post" : "/login"
          }`}
          className="select-none focus:outline-none outline-none"
        >
          <div className="relative md:w-[80px] md:h-[80px] w-[45px] h-[45px] rounded-full bg-[#FF8900] overflow-hidden text-white p-2 flex items-center justify-center">
            <MdAddAPhoto className="-translate-x-[1px] -translate-y-[1px]" />
          </div>
        </Link>

        <Link
          href="/"
          className={`select-none focus:outline-none outline-none`}
        >
          <IoChatbubbleEllipsesSharp />
        </Link>

        <Link
          href={`${
            account !== undefined && account !== null ? "/account" : "/login"
          }`}
          className={`select-none focus:outline-none outline-none ${
            pathname === "/account"
              ? "text-[#0096DE]"
              : " active:text-gray-400 transition-all duration-100"
          }`}
        >
          <FaUserCircle />
        </Link>
      </div>
    </div>
  );
}

export default SmFooter;
