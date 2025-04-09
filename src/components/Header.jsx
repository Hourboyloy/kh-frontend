"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import postUser from "../assets/post-user.png";
import user from "../assets/user-icon.png";

const SmBtnLogout = dynamic(() => import("./buttons/SmBtnLogout"), {
  ssr: false,
});

// const DropdownMenuUserAccount = dynamic(
//   () => import("@/components/DropdownMenuUserAccount"),
//   { ssr: false }
// );

import DropdownMenuUserAccount from "@/components/DropdownMenuUserAccount";

const ListSuggestions = dynamic(() => import("@/components/ListSuggestions"), {
  ssr: false,
});
const ListHistory = dynamic(() => import("@/components/ListHistory"), {
  ssr: false,
});

import { useAppContext } from "@/context/GlobalContext";

const formatCategory = (param) =>
  (param || "").trim().replace(/-/g, " ").replace(/and/g, "&").toLowerCase();

function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { account, profile, categories, domain } = useAppContext();
  const dropdownCategoriesRef = useRef(null);
  const dropdownMenuAccountRef = useRef(null);
  const dropdownBtnLogoutRef = useRef(null);
  const closeSearchHistoryRef = useRef(null);
  const closeSearchSuggestionRef = useRef(null);
  const closeSearchRef = useRef(null);

  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All Category");
  const [displayCategory, setDisplayCategory] = useState(
    locale == "en" ? "All Category" : "ផលិតផលទាំងអស់"
  );
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");

  const [toggleSearchSuggestion, setToggleSearchSuggestion] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleSearchHistory, setToggleSearchHistory] = useState(false);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isShowAllCategory, setIsShowAllCategory] = useState(false);
  const [isShowMenuUserAccount, setIsShowMenuUserAccount] = useState(false);
  const [ToggleButtonLogout, setToggleButtonLogout] = useState(false);

  const handleCurrentCategory = (
    category,
    mainCategoryName,
    categoryName,
    displayCategory
  ) => {
    setCurrentCategory(category);
    setDisplayCategory(displayCategory);
    setMainCategoryName(mainCategoryName);
    setCategoryName(categoryName);
    setIsShowAllCategory(!isShowAllCategory);
  };

  const handleFocus = () => {
    if (!isInputFocused) {
      setToggleSearchSuggestion(true);
      setToggleSearch(true);
      setToggleSearchHistory(true);
      setIsInputFocused(true);
      setIsShowAllCategory(false);
    } else {
      setIsInputFocused(false);
    }
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentRoute = window.location.pathname.replace(/^\/(kh|en)/, "");
    const trimmedSearch = search.trim().replace(/\s+/g, "+"); // Convert spaces to `+`
    const isAllCategory = currentCategory === "All Category";

    // Format category names
    const formattedMainCategory =
      mainCategoryName
        ?.trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "and")
        .toLowerCase() || "";

    const formattedCategory =
      categoryName
        ?.trim()
        .replace(/\s+/g, "-")
        .replace(/&/g, "and")
        .toLowerCase() || "";

    // Manage search parameters
    trimmedSearch
      ? searchParams.set("keyword", trimmedSearch)
      : searchParams.delete("keyword");
    !isAllCategory
      ? searchParams.set("main-category", formattedMainCategory)
      : searchParams.delete("main-category");
    formattedCategory
      ? searchParams.set("category", formattedCategory)
      : searchParams.delete("category");

    // Convert `%2B` to `+` after encoding
    let queryString = searchParams.toString().replace(/%2B/g, "+");

    // Update search history
    if (search.trim()) {
      setSearch2(search.trim().replace(/\+/g, " "));

      const searchHistory =
        JSON.parse(localStorage.getItem("searchHistory")) || [];
      if (!searchHistory.includes(search.trim().replace(/\+/g, " "))) {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(
            [search.trim().replace(/\+/g, " "), ...searchHistory].slice(0, 20)
          )
        );
      }
    }

    if (!trimmedSearch && currentCategory === "All Category") {
      router.push(`/search?${queryString}`);
    } else if (
      trimmedSearch &&
      currentRoute !== "/search" &&
      // currentRoute !== "/category" &&
      currentCategory === "All Category"
    ) {
      router.push(`/search-result?${queryString}`);
    } else if (
      currentRoute === "/search" &&
      currentCategory === "All Category"
    ) {
      router.push(`/search?${queryString}`);
    } else if (currentCategory !== "All Category") {
      router.push(`/category?${queryString}`);
    }

    setToggleSearch(false);
  };

  const handleOnChange = async (word) => {
    setToggleSearch(true);
    setToggleSearchSuggestion(true);
    setToggleSearchHistory(true);
    setSearch2(word);

    let sanitizedKeyword = word
      .trim()
      .replace(/[^a-zA-Z0-9\u1780-\u17FF\s]/g, "")
      .replace(/\s+/g, " ");

    let encodedKeyword = sanitizedKeyword
      .replace(/\s+/g, "+") // Replace spaces with "+"
      .toLowerCase();

    // Encode the rest of the keyword (but not Khmer characters or "+" sign)
    encodedKeyword = Array.from(encodedKeyword)
      .map((char) => {
        // Encode non-Khmer characters and keep "+" and Khmer characters as is
        if (char === "+") {
          return char;
        }
        // Encode non-Khmer characters
        return /[^\u1780-\u17FF]/.test(char) ? encodeURIComponent(char) : char;
      })
      .join("");

    // Decode the URL to avoid `%252B`
    const cleanKeyword = decodeURIComponent(encodedKeyword).replace(
      /%252B/g,
      "+"
    );

    setSearch(cleanKeyword);

    if (word.trim() === "") {
      setSearchSuggestions([]);
      return;
    }

    if (cleanKeyword.length <= 0) return;

    try {
      const res = await axios.get(
        `${domain}/search-suggestions?keyword=${cleanKeyword}`
      );
      setSearchSuggestions(res.data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSetSearch = (word) => {
    setToggleSearch(false);
    let sanitizedWord = word
      .replace(/[^a-zA-Z0-9\u1780-\u17FF\s\+]/g, "") // Keep only valid characters (Khmer, alphanumeric, spaces, and '+')
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim();

    setSearch2(word);
    setSearch(sanitizedWord);
    setSearchSuggestions([]);
  };

  const changeLanguage = (newLocale) => {
    if (!router) return;
    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    const cleanedPath = currentPath.replace(/^\/(kh|en)/, "");
    const newUrl = `/${newLocale}${cleanedPath}${searchParams}`;

    // Navigate to the new URL
    router.push(newUrl);
  };

  const handelClearHistory = () => {
    setSearchHistory([]);
    localStorage.setItem("searchHistory", JSON.stringify([]));
  };

  const handleToggleShowAllCategory = () => {
    setIsShowAllCategory(!isShowAllCategory);
  };

  const handleToggleShowMenuUserAccount = () => {
    setIsShowMenuUserAccount(!isShowMenuUserAccount);
  };

  const handleToggleButtonLogout = () => {
    setToggleButtonLogout(!ToggleButtonLogout);
  };

  useEffect(() => {
    const cachedSearchHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(cachedSearchHistory);
  }, []);

  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";

    setSearch(keyword);
    setSearch2(keyword.replace(/\+/g, " "));

    const formattedMainCategory = formatCategory(
      searchParams.get("main-category")
    );

    const mainCategory = categories.find(
      (cgy) => formatCategory(cgy.name) === formattedMainCategory
    );

    setMainCategoryName(mainCategory ? mainCategory.name : "");

    const formattedCategory = formatCategory(searchParams.get("category"));
    const category = mainCategory
      ? mainCategory.subcategories.find(
          (sub) => formatCategory(sub.name) === formattedCategory
        )
      : null;

    setCategoryName(category ? category.name : formattedCategory);

    setCurrentCategory(category?.name || mainCategory?.name || "All Category");

    setDisplayCategory(locale == "en" ? "All Category" : "ផលិតផលទាំងអស់");

    if (mainCategory?.name && !category?.name) {
      const getCategory = categories.find(
        (category) => category.name == mainCategory?.name
      );
      setDisplayCategory(
        locale == "en" ? getCategory.name : getCategory.khName
      );
    } else if (mainCategory?.name && category?.name) {
      const getCategory = categories.find(
        (category) => category.name == mainCategory?.name
      );
      const getSub = getCategory.subcategories.find(
        (c) => c.name == category?.name
      );
      setDisplayCategory(locale == "en" ? getSub.name : getSub.khName);
    }
    setToggleSearchHistory(false);
  }, [categories, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        { ref: dropdownCategoriesRef, setter: setIsShowAllCategory },
        { ref: dropdownMenuAccountRef, setter: setIsShowMenuUserAccount },
        { ref: dropdownBtnLogoutRef, setter: setToggleButtonLogout },

        { ref: closeSearchHistoryRef, setter: setToggleSearchHistory },
        { ref: closeSearchSuggestionRef, setter: setToggleSearchSuggestion },
        { ref: closeSearchRef, setter: setToggleSearch },
      ];

      refs.forEach(({ ref, setter }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setter(false);
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-white shadow border-b border-gray-300 ${
        locale == "en" ? "font-sans" : ""
      }`}
    >
      <div>
        <SmBtnLogout
          ToggleButtonLogout={ToggleButtonLogout}
          setToggleButtonLogout={setToggleButtonLogout}
          handleToggleButtonLogout={handleToggleButtonLogout}
          dropdownBtnLogoutRef={dropdownBtnLogoutRef}
        />
      </div>

      <section className="relative max-w-[1140px] mx-auto py-2 px-[18px] flex items-center justify-between">
        <section className="flex items-center space-x-[17.5px] min-w-[194.75px]">
          <div>
            <Link
              href="/"
              className="select-none focus:outline-none"
              prefetch={true}
            >
              <Image
                className="w-[140px]"
                src={process.env.NEXT_PUBLIC_APP_LOGO}
                width={1000}
                height={1000}
                alt="Company Logo"
              />
            </Link>
          </div>
          <div className="pt-[5px]">
            <button
              onClick={() => changeLanguage(locale === "en" ? "kh" : "en")}
              className="select-none focus:outline-none w-[24.9px] h-[24.9px]"
            >
              <Image
                className="w-full h-full rounded-full object-cover object-center"
                src={require(`../assets/${
                  locale === "en" ? "place.png" : "en.webp"
                }`)}
                alt="Location Icon"
              />
            </button>
          </div>
        </section>

        <section className="w-full flex items-center justify-center">
          <div
            className={`relative ${
              isInputFocused ? "border-2 border-[#8db5f1]" : "border-none"
            }`}
            ref={dropdownCategoriesRef}
          >
            {/*droupdown list categories */}
            {isShowAllCategory && (
              <div className="max-h-[500px] lg:w-[283.40px] border border-gray-400 rounded-md bg-white absolute top-[46px] left-0 overflow-y-auto select-none">
                <div
                  onClick={() =>
                    handleCurrentCategory(
                      "All Category",
                      "",
                      "",
                      locale == "en" ? "All Category" : "ផលិតផលទាំងអស់"
                    )
                  }
                  className="flex items-center justify-between pl-2.5 pr-[7px] py-3 cursor-pointer"
                >
                  <span className="text-gray-700">
                    {locale == "en" ? "All Category" : "ផលិតផលទាំងអស់"}
                  </span>
                  {currentCategory === "All Category" && (
                    <span className="text-xl">
                      <IoIosCheckmarkCircle className="text-[#006DA1]" />
                    </span>
                  )}
                </div>

                <ul className="">
                  {categories?.map((category, index) => (
                    <li key={category + index}>
                      <div
                        onClick={() =>
                          handleCurrentCategory(
                            category.name,
                            category.name,
                            "",
                            locale == "en" ? category.name : category.khName
                          )
                        }
                        className="pl-2.5 pr-[7px] flex items-center justify-between bg-[#DBDBDB] hover:bg-[#eeeeee] w-full cursor-pointer"
                      >
                        <div className="py-2 flex items-center space-x-2">
                          <div className="w-[25px] h-[25px]">
                            <Image
                              className="h-full w-full object-cover object-center"
                              width={200}
                              height={200}
                              src={category.photo}
                              alt="img"
                            />
                          </div>
                          <h3 className="text-gray-800 text-nowrap text-[16px]">
                            {locale == "en" ? (
                              <p className="font-sans font-semibold">
                                {category.name}
                              </p>
                            ) : (
                              <p className="font-battambang">
                                {category.khName}
                              </p>
                            )}
                          </h3>
                        </div>

                        {category.name === currentCategory && (
                          <span className="text-xl">
                            <IoIosCheckmarkCircle className="text-[#006DA1]" />
                          </span>
                        )}
                      </div>

                      <ul>
                        {category?.subcategories?.map((subCategory, i) => (
                          <li
                            onClick={() =>
                              handleCurrentCategory(
                                subCategory.name,
                                category.name,
                                subCategory.name,
                                locale == "en"
                                  ? subCategory.name
                                  : subCategory.khName
                              )
                            }
                            key={subCategory.name + i}
                          >
                            <div className="flex items-center justify-between pl-[18px] hover:bg-[#eeeeee] cursor-pointer">
                              <div className="py-2 flex items-center space-x-2">
                                <div className="w-[25px] h-[25px]">
                                  <Image
                                    className="h-full w-full object-cover object-center"
                                    width={200}
                                    height={200}
                                    src={subCategory.photo}
                                    alt="img"
                                  />
                                </div>
                                <i className="text-gray-800 text-sm">
                                  {locale == "en" ? (
                                    <p className="font-sans font-semibold">
                                      {subCategory.name}
                                    </p>
                                  ) : (
                                    <p className="font-battambang">
                                      {subCategory.khName}
                                    </p>
                                  )}
                                </i>
                              </div>

                              {subCategory.name === currentCategory && (
                                <span className="text-xl">
                                  <IoIosCheckmarkCircle className="text-[#006DA1]" />
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className={`w-[300px] lg:w-[430px] xl:w-[554px] h-[37px] relative border border-gray-300`}
            >
              <button
                onClick={handleToggleShowAllCategory}
                className="bg-[#F7F7F7] pl-[10px] pr-[28px] absolute top-0 left-0 w-[148px] h-full border-r border-gray-400 text-gray-700 select-none focus:outline-none"
                role="button"
              >
                <div className="h-full pt-0.5 flex items-center justify-center text-nowrap">
                  {displayCategory?.trim().length > 13
                    ? displayCategory?.slice(0, 13) + "..."
                    : displayCategory}
                </div>
              </button>
              <span className="text-gray-500 text-lg absolute top-[10.2px] left-[124px] pointer-events-none">
                <TiArrowSortedDown />
              </span>
              <div className="bg-[#F7F7F7] w-full h-full overflow-hidden">
                <input
                  type="text"
                  className="bg-[#F7F7F7] w-full h-full outline-none pl-40 pr-3.5 pt-[1px] placeholder:text-gray-600 text-gray-700 focus:text-gray-700 focus:outline-none"
                  placeholder={`${t("searchPlaceholder")}`}
                  onFocus={handleFocus}
                  onBlur={handleFocus}
                  value={search2 || ""}
                  onChange={(e) => handleOnChange(e.target.value)}
                />

                <button
                  onClick={handleSearch}
                  className=" absolute top-[0.5px] right-[1.8px] flex items-center justify-center h-full w-[38px] select-none focus:outline-none"
                >
                  <BsSearch className="text-[17px] text-gray-700" />
                </button>
              </div>

              {/* suggestions */}
              {toggleSearchSuggestion &&
                setSearchSuggestions.length > 0 &&
                search2.length > 0 &&
                search2.length <= 3 && (
                  <section
                    ref={closeSearchSuggestionRef}
                    className="left-0 top-11 absolute bg-white w-full z-10 border rounded-sm"
                  >
                    <ListSuggestions
                      searchSuggestions={searchSuggestions}
                      handleSearch={handleSetSearch}
                    />
                  </section>
                )}

              {/* list history */}
              {toggleSearchHistory &&
                searchHistory.length > 0 &&
                search2.length <= 0 && (
                  <section
                    ref={closeSearchHistoryRef}
                    className="left-0 top-11 absolute bg-white w-full z-10 border rounded-sm"
                  >
                    <ListHistory
                      t={t}
                      locale={locale}
                      searchHistory={searchHistory}
                      handleSearch={handleSetSearch}
                      handelClearHistory={handelClearHistory}
                    />
                  </section>
                )}

              {toggleSearch && search2.length > 3 && (
                <section
                  ref={closeSearchRef}
                  className="left-0 top-11 absolute bg-white w-full z-10 border rounded-sm"
                >
                  <div
                    onClick={handleSearch}
                    className="pl-3 pr-6 text-[15.8px] min-h-[49px] py-2 flex items-center space-x-2 text-[#028DCF] font-semibold cursor-pointer"
                  >
                    <div className="w-fit">
                      <IoIosSearch className="text-gray-700" size={18} />
                    </div>
                    <p className="font-sans">
                      See Result for{" "}
                      <span className="break-all">{search2}</span>
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-end space-x-4 min-w-[264.21px]">
          {account !== null ? (
            <div className="flex items-center space-x-8 pr-[5px]">
              <Link
                href={"/notification"}
                className=" focus:outline-none outline-none"
              >
                <IoNotifications className="text-[25px] text-[#808080] hover:cursor-pointer hover:text-gray-800 transition-all duration-200" />
              </Link>
              <Link href={"/"} className=" focus:outline-none outline-none">
                <BsChatDotsFill className="text-[23.5px] text-[#808080] hover:cursor-pointer hover:text-gray-800 transition-all duration-200" />
              </Link>

              <section
                ref={dropdownMenuAccountRef}
                onClick={handleToggleShowMenuUserAccount}
                className="w-[32px] h-[32px] rounded-full overflow-hidden cursor-pointer border border-gray-400 select-none focus:outline-none"
              >
                <Image
                  className="w-full h-full object-cover object-center"
                  src={profile?.photoProfile ? profile?.photoProfile : user}
                  width={400}
                  height={400}
                  alt=""
                />

                <div className="absolute top-[58px] right-6">
                  {isShowMenuUserAccount && (
                    <DropdownMenuUserAccount
                      handleToggleShowMenuUserAccount={
                        handleToggleShowMenuUserAccount
                      }
                      handleToggleButtonLogout={handleToggleButtonLogout}
                    />
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div
              className={`flex items-center font-battambang  space-x-[17px]`}
            >
              <Link
                href="/login"
                prefetch={true}
                className="text-[#016B9D] font-bold select-none focus:outline-none tracking-wide text-[16.5px] translate-y-[1px] text-nowrap"
              >
                {t("login")}
              </Link>
              <button className="text-gray-500 font-semibold text-[16.4px]">
                {t("or")}
              </button>
              <Link
                prefetch={true}
                href="/register"
                className="text-[#016B9D] font-bold select-none focus:outline-none tracking-wide text-[16.5px] translate-y-[1px] text-nowrap"
              >
                {t("register")}
              </Link>
            </div>
          )}

          <Link
            href={`${
              account !== undefined && account !== null ? "/post" : "/login"
            }`}
            className={`text-white bg-[#FF8900] flex items-center space-x-[4.5px] py-[5px] rounded-md select-none focus:outline-none ${
              locale == "en" ? " text-xl px-[12.8px]" : " text-lg px-[8px]"
            }`}
          >
            <span className="w-[20px] h-[20px]">
              <Image
                className="w-full h-full object-cover object-center"
                src={postUser}
                width={1000}
                height={1000}
                alt=""
              />
            </span>
            <span
              className={`font-semibold flex items-center translate-y-0.5 text-nowrap`}
            >
              {t("sell")}
            </span>
          </Link>
        </section>
      </section>
    </div>
  );
}

export default Header;
