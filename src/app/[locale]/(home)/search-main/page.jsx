"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";
// import {userTra}
const ListSuggestions = dynamic(() => import("@/components/ListSuggestions"), {
  ssr: false,
});
const ListHistory = dynamic(() => import("@/components/ListHistory"), {
  ssr: false,
});
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });

function Page() {
  const t = useTranslations("searchMainPage");
  const locale = useLocale();
  const router = useRouter();
  const { domain } = useAppContext();
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const handleSearch = () => {
    if (search !== "") {
      let decodedKeyword = search.replace(/\+/g, " ");
      const decodedKeyword2 = decodeURIComponent(decodedKeyword);
      setSearch2(decodedKeyword2);
      let searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!searchHistory.includes(decodedKeyword2)) {
        searchHistory.unshift(decodedKeyword2);
        searchHistory = searchHistory.slice(0, 20);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
    }
    router.push(`/search-result?keyword=${search}`);
  };

  const handelClearHistory = () => {
    setSearchHistory([]);
    localStorage.setItem("searchHistory", JSON.stringify([]));
  };

  const handleOnChange = async (word) => {
    setSearch2(word);

    if (word.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    let sanitizedKeyword = word
      .replace(/[^a-zA-Z0-9\u1780-\u17FF\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    let encodedKeyword = encodeURIComponent(sanitizedKeyword).replace(
      /%20/g,
      "+"
    );

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
      const encodedWord = encodeURIComponent(sanitizedWord).replace(
        /%20/g,
        "+"
      );

      let searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!searchHistory.includes(sanitizedWord)) {
        searchHistory.unshift(sanitizedWord);
        searchHistory = searchHistory.slice(0, 20);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }
      router.push(`/search-result?keyword=${encodedWord}`);
    }
  };
  useEffect(() => {
    const cachedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(cachedSearchHistory);
  }, []);

  return (
    <div className="max-w-[1104px] mx-auto mb-10">
      <div className="bg-white flex items-center justify-between pr-[14px] pl-[10px] py-3 space-x-4 border-b border-gray-300 sticky top-0 left-0">
        <div onClick={() => router.back()} className="w-fit">
          <IoIosArrowBack size={23} className="text-gray-600" />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder={t("search")}
            value={search2 || ""}
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
          search2.length > 0 &&
          search2.length <= 3 && (
            <ListSuggestions
              searchSuggestions={searchSuggestions}
              handleSearch={handleClickSearchByList}
            />
          )}

        {searchHistory.length > 0 && search2 == "" && (
          <ListHistory
            t={t}
            locale={locale}
            searchHistory={searchHistory}
            handleSearch={handleClickSearchByList}
            handelClearHistory={handelClearHistory}
          />
        )}
      </div>

      {search2.length > 3 && (
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

export default Page;
