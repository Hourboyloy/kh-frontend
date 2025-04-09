"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { tabletBrands } from "@/utils/TabletBrands";
import { phoneBrands } from "@/utils/PhoneBrands";
import { networkBrand } from "@/utils/networkBrands";
import { smartWatchBrands } from "@/utils/SmartWatcheBrands";
import { accessories } from "@/utils/Accessory";
import { useTranslations } from "next-intl";
const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function PhonesTabletesAdmin({ AllFields, setFields, fields, locale }) {
  const t = useTranslations("PhonesTablets");
  const [toggleTablateBrand, setToggleTablateBrand] = useState(false);
  const [togglePhoneBrand, setTogglePhoneBrand] = useState(false);
  const [toggleNetwork, setToggleNetwork] = useState(false);
  const [toggleSmartWatchBrand, setToggleSmartWatchBrand] = useState(false);
  const [toggleAccessory, setToggleAccessory] = useState(false);

  const [formData, setFormData] = useState({
    discount: "",
    discountAs: "%",
    condition: "",
    freeDelivery: false,
    price: "",
    storage: "",
    tabletBrand: "",
    phoneBrand: "",
    smartWatchBrand: "",
    tabletModel: "",
    phoneModel: "",
    smartWatchModel: "",
    network: "",
    accessory: "",
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
        name={"tabletBrand"}
        toggle={toggleTablateBrand}
        value={formData.tabletBrand}
        setValue={setFormData}
        handleToggle={handleToggleTablateBrand}
        array={tabletBrands}
        path={"phonesTablets"}
      />
      <Template
        title={"Brand"}
        name={"phoneBrand"}
        toggle={togglePhoneBrand}
        value={formData.phoneBrand}
        setValue={setFormData}
        handleToggle={handleTogglePhoneBrand}
        array={phoneBrands}
        path={"phonesTablets"}
      />
      <Template
        title={"Network"}
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
        name={"smartWatchBrand"}
        toggle={toggleSmartWatchBrand}
        value={formData.smartWatchBrand}
        setValue={setFormData}
        handleToggle={handleTogglesetToggleSmartWatchBrand}
        array={smartWatchBrands}
        path={"phonesTablets"}
      />

      <div className=" px-[20px] space-y-[17.5px]">
        {(AllFields ? AllFields : fields)?.map((field, index) => {
          switch (field) {
            case "1tabletBrand":
              return (
                <div className="space-y-[17.5px]" key={index}>
                  <div className="flex items-end">
                    <div className="space-y-[4px] w-full">
                      <label className="text-[15px]">
                        {t("brand")}{" "}
                        <span className="text-red-600">
                          {" "}
                          *
                          <span className="text-xs">
                            {" "}
                            Required for Tablat brand
                          </span>
                        </span>
                      </label>
                      <div
                        onClick={handleToggleTablateBrand}
                        className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                      >
                        {formData.tabletBrand}
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
                        value="1tabletBrand"
                        name="1tabletBrand"
                        checked={fields.includes("1tabletBrand")}
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
                      value={formData.tabletBrand ? formData.tabletModel : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tabletModel: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.tabletBrand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                    />
                  </div>
                </div>
              );

            case "2phoneBrand":
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
                            {" "}
                            Required for Phone brand
                          </span>
                        </span>
                      </label>
                      <div
                        onClick={handleTogglePhoneBrand}
                        className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                      >
                        {formData.phoneBrand}
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
                        value="2phoneBrand"
                        name="2phoneBrand"
                        checked={fields.includes("2phoneBrand")}
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
                      value={formData.phoneBrand ? formData.phoneModel : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneModel: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.phoneBrand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                    />
                  </div>
                </div>
              );

            case "3smartWatch":
              return (
                <div key={index} className="space-y-[17.5px]">
                  <div className="flex items-end">
                    <div className="space-y-[4px] w-full">
                      <label className="text-[15px]">
                        {t("brand")}{" "}
                        <span className="text-red-600">
                          {" "}
                          *
                          <span className="text-xs">
                            {" "}
                            Required for Smart Watches brand
                          </span>
                        </span>
                      </label>
                      <div
                        onClick={handleTogglesetToggleSmartWatchBrand}
                        className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                      >
                        {formData.smartWatchBrand}
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
                        value="3smartWatch"
                        name="3smartWatch"
                        checked={fields.includes("3smartWatch")}
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
                      value={
                        formData.smartWatchBrand ? formData.smartWatchModel : ""
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          smartWatchModel: e.target.value,
                        })
                      }
                      type="text"
                      disabled={!formData.smartWatchBrand}
                      className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                    />
                  </div>
                </div>
              );

            case "4network":
              return (
                <div key={index} className="flex items-end">
                  <div
                    onClick={handleToggleNetwork}
                    className="space-y-[4px] w-full"
                  >
                    <label className="text-[15px]">
                      {t("network")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3">
                      {formData.network}
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
                      value="4network"
                      name="4network"
                      checked={fields.includes("4network")}
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

            case "5accessory":
              return (
                <div key={index} className="flex items-end">
                  <div
                    onClick={handleToggleAccessory}
                    className="space-y-[4px] w-full"
                  >
                    <label className="text-[15px]">
                      {t("accessory")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3">
                      {formData.accessory}
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
                      value="5accessory"
                      name="5accessory"
                      checked={fields.includes("5accessory")}
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

            case "6storage":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("storage")}</label>
                    <div className="relative">
                      <select
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            storage: e.target.value,
                          }))
                        }
                        value={formData.storage || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
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
                    </div>
                  </div>

                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="6storage"
                      name="6storage"
                      checked={fields.includes("6storage")}
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

            case "8discount":
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
                      value="8discount"
                      name="8discount"
                      checked={fields.includes("8discount")}
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

            case "9price":
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
                      value="9price"
                      name="9price"
                      checked={fields.includes("9price")}
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

            case "10freeDelivery":
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
                      value="10freeDelivery"
                      name="10freeDelivery"
                      checked={fields.includes("10freeDelivery")}
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

export default PhonesTabletesAdmin;
