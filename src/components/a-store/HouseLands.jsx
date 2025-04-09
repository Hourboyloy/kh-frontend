"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function HouseLands() {
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");

  const handleGetSize = (val) => {
    const validSize = val.replace(/[^0-9.]/g, "");
    if ((validSize.match(/\./g) || []).length <= 1) {
      setSize(validSize);
    }
  };
  return (
    <div>
      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[20px] space-y-[17.5px]">
        {/* type2 */}
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
          <label className="text-[15px]">Bedroom</label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
              <option value="">6</option>
              <option value="More+">More+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">Bathroom</label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
              <option value="">6</option>
              <option value="More+">More+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">Facing</label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="East">East</option>
              <option value="North">North</option>
              <option value="Northeast">Northeast</option>
              <option value="Northwest">Northwest</option>
              <option value="South">South</option>
              <option value="Southeast">Southeast</option>
              <option value="Southwest">Southwest</option>
              <option value="West">West</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">Size</label>
          <div className="">
            <input
              type="text"
              name="size"
              placeholder=""
              value={size}
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
              onChange={(e) => handleGetSize(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseLands;
