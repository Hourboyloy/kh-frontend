"use client";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

function SubCategoryList({
  categories,
  displayComponent,
  handleGetForm,
  handleBackMainCategory,
  locale,
}) {
  return (
    <div className="">
      <div className="bg-[#028DCF] h-[50px] font-semibold text-white text-lg flex items-center px-2 sticky top-0 lg:static">
        <button
          onClick={handleBackMainCategory}
          className={`h-full px-0.5 ${
            displayComponent?.mainCategory ? "hidden" : ""
          }`}
        >
          <MdKeyboardArrowLeft size={32} />
        </button>

        {locale == "en" ? (
          <p className="px-2.5">Choose a Category</p>
        ) : (
          <p className="px-2.5">ជ្រើសរើសប្រភេទ</p>
        )}
      </div>
      <ul className="bg-white">
        {categories?.map((category, index) => (
          <li
            key={category + index}
            onClick={() =>
              handleGetForm(
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

export default SubCategoryList;
