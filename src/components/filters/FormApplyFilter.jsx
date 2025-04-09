import React, { useRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import { formatText } from "@/helper/formatText";
import { IoMdArrowDropdown } from "react-icons/io";

const sanitizeString = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

function FormApplyFilter({
  t,
  locale,
  searchKeyWord,
  toggle,
  handleToggle,
  locations,
  handleSetKeyword,
  setFormData,
  formData2,
  setFormData2,
  setProvince,
  setDistrict,
  setCommune,
  province,
  district,
  commune,
  //
  setDisplayProvince,
  setDisplayDistrict,
  setDisplayCommune,
  display,
  mainCategoryName,
  handleToggleTemplateModelBrand,
  handleSetValueTypeOrAny,
  name,
  displayName,
  keyBrandName,
}) {
  const formRef = useRef(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [keyword, setKeyword] = useState("");

  const [getProvince, setGetProvince] = useState(formatText(province));
  const [getDistrict, setGetDistrict] = useState(formatText(district));
  const [getCommune, setGetCommune] = useState(formatText(commune));

  const [getDisProvince, setGetDisProvince] = useState();
  const [getDisDistrict, setGetDisDistrict] = useState();
  const [getDisCommune, setGetDisCommune] = useState();

  const handleProvince = (getProvinceName, getDisplayProvince) => {
    if (getProvinceName !== getProvince) {
      setSelectedDistrict(null);
      setGetDistrict("");
      setGetDisDistrict("");
    }

    if (!getProvinceName) {
      setSelectedProvince(null);
      setGetProvince("");
      setGetDisProvince("");
      return;
    }

    const selectedProvince = locations.find(
      (pro) => pro.province.en === getProvinceName
    );

    setSelectedProvince(selectedProvince || null);
    setGetProvince(getProvinceName);
    setGetDisProvince(getDisplayProvince);
  };

  const handleDistrict = (getDistrictName, getDisplayDistrict) => {
    if (!selectedProvince) return;

    if (getDistrictName && getDistrictName !== getDistrict) {
      setGetCommune("");
      setGetDisCommune("");
    }

    if (!getDistrictName) {
      setSelectedDistrict(null);
      setGetDistrict("");
      setGetDisDistrict("");
      return;
    }

    const selectedDistrict = selectedProvince.districts.find(
      (dis) => dis.district.en === getDistrictName
    );

    setSelectedDistrict(selectedDistrict || null);
    setGetDistrict(getDistrictName);
    setGetDisDistrict(getDisplayDistrict);
  };

  const handleCommune = (commune, disCom) => {
    console.log(commune);
    setGetCommune(commune);
    setDisplayCommune(disCom);
  };

  const handleValidatedInput = (key, value) => {
    let validValue = value.replace(/[^0-9.]/g, "");
    validValue = Math.min(Math.max(Number(validValue) || 0, 0), 999999);
    setFormData2((prev) => ({ ...prev, [key]: validValue }));
  };

  const handleDiscountOrFreeDelivery = (fieldName) => {
    if (fieldName === "discount") {
      setFormData2((prev) => ({
        ...prev,
        discount: formData2.discount ? "" : true,
      }));
    } else if (fieldName === "freeDelivery") {
      setFormData2((prev) => ({
        ...prev,
        freeDelivery: formData2.freeDelivery ? "" : true,
      }));
    }
  };

  const handleSubmit = () => {
    const lowerCaseFormData = Object.fromEntries(
      Object.entries(formData2).map(([key, value]) =>
        typeof value === "string" ? [key, sanitizeString(value)] : [key, value]
      )
    );

    setFormData(lowerCaseFormData);
    setProvince(getProvince);
    setDistrict(getDistrict);
    setCommune(getCommune);

    setDisplayProvince(getDisProvince);
    setDisplayDistrict(getDisDistrict);
    setDisplayCommune(getDisCommune);

    handleSetKeyword(keyword || "");
    handleToggle();
  };

  const handleClear = () => {
    setGetProvince("");
    setGetDistrict("");
    setGetCommune("");
    setProvince("");
    setDistrict("");
    setCommune("");
    setKeyword("");
    handleSetKeyword("");

    setFormData2((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, ""]))
    );
    setFormData((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, ""]))
    );

    handleToggle();
  };

  useEffect(() => {
    if (province) {
      setGetProvince(formatText(province));
      const selectedProvince = locations.find(
        (pro) => pro.province.en === formatText(province)
      );
      setSelectedProvince(selectedProvince || null);
      if (district) {
        setGetDistrict(formatText(district));
        const selectedDistrict = selectedProvince?.districts.find(
          (dis) => dis.district.en === formatText(district)
        );
        setSelectedDistrict(selectedDistrict || null);
        if (commune) {
          setGetCommune(formatText(commune));
        }
      }
    } else {
      setGetProvince("");
      setGetDistrict("");
      setGetCommune("");
      setSelectedProvince(null);
      setSelectedDistrict(null);
    }
  }, [province, district, locations, commune]);

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        handleToggle(); // Close the modal
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [toggle, handleToggle]);

  useEffect(() => {
    setKeyword(searchKeyWord);
  }, [searchKeyWord]);
  return (
    <div className={`${locale == "en" ? " font-sans" : ""}`}>
      <div
        className={`h-screen fixed inset-0 z-20 bg-[#2d2727] bg-opacity-60 transition-opacity duration-200 ${
          toggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 inset-0 w-full md:rounded-none h-screen flex md:justify-center z-20 transition-all ease-in-out duration-200 md:duration-300 ${
          toggle
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <section
          ref={formRef}
          className="mx-auto w-[500px] md:h-fit bg-white md:mt-[60px] rounded"
        >
          <div className="h-[50.3px] bg-[#028DCF] md:bg-transparent text-white md:text-gray-800 flex items-center justify-between px-5 border-b border-gray-300">
            <IoMdClose
              onClick={handleToggle}
              size={28}
              className="md:text-gray-500 cursor-pointer"
            />
            <div className="text-[18px] font-semibold">{t("filtersTitle")}</div>
            <button
              onClick={handleClear}
              className="text-[17px] md:text-gray-800 outline-none focus:outline-none"
            >
              {t("clear")}
            </button>
          </div>

          {/* input feild */}
          <section className="h-full pb-[108px] md:pb-0 md:h-[460px] px-3.5 pt-1.5 space-y-5 overflow-y-scroll scroll-smooth">
            {/* search */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("searchInput")}</label>
              <input
                value={keyword || ""}
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
              />
            </div>

            {/* sort */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("sort")}</label>
              <div className="relative">
                <select
                  onChange={(e) =>
                    setFormData2((prev) => ({ ...prev, sort: e.target.value }))
                  }
                  value={formData2?.sort || ""}
                  className="appearance-none w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]"
                >
                  <option value="">
                    {locale == "en" ? "Lastest Ads" : "ចុងក្រោយ"}
                  </option>
                  <option value="new">
                    {locale == "en" ? "New Ads" : "ថ្មី"}
                  </option>
                  <option value="mosthit">
                    {locale == "en" ? "Most Hit Ads" : "ចុចច្រើន"}
                  </option>
                  <option value="priceasc">
                    {locale == "en"
                      ? "Price: Low to High"
                      : "តម្លៃ: ទាបទៅខ្ពស់"}
                  </option>
                  <option value="pricedesc">
                    {locale == "en"
                      ? "Price: High to Low"
                      : "តម្លៃ: ខ្ពស់ទៅទាប"}
                  </option>
                </select>

                <MdArrowDropDown
                  className=" absolute top-1/2 -translate-y-1/2 right-2"
                  size={24}
                />
              </div>
            </div>

            {/* date */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("date")}</label>
              <div className="relative">
                <select
                  value={formData2.date || ""}
                  onChange={(e) =>
                    setFormData2((prev) => ({ ...prev, date: e.target.value }))
                  }
                  className="appearance-none w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]"
                >
                  <option value=""></option>
                  <option value="today">
                    {" "}
                    {locale == "en" ? "Today" : "ថ្ងៃនេះ"}
                  </option>
                  <option value="last-7-days">
                    {locale == "en" ? "Last 7 Days" : "7 ថ្ងៃចុងក្រោយ"}
                  </option>
                  <option value="last-14-days">
                    {locale == "en" ? "Last 14 Days" : "14 ថ្ងៃចុងក្រោយ"}
                  </option>
                  <option value="last-30-days">
                    {locale == "en" ? "Last 30 Days" : "30 ថ្ងៃចុងក្រោយ"}
                  </option>
                </select>

                <MdArrowDropDown
                  className=" absolute top-1/2 -translate-y-1/2 right-2"
                  size={24}
                />
              </div>
            </div>

            {/* Province */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("province")}</label>
              <div className="relative">
                <select
                  value={getProvince || ""}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      handleProvince(null, null);
                      return;
                    }

                    const selected = locations.find(
                      (loc) => loc.province.en === value
                    );

                    handleProvince(
                      selected?.province.en,
                      selected?.province[locale]
                    );
                  }}
                  className="appearance-none w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]"
                >
                  <option value=""></option>
                  {locations.map((location, index) => (
                    <option
                      key={location + index}
                      value={`${location.province.en}`}
                    >
                      {location.province[locale]}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className=" absolute top-1/2 -translate-y-1/2 right-2"
                  size={24}
                />
              </div>
            </div>

            {/* Khan/District */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("district")}</label>
              <div className="relative">
                <select
                  value={getDistrict || ""}
                  disabled={selectedProvince === null}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      handleDistrict(null, null);
                      return;
                    }

                    const selectedDistrict = selectedProvince?.districts?.find(
                      (dis) => dis.district.en === e.target.value
                    );
                    if (selectedDistrict) {
                      handleDistrict(
                        selectedDistrict.district.en,
                        selectedDistrict.district[locale]
                      );
                    }
                  }}
                  className={`appearance-none w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] ${
                    selectedProvince === null ? "bg-[#e9ecef]" : "bg-white"
                  }`}
                >
                  <option value=""></option>
                  {selectedProvince?.districts?.map((dis, index) => (
                    <option key={dis + index} value={`${dis.district.en}`}>
                      {dis.district[locale]}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className=" absolute top-1/2 -translate-y-1/2 right-2"
                  size={24}
                />
              </div>
            </div>

            {/* Sangkat/Commune */}
            <div className=" space-y-1">
              <label className="block text-[15px]">{t("commune")}</label>
              <div className="relative">
                <select
                  value={getCommune || ""}
                  disabled={selectedDistrict === null}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value === "") {
                      handleCommune(null, null);
                      return;
                    }
                    const selectedDistrict = selectedProvince?.districts?.find(
                      (dis) => dis.district.en === getDistrict
                    );

                    const selectedCom = selectedDistrict?.communes?.find(
                      (com) => com.en === e.target.value
                    );

                    if (selectedCom) {
                      handleCommune(selectedCom.en, selectedCom[locale]);
                    }
                  }}
                  className={`appearance-none w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF] ${
                    selectedDistrict === null ? "bg-[#e9ecef]" : "bg-white"
                  }`}
                >
                  <option value=""></option>
                  {selectedDistrict?.communes?.map((com, index) => (
                    <option key={com + index} value={`${com.en}`}>
                      {com[locale]}
                    </option>
                  ))}
                </select>

                <MdArrowDropDown
                  className=" absolute top-1/2 -translate-y-1/2 right-2"
                  size={24}
                />
              </div>
            </div>

            {/* discount */}
            <div className="space-y-1">
              <label className="block text-[15px]">{t("discount")}</label>
              <div
                onClick={() => handleDiscountOrFreeDelivery("discount")}
                className="border select-none border-gray-300 rounded h-[40px] w-full flex items-center px-0.5 space-x-[7.5px]"
              >
                <button
                  className={`w-[35px] h-[20px] rounded-full border border-gray-300 transition-all duration-300 ease-in-out relative ${
                    formData2.discount ? "bg-[#028dcf]" : "bg-white"
                  }`}
                >
                  <span
                    className={` w-[17px] h-[17px] rounded-full transition-all duration-300 ease-in-out absolute top-px ${
                      formData2.discount
                        ? "bg-white -translate-x-0.5"
                        : "bg-[#bfbfbf] -translate-x-[15px]"
                    }`}
                  ></span>
                </button>
                <span className="text-[15.5px] font-sans">
                  {formData2.discount ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* free delivery */}
            <div className="space-y-1">
              <label className="block text-[15px]">{t("freeDelivery")}</label>
              <div
                onClick={() => handleDiscountOrFreeDelivery("freeDelivery")}
                className="border select-none border-gray-300 rounded h-[40px] w-full flex items-center px-0.5 space-x-[7.5px]"
              >
                <button
                  className={`w-[35px] h-[20px] rounded-full border border-gray-300 transition-all duration-300 ease-in-out relative ${
                    formData2.freeDelivery ? "bg-[#028dcf]" : "bg-white"
                  }`}
                >
                  <span
                    className={` w-[17px] h-[17px] rounded-full transition-all duration-300 ease-in-out absolute top-px ${
                      formData2.freeDelivery
                        ? "bg-white -translate-x-0.5"
                        : "bg-[#bfbfbf] -translate-x-[15px]"
                    }`}
                  ></span>
                </button>
                <span className="text-[15.5px] font-sans">
                  {formData2.freeDelivery ? "Yes" : "No"}
                </span>
              </div>
            </div>

            {/* price */}
            <div>
              {(display?.length === 0 || display?.some((e) => e === "price")) &&
                mainCategoryName !== "jobs" && (
                  <div className=" space-y-1">
                    <label className="block text-[15px]">{t("price")}</label>
                    <div className="flex items-center space-x-4">
                      <input
                        value={formData2.minPrice || ""}
                        type="text"
                        onChange={(e) =>
                          handleValidatedInput("minPrice", e.target.value)
                        }
                        placeholder={`${
                          locale == "en" ? "Minimun" : "អប្បបរមា"
                        } $`}
                        className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                      />
                      <input
                        type="text"
                        value={formData2.maxPrice || ""}
                        onChange={(e) =>
                          handleValidatedInput("maxPrice", e.target.value)
                        }
                        placeholder={`${
                          locale == "en" ? "Maximum" : "អតិបរមា"
                        } $`}
                        className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* sale price */}
            <div>
              {display?.length > 0 &&
                display?.some((e) => e === "salePrice") && (
                  <div className=" space-y-1">
                    <label className="block text-[15px]">
                      {t("salePrice")}
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        value={formData2.minSalePrice || ""}
                        type="text"
                        onChange={(e) =>
                          handleValidatedInput("minSalePrice", e.target.value)
                        }
                        placeholder={`${
                          locale == "en" ? "Minimun" : "អប្បបរមា"
                        } $`}
                        className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                      />
                      <input
                        type="text"
                        value={formData2.maxSalePrice || ""}
                        onChange={(e) =>
                          handleValidatedInput("maxSalePrice", e.target.value)
                        }
                        placeholder={`${
                          locale == "en" ? "Maximum" : "អតិបរមា"
                        } $`}
                        className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                      />
                    </div>
                  </div>
                )}
            </div>

            {/* Salary */}
            <div>
              {mainCategoryName === "jobs" && (
                <div className=" space-y-1">
                  <label className="block text-[15px]">{t("salary")}</label>
                  <div className="flex items-center space-x-4">
                    <input
                      value={formData2.minSalary || ""}
                      type="text"
                      onChange={(e) =>
                        handleValidatedInput("minSalary", e.target.value)
                      }
                      placeholder={`${
                        locale == "en" ? "Minimun" : "អប្បបរមា"
                      } $`}
                      className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                    />
                    <input
                      type="text"
                      value={formData2.maxSalary || ""}
                      onChange={(e) =>
                        handleValidatedInput("maxSalary", e.target.value)
                      }
                      placeholder={`${
                        locale == "en" ? "Maximum" : "អតិបរមា"
                      } $`}
                      className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* condition */}
            <div>
              {display?.length > 0 &&
                display?.some((e) => e === "condition") && (
                  <div className="flex items-center space-x-4">
                    <label
                      className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                        formData2?.condition === ""
                          ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                          : "border-gray-300 text-gray-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value=""
                        checked={formData2?.condition === ""}
                        onChange={(e) =>
                          setFormData2((prev) => ({
                            ...prev,
                            condition: e.target.value,
                          }))
                        }
                        className="hidden"
                      />
                      {locale == "en" ? "All" : "ទាំងអស់"}
                    </label>

                    <label
                      className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                        formData2?.condition === "New"
                          ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                          : "border-gray-300 text-gray-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value="New"
                        checked={formData2?.condition === "New"}
                        onChange={(e) =>
                          setFormData2((prev) => ({
                            ...prev,
                            condition: e.target.value,
                          }))
                        }
                        className="hidden"
                      />

                      {locale == "en" ? "New" : "ថ្មី"}
                    </label>

                    <label
                      className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                        formData2?.condition === "Used"
                          ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                          : "border-gray-300 text-gray-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="condition"
                        value="Used"
                        checked={formData2?.condition === "Used"}
                        onChange={(e) =>
                          setFormData2((prev) => ({
                            ...prev,
                            condition: e.target.value,
                          }))
                        }
                        className="hidden"
                      />

                      {locale == "en" ? "Used" : "មួយទឹក"}
                    </label>
                  </div>
                )}
            </div>

            {/* brand */}
            <div>
              {keyBrandName && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-[15px]">{t("brand")}</label>
                    <div
                      onClick={handleToggleTemplateModelBrand}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData2.brand}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 w-full">
                    <label className="text-[15px] block">{t("model")}</label>
                    <input
                      value={formData2.model ?? ""}
                      onChange={(e) =>
                        setFormData2({
                          ...formData2,
                          model: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData2.brand}
                      className={`w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none font-sans
                    ${formData2.brand ? "" : "bg-[#e9ecef]"}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* more */}
            <div>
              {displayName && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-[15px] capitalize">
                      {displayName}
                    </label>
                    <div
                      onClick={handleSetValueTypeOrAny}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData2[name]}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pb-0.5"></div>
          </section>

          <div className="pb-2 md:pb-1 p-1 translate-y-1 border-t border-gray-300 fixed md:sticky w-full bottom-0 left-0 z-10 bg-white rounded-b">
            <button
              onClick={handleSubmit}
              className="text-shadow font-semibold bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
            >
              {t("applyFilter")}
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default FormApplyFilter;
