import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

function ListHistory({
  searchHistory,
  handleSearch,
  handelClearHistory,
  t,
  locale,
}) {
  return (
    <div className="">
      <div
        className={`h-[49px] bg-[#f7f7f7] lg:bg-white flex items-center justify-between px-4 lg:px-3 lg:text-[17.5px] text-[15.5px] ${
          locale == "en" ? "font-sans" : "font-battambang"
        }`}
      >
        <p className="text-gray-600 lg:text-gray-800">{t("recentSearch")}</p>
        <button
          onClick={handelClearHistory}
          className=" outline-none focus:outline-none text-[#028DCF]"
        >
          {t("clear")}
        </button>
      </div>
      <ul className=" overflow-x-hidden bg-white font-sans">
        {searchHistory.map((item, i) => (
          <li
            onClick={() => handleSearch(item)}
            key={item + i}
            className={`flex justify-between items-center lg:items-start px-4 py-[12.1px] hover:bg-[#f7f7f7] transition-all duration-300 cursor-pointer
            ${
              searchHistory.length - 1 === i
                ? ""
                : "border-b lg:border-gray-200 border-gray-100"
            }`}
          >
            <div className="flex items-center">
              <div className="w-fit">
                <FaHistory className="text-gray-500" />
              </div>
              <span className="font-semibold  break-all pl-3 pr-6">{item}</span>
            </div>
            <div className="w-fit">
              <FaPencilAlt className="text-gray-500" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListHistory;
