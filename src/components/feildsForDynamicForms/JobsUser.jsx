"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { jobTypes } from "@/utils/jobTypes";
import { useTranslations } from "next-intl";
import { getExperienceOptions } from "@/utils2/Jobs";

const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function JobsUser({
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
  const t = useTranslations("dynamicFieldJobs");
  const [toggleJobType, setToggleJobType] = useState(false);

  // Group form data
  const [formData, setFormData] = useState({
    type: dynamicFields?.type || "",
    experience: dynamicFields?.experience || "",
    salary: dynamicFields?.salary || "",
  });

  const handleToggleJobType = () => {
    setToggleJobType(!toggleJobType);
  };

  const handleValidatedInput = (key, value) => {
    const validValue = value.replace(/[^0-9.]/g, "");
    setFormData((prev) => ({ ...prev, [key]: validValue }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // List of fields that require error reset
    const fieldsToResetError = ["experience"];

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
    if (fields.includes("1type")) checkField("type", formData.type);
    if (fields.includes("2experience"))
      checkField("experience", formData.experience);
    if (fields.includes("3minimumSalary"))
      checkField("salary", formData.salary);

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

    submit(formData);
  }, [FormData, formData, fields, submit, setErrors]);

  useEffect(() => {
    if (toggleGetField) {
      validateForm();
      setToggleGetField(false);
    }
  }, [toggleGetField, validateForm, setToggleGetField]);

  useEffect(() => {
    if (displayComponent.subCategory) {
      setFormData({
        type: "",
        experience: "",
        salary: "",
      });
    }
  }, [displayComponent.subCategory]);

  return (
    <div>
      <Template
        title={"Type"}
        setErrors={setErrors}
        errors={errors}
        errorsName={"type"}
        name={"type"}
        toggle={toggleJobType}
        value={formData.type}
        setValue={setFormData}
        handleToggle={handleToggleJobType}
        array={jobTypes}
        path={"jobsAndHouseLands"}
      />

      <div
        className={`bg-white space-y-[17.5px] ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {fields?.map((field, index) => {
          switch (field) {
            case "1type":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <label className="text-[15px]">
                    {t("type")} <span className="text-red-600"> *</span>
                  </label>
                  <div
                    onClick={handleToggleJobType}
                    className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
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
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
                </div>
              );

            case "2experience":
              return (
                <div key={index} className="space-y-[4px] w-full">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">{t("experience")}</label>
                    <div className="relative">
                      <select
                        onChange={handleInputChange}
                        name="experience"
                        value={formData.experience || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 ${
                          errors.experience
                            ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                            : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                        }`}
                      >
                        {getExperienceOptions(locale).map((opt) => (
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
                      <PiWarningCircleBold
                        className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                          errors.experience ? "" : "hidden"
                        }`}
                      />
                    </div>
                    {errors.experience && (
                      <p className="text-[13px] text-[#FF0000] font-sans">
                        This field is required.
                      </p>
                    )}
                  </div>
                </div>
              );

            case "3minimumSalary":
              return (
                <div key={index} className="w-full space-y-[4px]">
                  <label className="text-[15px]">
                    {t("salary")}
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.salary} // Display salary"
                      placeholder="$"
                      className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none font-sans ${
                        errors.salary
                          ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                          : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                      }`}
                      onChange={(e) =>
                        handleValidatedInput("salary", e.target.value)
                      }
                    />
                    <PiWarningCircleBold
                      className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                        errors.salary ? "" : "hidden"
                      }`}
                    />
                  </div>
                  {errors.salary && (
                    <p className="text-[13px] text-[#FF0000] font-sans">
                      This field is required.
                    </p>
                  )}
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

export default JobsUser;
