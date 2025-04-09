"use client";
import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

function Jobs() {
  const [minSalary, setMinSalary] = useState("");

  const handleSetMinSalary = (val) => {
    const validMinSalary = val.replace(/[^0-9.]/g, "");
    if ((validMinSalary.match(/\./g) || []).length <= 1) {
      setMinSalary(validMinSalary);
    }
  };
  return (
    <div>
      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[20px] space-y-[17.5px]">
        {/* type */}

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Experience <span className="text-red-600">*</span>
          </label>
          <div className="relative w-full">
            <select
              className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
            >
              <option value=""></option>
              <option value="No Experience">No Experience</option>
              <option value="1 Year+">1 Year+</option>
              <option value="2 Year+">2 Year+</option>
              <option value="3 Year+">3 Year+</option>
              <option value="4 Year+">4 Year+</option>
              <option value="5 Year+">5 Year+</option>
              <option value="6 Year+">6 Year+</option>
              <option value="7 Year+">7 Year+</option>
              <option value="8 Year+">8 Year+</option>
              <option value="9 Year+">9 Year+</option>
              <option value="10 Year+">10 Year+</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <IoMdArrowDropdown className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">Minimum salary <span className="text-red-600">*</span></label>
          <div className="">
            <input
              type="text"
              name="minSalary"
              placeholder=""
              value={minSalary}
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
              onChange={(e) => handleSetMinSalary(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
