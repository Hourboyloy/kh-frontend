"use client";
import { useTranslations } from "next-intl";
import React, { useState, useEffect, useCallback } from "react";
import { PiWarningCircleBold } from "react-icons/pi";

function ElectronicsAppliancesUser({
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
  // Group form data
  const [formData, setFormData] = useState({
    discount: dynamicFields?.discount || "",
    discountAs: dynamicFields?.discountAs || "%",
    condition: dynamicFields?.condition || "",
    freeDelivery: dynamicFields?.freeDelivery || false,
    price: dynamicFields?.price || "",
  });

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
    const fieldsToResetError = ["condition"];

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
    if (fields.includes("1condition"))
      checkField("condition", formData.condition);
    if (fields.includes("2price")) checkField("price", formData.price);

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
  }, [formData, FormData, fields, submit, setErrors]);

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
      });
    }
  }, [displayComponent.subCategory]);

  return (
    <div>
      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? " font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1condition":
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
                    <p className="text-[13px] text-[#FF0000]">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "3discount":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">{t("discount")}</label>
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

            case "2price":
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

            case "4freeDelivery":
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

export default ElectronicsAppliancesUser;
