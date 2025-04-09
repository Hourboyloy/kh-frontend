"use client";
import React from "react";
import Image from "next/image";

function MainCategoryList({
  categories,
  handleGetSubCategories,
  handleOpenDelete,
  handleOpenUpdateCategory,
  locale,
  t,
}) {
  return (
    <div className="">
      {locale == "en" ? (
        <h1 className="lg:text-2xl text-xl font-semibold text-[#0098D5] mb-3.5 px-4 md:px-0 font-sans">
          Main Categories
        </h1>
      ) : (
        <h1 className="lg:text-2xl text-xl font-semibold text-[#0098D5] mb-3.5 px-4 md:px-0">
          បញ្ជីប្រភេទមេ
        </h1>
      )}

      <ul className="bg-white rounded-lg md:p-4 border md:shadow-sm">
        {/* Table Header */}
        <li
          className={`grid md:grid-cols-6 grid-cols-4 gap-3 md:gap-6 md:px-4 px-3 bg-gray-100 py-3 text-gray-800 font-semibold text-sm md:rounded-md ${
            locale == "en" ? " font-sans" : ""
          }`}
        >
          <div className="flex md:space-x-10 space-x-6 col-span-2">
            <span>#</span>
            <span>{t("name")}</span>
          </div>
          <span>{t("photo")}</span>
          <span className="text-nowrap text-center">{t("totalSub")}</span>
          <span className="text-nowrap hidden md:flex">{t("createdAt")}</span>
          <span className="text-nowrap hidden md:flex">{t("updatedAt")}</span>
          <span className="hidden">{t("actions")}</span>
        </li>

        {/* Category Items */}
        {categories?.length > 0 ? (
          categories.map((category, index) => (
            <li
              key={`${category + index}`}
              className="py-2 md:px-4 px-3 hover:bg-gray-50 transition-all text-gray-700 text-sm border-b last:border-none"
            >
              <div className="grid md:grid-cols-6 grid-cols-4 md:gap-6 gap-3 items-center">
                <div className="flex md:space-x-10 space-x-6 items-center col-span-2">
                  <p className="font-medium">{index + 1}</p>
                  {locale == "en" ? (
                    <p className="truncate font-sans">
                      {category?.name || "N/A"}
                    </p>
                  ) : (
                    <p className="truncate">{category?.khName || "N/A"}</p>
                  )}
                </div>

                <div>
                  {category?.photo ? (
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden border">
                      <Image
                        className="w-full h-full object-cover object-center"
                        width={50}
                        height={50}
                        src={category.photo}
                        priority
                        alt={category?.name || "Category Image"}
                      />
                    </div>
                  ) : (
                    <div className="w-[50px] h-[50px] rounded-full border flex items-center justify-center bg-gray-100 text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <p
                  onClick={() => handleGetSubCategories(index)}
                  className="text-center cursor-pointer hover:bg-gray-100 transition-all duration-200 select-none"
                >
                  {category?.subcategories?.length || 0}
                </p>

                <p className="text-gray-500 text-sm md:flex hidden">
                  {category?.createdAt
                    ? new Date(category.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <p className="text-gray-500 text-sm md:flex hidden">
                  {category?.updatedAt
                    ? new Date(category.updatedAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="md:space-x-3 space-y-1 md:space-y-0 hidden">
                  <button
                    onClick={() => handleOpenUpdateCategory(category._id, null)}
                    className="text-blue-500 hover:underline"
                  >
                    {t("editBtn")}
                  </button>
                  <button
                    onClick={() => handleOpenDelete(category._id, null)}
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

export default MainCategoryList;
