"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { BsSearch } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/context/GlobalContext";

const ListSuggestions = dynamic(() => import("@/components/ListSuggestions"), {
  ssr: false,
});
const ListHistory = dynamic(() => import("@/components/ListHistory"), {
  ssr: false,
});
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });

function MobileSearching({
  handleToggleSearchingPage,
  setKeyword,
  setSearchKeyWord,
  searchKeyWord,
}) {
  const { domain } = useAppContext();
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const handleSearch = () => {
    let decodedKeyword = decodeURIComponent(search.replace(/\+/g, " ")).trim();

    if (decodedKeyword) {
      let searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!searchHistory.includes(decodedKeyword)) {
        searchHistory.unshift(decodedKeyword);
        searchHistory = searchHistory.slice(0, 20);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
    }
    setKeyword(decodedKeyword);
    setSearchKeyWord(decodedKeyword);
    handleToggleSearchingPage();
    setSearch2("");
  };

  const handleOnChange = async (word) => {
    setSearchKeyWord(word);
    setSearch2(word);
    if (word.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    let sanitizedKeyword = word.replace(/[^a-zA-Z0-9\u1780-\u17FF\s]/g, "");
    let encodedKeyword = encodeURIComponent(sanitizedKeyword)
      .replace(/\s+/g, " ")
      .trim()
      .replace(/%20/g, "+");

    setSearch(encodedKeyword);

    if (encodedKeyword.length <= 0) return;
    try {
      const res = await axios.get(
        `${domain}/search-suggestions?keyword=${encodedKeyword}`
      );
      setSearchSuggestions(res.data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleClickSearchByList = (word) => {
    let sanitizedWord = word
      .replace(/[^a-zA-Z0-9\u1780-\u17FF\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (sanitizedWord !== "") {
      setKeyword(sanitizedWord);
      setSearchKeyWord(sanitizedWord);

      let searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      searchHistory.unshift(sanitizedWord);
      searchHistory = searchHistory.slice(0, 20);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

      handleToggleSearchingPage();
      setSearch2("");
    }
  };

  const handelClearHistory = () => {
    setSearchHistory([]);
    localStorage.setItem("searchHistory", JSON.stringify([]));
  };

  useEffect(() => {
    const cachedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(cachedSearchHistory);
  }, []);

  return (
    <div className="max-w-[1104px] mx-auto mb-10">
      <div className="bg-white flex items-center justify-between pr-[14px] pl-[10px] py-3 space-x-4 border-b border-gray-300 sticky top-0 left-0">
        <div onClick={handleToggleSearchingPage} className="w-fit">
          <IoMdClose size={23} className="text-gray-600" />
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleOnChange(e.target.value)}
            className="w-full text-gray-600 outline-none focus:outline-none"
          />
        </div>
        <div onClick={handleSearch} className="w-fit pl-1">
          <BsSearch size={19} className="text-gray-600" />
        </div>
      </div>

      <div>
        {setSearchSuggestions.length > 0 &&
          search2?.length > 0 &&
          search2.length <= 3 && (
            <ListSuggestions
              searchSuggestions={searchSuggestions}
              handleSearch={handleClickSearchByList}
            />
          )}

        {searchHistory.length > 0 && search2 == "" && (
          <ListHistory
            searchHistory={searchHistory}
            handleSearch={handleClickSearchByList}
            handelClearHistory={handelClearHistory}
          />
        )}
      </div>

      {search2?.length > 3 && (
        <section className="bg-white w-full font-sans">
          <div
            onClick={handleSearch}
            className="pl-3 pr-6 text-[15.8px] min-h-[49px] py-2 flex items-center space-x-2 text-[#028DCF] font-semibold cursor-pointer"
          >
            <div className="w-fit">
              <IoIosSearch className="text-gray-700" size={18} />
            </div>
            <p>
              See Result for <span className="break-all">{search2}</span>
            </p>
          </div>
        </section>
      )}

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default MobileSearching;
