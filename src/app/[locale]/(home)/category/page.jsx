"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import { formatText } from "@/helper/formatText2";
import { formatCategoryName } from "@/helper/formatCategoryName";
import { formatForURL } from "@/helper/formatForURL";

// brand
import { carBrands } from "@/utils/CarBrands";
import { motoBrands } from "@/utils/MotoBrands";
import { phoneBrands } from "@/utils/PhoneBrands";
import { laptopBrands } from "@/utils/LaptopBrands";
import { tabletBrands } from "@/utils/TabletBrands";
import { desktopBrands } from "@/utils/DesktopBrands";
import { monitorBrands } from "@/utils/monitorBrands";
import { allinOneBrands } from "@/utils/AllinOneBrands";
import { smartWatchBrands } from "@/utils/SmartWatcheBrands";
import { printerScannerBrands } from "@/utils/PrinterScannerBrands";

// type
import { jobTypes } from "@/utils/jobTypes";
import { bodyTypes } from "@/utils/BodyTypes";
import { accessories } from "@/utils/Accessory";
import { vehicleTypes } from "@/utils/VehicleTypes";
import { networkBrand } from "@/utils/networkBrands";
import { partsAccessoriesType } from "@/utils/partsAccessoriesType";
import { homeTypes, commercialTypes } from "@/utils/HouseLandsType";
import {
  menFashionTypes,
  womenFashionTypes,
  travelLuggageTypes,
  babyKidFashionTypes,
  fashionAccessoriesTypes,
} from "@/utils/FashionBeautyType";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const SmHeaderFilterPage = dynamic(
  () => import("@/components/SmHeaderFilterPage"),
  {
    ssr: false,
  }
);

const ModelTemplate = dynamic(
  () => import("@/components/filters/ModelTemplate"),
  {
    ssr: false,
  }
);

const CategoryFilter = dynamic(
  () => import("@/components/filters/CategoryFilter"),
  {
    ssr: false,
  }
);

const ListBrandTypeAndMore = dynamic(
  () => import("@/components/filters/ListBrandTypeAndMore"),
  {
    ssr: false,
  }
);

const MobileSearching = dynamic(() => import("@/components/MobileSearching"), {
  ssr: false,
});

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

