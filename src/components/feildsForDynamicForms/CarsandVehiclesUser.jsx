"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { carBrands } from "@/utils/CarBrands";
import { motoBrands } from "@/utils/MotoBrands";
import { vehicleTypes } from "@/utils/VehicleTypes";
import { bodyTypes } from "@/utils/BodyTypes";

import {
  getFuelOptions,
  getColorOptions,
  getTypeOptions,
} from "@/utils2/CarsAndVehicles";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function CarsandVehiclesUser({
  fields,
  setErrors,
  errors,
  toggleGetField,
  setToggleGetField,
  FormData,
  displayComponent,
  submit,
  dynamicFields,
  locale,
}) {
  const fuelOptions = getFuelOptions(locale);
  const colorOptions = getColorOptions(locale);

  const t = useTranslations("dynamicFieldCarsVehicles");
  const startYear = 1995;
  const currentYear = new Date().getFullYear();
  const [toggleCarBrand, setToggleCarBrand] = useState(false);
  const [toggleMotoBrand, setToggleMotoBrand] = useState(false);
  const [toggleVehicleType, setToggleVehicleType] = useState(false);
  const [toggleBodyType, setToggleBodyType] = useState(false);

  // Group form data
  const [formData, setFormData] = useState({
    brand: dynamicFields?.brand || "",
    model: dynamicFields?.model || "",
    type: dynamicFields?.type || "",
    vehicleType: dynamicFields?.vehicleType || "",
    condition: dynamicFields?.condition || "",
    year: dynamicFields?.year || "",
    fuel: dynamicFields?.fuel || "",
    color: dynamicFields?.color || "",
    transmission: dynamicFields?.transmission || "",
    bodyType: dynamicFields?.bodyType || "",
    taxType: dynamicFields?.taxType || "",
    price: dynamicFields?.price || "",
    salePrice: dynamicFields?.salePrice || "",
    discount: dynamicFields?.discount || "",
    discountAs: dynamicFields?.discountAs || "%",
    freeDelivery: dynamicFields?.freeDelivery || false,
  });

  const handleToggleMotoBrand = () => {
    setToggleMotoBrand(!toggleMotoBrand);
  };
  const handleToggleCarBrand = () => {
    setToggleCarBrand(!toggleCarBrand);
  };

  const handleToggleVehicleType = () => {
    setToggleVehicleType(!toggleVehicleType);
  };
  const handleToggleBodyType = () => {
    setToggleBodyType(!toggleBodyType);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // List of fields that require error reset
    const fieldsToResetError = ["year", "taxType", "condition", "color"];

    if (fieldsToResetError.includes(name) && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
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
    if (fields.includes("1carBrand")) checkField("carBrand", formData.brand);
    if (fields.includes("2motoBrand")) checkField("motoBrand", formData.brand);
    if (fields.includes("3vehicleType"))
      checkField("vehicleType", formData.vehicleType);
    if (fields.includes("5year")) checkField("year", formData.year);
    if (fields.includes("6taxType")) checkField("taxType", formData.taxType);
    if (fields.includes("7condition"))
      checkField("condition", formData.condition);
    if (fields.includes("8color")) checkField("color", formData.color);
    if (fields.includes("12salePrice"))
      checkField("salePrice", formData.salePrice);
    if (fields.includes("13price")) checkField("price", formData.price);
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
  }, [formData, FormData, submit, fields, setErrors]);

  useEffect(() => {
    if (toggleGetField) {
      validateForm();
      setToggleGetField(false);
    }
  }, [toggleGetField, setToggleGetField, validateForm]);

  useEffect(() => {
    if (displayComponent.subCategory) {
      setFormData({
        discount: "",
        discountAs: "%",
        year: "",
        fuel: "",
        color: "",
        type: "",
        transmission: "",
        taxType: "",
        condition: "",
        freeDelivery: false,
        price: "",
        salePrice: "",
        brand: "",
        bodyType: "",
        vehicleType: "",
      });
    }
  }, [displayComponent.subCategory]);

  useEffect(() => {
    if (!formData.brand && formData.model !== "") {
      setFormData((prev) => ({ ...prev, model: "" }));
    }
  }, [formData.brand, formData.model]);

  return (
    <div>
      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"carBrand"}
        name={"brand"}
        toggle={toggleCarBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleCarBrand}
        array={carBrands}
        path={"brands/car"}
      />
      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"motoBrand"}
        name={"brand"}
        toggle={toggleMotoBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleMotoBrand}
        array={motoBrands}
        path={"brands/moto"}
      />
      <Template
        title={"Vehicle Type"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"vehicleType"}
        name={"vehicleType"}
        toggle={toggleVehicleType}
        value={formData.vehicleType}
        setValue={setFormData}
        handleToggle={handleToggleVehicleType}
        array={vehicleTypes}
        path={"vehicleTypes"}
      />
      <Template
        title={"Body Type"}
        name={"bodyType"}
        toggle={toggleBodyType}
        value={formData.bodyType}
        setValue={setFormData}
        handleToggle={handleToggleBodyType}
        array={bodyTypes}
        path={"bodyTypes"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? " font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1carBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleCarBrand}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData.brand}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        className="focus:outline-none w-0 h-0 absolute right-3"
                        name="carBrand"
                      />
                    </div>
                    {errors.carBrand && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>

                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px] block">
                      {t("model")} <span className="text-red-600"> *</span>
                    </label>
                    <input
                      value={formData.model ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          model: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.brand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none font-sans"
                    />
                  </div>
                </div>
              );

            case "2motoBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleMotoBrand}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                    >
                      {formData.brand}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                      <input
                        type="text"
                        className="focus:outline-none w-0 h-0 absolute right-3"
                        name="motoBrand"
                      />
                    </div>
                    {errors.motoBrand && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>

                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px] block">
                      {t("model")} <span className="text-red-600"> *</span>
                    </label>
                    <input
                      value={formData.model ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          model: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.brand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none font-sans"
                    />
                  </div>
                </div>
              );

            case "3vehicleType":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("vehicleType")}
                    <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleVehicleType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.vehicleType}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="vehicleType"
                    />
                  </div>
                  {errors.vehicleType && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "4type":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>

                  <div className="relative w-full rounded-md py-[6.2px]">
                    <select
                      name="type"
                      onChange={handleInputChange}
                      className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                    >
                      {getTypeOptions(locale).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                  </div>
                </div>
              );

            case "5year":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("year")} <span className="text-red-600"> *</span>
                  </label>
                  <div className="relative w-full font-sans">
                    <select
                      name="year"
                      value={formData?.year}
                      onChange={handleInputChange}
                      className={`appearance-none w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                        errors.year
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                    >
                      <option value=""></option>
                      {Array.from(
                        { length: currentYear - startYear + 1 },
                        (_, i) => (
                          <option key={i} value={currentYear - i}>
                            {currentYear - i}
                          </option>
                        )
                      )}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.year ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.year && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "6taxType":
              return (
                <div key={index} className="space-y-[4px] w-full relative">
                  <label className="text-[15px]">
                    {t("taxType")} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none w-0 h-0 absolute right-3"
                    name="taxType"
                  />
                  <div className="flex items-center space-x-4">
                    {["tax paper", "plate number"].map((value) => {
                      const isSelected = formData.taxType === value;
                      const selectedStyles = isSelected
                        ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                        : "border-gray-300 text-gray-800";
                      const label =
                        locale === "en"
                          ? value.charAt(0).toUpperCase() + value.slice(1)
                          : value === "tax paper"
                          ? "ក្រដាសពន្ធ"
                          : "ផ្លាកលេខ";

                      return (
                        <label
                          key={value}
                          className={`w-full bg-white text-center py-[6.2px] border rounded-md cursor-pointer select-none ${selectedStyles}`}
                        >
                          <input
                            type="radio"
                            name="taxType"
                            value={value}
                            checked={isSelected}
                            className="hidden"
                            onChange={handleInputChange}
                            aria-label={value}
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                  {errors.taxType && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "7condition":
              return (
                <div key={index} className="w-full space-y-[4px] relative">
                  <label className="text-[15px]">
                    {t("condition")} <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="focus:outline-none w-0 h-0 absolute right-3"
                    name="condition"
                  />
                  <div className="flex items-center space-x-4">
                    {["new", "used"].map((value) => {
                      const isSelected = formData.condition === value;
                      const selectedStyles = isSelected
                        ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                        : "border-gray-300 text-gray-800";
                      const label =
                        locale === "en"
                          ? value.charAt(0).toUpperCase() + value.slice(1)
                          : value === "new"
                          ? "ថ្មី"
                          : "មួយទឹក";

                      return (
                        <label
                          key={value}
                          className={`w-full bg-white text-center py-[6.2px] border rounded-md cursor-pointer select-none ${selectedStyles}`}
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={value}
                            checked={isSelected}
                            className="hidden"
                            onChange={handleInputChange}
                            aria-label={value}
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                  {errors.condition && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "8color":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("color")} <span className="text-red-600"> *</span>
                  </label>
                  <div className="relative w-full">
                    <select
                      name="color"
                      value={formData?.color}
                      onChange={handleInputChange}
                      className={`appearance-none w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                        errors.color
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                    >
                      {colorOptions.map((opt) => (
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
                        errors.color ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.color && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "9fuel":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("fuel")}</label>
                  <div className="relative w-full">
                    <select
                      name="fuel"
                      value={formData?.fuel}
                      onChange={handleInputChange}
                      className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                    >
                      {fuelOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                  </div>
                </div>
              );

            case "10transmission":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("transmission")} <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    {["auto", "manual"].map((value) => {
                      const isSelected = formData.transmission === value;
                      const selectedStyles = isSelected
                        ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                        : "border-gray-300 text-gray-800";

                      // Translation based on locale
                      const label =
                        locale === "en"
                          ? value.charAt(0).toUpperCase() + value.slice(1)
                          : value === "auto"
                          ? "ស្វ័យប្រវត្តិ"
                          : "លេខដៃ";

                      return (
                        <label
                          key={value}
                          className={`w-full bg-white text-center py-[6.2px] border rounded-md cursor-pointer select-none ${selectedStyles}`}
                        >
                          <input
                            type="radio"
                            name="transmission"
                            value={value}
                            checked={isSelected}
                            className="hidden"
                            onChange={handleInputChange}
                            aria-label={value}
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );

            case "11bodyType":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("bodyType")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleBodyType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.bodyType}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                  </div>
                </div>
              );

            case "12salePrice":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("salePrice")} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.salePrice} // Display the filtered price
                      name="salePrice"
                      placeholder="$"
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                        errors.salePrice
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                      onChange={(e) =>
                        handleValidatedInput("salePrice", e.target.value)
                      } // Ensures backspace works
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

            case "13price":
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
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
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

            case "14discount":
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

            case "15freeDelivery":
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

export default CarsandVehiclesUser;
