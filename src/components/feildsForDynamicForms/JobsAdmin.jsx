"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { IoMdArrowDropdown } from "react-icons/io";
import { jobTypes } from "@/utils/jobTypes";
import { getExperienceOptions } from "@/utils2/Jobs";
const Template = dynamic(() => import("@/components/modalSelector/Template"), {
  ssr: false,
});

function JobsAdmin({ AllFields, setFields, fields, locale }) {
  const t = useTranslations("dynamicFieldJobs");
  const [toggleJobType, setToggleJobType] = useState(false);

  const [formData, setFormData] = useState({
    price: "",
    type: "",
    experience: "",
    salary: "",
  });

  const handleToggleJobType = () => {
    setToggleJobType(!toggleJobType);
  };

  const handleValidatedInput = (key, value) => {
    const validValue = value.replace(/[^0-9.]/g, "");
    setFormData((prev) => ({ ...prev, [key]: validValue }));
  };

  return (
    <div>
      <Template
        title={"type"}
        name={"type"}
        toggle={toggleJobType}
        value={formData.type}
        setValue={setFormData}
        handleToggle={handleToggleJobType}
        array={jobTypes}
        path={"jobsAndHouseLands"}
      />

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
                        *
                        <span className="text-xs"> Required for Job Types</span>
                      </span>
                    </label>
                    <div
                      onClick={handleToggleJobType}
                      className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3"
                    >
                      {formData.type}
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

            case "2experience":
              return (
                <div key={index} className="flex items-end">
                  <div className="space-y-[4px] w-full">
                    <label className="text-[15px]">
                      {t("experience")} <span className="text-red-600"> *</span>
                    </label>
                    <div className="relative">
                      <select
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            experience: e.target.value,
                          }))
                        }
                        value={formData.experience || ""}
                        className={`appearance-none w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
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
                    </div>
                  </div>

                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="2experience"
                      name="2experience"
                      checked={fields.includes("2experience")}
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

            case "3minimumSalary":
              return (
                <div key={index} className="flex items-end">
                  <div className="w-full space-y-[4px]">
                    <label className="text-[15px]">
                      {t("salary")} <span className="text-red-600">*</span>
                    </label>
                    <div className="">
                      <input
                        type="text"
                        value={formData.salary} // Display the filtered price
                        name="salary"
                        placeholder="$"
                        className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
                        onChange={(e) =>
                          handleValidatedInput("salary", e.target.value)
                        } // Ensures backspace works
                      />
                    </div>
                  </div>
                  <div className={`pl-2`}>
                    <input
                      type="checkbox"
                      value="3minimumSalary"
                      name="3minimumSalary"
                      checked={fields.includes("3minimumSalary")}
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

export default JobsAdmin;
