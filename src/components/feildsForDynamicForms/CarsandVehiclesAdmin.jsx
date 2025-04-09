"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { carBrands } from "@/utils/CarBrands";
import { motoBrands } from "@/utils/MotoBrands";
import { vehicleTypes } from "@/utils/VehicleTypes";
import { bodyTypes } from "@/utils/BodyTypes";
import { useTranslations } from "next-intl";
import {
  getFuelOptions,
  getColorOptions,
  getTypeOptions,
} from "@/utils2/CarsAndVehicles";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function CarsandVehiclesAdmin({ AllFields, setFields, fields, locale }) {
  const t = useTranslations("dynamicFieldCarsVehicles");
  const startYear = 1995;
  const currentYear = new Date().getFullYear();
  const [toggleCarBrand, setToggleCarBrand] = useState(false);
  const [toggleMotoBrand, setToggleMotoBrand] = useState(false);
  const [toggleVehicleType, setToggleVehicleType] = useState(false);
  const [toggleBodyType, setToggleBodyType] = useState(false);

  const [formData, setFormData] = useState({
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
    motoBrand: "",
    carBrand: "",
    carModel: "",
    motoModel: "",
    bodyType: "",
    vehicleType: "",
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
  };

  return (
    <div>
      <Template
        title={"Brand"}
        name={"carBrand"}
        toggle={toggleCarBrand}
        value={formData.carBrand}
        setValue={setFormData}
        handleToggle={handleToggleCarBrand}
        array={carBrands}
        path={"brands/car"}
      />
      <Template
        title={"Brand"}
        name={"motoBrand"}
        toggle={toggleMotoBrand}
        value={formData.motoBrand}
        setValue={setFormData}
        handleToggle={handleToggleMotoBrand}
        array={motoBrands}
        path={"brands/moto"}
      />
      <Template
        title={"Vehicle Type"}
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

      <div className=" px-[20px] space-y-[17.5px]">
        {(AllFields ? AllFields : fields)?.map((field, index) => {
          switch (field) {
            case "1carBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="flex items-end">
                    <div className="space-y-[4px] w-full">
                      <label className="text-[15px]">
                        {t("brand")}{" "}
                        <span className="text-red-600">
                          {" "}
                          *{" "}
                          <span className="text-xs">
                            Required for Car brand
                          </span>
                        </span>
                      </label>
                      <div
                        onClick={handleToggleCarBrand}
                        className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                      >
                        {formData.carBrand}
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <IoMdArrowDropdown
                            className="text-gray-800"
                            size={20}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={`pl-2`}>
                      <input
                        type="checkbox"
                        value="1carBrand"
                        name="1carBrand"
                        checked={fields.includes("1carBrand")}
                        onChange={(e) => {
                          const updatedFields = e.target.checked
                            ? [...fields, e.target.value]
                            : fields.filter((item) => item !== e.target.value);
                          setFields(updatedFields);
                        }}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-[4px] w-full pr-6">
                    <label className="text-[15px] block">
                      {t("model")} <span className="text-red-600"> *</span>
                    </label>
                    <input
                      value={formData.carBrand ? formData.carModel : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          carModel: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.carBrand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                    />
                  </div>
                </div>
              );

            case "2motoBrand":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="flex items-end">
                    <div className="space-y-[4px] w-full">
                      <label className="text-[15px]">
                        {t("brand")}{" "}
                        <span className="text-red-600">
                          *{" "}
                          <span className="text-xs">
                            Required for Moto brand
                          </span>
                        </span>
                      </label>
                      <div
                        onClick={handleToggleMotoBrand}
                        className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                      >
                        {formData.motoBrand}
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                          <IoMdArrowDropdown
                            className="text-gray-800"
                            size={20}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={`pl-2`}>
                      <input
                        type="checkbox"
                        value="2motoBrand"
                        name="2motoBrand"
                        checked={fields.includes("2motoBrand")}
                        onChange={(e) => {
                          const updatedFields = e.target.checked
                            ? [...fields, e.target.value]
                            : fields.filter((item) => item !== e.target.value);
                          setFields(updatedFields);
                        }}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-[4px] w-full pr-6">
                    <label className="text-[15px] block">
                      {t("model")} <span className="text-red-600"> *</span>
                    </label>
                    <input
                      value={formData.motoBrand ? formData.motoModel : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          motoModel: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.motoBrand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                    />
                  </div>
                </div>
              );

            case "3vehicleType":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("vehicleType")}{" "}
                      <span className="text-red-600"> *</span>
                    </label>
                    <div
                      onClick={handleToggleVehicleType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                    >
                      {formData.vehicleType}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="3vehicleType"
                      name="3vehicleType"
                      checked={fields.includes("3vehicleType")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "4type":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")} <span className="text-red-600"> *</span>
                    </label>

                    <div className="relative w-full rounded-md py-[6.2px]">
                      <select
                        name="type"
                        onChange={handleInputChange}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getTypeOptions(locale).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="4type"
                      name="4type"
                      checked={fields.includes("4type")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "5year":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("year")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative w-full">
                      <select
                        name="year"
                        onChange={handleInputChange}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
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
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="5year"
                      name="5year"
                      checked={fields.includes("5year")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "6taxType":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("taxType")} <span className="text-red-600">*</span>
                    </label>
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
                  </div>

                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="6taxType"
                      name="6taxType"
                      checked={fields.includes("6taxType")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "7condition":
              return (
                <div key={index} className="flex items-end">
                  <div className="w-full space-y-[4px]">
                    <label className="text-[15px]">
                      {t("condition")} <span className="text-red-600">*</span>
                    </label>
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
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="7condition"
                      name="7condition"
                      checked={fields.includes("7condition")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "8color":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("color")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative w-full">
                      <select
                        name="color"
                        onChange={handleInputChange}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getColorOptions(locale).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="8color"
                      name="8color"
                      checked={fields.includes("8color")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "9fuel":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("fuel")}</label>
                    <div className="relative w-full">
                      <select
                        name="fuel"
                        onChange={handleInputChange}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getFuelOptions(locale).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="9fuel"
                      name="9fuel"
                      checked={fields.includes("9fuel")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "10transmission":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("transmission")}{" "}
                      <span className="text-red-600">*</span>
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
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="10transmission"
                      name="10transmission"
                      checked={fields.includes("10transmission")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "11bodyType":
              return (
                <div className="flex items-end" key={index}>
                  <div
                    onClick={handleToggleBodyType}
                    className="space-y-[4px] w-full"
                  >
                    <label className="text-[15px]">
                      {t("bodyType")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3">
                      {formData.bodyType}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <IoMdArrowDropdown
                          className="text-gray-800"
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="11bodyType"
                      name="11bodyType"
                      checked={fields.includes("11bodyType")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "12salePrice":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("salePrice")} <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={formData.salePrice} // Display the filtered price
                        name="salePrice"
                        placeholder="$"
                        className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                        onChange={(e) =>
                          handleValidatedInput("salePrice", e.target.value)
                        } // Ensures backspace works
                      />
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="12salePrice"
                      name="12salePrice"
                      checked={fields.includes("12salePrice")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "13price":
              return (
                <div key={index} className="flex items-end">
                  <div className="w-full space-y-[4px]">
                    <label className="text-[15px]">
                      {t("price")} <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={formData.price} // Display the filtered price
                        name="price"
                        placeholder="$"
                        className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                        onChange={(e) =>
                          handleValidatedInput("price", e.target.value)
                        } // Ensures backspace works
                      />
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="13price"
                      name="13price"
                      checked={fields.includes("13price")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "14discount":
              return (
                <div className="flex items-end" key={index}>
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("discount")}</label>
                    <div className="flex items-center space-x-2">
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
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="14discount"
                      name="14discount"
                      checked={fields.includes("14discount")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              );

            case "15freeDelivery":
              return (
                <div className="flex items-end" key={index}>
                  <div className="w-full space-y-[4px] select-none">
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
                      <p className="text-gray-800">
                        {formData.freeDelivery ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="15freeDelivery"
                      name="15freeDelivery"
                      checked={fields.includes("15freeDelivery")}
                      onChange={(e) => {
                        const updatedFields = e.target.checked
                          ? [...fields, e.target.value]
                          : fields.filter((item) => item !== e.target.value);
                        setFields(updatedFields);
                      }}
                      className="h-4 w-4"
                    />
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

export default CarsandVehiclesAdmin;
