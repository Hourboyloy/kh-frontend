"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { IoIosShareAlt } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import Image from "next/image";

function SmHeader({
  currentAt,
  name,
  searchKeyword,
  handleSave,
  handleRemoveSave,
  isSaved,
  handleClickShare,
  locale,
}) {
  const router = useRouter();

  const changeLanguage = (newLocale) => {
    if (!router) return;

    const currentPath = window.location.pathname.replace(
      /^\/(kh|en)/,
      `/${newLocale}`
    );

    router.push(currentPath);
  };

  return (
    <div className="w-full bg-[#028DCE] flex items-center justify-between px-3 py-[9.2px] overflow-hidden">
      <div>
        {currentAt == "home" ? (
          <button
            onClick={() => changeLanguage(locale === "en" ? "kh" : "en")}
            className="select-none focus:outline-none w-[24.9px] h-[24.9px]"
          >
            <Image
              className="w-full h-full object-cover object-center"
              src={require(`../assets/${
                locale === "en" ? "place.png" : "en.webp"
              }`)}
              alt="Location Icon"
            />
          </button>
        ) : (
          <button
            onClick={() => router.back()}
            className="outline-none focus:outline-none select-none flex items-center"
          >
            <IoMdArrowBack size={24} className="text-white" />
          </button>
        )}
      </div>

      <div className="text-white text-lg flex items-center space-x-1">
        <p>
          {name} {searchKeyword && ":"}
        </p>
        {searchKeyword && (
          <div className="">
            <p className="md:hidden">
              {searchKeyword.length > 25
                ? searchKeyword.slice(0, 25) + "..."
                : searchKeyword}
            </p>

            <p className=" hidden md:block">
              {searchKeyword.length > 75
                ? searchKeyword.slice(0, 75) + "..."
                : searchKeyword}
            </p>
          </div>
        )}
      </div>

      <div>
        {currentAt === "home" || currentAt === "search" ? (
          <div className="text-white flex items-center gap-3">
            <Link
              href={`/search-main`}
              className="outline-none focus:outline-none select-none flex items-center"
            >
              <BsSearch size={20} className="text-white" />
            </Link>
          </div>
        ) : currentAt === "details" ? (
          <div className="text-white flex items-center gap-3">
            {isSaved ? (
              <button
                onClick={handleRemoveSave}
                className=" outline-none focus:outline-none"
              >
                <FaBookmark size={20} />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className=" outline-none focus:outline-none"
              >
                <FaRegBookmark size={20} />
              </button>
            )}
            <button
              onClick={handleClickShare}
              className="outline-none focus:outline-none"
            >
              <IoIosShareAlt size={25} />
            </button>
          </div>
        ) : (
          <div className="text-white flex items-center gap-3">
            <IoIosShareAlt size={25} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SmHeader;