function Page() {
  const t = useTranslations("categorySearchAndSearchPage");
  const locale = useLocale();
  const router = useRouter();
  const { categories, domain, token, account, changePage, ads } =
    useAppContext();

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

  const [listBrand, setListBrand] = useState([]);
  const [keyBrandName, setKeyBrandName] = useState("");
  const [pathBrand, setPathBrand] = useState("");

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [listTypeOrAny, setListTypeOrAny] = useState([]);
  const [pathTypeOrAny, setPathTypeOrAny] = useState("");
  const [keyTypeOrAnyName, setKeyTypeOrAnyName] = useState("");

  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState([]);
  const [Categories, setCategories] = useState([]);

  const [mainCategoryName, setMainCategoryName] = useState(undefined);
  const [categoryName, setCategoryName] = useState(undefined);

  const [displayMainCategoryName, setDisplayMainCategoryName] = useState();
  const [displayCategoryName, setDisplayCategoryName] = useState();

  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [keyword, setKeyword] = useState(undefined);

  const [province, setProvince] = useState(undefined);
  const [district, setDistrict] = useState(undefined);
  const [commune, setCommune] = useState(undefined);

  const [displayProvince, setDisplayProvince] = useState(undefined);
  const [displayDistrict, setDisplayDistrict] = useState(undefined);
  const [displayCommune, setDisplayCommune] = useState(undefined);

  const [formData, setFormData] = useState({
    date: undefined,
    discount: undefined,
    freeDelivery: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minSalary: undefined,
    maxSalary: undefined,
    minSalePrice: undefined,
    maxSalePrice: undefined,
    condition: undefined,
    sort: undefined,
    brand: undefined,
    model: undefined,
    vehicleType: undefined,
    network: undefined,
    type: undefined,
    bodyType: undefined,
    accessory: undefined,
  });

  const [formData2, setFormData2] = useState({
    date: "",
    discount: "",
    freeDelivery: "",
    minPrice: null,
    maxPrice: null,
    minSalary: null,
    maxSalary: null,
    minSalePrice: null,
    maxSalePrice: null,
    condition: "",
    sort: "",
    brand: "",
    model: "",
    vehicleType: "",
    network: "",
    type: "",
    bodyType: "",
    accessory: "",
  });

  const [toggleFormFilter, setToggleFormFilter] = useState(false);
  const [toggleSearchingPage, setToggleSearchingPage] = useState(false);
  const [toggleTemplateModel, setToggleTemplateModel] = useState(false);
  const [toggleTemplateModelTypeOrAny, setToggleTemplateModelTypeOrAny] =
    useState(false);

  const handleToggleFormFilter = () => setToggleFormFilter((prev) => !prev);

  const handleToggleSearchingPage = () =>
    setToggleSearchingPage((prev) => !prev);

  // start get and set field from model template
  const handleToggleTemplateModelBrand = () => {
    setToggleTemplateModel(!toggleTemplateModel);
    handleToggleFormFilter();
  };
  const handleToggleTemplateModelTypeOrAny = () => {
    setToggleTemplateModelTypeOrAny(!toggleTemplateModelTypeOrAny);
    handleToggleFormFilter();
  };

  const handleSetToggleDisplayCards = () => {
    setToggleDisplayCards(!toggleDisplayCards);
  };

  const handleSetBrand = (key, value) => {
    setFormData2((prev) => ({ ...prev, [key]: value }));
    setToggleTemplateModel(!toggleTemplateModel);
    handleToggleFormFilter();
  };

  const handleSetValueTypeOrAny = (key, value) => {
    setFormData2((prev) => ({ ...prev, [key]: value }));
    setToggleTemplateModelTypeOrAny(!toggleTemplateModelTypeOrAny);
    handleToggleFormFilter();
  };

  const handleSetBrand2 = (key, value) => {
    setFormData2((prev) => ({ ...prev, [key]: value }));
    setFormData((prev) => ({ ...prev, [key]: value.toLowerCase() }));
  };

  const handleSetValueTypeOrAny2 = (key, value) => {
    setFormData2((prev) => ({ ...prev, [key]: value }));
    setFormData((prev) => ({ ...prev, [key]: value.toLowerCase() }));
  };
  // end get and set field from model template

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
    const queryData = {};

    if (keyword) queryData.keyword = decodeURIComponent(keyword);
    if (mainCategoryName)
      queryData["main-category"] = formatForURL(mainCategoryName);
    if (categoryName) queryData.category = formatForURL(categoryName);

    if (formData) {
      for (const [key, value] of Object.entries(formData)) {
        if (value != null && value !== "") {
          queryData[key] = value;
        }
      }
    }

    if (province)
      queryData.province = province.toLowerCase().replace(/\s+/g, "-");
    if (district)
      queryData.district = district.toLowerCase().replace(/\s+/g, "-");
    if (commune) queryData.commune = commune.toLowerCase().replace(/\s+/g, "-");

    // ប្រើ URLSearchParams ដើម្បីបង្កើតខ្សែបណ្តុំ URL
    let query = new URLSearchParams(queryData).toString();
    query = query.replace(/%2B/g, "+");

    // កំណត់ URL path ដោយផ្អែកលើការមាន mainCategoryName
    const url = mainCategoryName ? `/category?${query}` : `/search?${query}`;

    // ផ្ទេរទៅ URL ថ្មី
    router.push(url);
  }, [
    router,
    formData,
    keyword,
    province,
    district,
    commune,
    mainCategoryName,
    categoryName,
  ]);

  // query product
  const generateQueryString = (queryData) => {
    const params = new URLSearchParams();
    Object.keys(queryData).forEach((key) => {
      let value = queryData[key];

      if (value == null || value === "") {
        return;
      }

      params.append(key, value);
    });

    const queryString = params.toString();
    return queryString;
  };

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
          mainCategory: mainCategoryName,
          subCategory: categoryName,
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
      mainCategoryName,
      categoryName,
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
    let count = 0;

    for (let value of Object.values(formData)) {
      if (value !== "" && value !== null) count++;
    }

    if (searchKeyWord !== "" && searchKeyWord !== undefined) count++;
    if (province !== "") count++;
    if (district !== "") count++;
    if (commune !== "") count++;
    setCount(count);
  }, [
    searchKeyWord,
    province,
    district,
    commune,
    formData,
    // ...Object.keys(formData).map((key) => formData[key]),
  ]);

  const categoryMap = useMemo(() => {
    return new Map(
      categories.map((ca) => [
        formatCategoryName(ca.name),
        ca.subcategories || [],
      ])
    );
  }, [categories]);

  const setCategoriesAndcategory = useCallback(() => {
    if (!mainCategoryName) return;

    const formattedMC = formatCategoryName(mainCategoryName);
    const formattedC = formatCategoryName(categoryName);

    const validCategories = new Set([
      "cars & vehicles",
      "phones & tablets",
      "computers & accessories",
      "electronics & appliances",
      "house & lands",
      "jobs",
      "services",
      "fashion & beauty",
      "furniture & decor",
      "books sports & hobbies",
      "pets",
      "foods",
    ]);

    if (validCategories.has(formattedMC)) {
      if (!categoryName) {
        setCategories(categoryMap.get(formattedMC) || []);
      } else {
        setCategories([]);
        const subcategories = categoryMap.get(formattedMC) || [];
        const foundSubcategory = subcategories.find(
          (sub) => formatCategoryName(sub.name) === formattedC
        );

        if (foundSubcategory) {
          const rmNumber = foundSubcategory.fields.map((field) =>
            field.replace(/^\d+/g, "")
          );
          setDisplay(rmNumber);
        }
      }
    }
  }, [mainCategoryName, categoryName, categoryMap]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeout = setTimeout(() => {
      updateSearchURL();
    }, 100); // Debounce 100ms

    return () => clearTimeout(timeout);
  }, [updateSearchURL]);

  useEffect(() => {
    const queryData = {};

    searchParams.forEach((value, key) => {
      queryData[key] = value;
    });

    // Update formData and formData2 with query params
    setFormData((prev) => ({
      ...prev,
      sort: queryData.sort || "",
      date: queryData.date || "",
      discount: queryData.discount || "",
      freeDelivery: queryData.freeDelivery || "",
      maxPrice: queryData.maxPrice || "",
      minPrice: queryData.minPrice || "",
      condition: queryData.condition || "",
      minSalary: queryData.minSalary || "",
      maxSalary: queryData.maxSalary || "",
      minSalePrice: queryData.minSalePrice || "",
      maxSalePrice: queryData.maxSalePrice || "",
      type: queryData.type || "",
      brand: queryData.brand || "",
      model: queryData.model || "",
      network: queryData.network || "",
      bodyType: queryData.bodyType || "",
      accessory: queryData.accessory || "",
      vehicleType: queryData.vehicleType || "",
    }));

    setFormData2((prev) => ({
      ...prev,
      sort: queryData.sort || "",
      date: queryData.date || "",
      discount: queryData.discount || "",
      freeDelivery: queryData.freeDelivery || "",
      maxPrice: queryData.maxPrice || "",
      minPrice: queryData.minPrice || "",
      condition: queryData.condition || "",
      minSalary: queryData.minSalary || "",
      maxSalary: queryData.maxSalary || "",
      minSalePrice: queryData.minSalePrice || "",
      maxSalePrice: queryData.maxSalePrice || "",
      type: formatText(queryData.type) || "",
      brand: formatText(queryData.brand) || "",
      model: formatText(queryData.model) || "",
      network: formatText(queryData.network) || "",
      bodyType: formatText(queryData.bodyType) || "",
      accessory: formatText(queryData.accessory) || "",
      vehicleType: formatText(queryData.vehicleType) || "",
    }));

    setProvince(queryData.province || "");
    setDistrict(queryData.district || "");
    setCommune(queryData.commune || "");

    setMainCategoryName(queryData["main-category"]);
    setCategoryName(queryData.category);

    setKeyword(queryData.keyword || "");
    setSearchKeyWord(queryData.keyword?.replace(/\+/g, " "));
    changePage();
  }, [searchParams]);

  useEffect(() => {
    countFilledFields();
  }, [countFilledFields]);

  useEffect(() => {
    setCategoriesAndcategory();
  }, [mainCategoryName, categoryName, setCategoriesAndcategory]);

  const itemConfig = useMemo(
    () => [
      {
        key: "network",
        displayName: "network",
        displayKhName: "បណ្តាញ",
        list: networkBrand,
        path: "phonesTablets",
      },
      {
        key: "type",
        displayName: "type",
        displayKhName: "ប្រភេទ",
        list: jobTypes,
        path: "jobsAndHouseLands",
        condition: mainCategoryName === "jobs",
      },
      {
        key: "bodyType",
        displayName: "Body Type",
        displayKhName: "ប្រភេទតួរថយន្ត",
        list: bodyTypes,
        path: "bodyTypes",
      },
      {
        key: "vehicleType",
        displayName: "Vehicle Type",
        displayKhName: "ប្រភេទតួរថយន្ត",
        list: vehicleTypes,
        path: "vehicleTypes",
      },
      {
        key: "accessory",
        displayName: "Accessory",
        displayKhName: "គ្រឿងបន្លាស់",
        list: accessories,
        path: "phonesTablets",
      },
      {
        key: "homeType",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: homeTypes,
        path: "jobsAndHouseLands",
      },
      {
        key: "commercialTypes",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: commercialTypes,
        path: "jobsAndHouseLands",
      },
      {
        key: "womenFashionType",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: womenFashionTypes,
        path: "fashionBeauty",
      },
      {
        key: "menFashionType",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: menFashionTypes,
        path: "fashionBeauty",
      },
      {
        key: "babyKidsFashionType",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: babyKidFashionTypes,
        path: "fashionBeauty",
      },
      {
        key: "travelLuggageTypes",
        displayName: "Types",
        displayKhName: "ប្រភេទ",
        list: travelLuggageTypes,
        path: "fashionBeauty",
      },
      {
        key: "accessoryTypes",
        displayName: "Accessory Types",
        displayKhName: "ប្រភេទគ្រឿងបន្លាស់",
        list: fashionAccessoriesTypes,
        path: "fashionBeauty",
      },
      {
        key: "type",
        khKey: "ប្រភេទ",
        displayName: "Type",
        displayKhName: "ប្រភេទ",
        list: partsAccessoriesType,
        path: "computersAccessories",
      },
    ],
    [mainCategoryName]
  );

  const brandConfig = useMemo(
    () => [
      { key: "carBrand", list: carBrands, path: "brands/car" },
      { key: "motoBrand", list: motoBrands, path: "brands/moto" },
      { key: "phoneBrand", list: phoneBrands, path: "phonesTablets" },
      { key: "laptopBrand", list: laptopBrands, path: "computersAccessories" },
      { key: "tabletBrand", list: tabletBrands, path: "phonesTablets" },
      {
        key: "desktopBrand",
        list: desktopBrands,
        path: "computersAccessories",
      },
      {
        key: "monitorBrand",
        list: monitorBrands,
        path: "computersAccessories",
      },
      {
        key: "allinOneBrand",
        list: allinOneBrands,
        path: "computersAccessories",
      },
      { key: "smartWatchBrand", list: smartWatchBrands, path: "phonesTablets" },
      {
        key: "printerScannerBrand",
        list: printerScannerBrands,
        path: "computersAccessories",
      },
    ],
    []
  );

  // brand type..
  useEffect(() => {
    if (categoryName) {
      const foundBrand = brandConfig.find(({ key }) => display.includes(key));
      if (foundBrand) {
        setKeyBrandName("brand");
        setListBrand(foundBrand.list);
        setPathBrand(foundBrand.path);
      }

      const foundItem = itemConfig.find(
        ({ key, condition = true }) => display.includes(key) && condition
      );

      if (foundItem) {
        setListTypeOrAny(foundItem.list);
        setPathTypeOrAny(foundItem.path);
        setName(foundItem.key);
        setDisplayName(
          locale == "en" ? foundItem.displayName : foundItem.displayKhName
        );
        setKeyTypeOrAnyName(foundItem.key);
      }
    } else {
      setListBrand([]);
      setPathBrand(null);
      setListTypeOrAny([]);
      setPathTypeOrAny(null);
      setName("");
      setDisplayName("");
      setKeyTypeOrAnyName("");
      setKeyBrandName("");
    }
  }, [display, categoryName, brandConfig, itemConfig, locale]);

  useEffect(() => {
    const isReady = [
      mainCategoryName,
      keyword,
      categoryName,
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
    mainCategoryName,
    categoryName,
    province,
    district,
    commune,
    searchParams,
    formData,
    // ...Object.keys(formData).map((key) => formData[key]),
  ]);

  useEffect(() => {
    if (!mainCategoryName) return;

    const category = categories.find(
      (c) => formatForURL(c.name) === mainCategoryName
    );

    if (!category) return;

    setDisplayMainCategoryName(
      locale === "en" ? category.name : category.khName
    );

    if (categoryName) {
      const subCategory = category.subcategories?.find(
        (sc) => formatForURL(sc.name) === categoryName
      );

      if (subCategory) {
        setDisplayCategoryName(
          locale === "en" ? subCategory.name : subCategory.khName
        );
      }
    }
  }, [mainCategoryName, categoryName, locale, categories]);

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
      <ModelTemplate
        keyName={keyBrandName}
        name={t("brand")}
        lists={listBrand}
        path={pathBrand}
        handleToggle={handleToggleTemplateModelBrand}
        toggle={toggleTemplateModel}
        handleSetValue={handleSetBrand}
      />

      <ModelTemplate
        keyName={keyTypeOrAnyName}
        name={displayName}
        lists={listTypeOrAny}
        path={pathTypeOrAny}
        handleToggle={handleToggleTemplateModelTypeOrAny}
        toggle={toggleTemplateModelTypeOrAny}
        handleSetValue={handleSetValueTypeOrAny}
      />

      {toggleSearchingPage ? (
        <MobileSearching
          handleToggleSearchingPage={handleToggleSearchingPage}
          setKeyword={setKeyword}
          setSearchKeyWord={setSearchKeyWord}
          searchKeyWord={searchKeyWord}
        />
      ) : (
        <div className="mb-20">
          <div className="top-0 sticky z-[9] lg:hidden w-full">
            <SmHeaderFilterPage
              t={t}
              mainCategoryName={mainCategoryName}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              setMainCategoryName={setMainCategoryName}
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
                <div className="lg:h-[250px]">
                  <Image
                    className="w-full lg:w-auto lg:h-[250px] object-cover object-center"
                    src={ads[2]?.image || ads[1]?.image || ads[0]?.image || ""}
                    alt=""
                    width={600}
                    height={800}
                  />
                </div>
              </div>
            )}

            <div
              className={`hidden lg:flex space-x-2 py-3.5 ${
                locale == "en" ? " font-sans" : "font-battambang"
              }`}
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
                <div>
                  {searchKeyWord ? (
                    <>
                      <span>{t("search")} </span>
                      <span>{searchKeyWord}</span>
                      <span>
                        {" " + t("inListAllAdsIn") + " "}
                        {displayProvince && <span>{displayProvince}, </span>}
                        {t("cambodia")}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="">
                        {displayCategoryName || displayMainCategoryName}
                      </span>
                      <span>
                        {" " + t("in") + " "}
                        {displayProvince && <span>{displayProvince}, </span>}
                        {t("cambodia")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <CategoryFilter
              t={t}
              locale={locale}
              displayCategoryName={displayCategoryName}
              displayMainCategoryName={displayMainCategoryName}
              handleToggleTemplateModelBrand={handleToggleTemplateModelBrand}
              handleSetValueTypeOrAny={handleSetValueTypeOrAny}
              count={count}
              display={display}
              categories={Categories}
              mainCategoryName={formatCategoryName(mainCategoryName)}
              categoryName={formatCategoryName(categoryName)}
              setCategory={
                mainCategoryName ? setCategoryName : setMainCategoryName
              }
              searchKeyWord={searchKeyWord}
              toggleDisplayCards={toggleDisplayCards}
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
              formData={formData}
              setFormData={setFormData}
              formData2={formData2}
              setFormData2={setFormData2}
              handleToggleFormFilter={handleToggleFormFilter}
              toggleFormFilter={toggleFormFilter}
              name={name}
              displayName={displayName}
              keyBrandName={keyBrandName}
              handleDiscountOrFreeDelivery={handleDiscountOrFreeDelivery}
              handleSetToggleDisplayCards={handleSetToggleDisplayCards}
            />

            {/* list brand */}
            {formData.brand === "" && (
              <div className="bg-white">
                {listBrand?.length > 0 && (
                  <ListBrandTypeAndMore
                    lists={listBrand}
                    path={pathBrand}
                    handleSetValue={handleSetBrand2}
                    keyName={keyBrandName}
                  />
                )}
              </div>
            )}

            {/* list type or any */}
            {formData.vehicleType === "" &&
              formData.bodyType === "" &&
              formData.accessory === "" &&
              formData.type === "" &&
              formData.network === "" && (
                <div className="bg-white">
                  {listTypeOrAny?.length > 0 && (
                    <ListBrandTypeAndMore
                      lists={listTypeOrAny}
                      path={pathTypeOrAny}
                      handleSetValue={handleSetValueTypeOrAny2}
                      keyName={keyTypeOrAnyName}
                    />
                  )}
                </div>
              )}

            {products[0]?.firstProducts?.length <= 0 && hasMore && (
              <div className="px-2.5 lg:px-0">
                <CardsSkeleton />
              </div>
            )}

            {products[0]?.firstProducts?.length > 0 ? (
              <div className="px-2.5 lg:px-0">
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

            {/* empty product */}
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
