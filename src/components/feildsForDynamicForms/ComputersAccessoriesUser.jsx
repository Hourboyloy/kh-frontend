"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { laptopBrands } from "@/utils/LaptopBrands";
import { desktopBrands } from "@/utils/DesktopBrands";
import { allinOneBrands } from "@/utils/AllinOneBrands";
import { monitorBrands } from "@/utils/monitorBrands";
import { printerScannerBrands } from "@/utils/PrinterScannerBrands";
import { partsAccessoriesType } from "@/utils/partsAccessoriesType";
import { useTranslations } from "next-intl";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function ComputersAccessoriesUser({
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
  const t = useTranslations("ComputersAccessories");
  const [toggleLaptopBrand, setToggleLaptopBrand] = useState(false);
  const [toggleDesktopBrand, setToggleDesktopBrand] = useState(false);
  const [toggleAllInOneBrand, setToggleAllInOneBrand] = useState(false);
  const [toggleMonitorBrand, setToggleMonitorBrand] = useState(false);
  const [togglePrinterScannerBrand, setTogglePrinterScannerBrand] =
    useState(false);
  const [toggleType, setToggleType] = useState(false);

  // Group form data
  const [formData, setFormData] = useState({
    discount: dynamicFields?.discount || "",
    discountAs: dynamicFields?.discountAs || "%",
    condition: dynamicFields?.condition || "",
    freeDelivery: dynamicFields?.freeDelivery || false,
    price: dynamicFields?.price || "",
    brand: dynamicFields?.brand || "",
    type: dynamicFields?.type || "",
    model: dynamicFields?.model || "",
    storage: dynamicFields?.storage || "",
    ram: dynamicFields?.ram || "",
    cpu: dynamicFields?.cpu || "",
    vga: dynamicFields?.vga || "",
    screenSize: dynamicFields?.screenSize || "",
  });

  const handleToggleLaptopBrand = () => {
    setToggleLaptopBrand(!toggleLaptopBrand);
  };

  const handleToggleDesktopBrand = () => {
    setToggleDesktopBrand(!toggleDesktopBrand);
  };

  const handleToggleAllInOneBrand = () => {
    setToggleAllInOneBrand(!toggleAllInOneBrand);
  };

  const handleToggleMonitorBrand = () => {
    setToggleMonitorBrand(!toggleMonitorBrand);
  };

  const handleTogglePrinterScannerBrand = () => {
    setTogglePrinterScannerBrand(!togglePrinterScannerBrand);
  };

  const handleToggleType = () => {
    setToggleType(!toggleType);
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
    const fieldsToResetError = [
      "condition",
      "storage",
      "ram",
      "cpu",
      "vga",
      "screenSize",
    ];

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
    if (fields.includes("1laptopBrand"))
      checkField("laptopBrand", formData.brand);
    if (fields.includes("2desktopBrand"))
      checkField("desktopBrand", formData.brand);
    if (fields.includes("3allInOneBrand"))
      checkField("allInOneBrand", formData.brand);
    if (fields.includes("4monitorBrand"))
      checkField("monitorBrand", formData.brand);
    if (fields.includes("5printerScannerBrand"))
      checkField("printerScannerBrand", formData.brand);
    if (fields.includes("6type")) checkField("type", formData.type);
    if (fields.includes("7condition"))
      checkField("condition", formData.condition);
    if (fields.includes("7condition"))
      checkField("condition", formData.condition);
    if (fields.includes("8storage")) checkField("storage", formData.storage);
    if (fields.includes("9ram")) checkField("ram", formData.ram);
    if (fields.includes("10cpu")) checkField("cpu", formData.cpu);
    if (fields.includes("11vga")) checkField("vga", formData.vga);
    if (fields.includes("12screenSize"))
      checkField("screenSize", formData.screenSize);
    if (fields.includes("13screenSize"))
      checkField("screenSize", formData.screenSize);
    if (fields.includes("15price")) checkField("price", formData.price);

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
  }, [setErrors, fields, formData, FormData, submit]);

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
        type: "",
        model: "",
        storage: "",
        ram: "",
        cpu: "",
        vga: "",
        screenSize: "",
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
        errorsName={"laptopBrand"}
        name={"brand"}
        toggle={toggleLaptopBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleLaptopBrand}
        array={laptopBrands}
        path={"computersAccessories"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"desktopBrand"}
        name={"brand"}
        toggle={toggleDesktopBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleDesktopBrand}
        array={desktopBrands}
        path={"computersAccessories"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"allInOneBrand"}
        name={"brand"}
        toggle={toggleAllInOneBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleAllInOneBrand}
        array={allinOneBrands}
        path={"computersAccessories"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"monitorBrand"}
        name={"brand"}
        toggle={toggleMonitorBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleToggleMonitorBrand}
        array={monitorBrands}
        path={"computersAccessories"}
      />

      <Template
        title={"Brand"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"printerScannerBrand"}
        name={"brand"}
        toggle={togglePrinterScannerBrand}
        value={formData.brand}
        setValue={setFormData}
        handleToggle={handleTogglePrinterScannerBrand}
        array={printerScannerBrands}
        path={"computersAccessories"}
      />
      <Template
        title={"Type"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"type"}
        name={"type"}
        toggle={toggleType}
        value={formData.type}
        setValue={setFormData}
        handleToggle={handleToggleType}
        array={partsAccessoriesType}
        path={"computersAccessories"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1laptopBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleLaptopBrand}
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
                        name="laptopBrand"
                      />
                    </div>
                    {errors.laptopBrand && (
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

            case "2desktopBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleDesktopBrand}
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
                        name="desktopBrand"
                      />
                    </div>
                    {errors.desktopBrand && (
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

            case "3allInOneBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleAllInOneBrand}
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
                        name="allInOneBrand"
                      />
                    </div>
                    {errors.allInOneBrand && (
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

            case "4monitorBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleMonitorBrand}
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
                        name="monitorBrand"
                      />
                    </div>
                    {errors.monitorBrand && (
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

            case "5printerScannerBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("brand")} <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleTogglePrinterScannerBrand}
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
                        name="printerScannerBrand"
                      />
                    </div>
                    {errors.printerScannerBrand && (
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

            case "6type":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 font-sans"
                  >
                    {formData.type}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <IoMdArrowDropdown className="text-gray-800" size={20} />
                    </div>
                    <input
                      type="text"
                      className="focus:outline-none w-0 h-0 absolute right-3"
                      name="type"
                    />
                  </div>
                  {errors.type && (
                    <p className="text-[13px] text-[#FF0000]">
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

            case "8storage":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("storage")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative font-sans">
                      <select
                        onChange={handleInputChange}
                        name="storage"
                        value={formData.storage || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.storage
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="128GB & Under">128GB & Under</option>
                        <option value="250GB - 256GB">250GB - 256GB</option>
                        <option value="250GB - 256GB">500GB - 512GB</option>
                        <option value="1TB">1TB</option>
                        <option value="2TB & Larger">2TB & Larger</option>
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

            case "9ram":
              return (
                <div key={index} className="space-y-[4px] w-full font-sans">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("ram")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative">
                      <select
                        onChange={handleInputChange}
                        name="ram"
                        value={formData.ram || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans ${
                          errors.ram
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="2GB & Under">2GB & Under</option>
                        <option value="3GB">3GB</option>
                        <option value="4GB">3GB</option>
                        <option value="5GB">5GB</option>
                        <option value="6GB">6GB</option>
                        <option value="8GB">8GB</option>
                        <option value="12GB">12GB</option>
                        <option value="16GB">16GB</option>
                        <option value="24GB">24GB</option>
                        <option value="32GB">32GB</option>
                        <option value="64GB">64GB</option>
                        <option value="64GB & Larger">64GB & Larger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                        <PiWarningCircleBold
                          className={`absolute text-red-600 text-xl -translate-y-1/2 top-1/2 ${
                            errors.ram ? "" : "hidden"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.ram && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "10cpu":
              return (
                <div key={index} className="space-y-[4px] w-full font-sans">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("cpu")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative">
                      <select
                        onChange={handleInputChange}
                        name="cpu"
                        value={formData.cpu || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.cpu
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="M1">M1</option>
                        <option value="M1 Pro">M1 Pro</option>
                        <option value="M1 Max">M1 Max</option>
                        <option value="M1 Ultra">M1 Ultra</option>

                        <option value="M2">M2</option>
                        <option value="M2 Pro">M2 Pro</option>
                        <option value="M2 Max">M2 Max</option>
                        <option value="M2 Ultra">M2 Ultra</option>

                        <option value="M3">m3</option>
                        <option value="M3 Pro">m3 pro</option>
                        <option value="M3 Max">m3 max</option>
                        <option value="M3 Ultra">m3 ultra</option>

                        <option value="Intel Core 2">Intel Core 2</option>
                        <option value="Intel Core i3">Intel Core i3</option>
                        <option value="Intel Core i5">Intel Core i5</option>
                        <option value="Intel Core i7">Intel Core i7</option>
                        <option value="Intel Core i9">Intel Core i9</option>
                        <option value="Intel Xeon">Intel Xeon</option>
                        <option value="Intel Celeron">Intel Celeron</option>
                        <option value="Intel Pentium">Intel Pentium</option>

                        <option value="AMD Ryzen">AMD Ryzen</option>
                        <option value="AMD Ryzen 3">AMD Ryzen 3</option>
                        <option value="AMD Ryzen 5">AMD Ryzen 5</option>
                        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
                        <option value="AMD Ryzen 9">AMD Ryzen 9</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                        <PiWarningCircleBold
                          className={`absolute text-red-600 text-xl -translate-y-1/2 top-1/2 ${
                            errors.cpu ? "" : "hidden"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.cpu && (
                      <p className="text-[13px] text-[#FF0000]">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "11vga":
              return (
                <div key={index} className="space-y-[4px] w-full font-sans">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("vga")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative">
                      <select
                        onChange={handleInputChange}
                        name="vga"
                        value={formData.vga || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.vga
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="Integrated">Integrated</option>
                        <option value="2GB & under">2GB & under</option>
                        <option value="4GB">4GB</option>
                        <option value="6GB">6GB</option>
                        <option value="8GB">8GB</option>
                        <option value="12GB">12GB</option>
                        <option value="16GB & Larger">16GB & Larger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                        <PiWarningCircleBold
                          className={`absolute text-red-600 text-xl -translate-y-1/2 top-1/2 ${
                            errors.vga ? "" : "hidden"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.vga && (
                      <p className="text-[13px] text-[#FF0000]">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "12screenSize":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("screenSize")}
                      <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative font-sans">
                      <select
                        onChange={handleInputChange}
                        name="screenSize"
                        value={formData.screenSize || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.screenSize
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="10.9 & Under">10.9&quot; & Under</option>
                        <option value="11 - 11.9">11&quot; - 11.9&quot;</option>
                        <option value="12 - 12.9">12&quot; - 12.9&quot;</option>
                        <option value="13 - 13.9">13&quot; - 13.9&quot;</option>
                        <option value="14 - 14.9">14&quot; - 14.9&quot;</option>
                        <option value="15 - 15.9">15&quot; - 15.9&quot;</option>
                        <option value="16 - 16.9">16&quot; - 16.9&quot;</option>
                        <option value="17 & Larger">17&quot; & Larger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                        <PiWarningCircleBold
                          className={`absolute text-red-600 text-xl -translate-y-1/2 top-1/2 ${
                            errors.screenSize ? "" : "hidden"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.screenSize && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "13screenSize":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("screenSize")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative font-sans">
                      <select
                        onChange={handleInputChange}
                        name="screenSize"
                        value={formData.screenSize || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.screenSize
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        <option value=""></option>
                        <option value="22.9 & Under">22.9&quot; & Under</option>
                        <option value="23 - 26.9">23&quot; - 26.9&quot;</option>
                        <option value="27 - 32.9">27&quot; - 32.9&quot;</option>
                        <option value="33 - 49">33&quot; - 49&quot;</option>
                        <option value="50 & Larger">50&quot; & Larger</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                        <PiWarningCircleBold
                          className={`absolute text-red-600 text-xl -translate-y-1/2 top-1/2 ${
                            errors.screenSize ? "" : "hidden"
                          }`}
                        />
                      </div>
                    </div>
                    {errors.screenSize && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "14discount":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]"> {t("discount")}</label>
                  <div className="flex items-center space-x-2 font-sans">
                    <input
                      type="text"
                      name="discount"
                      placeholder=""
                      value={formData.discount} // Controlled input
                      onChange={(e) => handleDiscount(e.target.value)}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
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

            case "15price":
              return (
                <div key={index} className="w-full space-y-[4px]">
                  <label className="text-[15px]">
                    {t("price")} <span className="text-red-600">*</span>
                  </label>
                  <div className="relative font-sans">
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

            case "16freeDelivery":
              return (
                <div key={index} className="w-full space-y-[4px] select-none">
                  <label className="text-[15px]"> {t("freeDelivery")}</label>
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

export default ComputersAccessoriesUser;
