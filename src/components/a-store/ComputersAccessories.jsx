"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState } from "react";

function ComputersAccessories() {
  const [condition, setCondition] = useState("");
  return (
    <div>
      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[20px] space-y-[17.5px]">
        {/* brand,type */}

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Condition <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center space-x-4">
            <label
              className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none 
                 ${
                   condition === "new"
                     ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                     : "border-gray-300 text-gray-800"
                 }`}
            >
              <input
                type="radio"
                name="condition"
                value="new"
                checked={condition == "new"}
                className="hidden"
                onChange={(e) => setCondition(e.target.value)}
              />
              New
            </label>

            <label
              className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none
                  ${
                    condition === "used"
                      ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                      : "border-gray-300 text-gray-800"
                  }`}
            >
              <input
                type="radio"
                name="condition"
                value="used"
                checked={condition == "plate number"}
                className="hidden"
                onChange={(e) => setCondition(e.target.value)}
              />
              Used
            </label>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            VGA <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="Integrated">Integrated</option>
              <option value="2GB & under">2GB & under</option>
              <option value="4GB">4GB</option>
              <option value="6GB">6GB</option>
              <option value="8GB">8GB</option>
              <option value="12GB">12GB</option>
              <option value="16GB & Larger">16GB & Larger</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            CPU <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="M1">M1</option>
              <option value="M1 Pro">M1 Pro</option>
              <option value="M1 Max">M1 Max</option>
              <option value="M1 Ultra">M1 Ultra</option>

              <option value="M2">M2</option>
              <option value="M2 Pro">M2 Pro</option>
              <option value="M2 Max">M2 Max</option>
              <option value="M2 Ultra">M2 Ultra</option>

              <option value="M3">m3</option>
              <option value="M3 Pro">m3 pro</option>
              <option value="M3 Max">m3 max</option>
              <option value="M3 Ultra">m3 ultra</option>

              <option value="Intel Core 2">Intel Core 2</option>
              <option value="Intel Core i3">Intel Core i3</option>
              <option value="Intel Core i5">Intel Core i5</option>
              <option value="Intel Core i7">Intel Core i7</option>
              <option value="Intel Core i9">Intel Core i9</option>
              <option value="Intel Xeon">Intel Xeon</option>
              <option value="Intel Celeron">Intel Celeron</option>
              <option value="Intel Pentium">Intel Pentium</option>

              <option value="AMD Ryzen">AMD Ryzen</option>
              <option value="AMD Ryzen 3">AMD Ryzen 3</option>
              <option value="AMD Ryzen 5">AMD Ryzen 5</option>
              <option value="AMD Ryzen 7">AMD Ryzen 7</option>
              <option value="AMD Ryzen 9">AMD Ryzen 9</option>
              <option value="other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            RAM <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="2GB & Under">2GB & Under</option>
              <option value="3GB">3GB</option>
              <option value="4GB">3GB</option>
              <option value="5GB">5GB</option>
              <option value="6GB">6GB</option>
              <option value="8GB">8GB</option>
              <option value="12GB">12GB</option>
              <option value="16GB">16GB</option>
              <option value="24GB">24GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
              <option value="64GB & Larger">64GB & Larger</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        {/* laptop storage */}
        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Storage <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="128GB & Under">128GB & Under</option>
              <option value="250GB - 256GB">250GB - 256GB</option>
              <option value="250GB - 256GB">500GB - 512GB</option>
              <option value="1TB">1TB</option>
              <option value="2TB & Larger">2TB & Larger</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        {/*screen destop,laptop */}
        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Screen Size <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="10.9 & Under">10.9&quot; & Under</option>
              <option value="11 - 11.9">11&quot; - 11.9&quot;</option>
              <option value="12 - 12.9">12&quot; - 12.9&quot;</option>
              <option value="13 - 13.9">13&quot; - 13.9&quot;</option>
              <option value="14 - 14.9">14&quot; - 14.9&quot;</option>
              <option value="15 - 15.9">15&quot; - 15.9&quot;</option>
              <option value="16 - 16.9">16&quot; - 16.9&quot;</option>
              <option value="17 & Larger">17&quot; & Larger</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        {/*screen all in one,monitor */}
        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Screen Size <span className="text-red-600"> *</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="22.9 & Under">22.9&quot; & Under</option>
              <option value="23 - 26.9">23&quot; - 26.9&quot;</option>
              <option value="27 - 32.9">27&quot; - 32.9&quot;</option>
              <option value="33 - 49">33&quot; - 49&quot;</option>
              <option value="50 & Larger">50&quot; & Larger</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComputersAccessories;
