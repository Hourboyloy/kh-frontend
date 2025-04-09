"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  womenFashionTypes,
  menFashionTypes,
  babyKidFashionTypes,
  travelLuggageTypes,
  fashionAccessoriesTypes,
} from "@/utils/FashionBeautyType";
const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function FashionBeautyAdmin({ setFields, fields, locale }) {
  const t = useTranslations("GeneralcharacteristicsFields");
  const [toggleWomenFashionType, setToggleWomenFashionType] = useState(false);
  const [toggleMenFashionType, setToggleMenFashionType] = useState(false);
  const [toggleBabyKidType, setToggleBabyKidType] = useState(false);
  const [toggleTravelandLuggageType, setToggleTravelandLuggageType] =
    useState(false);

  const [toggleAccessoryType, setToggleAccessoryType] = useState(false);

  const [formData, setFormData] = useState({
    discount: "",
    discountAs: "%",
    freeDelivery: false,
    price: "",

    womenFashionType: "",
    menFashionType: "",
    babyKidType: "",
    travelandLuggageTypes: "",
    accessoryTypes: "",
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
  };

  const handleDiscount = (value) => {
    const filteredValue = value.replace(/[^0-9.]/g, "");
    const isValidDecimal = /^(\d+(\.\d*)?)?$/.test(filteredValue);
    if (isValidDecimal) {
      setFormData((prev) => ({ ...prev, discount: filteredValue }));
    }
  };

  return (
    <div>
      <Template
        title={"Type"}
        name={"womenFashionType"}
        toggle={toggleWomenFashionType}
        value={formData.womenFashionType}
        setValue={setFormData}
        handleToggle={handleToggleWomenFashionType}
        array={womenFashionTypes}
        path={"fashionBeauty"}
      />

      <Template
        title={"Type"}
        name={"menFashionType"}
        toggle={toggleMenFashionType}
        value={formData.menFashionType}
        setValue={setFormData}
        handleToggle={handleToggleMenFashionType}
        array={menFashionTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Type"}
        name={"babyKidType"}
        toggle={toggleBabyKidType}
        value={formData.babyKidType}
        setValue={setFormData}
        handleToggle={handleToggleBabyKidType}
        array={babyKidFashionTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Types"}
        name={"travelandLuggageTypes"}
        toggle={toggleTravelandLuggageType}
        value={formData.travelandLuggageTypes}
        setValue={setFormData}
        handleToggle={handleToggleTravelandLuggageType}
        array={travelLuggageTypes}
        path={"fashionBeauty"}
      />
      <Template
        title={"Types"}
        name={"accessoryTypes"}
        toggle={toggleAccessoryType}
        value={formData.accessoryTypes}
        setValue={setFormData}
        handleToggle={handleToggleAccessoryType}
        array={fashionAccessoriesTypes}
        path={"fashionBeauty"}
      />

      <div className=" px-[20px] space-y-[17.5px]">
        <div className="flex items-end">
          <div className="space-y-[4px] w-full">
            <label className="text-[15px]">
              {t("type")}{" "}
              <span className="text-red-600">
                {" "}
                *
                <span className="text-xs">
                  {" "}
                  Required for Women&apos;s Fashion Type
                </span>
              </span>
            </label>
            <div
              onClick={handleToggleWomenFashionType}
              className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
            >
              {formData.womenFashionType}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <IoMdArrowDropdown className="text-gray-800" size={20} />
              </div>
            </div>
          </div>

          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="1womenFashionType"
              name="1womenFashionType"
              checked={fields.includes("1womenFashionType")}
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

        <div className="flex items-end">
          <div className="space-y-[4px] w-full">
            <label className="text-[15px]">
              {t("type")}{" "}
              <span className="text-red-600">
                {" "}
                *
                <span className="text-xs">
                  {" "}
                  Required for Men&apos;s Fashion Type
                </span>
              </span>
            </label>
            <div
              onClick={handleToggleMenFashionType}
              className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
            >
              {formData.menFashionType}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <IoMdArrowDropdown className="text-gray-800" size={20} />
              </div>
            </div>
          </div>

          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="2menFashionType"
              name="2menFashionType"
              checked={fields.includes("2menFashionType")}
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

        <div className="flex items-end">
          <div className="space-y-[4px] w-full">
            <label className="text-[15px]">
              {t("type")}{" "}
              <span className="text-red-600">
                {" "}
                *<span className="text-xs"> Required for Baby & Kids Type</span>
              </span>
            </label>
            <div
              onClick={handleToggleBabyKidType}
              className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
            >
              {formData.babyKidType}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <IoMdArrowDropdown className="text-gray-800" size={20} />
              </div>
            </div>
          </div>

          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="3babyKidsFashionType"
              name="3babyKidsFashionType"
              checked={fields.includes("3babyKidsFashionType")}
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

        <div className="flex items-end">
          <div className="space-y-[4px] w-full">
            <label className="text-[15px]">
              {t("type")}{" "}
              <span className="text-red-600">
                {" "}
                *
                <span className="text-xs">
                  {" "}
                  Required for Travel and Luggage Types
                </span>
              </span>
            </label>
            <div
              onClick={handleToggleTravelandLuggageType}
              className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
            >
              {formData.travelandLuggageTypes}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <IoMdArrowDropdown className="text-gray-800" size={20} />
              </div>
            </div>
          </div>

          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="4travelLuggageTypes"
              name="4travelLuggageTypes"
              checked={fields.includes("4travelLuggageTypes")}
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

        <div className="flex items-end">
          <div className="space-y-[4px] w-full">
            <label className="text-[15px]">
              {t("accessoryType")}{" "}
              <span className="text-red-600">
                {" "}
                *
                <span className="text-xs">
                  {" "}
                  Required for Fashion Accessories Types
                </span>
              </span>
            </label>
            <div
              onClick={handleToggleAccessoryType}
              className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
            >
              {formData.accessoryTypes}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <IoMdArrowDropdown className="text-gray-800" size={20} />
              </div>
            </div>
          </div>

          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="5accessoryTypes"
              name="5accessoryTypes"
              checked={fields.includes("5accessoryTypes")}
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

        <div className="flex items-end">
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
                onChange={(e) => handleValidatedInput("price", e.target.value)} // Ensures backspace works
              />
            </div>
          </div>
          <div className={`pl-2`}>
            <input
              type="checkbox"
              value="6price"
              name="6price"
              checked={fields.includes("6price")}
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

        <div className="flex items-end">
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
              value="7discount"
              name="7discount"
              checked={fields.includes("7discount")}
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

        <div className="flex items-end">
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
              value="8freeDelivery"
              name="8freeDelivery"
              checked={fields.includes("8freeDelivery")}
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
      </div>
    </div>
  );
}

export default FashionBeautyAdmin;
