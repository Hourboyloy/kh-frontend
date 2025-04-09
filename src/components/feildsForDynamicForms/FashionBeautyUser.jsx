"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import {
  womenFashionTypes,
  menFashionTypes,
  babyKidFashionTypes,
  travelLuggageTypes,
  fashionAccessoriesTypes,
} from "@/utils/FashionBeautyType";
import { useTranslations } from "next-intl";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function FashionBeautyUser({
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
  const t = useTranslations("GeneralcharacteristicsFields");
  const [toggleWomenFashionType, setToggleWomenFashionType] = useState(false);
  const [toggleMenFashionType, setToggleMenFashionType] = useState(false);
  const [toggleBabyKidType, setToggleBabyKidType] = useState(false);
  const [toggleTravelandLuggageType, setToggleTravelandLuggageType] =
    useState(false);
  const [toggleAccessoryType, setToggleAccessoryType] = useState(false);

  // Group form data
  const [formData, setFormData] = useState({
    discount: dynamicFields?.discount || "",
    discountAs: dynamicFields?.discountAs || "%",
    freeDelivery: dynamicFields?.freeDelivery || false,
    price: dynamicFields?.price || "",
    type: dynamicFields?.type || "",
  });

  const handleToggleWomenFashionType = () => {
    setToggleWomenFashionType(!toggleWomenFashionType);
  };
  const handleToggleMenFashionType = () => {
    setToggleMenFashionType(!toggleMenFashionType);
  };
  const handleToggleBabyKidType = () => {
    setToggleBabyKidType(!toggleBabyKidType);
  };
  const handleToggleTravelandLuggageType = () => {
    setToggleTravelandLuggageType(!toggleTravelandLuggageType);
  };
  const handleToggleAccessoryType = () => {
    setToggleAccessoryType(!toggleAccessoryType);
  };

  const handleValidatedInput = (key, value) => {
    const validValue = value.replace(/[^0-9.]/g, "");
    setFormData((prev) => ({ ...prev, [key]: validValue }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleDiscount = (value) => {
    const filteredValue = value.replace(/[^0-9.]/g, "");
    const isValidDecimal = /^(\d+(\.\d*)?)?$/.test(filteredValue);
    if (isValidDecimal) {
      setFormData((prev) => ({ ...prev, discount: filteredValue }));
    }
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
    if (fields.includes("1womenFashionType"))
      checkField("womenFashionType", formData.type);
    if (fields.includes("2menFashionType"))
      checkField("menFashionType", formData.type);
    if (fields.includes("3babyKidsFashionType"))
      checkField("babyKidsFashionType", formData.type);
    if (fields.includes("4travelLuggageTypes"))
      checkField("travelLuggageTypes", formData.type);
    if (fields.includes("5accessoryTypes"))
      checkField("accessoryTypes", formData.type);
    if (fields.includes("6price")) checkField("price", formData.price);

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

    if (formData.discount !== "") {
      submit(formData);
    } else {
      const { discountAs, ...dynamicFields } = formData;
      submit(dynamicFields);
    }
  }, [formData, submit, setErrors, fields]);

  useEffect(() => {
    if (toggleGetField) {
      validateForm();
      setToggleGetField(false);
    }
  }, [toggleGetField, validateForm, setToggleGetField]);

  useEffect(() => {
    if (displayComponent.subCategory) {
      setFormData({
        discount: "",
        discountAs: "%",
        condition: "",
        freeDelivery: false,
        price: "",
        brand: "",
        model: "",
        network: "",
        accessory: "",
        storage: "",
      });
    }
  }, [displayComponent.subCategory]);

  return (
    <div>
      <Template
        title={"Type"}
        name={"type"}
        toggle={toggleWomenFashionType}
        value={formData.type}
        setErrors={setErrors}
        errors={errors}
        errorsName={"womenFashionType"}
        setValue={setFormData}
        handleToggle={handleToggleWomenFashionType}
        array={womenFashionTypes}
        path={"fashionBeauty"}
      />

      <Template
        title={"Type"}
        name={"type"}
        toggle={toggleMenFashionType}
        value={formData.type}
        setErrors={setErrors}
        errors={errors}
        errorsName={"menFashionType"}
        setValue={setFormData}
        handleToggle={handleToggleMenFashionType}
        array={menFashionTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Type"}
        name={"type"}
        toggle={toggleBabyKidType}
        value={formData.type}
        setErrors={setErrors}
        errors={errors}
        errorsName={"babyKidsFashionType"}
        setValue={setFormData}
        handleToggle={handleToggleBabyKidType}
        array={babyKidFashionTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Types"}
        name={"type"}
        toggle={toggleTravelandLuggageType}
        value={formData.type}
        setErrors={setErrors}
        errors={errors}
        errorsName={"travelLuggageTypes"}
        setValue={setFormData}
        handleToggle={handleToggleTravelandLuggageType}
        array={travelLuggageTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Accessory Types"}
        name={"type"}
        toggle={toggleAccessoryType}
        value={formData.type}
        setErrors={setErrors}
        errors={errors}
        errorsName={"accessoryTypes"}
        setValue={setFormData}
        handleToggle={handleToggleAccessoryType}
        array={fashionAccessoriesTypes}
        path={"fashionBeauty"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1womenFashionType":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleWomenFashionType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="womenFashionType"
                    />
                  </div>
                  {errors.womenFashionType && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "2menFashionType":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleMenFashionType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="menFashionType"
                    />
                  </div>
                  {errors.menFashionType && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "3babyKidsFashionType":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleBabyKidType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="babyKidsFashionType"
                    />
                  </div>
                  {errors.babyKidsFashionType && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "4travelLuggageTypes":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleTravelandLuggageType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="travelLuggageTypes"
                    />
                  </div>
                  {errors.travelLuggageTypes && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "5accessoryTypes":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("accessoryType")}{" "}
                    <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleAccessoryType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="accessoryTypes"
                    />
                  </div>
                  {errors.accessoryTypes && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "6price":
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

            case "7discount":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("discount")}</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      name="discount"
                      placeholder=""
                      value={formData.discount} // Controlled input
                      onChange={(e) => handleDiscount(e.target.value)}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none font-sans"
                    />
                    <div className="w-[84px] h-[38px] flex items-center p-0.5 bg-gray-200 rounded-md">
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            discountAs: "%",
                          }))
                        }
                        className={`w-full h-full rounded-md ${
                          formData.discountAs === "%" ? "bg-white" : ""
                        }`}
                      >
                        %
                      </button>
                      <button
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            discountAs: "$",
                          }))
                        }
                        className={`w-full h-full rounded-md ${
                          formData.discountAs === "$" ? "bg-white" : ""
                        }`}
                      >
                        $
                      </button>
                    </div>
                  </div>
                </div>
              );

            case "8freeDelivery":
              return (
                <div key={index} className="w-full space-y-[4px] select-none">
                  <label className="text-[15px]">{t("freeDelivery")}</label>
                  <div
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        freeDelivery: !prev.freeDelivery,
                      }))
                    }
                    className="border bg-white rounded-md h-[40.1px] flex items-center px-3 space-x-2 cursor-pointer"
                    role="switch"
                    aria-checked={formData.freeDelivery}
                  >
                    {/* Toggle Button */}
                    <div
                      className={`flex items-center p-0.5 rounded-full w-[35px] h-[20px] border focus:ring-4 transition-all duration-150 ${
                        formData.freeDelivery ? "bg-[#028DCF]" : "bg-white"
                      }`}
                    >
                      <div
                        className={`w-[14.5px] h-[14.5px] rounded-full transition-all ${
                          formData.freeDelivery
                            ? "bg-white translate-x-[14.1px]"
                            : "bg-gray-400 translate-x-0"
                        }`}
                      ></div>
                    </div>
                    {/* Status Text */}
                    <p className="text-gray-800 font-sans">
                      {formData.freeDelivery ? "Yes" : "No"}
                    </p>
                  </div>
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

export default FashionBeautyUser;
