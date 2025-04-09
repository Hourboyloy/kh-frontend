"use client";
import React from "react";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

function MainCategoryList({ categories, handleGetSubCategory, locale }) {
  return (
    <div className="min-h-screen lg:h-fit">
      <div className="bg-[#028DCF] h-[50px] font-semibold text-white text-lg sticky top-0 lg:static flex items-center px-2">
        <Link
          href={"/"}
          className={`h-full px-0.5 flex items-center lg:hidden`}
        >
          <MdKeyboardArrowLeft size={32} />
        </Link>
        {locale == "en" ? (
          <p className={`px-2.5 lg:px-3`}>Choose a Category</p>
        ) : (
          <p className={`px-2.5 lg:px-3`}>ជ្រើសរើសប្រភេទ</p>
        )}
      </div>

      <ul className="bg-white">
        {categories?.map((category, index) => (
          <li
            key={category + index}
            onClick={() =>
              handleGetSubCategory(
                locale == "en" ? category?.name : category?.khName,
                category?.name,
                index
              )
            }
            className={` cursor-pointer ${
              index === categories.length - 1 ? "" : "border-b border-gray-100"
            }`}
          >
            <div className="h-[75px] flex items-center justify-between hover:bg-[#f7f7f7] transition-all px-4">
              <div className="flex items-center space-x-2.5">
                <Image
                  src={category?.photo}
                  width={500}
                  height={500}
                  className="w-[55px] h-[55px] object-cover object-center"
                  alt="img"
                />
                {locale == "en" ? (
                  <p>{category?.name}</p>
                ) : (
                  <p>{category?.khName}</p>
                )}
              </div>
              <MdKeyboardArrowRight size={20} className="text-gray-400" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainCategoryList;
