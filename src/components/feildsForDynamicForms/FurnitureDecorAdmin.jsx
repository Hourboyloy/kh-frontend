"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  getTableTypeOptions,
  getChairTypeOptions,
} from "@/utils2/FurnitureDecor";

function FurnitureDecorAdmin({ AllFields, setFields, fields, locale }) {
  const t = useTranslations("GeneralcharacteristicsFields");
  const [formData, setFormData] = useState({
    discount: "",
    discountAs: "%",
    freeDelivery: false,
    price: "",
    type: "",
  });

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
      <div className=" px-[20px] space-y-[17.5px]">
        {(AllFields ? AllFields : fields)?.map((field, index) => {
          switch (field) {
            case "1type":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")}{" "}
                      <span className="text-red-600">
                        {" "}
                        *{" "}
                        <span className="text-xs">
                          {" "}
                          Required for Tables & Desks brand
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getTableTypeOptions(locale).map((opt) => (
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
                      value="1type"
                      name="1type"
                      checked={fields.includes("1type")}
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

            case "2type":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")}{" "}
                      <span className="text-red-600">
                        {" "}
                        *{" "}
                        <span className="text-xs">
                          {" "}
                          Required for Chairs & Sofas brand
                        </span>
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getChairTypeOptions(locale).map((opt) => (
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
                      value="2type"
                      name="2type"
                      checked={fields.includes("2type")}
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

            case "3price":
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
                      value="3price"
                      name="3price"
                      checked={fields.includes("3price")}
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

            case "4discount":
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
                      value="4discount"
                      name="4discount"
                      checked={fields.includes("4discount")}
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

            case "5freeDelivery":
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
                      value="5freeDelivery"
                      name="5freeDelivery"
                      checked={fields.includes("5freeDelivery")}
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

export default FurnitureDecorAdmin;
