"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { tabletBrands } from "@/utils/TabletBrands";
import { phoneBrands } from "@/utils/PhoneBrands";
import { networkBrand } from "@/utils/networkBrands";
import { smartWatchBrands } from "@/utils/SmartWatcheBrands";
import { accessories } from "@/utils/Accessory";
import { useTranslations } from "next-intl";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function PhoneTabletsUser({
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
  const t = useTranslations("PhonesTablets");
  const [toggleTablateBrand, setToggleTablateBrand] = useState(false);
  const [togglePhoneBrand, setTogglePhoneBrand] = useState(false);
  const [toggleNetwork, setToggleNetwork] = useState(false);
  const [toggleSmartWatchBrand, setToggleSmartWatchBrand] = useState(false);
  const [toggleAccessory, setToggleAccessory] = useState(false);

  // Group form data
  const [formData, setFormData] = useState({
    discount: dynamicFields?.discount || "",
    discountAs: dynamicFields?.discountAs || "%",
    condition: dynamicFields?.condition || "",
    freeDelivery: dynamicFields?.freeDelivery || false,
    price: dynamicFields?.price || "",
    brand: dynamicFields?.brand || "",
    model: dynamicFields?.model || "",
    network: dynamicFields?.network || "",
    accessory: dynamicFields?.accessory || "",
    storage: dynamicFields?.storage || "",
  });

  const handleTogglePhoneBrand = () => {
    setTogglePhoneBrand(!togglePhoneBrand);
  };

  const handleToggleTablateBrand = () => {
    setToggleTablateBrand(!toggleTablateBrand);
  };

  const handleToggleNetwork = () => {
    setToggleNetwork(!toggleNetwork);
  };

  const handleTogglesetToggleSmartWatchBrand = () => {
    setToggleSmartWatchBrand(!toggleSmartWatchBrand);
  };

  const handleToggleAccessory = () => {
    setToggleAccessory(!toggleAccessory);
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
    const fieldsToResetError = ["condition", "storage"];

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
    if (fields.includes("1tabletBrand"))
      checkField("tebletBrand", formData.brand);
    if (fields.includes("2phoneBrand"))
      checkField("phoneBrand", formData.brand);
    if (fields.includes("3network")) checkField("network", formData.network);
    if (fields.includes("4accessory"))
      checkField("accessory", formData.accessory);
    if (fields.includes("5smartWatch"))
      checkField("smartWatch", formData.brand);
    if (fields.includes("6storage")) checkField("storage", formData.storage);
    if (fields.includes("7condition"))
      checkField("condition", formData.condition);
    if (fields.includes("9price")) checkField("price", formData.price);

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
  }, [FormData, formData, fields, submit, setErrors]);

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
        errorsName={"tebletBrand"}
        name={"brand"}
        toggle={toggleTablateBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleTablateBrand}
        array={tabletBrands}
        path={"phonesTablets"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"phoneBrand"}
        name={"brand"}
        toggle={togglePhoneBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleTogglePhoneBrand}
        array={phoneBrands}
        path={"phonesTablets"}
      />

      <Template
        title={"Network"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"network"}
        name={"network"}
        toggle={toggleNetwork}
        value={formData.network}
        setValue={setFormData}
        handleToggle={handleToggleNetwork}
        array={networkBrand}
        path={"phonesTablets"}
      />

      <Template
        title={"Accessory"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"accessory"}
        name={"accessory"}
        toggle={toggleAccessory}
        value={formData.accessory}
        setValue={setFormData}
        handleToggle={handleToggleAccessory}
        array={accessories}
        path={"phonesTablets"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"smartWatch"}
        name={"brand"}
        toggle={toggleSmartWatchBrand}
        value={formData.smartWatchBrand}
        setValue={setFormData}
        handleToggle={handleTogglesetToggleSmartWatchBrand}
        array={smartWatchBrands}
        path={"phonesTablets"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1tabletBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleTablateBrand}
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
                        name="tebletBrand"
                      />
                    </div>
                    {errors.tebletBrand && (
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

            case "2phoneBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleTogglePhoneBrand}
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
                        name="phoneBrand"
                      />
                    </div>
                    {errors.phoneBrand && (
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

            case "3network":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("network")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleNetwork}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.network}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="network"
                    />
                  </div>
                  {errors.network && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "4accessory":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("accessory")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleAccessory}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.accessory}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="accessory"
                    />
                  </div>
                  {errors.accessory && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "5smartWatch":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleTogglesetToggleSmartWatchBrand}
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
                        name="smartWatch"
                      />
                    </div>
                    {errors.smartWatch && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>

                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px] block">
                      Model <span className="text-red-600"> *</span>
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

            case "6storage":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("storage")}</label>
                    <div className="relative">
                      <select
                        onChange={handleInputChange}
                        name="storage"
                        value={formData.storage || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans ${
                          errors.storage
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="1TB and Above">1TB and Above</option>
                        <option value="128GB">128GB</option>
                        <option value="256GB">256GB</option>
                        <option value="512GB">512GB</option>
                        <option value="64GB and Below">64GB and Below</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                      <PiWarningCircleBold
                        className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                          errors.storage ? "" : "hidden"
                        }`}
                      />
                    </div>
                    {errors.storage && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
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

                      const labelMap = {
                        new: locale === "en" ? "New" : "ថ្មី",
                        used: locale === "en" ? "Used" : "មួយទឹក",
                      };

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
                          {labelMap[value]}
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

            case "8discount":
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

            case "9price":
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

            case "10freeDelivery":
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

export default PhoneTabletsUser;
