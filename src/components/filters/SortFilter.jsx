import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";

function SortFilter({
  sort,
  locale,
  handleSetSort,
  handleToggleSort,
  dropdownSortRef,
}) {
  return (
    <div ref={dropdownSortRef} className="h-fit">
      <div className="h-[38px] lg:hidden flex items-center justify-between pl-2 pr-3.5 font-semibold text-[#212529] bg-[#e4e4e4] border-b border-t border-gray-300">
        <button
          className=" flex items-center gap-1 text-gray-700 hover:text-black transition outline-none focus:outline-none"
          onClick={handleToggleSort}
        >
          <IoMdClose size={20} />
        </button>

        <span className="md:text-[17px] text-[15.5px] pl-4 lg:pl-0">Sort</span>

        <div className="w-1"></div>
      </div>

      <ul className="w-full bg-white lg:border border-gray-300 lg:rounded-md">
        {[
          {
            name: locale == "en" ? "Lastest Ads" : "ចុងក្រោយ",
            val: "lastest",
          },
          {
            name: locale == "en" ? "New Ads" : "ថ្មី",
            val: "new",
          },
          {
            name: locale == "en" ? "Most Hit Ads" : "ចុចច្រើន",
            val: "mosthit",
          },
          {
            name: locale == "en" ? "Price: Low to High" : "តំម្លៃ: ទាបទៅខ្ពស់",
            val: "priceasc",
          },
          {
            name: locale == "en" ? "Price: High to Low" : "តំម្លៃ: ខ្ពស់ទៅទាប",
            val: "pricedesc",
          },
        ].map((item, i) => (
          <li
            key={item + i}
            onClick={() => handleSetSort(item.val)}
            className={`flex items-center justify-between px-2 lg:px-1.5 py-2 lg:py-1.5 hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out ${
              i === 5 ? "" : "border-b border-gray-200"
            }`}
          >
            <p>{item.name}</p>
            <p>
              {item.val === sort ? (
                <IoIosCheckmarkCircle className="text-[#028DCF] text-lg" />
              ) : sort === "" && item.val === "lastest" ? (
                <IoIosCheckmarkCircle className="text-[#028DCF] text-lg" />
              ) : (
                ""
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SortFilter;
