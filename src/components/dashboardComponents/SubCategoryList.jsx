"use client";
import React from "react";
import Image from "next/image";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

function SubCategoryList({
  subCategories,
  handleBackToMainCategories,
  handleOpenAddCategory,
  handleOpenDelete,
  selectedCategoryId,
  handleOpenUpdateCategory,
  handleGetFields,
  locale,
  t,
}) {
  return (
    <div className=" ">
      {locale == "en" ? (
        <h1 className="lg:text-2xl text-xl font-semibold text-[#0098D5] mb-3.5 px-4 md:px-0 font-sans">
          Categories
        </h1>
      ) : (
        <h1 className="lg:text-2xl text-xl font-semibold text-[#0098D5] mb-3.5 px-4 md:px-0">
          បញ្ជីប្រភេទ
        </h1>
      )}

      <div className="flex justify-between items-center my-3 px-4 md:px-0">
        <button
          onClick={handleBackToMainCategories}
          className="flex hover:translate-y-0.5 select-none items-center px-4 py-2 bg-white text-sm font-medium rounded-lg shadow hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
        >
          <FaArrowLeft className="transition-transform duration-200" />
          <span className="ml-2">{t("backBtn")}</span>
        </button>
        <button
          onClick={handleOpenAddCategory}
          className="flex hover:translate-y-0.5 select-none items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 focus:outline-none"
        >
          <FaPlus className="mr-2 text-sm" />
          {t("addBtn")}
        </button>
      </div>

      <ul className="bg-white md:rounded-lg md:p-4 md:border border-t md:shadow-sm">
        {/* Table Header */}
        <li
          className={`grid md:grid-cols-7 grid-cols-5 md:gap-6 gap-3 md:px-4 px-3 bg-gray-100 py-3 text-gray-800 font-semibold text-sm md:rounded-md ${
            locale == "en" ? " font-sans" : ""
          }`}
        >
          <div className="flex md:space-x-10 space-x-6 col-span-2">
            <span>#</span>
            <span>{t("name")}</span>
          </div>
          <span>{t("photo")}</span>
          <span className="flex justify-center text-nowrap">{t("totalField")}</span>
          <span className="md:flex hidden">{t("createdAt")}</span>
          <span className="md:flex hidden">{t("updatedAt")}</span>
          <span>{t("actions")}</span>
        </li>
        {/* Category Items */}
        {subCategories?.length > 0 ? (
          subCategories.map((subCategory, index) => (
            <li
              key={`${subCategory.name}-${index}`}
              className="py-2 md:px-4 px-3 hover:bg-gray-50 transition-all text-gray-700 text-sm border-b last:border-none"
            >
              <div className="grid md:grid-cols-7  grid-cols-5 md:gap-6 gap-3 items-center">
                <div className="flex md:space-x-10 space-x-6 items-center col-span-2">
                  <p className="font-medium">{index + 1}</p>
                  {locale == "en" ? (
                    <p className="truncate font-sans">
                      {subCategory?.name || "N/A"}
                    </p>
                  ) : (
                    <p className="truncate">{subCategory?.khName || "N/A"}</p>
                  )}
                </div>

                <div>
                  {subCategory?.photo ? (
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden border">
                      <Image
                        className="w-full h-full object-cover object-center"
                        width={50}
                        height={50}
                        src={subCategory.photo}
                        priority
                        alt={subCategory?.name || "Category Image"}
                      />
                    </div>
                  ) : (
                    <div className="w-[50px] h-[50px] rounded-full border flex items-center justify-center bg-gray-100 text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div
                  onClick={() => handleGetFields(index)}
                  className="text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 select-none"
                >
                  {subCategory?.fields?.length || 0}
                </div>

                <p className="text-gray-500 text-sm md:flex hidden">
                  {subCategory?.createdAt
                    ? new Date(subCategory.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <p className="text-gray-500 text-sm md:flex hidden">
                  {subCategory?.updatedAt
                    ? new Date(subCategory.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="md:space-x-3 space-y-1 md:space-y-0">
                  <button
                    onClick={() =>
                      handleOpenUpdateCategory(
                        selectedCategoryId,
                        subCategory._id
                      )
                    }
                    className="text-blue-500 hover:underline"
                  >
                    {t("editBtn")}
                  </button>
                  <button
                    onClick={() =>
                      handleOpenDelete(selectedCategoryId, subCategory._id)
                    }
                    className="text-red-500 hover:underline"
                  >
                    {t("deleteBtn")}
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="py-5 text-center text-gray-500">
            No categories available.
          </li>
        )}
      </ul>
    </div>
  );
}

export default SubCategoryList;
