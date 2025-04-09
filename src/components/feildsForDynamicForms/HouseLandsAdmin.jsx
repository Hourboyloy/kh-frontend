"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { commercialTypes, homeTypes } from "@/utils/HouseLandsType";
import { useTranslations } from "next-intl";
import { getDirectionOptions } from "@/utils2/HouseLandsUser";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function HouseLandsAdmin({ AllFields, setFields, fields, locale }) {
  const t = useTranslations("dynamicFieldHouseLands");
  const [toggleHomeType, setToggleHomeType] = useState(false);
  const [toggleCommercialType, setToggleCommercialType] = useState(false);

  const [formData, setFormData] = useState({
    bedroom: "",
    bathroom: "",
    facing: "",
    size: "",
    homeType: "",
    commercialType: "",
    salePrice: "",
    price: "",
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
  };

  return (
    <div>
      <Template
        title={"Type"}
        name={"homeType"}
        toggle={toggleHomeType}
        value={formData.homeType}
        setValue={setFormData}
        handleToggle={handleToggleHomeType}
        array={homeTypes}
        path={"jobsAndHouseLands"}
      />

      <Template
        title={"Type"}
        name={"homeType"}
        toggle={toggleCommercialType}
        value={formData.commercialType}
        setValue={setFormData}
        handleToggle={handleToggleCommercialType}
        array={commercialTypes}
        path={"jobsAndHouseLands"}
      />

      <div className=" px-[20px] space-y-[17.5px]">
        {(AllFields ? AllFields : fields)?.map((field, index) => {
          switch (field) {
            case "1bathroom":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("bathroom")}</label>
                    <div className="relative w-full">
                      <select
                        className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        <option value=""></option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="More+">
                          {locale == "en" ? "More" : "ច្រើន"}+
                        </option>
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
                      value="1bathroom"
                      name="1bathroom"
                      checked={fields.includes("1bathroom")}
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

            case "2bedroom":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("bedroom")}</label>
                    <div className="relative w-full">
                      <select
                        className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        <option value=""></option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="More+">
                          {locale == "en" ? "More" : "ច្រើន"}+
                        </option>
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
                      value="2bedroom"
                      name="2bedroom"
                      checked={fields.includes("2bedroom")}
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

            case "3facing":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("facing")}</label>
                    <div className="relative w-full">
                      <select
                        className={`appearance-none capitalize w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                      >
                        {getDirectionOptions(locale).map((opt) => (
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
                      value="3facing"
                      name="3facing"
                      checked={fields.includes("3facing")}
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

            case "4size":
              return (
                <div key={index} className="flex items-end">
                  <div className="w-full space-y-[4px]">
                    <label className="text-[15px]">
                      {t("size")} <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={formData.size}
                        name="size"
                        className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                        onChange={(e) =>
                          handleValidatedInput("size", e.target.value)
                        } // Ensures backspace works
                      />
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="4size"
                      name="4size"
                      checked={fields.includes("4size")}
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

            case "5homeType":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")}{" "}
                      <span className="text-red-600">
                        {" "}
                        *
                        <span className="text-xs">
                          {" "}
                          Required for home types
                        </span>
                      </span>
                    </label>
                    <div
                      onClick={handleToggleHomeType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                    >
                      {formData.homeType}
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
                      value="5homeType"
                      name="5homeType"
                      checked={fields.includes("5homeType")}
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

            case "6commercialType":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("type")}{" "}
                      <span className="text-red-600">
                        {" "}
                        *
                        <span className="text-xs">
                          {" "}
                          Required for commercial types
                        </span>
                      </span>
                    </label>
                    <div
                      onClick={handleToggleCommercialType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                    >
                      {formData.commercialType}
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
                      value="6commercialType"
                      name="6commercialType"
                      checked={fields.includes("6commercialType")}
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

            case "7salePrice":
              return (
                <div key={index} className="flex items-end">
                  <div className="w-full space-y-[4px]">
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
                      value="7salePrice"
                      name="7salePrice"
                      checked={fields.includes("7salePrice")}
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

            case "8price":
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
                      value="8price"
                      name="8price"
                      checked={fields.includes("8price")}
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

export default HouseLandsAdmin;
