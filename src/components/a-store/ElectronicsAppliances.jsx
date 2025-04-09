"use client";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState } from "react";

function ElectronicsAppliances() {
  const [condition, setCondition] = useState("");
  return (
    <div>
      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[20px] space-y-[17.5px]">
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
      </div>
    </div>
  );
}

export default ElectronicsAppliances;
