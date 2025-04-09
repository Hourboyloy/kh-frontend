import React, { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { locations } from "@/helper/Locations";
import { formatText } from "@/helper/formatText";
import { MdFormatListBulleted } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineMapPin } from "react-icons/hi2";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { CiFilter } from "react-icons/ci";

import { IoMdClose } from "react-icons/io";
import { MdOutlineLocalShipping } from "react-icons/md";
import { VscPercentage } from "react-icons/vsc";

const LocationFilter = dynamic(
  () => import("@/components/filters/LocationFilter"),
  {
    ssr: false,
  }
);

const ListCategoriesFilter = dynamic(
  () => import("@/components/filters/ListCategoriesFilter"),
  {
    ssr: false,
  }
);

const FormApplyFilter = dynamic(
  () => import("@/components/filters/FormApplyFilter"),
  {
    ssr: false,
  }
);

const SortFilter = dynamic(() => import("@/components/filters/SortFilter"), {
  ssr: false,
});

const BuckghtFilter = dynamic(
  () => import("@/components/filters/BuckghtFilter"),
  {
    ssr: false,
  }
);

const ConditionFilter = dynamic(
  () => import("@/components/filters/ConditionFilter"),
  {
    ssr: false,
  }
);

function CategoryFilter({
  t,
  locale,
  displayMainCategoryName,
  displayCategoryName,
  categories,
  mainCategoryName,
  categoryName,
  setCategory,
  handleSetKeyword,
  searchKeyWord,

  province,
  setProvince,
  district,
  setDistrict,
  commune,
  setCommune,

  displayProvince,
  setDisplayProvince,
  displayDistrict,
  setDisplayDistrict,
  displayCommune,
  setDisplayCommune,

  formData,
  setFormData,

  formData2,
  setFormData2,

  handleToggleFormFilter,
  toggleFormFilter,
  count,
  display,
  handleToggleTemplateModelBrand,
  handleSetValueTypeOrAny,
  name,
  displayName,
  keyBrandName,
  handleDiscountOrFreeDelivery,

  handleSetToggleDisplayCards,
  toggleDisplayCards,
}) {
  const locationRefMobile = useRef(null);
  const sortRefMobile = useRef(null);
  const priceRefMobile = useRef(null);
  const salePriceRefMobile = useRef(null);
  const salaryRefMobile = useRef(null);
  const conditionRefMobile = useRef(null);

  const dropdownRefsMobile = useMemo(
    () => ({
      location: locationRefMobile,
      sort: sortRefMobile,
      price: priceRefMobile,
      salePrice: salePriceRefMobile,
      salary: salaryRefMobile,
      condition: conditionRefMobile,
    }),
    []
  );

  const locationRefDesktop = useRef(null);
  const sortRefDesktop = useRef(null);
  const priceRefDesktop = useRef(null);
  const salePriceRefDesktop = useRef(null);
  const salaryRefDesktop = useRef(null);
  const conditionRefDesktop = useRef(null);

  const dropdownRefsDesktop = useMemo(
    () => ({
      location: locationRefDesktop,
      sort: sortRefDesktop,
      price: priceRefDesktop,
      salePrice: salePriceRefDesktop,
      salary: salaryRefDesktop,
      condition: conditionRefDesktop,
    }),
    []
  );

  const [toggleLocation, setToggleLocation] = useState(false);
  const [toggleSort, setToggleSort] = useState(false);
  const [togglePrice, setTogglePrice] = useState(false);
  const [toggleSalePrice, setToggleSalePrice] = useState(false);
  const [toggleSalary, setToggleSalary] = useState(false);
  const [toggleCondition, setToggleCondition] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleClearLocation = () => {
    setProvince("");
    setDistrict("");
    setCommune("");
    setDisplayCommune("");
    setDisplayDistrict("");
    setDisplayProvince("");
    setToggleLocation(false);
  };

  const handleSetSort = (v) => {
    setFormData((prev) => ({ ...prev, sort: v }));
    setFormData2((prev) => ({ ...prev, sort: v }));
    setToggleSort(false);
  };

  const handleCLoseSort = () => {
    setFormData((prev) => ({ ...prev, sort: "" }));
  };

  const handleToggleLocation = () => {
    setToggleLocation(!toggleLocation);
  };

  const handleToggleSort = () => {
    setToggleSort(!toggleSort);
  };

  const handleClearCondition = () => {
    setFormData((prev) => ({ ...prev, condition: "" }));
    setFormData2((prev) => ({ ...prev, condition: "" }));
  };

  const handleClearField = (fieldName, setToggle) => {
    setFormData((prev) => ({
      ...prev,
      [`max${fieldName}`]: "",
      [`min${fieldName}`]: "",
    }));
    setFormData2((prev) => ({
      ...prev,
      [`max${fieldName}`]: "",
      [`min${fieldName}`]: "",
    }));
    setToggle(false);
  };

  const handleToggleCondition = () => {
    setToggleCondition(!toggleCondition);
  };

  const handleTogglePrice = () => {
    setTogglePrice(!togglePrice);
  };

  const handleToggleSalePrice = () => {
    setToggleSalePrice(!toggleSalePrice);
  };

  const handleToggleSalary = () => {
    setToggleSalary(!toggleSalary);
  };

  const handleSubmit = (field) => {
    setFormData((prev) => ({
      ...prev,
      [`min${field}`]: formData2[`min${field}`],
      [`max${field}`]: formData2[`max${field}`],
    }));

    // Dynamically close the corresponding toggle state
    if (field === "Price") setTogglePrice(false);
    if (field === "SalePrice") setToggleSalePrice(false);
    if (field === "Salary") setToggleSalary(false);
  };

  const handleValidatedInput = (key, value) => {
    let validValue = value.replace(/[^0-9.]/g, "");
    validValue = Math.min(Math.max(Number(validValue) || 0, 0), 999999);
    setFormData2((prev) => ({ ...prev, [key]: validValue }));
  };

  useEffect(() => {
    if (!province) return;

    const selectedProvince = locations.find(
      (loc) => loc.province.en === formatText(province)
    );
    if (!selectedProvince) return;
    setDisplayProvince(selectedProvince.province[locale]);
    if (!district) return;

    const selectedDistrict = selectedProvince.districts.find(
      (d) => d.district?.en === formatText(district)
    );
    if (!selectedDistrict) return;
    setDisplayDistrict(selectedDistrict.district[locale]);

    if (!commune) return;
    const selectedCommune = selectedDistrict.communes.find(
      (c) => c.commune?.en === formatText(commune)
    );
    if (!selectedCommune) return;
    setDisplayCommune(selectedCommune[locale]);
  }, [locations, locale, province]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs =
        screenWidth < 1024 ? dropdownRefsMobile : dropdownRefsDesktop;
      const setters = {
        location: setToggleLocation,
        sort: setToggleSort,
        price: setTogglePrice,
        salePrice: setToggleSalePrice,
        salary: setToggleSalary,
        condition: setToggleCondition,
      };

      Object.keys(refs).forEach((key) => {
        if (refs[key].current && !refs[key].current.contains(event.target)) {
          setters[key](false);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [screenWidth, dropdownRefsDesktop, dropdownRefsMobile]);

  return (
    <div className="border-b">
      <FormApplyFilter
        t={t}
        locale={locale}
        searchKeyWord={searchKeyWord}
        locations={locations}
        handleSetKeyword={handleSetKeyword}
        handleToggle={handleToggleFormFilter}
        toggle={toggleFormFilter}
        formData2={formData2}
        setFormData2={setFormData2}
        setFormData={setFormData}
        setProvince={setProvince}
        setDistrict={setDistrict}
        setCommune={setCommune}
        province={province}
        district={district}
        commune={commune}
        //
        setDisplayProvince={setDisplayProvince}
        setDisplayDistrict={setDisplayDistrict}
        setDisplayCommune={setDisplayCommune}
        display={display}
        mainCategoryName={mainCategoryName}
        handleToggleTemplateModelBrand={handleToggleTemplateModelBrand}
        handleSetValueTypeOrAny={handleSetValueTypeOrAny}
        name={name}
        displayName={displayName}
        keyBrandName={keyBrandName}
      />

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${toggleSort ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            toggleSort
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <SortFilter
            dropdownSortRef={dropdownRefsMobile.sort}
            handleSetSort={handleSetSort}
            sort={formData.sort}
            locale={locale}
            handleToggleSort={handleToggleSort}
          />
        </section>
      </section>

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${toggleLocation ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            toggleLocation
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <LocationFilter
            dropdownLocationRef={dropdownRefsMobile.location}
            handleToggleLocation={handleToggleLocation}
            handleClearLocation={handleClearLocation}
            setToggleLocation={setToggleLocation}
            locations={locations}
            province={province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            commune={commune}
            setCommune={setCommune}
            //
            setDisplayProvince={setDisplayProvince}
            setDisplayDistrict={setDisplayDistrict}
            setDisplayCommune={setDisplayCommune}
            //
            locale={locale}
            t={t}
          />
        </section>
      </section>

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${togglePrice ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            togglePrice
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <BuckghtFilter
            dropdownRef={dropdownRefsMobile.price}
            setToggle={setTogglePrice}
            handleClearField={handleClearField}
            handleClose={handleTogglePrice}
            name={t("price")}
            locale={locale}
            t={t}
            fieldName="Price"
            formData2={formData2}
            handleValidatedInput={handleValidatedInput}
            handleSubmit={handleSubmit}
          />
        </section>
      </section>

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${toggleSalePrice ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            toggleSalePrice
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <BuckghtFilter
            dropdownRef={dropdownRefsMobile.salePrice}
            setToggle={setToggleSalePrice}
            handleClearField={handleClearField}
            handleClose={handleToggleSalePrice}
            name={t("salePrice")}
            locale={locale}
            t={t}
            fieldName="SalePrice"
            formData2={formData2}
            handleValidatedInput={handleValidatedInput}
            handleSubmit={handleSubmit}
          />
        </section>
      </section>

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${toggleSalary ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            toggleSalary
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <BuckghtFilter
            dropdownRef={dropdownRefsMobile.salary}
            setToggle={setToggleSalary}
            handleClearField={handleClearField}
            handleClose={handleToggleSalary}
            name={t("salary")}
            locale={locale}
            t={t}
            fieldName="Salary"
            formData2={formData2}
            handleValidatedInput={handleValidatedInput}
            handleSubmit={handleSubmit}
          />
        </section>
      </section>

      <section className=" *:fixed *:z-10 lg:hidden">
        <div
          className={`h-screen inset-0 bg-[#0f0d0d] bg-opacity-60 transition-opacity duration-300 ease-in-out
          ${toggleCondition ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        ></div>

        <section
          className={`w-full transition-all duration-200 ${
            toggleCondition
              ? "opacity-100 bottom-0"
              : "bottom-4 opacity-0 pointer-events-none"
          }`}
        >
          <ConditionFilter
            t={t}
            locale={locale}
            formData2={formData2}
            setFormData2={setFormData2}
            setFormData={setFormData}
            dropdownRef={dropdownRefsMobile.condition}
            handleToggleCondition={handleToggleCondition}
          />
        </section>
      </section>

      <section className="bg-white">
        <div className="border-b px-[8.5px] pb-2 pt-2.5 space-y-3">
          <div className="hidden lg:flex items-center justify-between">
            <div
              className={`${locale == "en" ? "font-semibold font-sans" : ""}`}
            >
              <p className="space-x-1 text-[19px] text-gray-700">
                {searchKeyWord ? (
                  <>
                    <span>{t("search")}</span>
                    <span className="font-medium">{searchKeyWord}</span>
                    <span>
                      {t("inListAllAdsIn")}{" "}
                      {displayProvince && <span>{displayProvince}, </span>}
                      {t("cambodia")}
                    </span>
                  </>
                ) : displayMainCategoryName || displayCategoryName ? (
                  <>
                    <span className="">
                      {displayCategoryName || displayMainCategoryName}
                    </span>{" "}
                    {t("in")}{" "}
                    {displayProvince && <span>{displayProvince}, </span>}
                    <span> {t("cambodia")}</span>
                  </>
                ) : (
                  <>
                    <span>
                      {t("inListAllAdsIn")}{" "}
                      {displayProvince && <span>{displayProvince}, </span>}
                      {t("cambodia")}
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-3.5">
              <button
                onClick={() => handleDiscountOrFreeDelivery("discount")}
                className={`focus:outline-none outline-none ${
                  formData?.discount ? "text-[#016B9D]" : "text-gray-800"
                }`}
              >
                <VscPercentage size={29} />
              </button>

              <button
                onClick={() => handleDiscountOrFreeDelivery("freeDelivery")}
                className={`focus:outline-none outline-none ${
                  formData?.freeDelivery ? "text-[#016B9D]" : "text-gray-700"
                }`}
              >
                <MdOutlineLocalShipping size={29} />
              </button>

              <button
                onClick={handleSetToggleDisplayCards}
                className="focus:outline-none outline-none"
              >
                {toggleDisplayCards ? (
                  <RxDashboard size={25} />
                ) : (
                  <MdFormatListBulleted size={25} />
                )}
              </button>
            </div>
          </div>

          <section
            className={`flex items-start justify-between ${
              locale == "en" ? " font-sans" : ""
            }`}
          >
            {/* category when lg screen*/}
            <section className="w-11/12 hidden lg:flex items-center space-x-2 text-[15px] *:cursor-pointer *:text-nowrap">
              {/* locations */}
              <div
                ref={dropdownRefsDesktop.location}
                className="w-fit relative"
              >
                {province ? (
                  <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                    <div
                      onClick={handleToggleLocation}
                      className="flex items-center space-x-0.5"
                    >
                      <HiOutlineMapPin size={18} />
                      <span>
                        {displayCommune || displayDistrict || displayProvince}
                      </span>
                    </div>
                    <IoMdClose
                      onClick={handleClearLocation}
                      className="text-gray-600"
                      size={16}
                    />
                  </div>
                ) : (
                  <div
                    onClick={handleToggleLocation}
                    className="flex items-center space-x-0.5 bg-[#EDEDED] px-2 py-1 rounded select-none"
                  >
                    <HiOutlineMapPin size={18} />
                    <span>{t("allLocation")}</span>
                  </div>
                )}

                {/*dropdown location  */}
                <section
                  className={`w-[360.4px] h-fit absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out hidden md:block ${
                    toggleLocation
                      ? "opacity-100 scale-100"
                      : "opacity-0 pointer-events-none scale-95"
                  }`}
                >
                  <LocationFilter
                    locations={locations}
                    province={province}
                    setProvince={setProvince}
                    district={district}
                    setDistrict={setDistrict}
                    commune={commune}
                    setCommune={setCommune}
                    setToggleLocation={setToggleLocation}
                    //
                    setDisplayProvince={setDisplayProvince}
                    setDisplayDistrict={setDisplayDistrict}
                    setDisplayCommune={setDisplayCommune}
                    //
                    t={t}
                    locale={locale}
                  />
                </section>
              </div>

              {/* sort */}
              <div ref={dropdownRefsDesktop.sort} className="w-fit relative">
                <section>
                  {formData.sort === "" ? (
                    <div
                      onClick={handleToggleSort}
                      className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                    >
                      <span>{t("sort")}</span>
                      <MdOutlineArrowDropDown size={19} />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                      <div
                        onClick={handleToggleSort}
                        className="flex items-center bg-[#EDEDED] rounded"
                      >
                        <span className="">
                          {formData.sort === "lastest"
                            ? locale == "en"
                              ? "Lastest Ads"
                              : "ចុងក្រោយ"
                            : formData.sort === "new"
                            ? locale == "en"
                              ? "New Ads"
                              : "ថ្មី"
                            : formData.sort === "mosthit"
                            ? locale == "en"
                              ? "Most Hit Ads"
                              : "ចុចច្រើន"
                            : formData.sort === "priceasc"
                            ? locale == "en"
                              ? "price: low to high"
                              : "តំម្លៃ: ទាបទៅខ្ពស់"
                            : formData.sort === "pricedesc"
                            ? locale == "en"
                              ? "price: high to low"
                              : "តំម្លៃ: ខ្ពស់ទៅទាប"
                            : ""}
                        </span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                      <IoMdClose
                        onClick={handleCLoseSort}
                        className="text-gray-600"
                        size={16}
                      />
                    </div>
                  )}
                </section>

                {/* dropdown sorting */}
                <section
                  className={`w-[218.4px] absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out ${
                    toggleSort
                      ? "opacity-100 scale-100"
                      : "opacity-0 pointer-events-none scale-95"
                  }`}
                >
                  <SortFilter
                    locale={locale}
                    handleSetSort={handleSetSort}
                    sort={formData.sort}
                    handleToggleSort={handleToggleSort}
                  />
                </section>
              </div>

              {/* price */}
              {(display?.length === 0 || display?.some((e) => e === "price")) &&
                mainCategoryName !== "jobs" && (
                  <div
                    ref={dropdownRefsDesktop.price}
                    className="w-fit relative"
                  >
                    {formData.minPrice || formData.maxPrice ? (
                      <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                        <div
                          onClick={handleTogglePrice}
                          className="flex items-center bg-[#EDEDED] py-1 rounded"
                        >
                          <span>
                            {t("price")}:{" "}
                            {formData.minPrice && formData.maxPrice
                              ? `${formData.minPrice} - ${formData.maxPrice}`
                              : formData.minPrice || formData.maxPrice || "N/A"}
                          </span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                        <IoMdClose
                          onClick={() =>
                            handleClearField("Price", setTogglePrice)
                          }
                          className="text-gray-600"
                          size={16}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={handleTogglePrice}
                        className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                      >
                        <span>{t("price")}</span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                    )}

                    {/*dropdown price  */}
                    <section
                      className={`w-[360px] absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out ${
                        togglePrice
                          ? "opacity-100 scale-100"
                          : "opacity-0 pointer-events-none scale-95"
                      }`}
                    >
                      {/* price */}
                      <BuckghtFilter
                        name={t("price")}
                        locale={locale}
                        t={t}
                        fieldName="Price"
                        formData2={formData2}
                        handleValidatedInput={handleValidatedInput}
                        handleSubmit={handleSubmit}
                      />
                    </section>
                  </div>
                )}

              {/* sale price */}
              {display?.length > 0 &&
                display?.some((e) => e === "salePrice") && (
                  <div
                    ref={dropdownRefsDesktop.salePrice}
                    className="w-fit relative"
                  >
                    {formData.minSalePrice || formData.maxSalePrice ? (
                      <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                        <div
                          onClick={handleToggleSalePrice}
                          className="flex items-center bg-[#EDEDED] py-1 rounded"
                        >
                          <span>
                            {t("salePrice")}:{" "}
                            {formData.minSalePrice && formData.maxSalePrice
                              ? `${formData.minSalePrice} - ${formData.maxSalePrice}`
                              : formData.minSalePrice ||
                                formData.maxSalePrice ||
                                "N/A"}
                          </span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                        <IoMdClose
                          onClick={() =>
                            handleClearField("SalePrice", setToggleSalePrice)
                          }
                          className="text-gray-600"
                          size={16}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={handleToggleSalePrice}
                        className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                      >
                        <span>{t("salePrice")}</span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                    )}

                    {/*dropdown sale price  */}
                    <section
                      className={`w-[360px] absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out ${
                        toggleSalePrice
                          ? "opacity-100 scale-100"
                          : "opacity-0 pointer-events-none scale-95"
                      }`}
                    >
                      <BuckghtFilter
                        name={t("salePrice")}
                        locale={locale}
                        t={t}
                        fieldName="SalePrice"
                        formData2={formData2}
                        handleValidatedInput={handleValidatedInput}
                        handleSubmit={handleSubmit}
                      />
                    </section>
                  </div>
                )}

              {/* salary */}
              {mainCategoryName === "jobs" && (
                <div
                  ref={dropdownRefsDesktop.salary}
                  className="w-fit relative"
                >
                  {formData.minSalary || formData.maxSalary ? (
                    <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                      <div
                        onClick={handleToggleSalary}
                        className="flex items-center bg-[#EDEDED] py-1 rounded"
                      >
                        <span>
                          {t("salary")}:{" "}
                          {formData.minSalary && formData.maxSalary
                            ? `${formData.minSalary} - ${formData.maxSalary}`
                            : formData.minSalary || formData.maxSalary || "N/A"}
                        </span>

                        <MdOutlineArrowDropDown size={19} />
                      </div>
                      <IoMdClose
                        onClick={() =>
                          handleClearField("Salary", setToggleSalary)
                        }
                        className="text-gray-600"
                        size={16}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={handleToggleSalary}
                      className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                    >
                      <span>{t("salary")}</span>
                      <MdOutlineArrowDropDown size={19} />
                    </div>
                  )}

                  {/*dropdown salary  */}
                  <section
                    className={`w-[360px] absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out ${
                      toggleSalary
                        ? "opacity-100 scale-100"
                        : "opacity-0 pointer-events-none scale-95"
                    }`}
                  >
                    <BuckghtFilter
                      name={t("salary")}
                      locale={locale}
                      t={t}
                      fieldName="Salary"
                      formData2={formData2}
                      handleValidatedInput={handleValidatedInput}
                      handleSubmit={handleSubmit}
                    />
                  </section>
                </div>
              )}

              {/* condition */}
              {display?.length > 0 &&
                display?.some((e) => e === "condition") && (
                  <div
                    ref={dropdownRefsDesktop.condition}
                    className="w-fit relative"
                  >
                    <section>
                      {formData.condition === "" ? (
                        <div
                          onClick={handleToggleCondition}
                          className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                        >
                          <span className="">{t("condition")}</span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                          <div
                            onClick={handleToggleCondition}
                            className="flex items-center bg-[#EDEDED] rounded"
                          >
                            <span className="">
                              {formData.condition == "New"
                                ? locale == "en"
                                  ? "New"
                                  : "ថ្មី"
                                : formData.condition == "Used"
                                ? locale == "en"
                                  ? "Used"
                                  : "មួយទឹក"
                                : ""}
                            </span>
                            <MdOutlineArrowDropDown size={19} />
                          </div>
                          <IoMdClose
                            onClick={handleClearCondition}
                            className="text-gray-600"
                            size={16}
                          />
                        </div>
                      )}
                    </section>

                    {/* dropdown condition */}
                    <section
                      className={`w-[360px] absolute z-[5] left-0 top-10 transition-all duration-200 ease-in-out ${
                        toggleCondition
                          ? "opacity-100 scale-100"
                          : "opacity-0 pointer-events-none scale-95"
                      }`}
                    >
                      <ConditionFilter
                        t={t}
                        locale={locale}
                        formData2={formData2}
                        setFormData2={setFormData2}
                        setFormData={setFormData}
                        handleToggleCondition={handleToggleCondition}
                      />
                    </section>
                  </div>
                )}
            </section>

            {/* category when mobile and md screen */}
            <section className="w-11/12 lg:hidden flex items-center space-x-2 text-[15px] overflow-x-scroll pb-1">
              <div className="w-fit">
                {province ? (
                  <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                    <div
                      onClick={handleToggleLocation}
                      className="flex items-center space-x-0.5"
                    >
                      <HiOutlineMapPin size={18} />
                      <span className="text-nowrap">
                        {displayCommune || displayDistrict || displayProvince}
                      </span>
                    </div>
                    <IoMdClose
                      onClick={handleClearLocation}
                      className="text-gray-600"
                      size={16}
                    />
                  </div>
                ) : (
                  <div
                    onClick={handleToggleLocation}
                    className="flex items-center space-x-0.5 bg-[#EDEDED] px-2 py-1 rounded select-none"
                  >
                    <HiOutlineMapPin size={18} />
                    <span className="text-nowrap">{t("allLocation")}</span>
                  </div>
                )}
              </div>

              <div className="w-fit">
                <section>
                  {formData.sort === "" ? (
                    <div
                      onClick={handleToggleSort}
                      className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                    >
                      <span>{t("sort")}</span>
                      <MdOutlineArrowDropDown size={19} />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                      <div
                        onClick={handleToggleSort}
                        className="flex items-center bg-[#EDEDED] rounded"
                      >
                        <span className="text-nowrap">
                          {formData.sort === "lastest"
                            ? "Lastest Ads"
                            : formData.sort === "new"
                            ? "New Ads"
                            : formData.sort === "mosthit"
                            ? "Most Hit Ads"
                            : formData.sort === "priceasc"
                            ? "price: low to high "
                            : formData.sort === "pricedesc"
                            ? "price: high to low "
                            : ""}
                        </span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                      <IoMdClose
                        onClick={handleCLoseSort}
                        className="text-gray-600"
                        size={16}
                      />
                    </div>
                  )}
                </section>
              </div>

              {/* price */}
              {(display?.length === 0 || display?.some((e) => e === "price")) &&
                mainCategoryName !== "jobs" && (
                  <div className="w-fit">
                    {formData.minPrice || formData.maxPrice ? (
                      <div className="flex items-center text-nowrap space-x-1 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                        <div
                          onClick={handleTogglePrice}
                          className="flex items-center bg-[#EDEDED] py-1 rounded"
                        >
                          <span className="text-nowrap">
                            {t("price")}:{" "}
                            {formData.minPrice && formData.maxPrice
                              ? `${formData.minPrice} - ${formData.maxPrice}`
                              : formData.minPrice || formData.maxPrice || "N/A"}
                          </span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                        <IoMdClose
                          onClick={() =>
                            handleClearField("Price", setTogglePrice)
                          }
                          className="text-gray-600"
                          size={16}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={handleTogglePrice}
                        className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                      >
                        <span>{t("price")}</span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                    )}
                  </div>
                )}

              {/* sale price */}
              {display?.length > 0 &&
                display?.some((e) => e === "salePrice") && (
                  <div className="w-fit">
                    {formData.minSalePrice || formData.maxSalePrice ? (
                      <div className="flex items-center space-x-1 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                        <div
                          onClick={handleToggleSalePrice}
                          className="flex items-center text-nowrap bg-[#EDEDED] py-1 rounded"
                        >
                          <span className="text-nowrap">
                            {t("salePrice")}:{" "}
                            {formData.minSalePrice && formData.maxSalePrice
                              ? `${formData.minSalePrice} - ${formData.maxSalePrice}`
                              : formData.minSalePrice ||
                                formData.maxSalePrice ||
                                "N/A"}
                          </span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                        <IoMdClose
                          onClick={() =>
                            handleClearField("SalePrice", setToggleSalePrice)
                          }
                          className="text-gray-600"
                          size={16}
                        />
                      </div>
                    ) : (
                      <div
                        onClick={handleToggleSalePrice}
                        className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                      >
                        <span className="text-nowrap">{t("salePrice")}</span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                    )}
                  </div>
                )}

              {/* salary */}
              {mainCategoryName === "jobs" && (
                <div className="w-fit">
                  {formData.minSalary || formData.maxSalary ? (
                    <div className="flex items-center space-x-1 text-[#006DA1] bg-[#EDEDED] px-2 rounded select-none">
                      <div
                        onClick={handleToggleSalary}
                        className="flex items-center bg-[#EDEDED] py-1 rounded"
                      >
                        <span className="text-nowrap">
                          {t("salary")}:{" "}
                          {formData.minSalary && formData.maxSalary
                            ? `${formData.minSalary} - ${formData.maxSalary}`
                            : formData.minSalary || formData.maxSalary || "N/A"}
                        </span>

                        <MdOutlineArrowDropDown size={19} />
                      </div>
                      <IoMdClose
                        onClick={() =>
                          handleClearField("Salary", setToggleSalary)
                        }
                        className="text-gray-600"
                        size={16}
                      />
                    </div>
                  ) : (
                    <div
                      onClick={handleToggleSalary}
                      className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                    >
                      <span>{t("salary")}</span>
                      <MdOutlineArrowDropDown size={19} />
                    </div>
                  )}
                </div>
              )}

              {/* condition */}
              {display?.length > 0 &&
                display?.some((e) => e === "condition") && (
                  <div className="w-fit relative">
                    {formData.condition === "" ? (
                      <div
                        onClick={handleToggleCondition}
                        className="flex items-center bg-[#EDEDED] px-2 py-1 rounded"
                      >
                        <span className="text-nowrap">{t("condition")}</span>
                        <MdOutlineArrowDropDown size={19} />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-[#006DA1] bg-[#EDEDED] px-2 py-1 rounded select-none">
                        <div
                          onClick={handleToggleCondition}
                          className="flex items-center bg-[#EDEDED] rounded"
                        >
                          <span className="">{formData.condition}</span>
                          <MdOutlineArrowDropDown size={19} />
                        </div>
                        <IoMdClose
                          onClick={handleClearCondition}
                          className="text-gray-600"
                          size={16}
                        />
                      </div>
                    )}
                  </div>
                )}
            </section>

            <button
              onClick={handleToggleFormFilter}
              className="hidden lg:flex lg:flex-nowrap text-nowrap items-center space-x-0.5 bg-[#EDEDED] px-2 py-1 rounded text-[15px] focus:outline-none outline-none"
            >
              <CiFilter size={18} />
              <p>
                {t("moreFilters")}
                {count > 0 && (
                  <span className="bg-[#F58800] px-1.5 rounded-md text-white ml-[2px] font-sans">
                    {count}
                  </span>
                )}
              </p>
            </button>

            <button
              onClick={handleSetToggleDisplayCards}
              className="focus:outline-none outline-none lg:hidden"
            >
              {toggleDisplayCards ? (
                <RxDashboard size={22} />
              ) : (
                <MdFormatListBulleted size={22} />
              )}
            </button>
          </section>
        </div>

        {categories?.length > 0 && (
          <div className="bg-white">
            <ListCategoriesFilter
              categories={categories}
              setCategory={setCategory}
              locale={locale}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default CategoryFilter;
