import React from "react";
import { CgArrowTopLeft } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";

function ListSuggestions({ searchSuggestions, handleSearch }) {
  return (
    <div className="font-sans">
      <ul className="bg-white">
        {searchSuggestions?.map((suggestion, i) => (
          <li
            onClick={() => handleSearch(suggestion.title)}
            key={suggestion + i}
            className={`flex justify-between px-3 py-[12.1px] hover:bg-[#f7f7f7] transition-all duration-300 cursor-pointer
            ${
              searchSuggestions.length - 1 === i
                ? ""
                : "border-b border-gray-200"
            }`}
          >
            <div className="flex items-center">
              <div className="w-fit">
                <IoIosSearch className="text-gray-700" />
              </div>
              <span className="font-semibold break-all pl-3 pr-6">
                {suggestion.title}
              </span>
            </div>
            <div className="w-fit">
              <CgArrowTopLeft className="text-gray-700" size={19} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListSuggestions;
