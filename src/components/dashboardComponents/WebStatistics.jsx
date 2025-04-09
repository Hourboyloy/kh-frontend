import React from "react";
import { FaEye, FaUsers, FaProductHunt } from "react-icons/fa";
import { BiSolidCategory, BiSolidCategoryAlt } from "react-icons/bi";

function WebStatistics({
  totalsProducts,
  totalViews,
  totalUsers,
  totalMainCategory,
  totalSubCategories,
}) {
  return (
    <div className="">
      <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 md:gap-8 gap-4 font-sans">
        <div className="bg-white rounded-xl flex items-center px-2 py-8 space-x-6">
          <button className="p-3.5 bg-[#9694FF] cursor-text rounded-lg focus:outline-none">
            <FaEye className="text-xl text-white" />
          </button>
          <div className="space-y-[4.5px]">
            <p className="text-sm text-gray-500 font-semibold">Total Views</p>
            <p className=" font-bold text-gray-800">
              {totalViews || "1000.000"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl flex items-center px-2 py-8 space-x-6">
          <button className="p-3.5 bg-[#57CAEB] cursor-text rounded-lg focus:outline-none">
            <FaUsers className="text-xl text-white" />
          </button>
          <div className="space-y-[4.5px]">
            <p className="text-sm text-gray-500 font-semibold">Total Users</p>
            <p className=" font-bold text-gray-800">
              {totalUsers || "1000.000"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl flex items-center px-2 py-8 space-x-6">
          <button className="p-3.5 bg-[#5DDAB4] cursor-text rounded-lg focus:outline-none">
            <FaProductHunt className="text-xl text-white" />
          </button>
          <div className="space-y-[4.5px]">
            <p className="text-sm text-gray-500 font-semibold">
              Total Products
            </p>
            <p className=" font-bold text-gray-800">
              {totalsProducts || "1000.000"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl flex items-center px-2 py-8 space-x-6">
          <button className="p-3.5 bg-[#FF7976] cursor-text rounded-lg focus:outline-none">
            <BiSolidCategory className="text-xl text-white" />
          </button>
          <div className="space-y-[4.5px]">
            <p className="text-sm text-gray-500 font-semibold">
              Main Categories
            </p>
            <p className=" font-bold text-gray-800">
              {totalMainCategory || "10.000"}{" "}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl flex items-center px-2 py-8 space-x-6">
          <button className="p-3.5 bg-[#0098D5] cursor-text rounded-lg focus:outline-none">
            <BiSolidCategoryAlt className="text-xl text-white" />
          </button>
          <div className="space-y-[4.5px]">
            <p className="text-sm text-gray-500 font-semibold">
              Sub Categories
            </p>
            <p className=" font-bold text-gray-800">
              {totalSubCategories || "100.000"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WebStatistics;
