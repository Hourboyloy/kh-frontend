"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { PiWarningCircleBold } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { commercialTypes, homeTypes } from "@/utils/HouseLandsType";
import { useTranslations } from "next-intl";
import { getDirectionOptions } from "@/utils2/HouseLandsUser";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function HouseLandsUser({
  fields,
  setErrors,
  errors,
  toggleGetField,
  setToggleGetField,
  FormData,
  displayComponent,
  dynamicFields,
  submit,
  locale,
}) {
  const t = useTranslations("dynamicFieldHouseLands");

  const [toggleHomeType, setToggleHomeType] = useState(false);
  const [toggleCommercialType, setToggleCommercialType] = useState(false);
  // Group form data
  const [formData, setFormData] = useState({
    bedroom: dynamicFields?.bedroom || "",
    bathroom: dynamicFields?.bathroom || "",
    facing: dynamicFields?.facing || "",
    size: dynamicFields?.size || "",
    type: dynamicFields?.type || "",
    salePrice: dynamicFields?.salePrice || "",
    price: dynamicFields?.price || "",
  });

  const handleToggleHomeType = () => {
    setToggleHomeType(!toggleHomeType);
  };

  const handleToggleCommercialType = () => {
    setToggleCommercialType(!toggleCommercialType);
  };

  const handleValidatedInput = (key, value) => {
    const validValue = value.replace(/[^0-9.]/g, "");
    setFormData((prev) => ({ ...prev, [key]: validValue }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = useCallback(() => {
    let newErrors = {};
    let errorFields = [];

    const checkField = (fieldName, formValue, customValidation) => {
      const hasError = !formValue;
      newErrors[fieldName] = hasError;

      if (customValidation) {
        const errorMessage = customValidation(formValue);
        if (errorMessage) {
          newErrors[fieldName] = errorMessage;
        }
      }
      if (hasError || newErrors[fieldName]) {
        const errorElement = document.querySelector(`[name="${fieldName}"]`);
        if (errorElement) errorFields.push(errorElement);
      }
    };

    checkField("title", FormData?.title);
    if (fields.includes("7salePrice"))
      checkField("salePrice", formData.salePrice);
    if (fields.includes("8price")) checkField("price", formData.price);

    checkField("descriptions", FormData?.descriptions);
    checkField("locations", FormData?.locations?.province);
    checkField("address", FormData?.address);
    checkField("name", FormData?.name);
    checkField("phoneNum", FormData?.phoneNum, (value) => {
      const phoneRegex = /^[0-9]{9,11}$/;
      if (value && !phoneRegex.test(value)) {
        return "Phone number must be between 9 to 12 digits.";
      }
      return null;
    });
    setErrors(newErrors);
    if (errorFields.length > 0) {
      const firstError = errorFields[0];
      const rect = firstError.getBoundingClientRect();
      const headerHeight =
        document.querySelector(".header-menu")?.offsetHeight || 70;
      const extraOffset = 40;

      window.scrollTo({
        top: window.scrollY + rect.top - headerHeight - extraOffset,
        behavior: "smooth",
      });
      return;
    }

    submit(formData);
  }, [FormData, formData, fields, submit, setErrors]);

  useEffect(() => {
    if (toggleGetField) {
      validateForm();
      setToggleGetField(false);
    }
  }, [toggleGetField, validateForm, setToggleGetField]);

  useEffect(() => {
    if (displayComponent.subCategory) {
      setFormData({
        bedroom: "",
        bathroom: "",
        facing: "",
        size: "",
        type: "",
        salePrice: "",
        price: "",
      });
    }
  }, [displayComponent.subCategory]);

  return (
    <div>
      <Template
        title={"Type"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"type"}
        name={"type"}
        toggle={toggleHomeType}
        value={formData.type}
        setValue={setFormData}
        handleToggle={handleToggleHomeType}
        array={homeTypes}
        path={"jobsAndHouseLands"}
      />

      <Template
        title={"Type"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"type"}
        name={"type"}
        toggle={toggleCommercialType}
        value={formData.type}
        setValue={setFormData}
        handleToggle={handleToggleCommercialType}
        array={commercialTypes}
        path={"jobsAndHouseLands"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1bathroom":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("bathroom")}</label>
                  <div className="relative font-sans">
                    <select
                      onChange={handleInputChange}
                      name="bathroom"
                      value={formData.bathroom || ""}
                      className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                        errors.bathroom
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="More+">
                        {locale == "en" ? "More" : "ច្រើន"}+
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.bathroom ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.bathroom && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "2bedroom":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("bathroom")}</label>
                  <div className="relative font-sans">
                    <select
                      onChange={handleInputChange}
                      name="bedroom"
                      value={formData.bedroom || ""}
                      className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                        errors.bedroom
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                    >
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="More+">
                        {locale == "en" ? "More" : "ច្រើន"}+
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.bedroom ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.bedroom && (
                    <p className="text-[13px] text-[#FF0000]">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "3facing":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("facing")}</label>
                  <div className="relative">
                    <select
                      onChange={handleInputChange}
                      name="facing"
                      value={formData.facing || ""}
                      className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                        errors.facing
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                    >
                      {getDirectionOptions(locale).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.facing ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.facing && (
                    <p className="text-[13px] text-[#FF0000]">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "4size":
              return (
                <div key={index} className="w-full space-y-[4px]">
                  <label className="text-[15px]">
                    {t("size")} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative font-sans">
                    <input
                      type="text"
                      value={formData.size} // Display the filtered price
                      name="size"
                      placeholder="$"
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                        errors.size
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                      onChange={(e) =>
                        handleValidatedInput("size", e.target.value)
                      }
                    />
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.size ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.size && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "5homeType":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleHomeType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData.type}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        className="focus:outline-none w-0 h-0 absolute right-3"
                        name="homeType"
                      />
                    </div>
                    {errors.homeType && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "6commercialType":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleCommercialType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData.type}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        className="focus:outline-none w-0 h-0 absolute right-3"
                        name="commercialType"
                      />
                    </div>
                    {errors.commercialType && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "7salePrice":
              return (
                <div key={index} className="w-full space-y-[4px]">
                  <label className="text-[15px]">
                    {t("salePrice")} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.salePrice} // Display the filtered price
                      name="salePrice"
                      placeholder="$"
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none font-sans ${
                        errors.salePrice
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                      onChange={(e) =>
                        handleValidatedInput("salePrice", e.target.value)
                      }
                    />
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.salePrice ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.salePrice && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "8price":
              return (
                <div key={index} className="w-full space-y-[4px]">
                  <label className="text-[15px]">
                    {t("price")} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.price} // Display the filtered price
                      name="price"
                      placeholder="$"
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none font-sans ${
                        errors.price
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                      onChange={(e) =>
                        handleValidatedInput("price", e.target.value)
                      }
                    />
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.price ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

export default HouseLandsUser;
