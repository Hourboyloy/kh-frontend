"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import { formatText } from "@/helper/formatText";
import { useLocale, useTranslations } from "next-intl";

const MobileSearching = dynamic(() => import("@/components/MobileSearching"), {
  ssr: false,
});
const CategoryFilter = dynamic(
  () => import("@/components/filters/CategoryFilter"),
  {
    ssr: false,
  }
);
const SmHeaderFilterPage = dynamic(
  () => import("@/components/SmHeaderFilterPage"),
  {
    ssr: false,
  }
);

const CardProductForFilterPage = dynamic(
  () => import("@/components/filters/CardProductForFilterPage"),
  {
    ssr: false,
  }
);
const CardsSkeleton = dynamic(
  () => import("@/components/skeletons/CardsSkeleton"),
  {
    ssr: false,
  }
);

const LoadingItem = dynamic(() => import("@/components/LoadingItem"), {
  ssr: false,
});

const SmFooter = dynamic(() => import("@/components/SmFooter"), {
  ssr: false,
});

const formatForURL = (text) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w-]/g, ""); // ✅ Remove special characters
};

function Page() {
  const t = useTranslations("categorySearchAndSearchPage");
  const locale = useLocale();
  const { categories, domain, token, account, changePage, ads } =
    useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([
    { firstProducts: [], topProducts: [], secondProducts: [] },
  ]);
  const [page, setPage] = useState(1);
  const [top, setTop] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [toggleDisplayCards, setToggleDisplayCards] = useState(true);

  const isFirstRender = useRef(true);

  const [count, setCount] = useState(0);
  const [Categories, setCategories] = useState(categories || []);
  const [mainCategoryName, setMainCategoryName] = useState("");
  const [keyword, setKeyword] = useState(undefined);
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const [province, setProvince] = useState(undefined);
  const [district, setDistrict] = useState(undefined);
  const [commune, setCommune] = useState(undefined);

  const [displayProvince, setDisplayProvince] = useState(undefined);
  const [displayDistrict, setDisplayDistrict] = useState(undefined);
  const [displayCommune, setDisplayCommune] = useState(undefined);

  const [formData, setFormData] = useState({
    date: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minSalary: undefined,
    maxSalary: undefined,
    minSalePrice: undefined,
    maxSalePrice: undefined,
    condition: undefined,
    freeDelivery: undefined,
    discount: undefined,
    sort: undefined,
    brand: undefined,
    model: undefined,
    bodyTyle: undefined,
    vehicleType: undefined,
  });
  const [formData2, setFormData2] = useState({
    date: "",
    minPrice: null,
    maxPrice: null,
    minSalary: null,
    maxSalary: null,
    minSalePrice: null,
    maxSalePrice: null,
    condition: "",
    freeDelivery: undefined,
    discount: undefined,
    sort: "",
    brand: "",
    model: "",
    bodyTyle: "",
    vehicleType: "",
  });

  const [toggleFormFilter, setToggleFormFilter] = useState(false);
  const [toggleSearchingPage, setToggleSearchingPage] = useState(false);

  const handleToggleFormFilter = () => setToggleFormFilter((prev) => !prev);
  const handleToggleSearchingPage = () =>
    setToggleSearchingPage((prev) => !prev);

  const handleClearKeyword = () => {
    setKeyword("");
    setSearchKeyWord("");
  };

  const handleSetKeyword = (word) => {
    let sanitizedKeyword = word.replace(/[^a-zA-Z0-9\u1780-\u17FF\s]/g, "");
    let encodedKeyword = encodeURIComponent(sanitizedKeyword).replace(
      /%20/g,
      "+"
    );
    let decodedKeyword = sanitizedKeyword.replace(/\+/g, " ");

    setKeyword(encodedKeyword);
    setSearchKeyWord(decodedKeyword);
  };

  const handleSetToggleDisplayCards = () => {
    setToggleDisplayCards(!toggleDisplayCards);
  };

  const handleDiscountOrFreeDelivery = (fieldName) => {
    if (fieldName === "discount") {
      setFormData2((prev) => ({
        ...prev,
        discount: formData2.discount ? "" : true,
      }));
      setFormData((prev) => ({
        ...prev,
        discount: formData.discount ? "" : true,
      }));
    } else if (fieldName === "freeDelivery") {
      setFormData2((prev) => ({
        ...prev,
        freeDelivery: formData2.freeDelivery ? "" : true,
      }));
      setFormData((prev) => ({
        ...prev,
        freeDelivery: formData.freeDelivery ? "" : true,
      }));
    }
  };

  const updateSearchURL = useCallback(() => {
    const queryData = {
      keyword: decodeURIComponent(keyword),
      "main-category": mainCategoryName ? formatForURL(mainCategoryName) : "",
      ...formData,
      province: province ? province.toLowerCase().replace(/\s+/g, "-") : "",
      district: district ? district.toLowerCase().replace(/\s+/g, "-") : "",
      commune: commune ? commune.toLowerCase().replace(/\s+/g, "-") : "",
    };
    const filteredQuery = Object.fromEntries(
      Object.entries(queryData).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );
    let query = new URLSearchParams(filteredQuery).toString();
    query = query.replace(/%2B/g, "+");

    if (!mainCategoryName) {
      router.push(`/search?${query}`);
    } else {
      router.push(`/category?${query}`);
    }
  }, [
    formData,
    keyword,
    province,
    district,
    commune,
    mainCategoryName,
    router,
  ]);

  // query product

  const generateQueryString = useCallback((queryData) => {
    const params = new URLSearchParams();
    Object.keys(queryData).forEach((key) => {
      let value = queryData[key];

      if (value == null || value === "") {
        return;
      }

      params.append(key, value);
    });

    return params.toString();
  }, []);

  const fetchProducts = useCallback(
    async (reset = false) => {
      if (!hasMore || loading) return;

      setLoading(true);
      try {
        const queryData = {
          keyword,
          province,
          district,
          commune,
          ...formData,
        };
        const queryString = await generateQueryString(queryData);

        const res = await axios.get(
          `${domain}/query-products?top=${top}&page=${
            reset ? 1 : page
          }&${queryString}`
        );

        setProducts((prev) =>
          reset ? res.data.products : [...prev, ...res.data.products]
        );

        if (
          res.data.products[0]?.firstProducts?.length === 0 ||
          res.data.products[0]?.secondProducts?.length <= 19
        ) {
          setTimeout(() => {
            setHasMore(false);
          }, 200);
        }

        setPage((prev) => (reset ? 2 : prev + 1));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [
      keyword,
      province,
      district,
      commune,
      formData,
      hasMore,
      loading,
      domain,
      top,
      page,
      setLoading,
      setProducts,
      setTop,
      setHasMore,
      setPage,
    ]
  );

  const countFilledFields = useCallback(() => {
    const count = [
      ...Object.values(formData),
      searchKeyWord || "",
      province,
      district,
      commune,
    ].filter((value) => value !== undefined && value !== "").length;

    setCount(count);
  }, [
    searchKeyWord,
    province,
    district,
    commune,
    ...Object.keys(formData).map((key) => formData[key]),
  ]);

  // update url
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    updateSearchURL();
  }, [updateSearchURL]);

  // get search params
  useEffect(() => {
    const queryData = {};

    searchParams.forEach((value, key) => {
      queryData[key] = value;
    });

    // Update formData and formData2 with query params
    setFormData((prev) => ({
      ...prev,
      minPrice: queryData.minPrice || "",
      maxPrice: queryData.maxPrice || "",
      minSalary: queryData.minSalary || "",
      maxSalary: queryData.maxSalary || "",
      minSalePrice: queryData.minSalePrice || "",
      maxSalePrice: queryData.maxSalePrice || "",
      condition: queryData.condition || "",
      freeDelivery: queryData.freeDelivery || "",
      discount: queryData.discount || "",
      sort: queryData.sort || "",
      date: queryData.date || "",
    }));

    setFormData2((prev) => ({
      ...prev,
      minPrice: queryData.minPrice || "",
      maxPrice: queryData.maxPrice || "",
      minSalary: queryData.minSalary || "",
      maxSalary: queryData.maxSalary || "",
      minSalePrice: queryData.minSalePrice || "",
      maxSalePrice: queryData.maxSalePrice || "",
      condition: queryData.condition || "",
      freeDelivery: queryData.freeDelivery || "",
      discount: queryData.discount || "",
      sort: queryData.sort || "",
      date: queryData.date || null,
    }));

    setProvince(queryData.province || "");
    setDistrict(queryData.district || "");
    setCommune(queryData.commune || "");

    setMainCategoryName(queryData["main-category"]);

    setKeyword(queryData.keyword || "");
    setSearchKeyWord(queryData.keyword?.replace(/\+/g || " "));
    changePage();
  }, [searchParams]);

  // count field
  useEffect(() => {
    countFilledFields();
  }, [countFilledFields]);

  useEffect(() => {
    const isReady = [
      keyword,
      province,
      district,
      commune,
      ...Object.values(formData),
    ].some((value) => value !== undefined);
    if (!isReady) return;

    setHasMore(true);
    setTimeout(() => {
      fetchProducts(true);
    }, 100);
  }, [
    keyword,
    province,
    district,
    commune,
    searchParams,
    ...Object.keys(formData).map((key) => formData[key]),
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;
      if (scrollPosition >= bottomPosition - 600 && hasMore) {
        fetchProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading, fetchProducts]);

  return (
    <div>
      {toggleSearchingPage ? (
        <MobileSearching
          handleToggleSearchingPage={handleToggleSearchingPage}
          setKeyword={setKeyword}
          setSearchKeyWord={setSearchKeyWord}
          searchKeyWord={searchKeyWord}
        />
      ) : (
        <div className={`mb-20 ${locale == "en" ? "font-sans" : ""}`}>
          <div className="top-0 sticky z-[9] lg:hidden w-full">
            <SmHeaderFilterPage
              t={t}
              count={count}
              searchKeyWord={searchKeyWord}
              handleClearKeyword={handleClearKeyword}
              handleToggleFormFilter={handleToggleFormFilter}
              handleToggleSearchingPage={handleToggleSearchingPage}
            />
          </div>

          <div className="max-w-[1104px] mx-auto">
            {ads.length > 0 && (
              <div className="flex items-center justify-center lg:pt-5">
                <Image
                  className="w-full lg:w-auto lg:h-[250px] object-cover object-center"
                  src={ads[2]?.image || ads[1]?.image || ads[0]?.image || ""}
                  alt=""
                  width={600}
                  height={800}
                />
              </div>
            )}

            <div
              className={`hidden lg:flex space-x-2 py-3.5 ${
                locale == "en" ? " font-sans" : " font-battambang"
              } `}
            >
              <Link href={"/"} className="focus:outline-none">
                <div className=" text-[#1D7DAA] flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="">
                    <IoHomeOutline />
                  </span>
                  <span>{t("home")}</span>
                </div>
              </Link>

              <div className="space-x-2 flex">
                <span>/</span>
                {searchKeyWord ? (
                  <div>
                    <span>{t("search")} </span>
                    <span className="font-medium">{searchKeyWord}</span>
                    <span>
                      {" "}
                      {t("inListAllAdsIn")}{" "}
                      {displayProvince && <span>{displayProvince}, </span>}
                      {t("cambodia")}
                    </span>
                  </div>
                ) : (
                  <span>
                    {t("inListAllAdsIn")}{" "}
                    {displayProvince && <span> {displayProvince}, </span>}
                    {t("cambodia")}
                  </span>
                )}
              </div>
            </div>

            <CategoryFilter
              locale={locale}
              t={t}
              display={[]}
              count={count}
              categories={Categories}
              setCategory={setMainCategoryName}
              searchKeyWord={searchKeyWord}
              handleSetKeyword={handleSetKeyword}
              //
              province={province}
              setProvince={setProvince}
              district={district}
              setDistrict={setDistrict}
              commune={commune}
              setCommune={setCommune}
              //
              displayProvince={displayProvince}
              setDisplayProvince={setDisplayProvince}
              displayDistrict={displayDistrict}
              setDisplayDistrict={setDisplayDistrict}
              displayCommune={displayCommune}
              setDisplayCommune={setDisplayCommune}
              //
              toggleDisplayCards={toggleDisplayCards}
              formData={formData}
              setFormData={setFormData}
              formData2={formData2}
              setFormData2={setFormData2}
              handleToggleFormFilter={handleToggleFormFilter}
              toggleFormFilter={toggleFormFilter}
              handleSetToggleDisplayCards={handleSetToggleDisplayCards}
              handleDiscountOrFreeDelivery={handleDiscountOrFreeDelivery}
            />

            {products[0]?.firstProducts?.length <= 0 && hasMore ? (
              <div className="px-2.5">
                <CardsSkeleton />
              </div>
            ) : products[0]?.firstProducts?.length > 0 ? (
              <div className="px-2.5">
                <CardProductForFilterPage
                  toggleDisplayCards={toggleDisplayCards}
                  account={account}
                  token={token}
                  domain={domain}
                  products={products}
                  setProducts={setProducts}
                />
              </div>
            ) : (
              ""
            )}
            {products[0]?.firstProducts?.length > 0 && hasMore && (
              <LoadingItem />
            )}

            {products?.[0]?.firstProducts?.length <= 0 && !hasMore && (
              <section className={`lg:bg-white p-4 h-[263px] mt-2.5`}>
                <div className="w-full h-full flex flex-col items-center justify-center gap-[8.5px] pb-[25px]">
                  <div className="w-[110px] h-[110px] mt-2">
                    <Image
                      className="w-full h-full object-cover object-center"
                      src={require(`@/assets/empty-box.png`)}
                      width={500}
                      height={500}
                      alt=""
                    />
                  </div>
                  <p className=" font-sans text-[17px] text-[#9A9A9A] text-center">
                    You don&apos;t have any list posts right now
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Page;
