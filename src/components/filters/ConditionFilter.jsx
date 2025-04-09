import React from "react";
import { IoMdClose } from "react-icons/io";

function ConditionFilter({
  formData2,
  setFormData2,
  setFormData,
  dropdownRef,
  handleToggleCondition,
  t,
  locale,
}) {
  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      condition: formData2.condition,
    }));
    handleToggleCondition();
  };

  const handleClear = () => {
    setFormData((prev) => ({
      ...prev,
      condition: "",
    }));
    setFormData2((prev) => ({
      ...prev,
      condition: "",
    }));
    handleToggleCondition();
  };
  return (
    <div ref={dropdownRef} className="">
      <div className="h-[38px] lg:hidden flex items-center justify-between pl-3 pr-3.5 font-semibold text-[#212529] bg-[#e4e4e4] border-t border-gray-300">
        <button
          className=" flex items-center gap-1 text-gray-700 hover:text-black transition outline-none focus:outline-none"
          onClick={handleToggleCondition}
        >
          <IoMdClose size={20} />
        </button>

        <span className="md:text-[17px] text-[15.5px] pl-5 lg:pl-0">
          {t("condition")}
        </span>

        <button
          onClick={handleClear}
          className="text-[15px] lg:hidden hover:text-black transition font-medium text-[#249ad1] outline-none focus:outline-none"
        >
          {t("clear")}
        </button>
      </div>

      <div className="w-full bg-white border-t lg:border border-gray-300 lg:rounded-md p-4 space-y-1.5">
        <p className="text-[15px]">{t("condition")}</p>

        <div className="flex items-center space-x-4 pb-2.5">
          <label
            className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
              formData2?.condition === ""
                ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                : "border-gray-300 text-gray-800"
            }`}
          >
            <input
              type="radio"
              name="condition"
              value=""
              checked={formData2?.condition === ""}
              onChange={(e) =>
                setFormData2((prev) => ({ ...prev, condition: e.target.value }))
              }
              className="hidden"
            />
            {locale == "en" ? "All" : "ទាំងអស់"}
          </label>

          <label
            className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
              formData2?.condition === "New"
                ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                : "border-gray-300 text-gray-800"
            }`}
          >
            <input
              type="radio"
              name="condition"
              value="New"
              checked={formData2?.condition === "New"}
              onChange={(e) =>
                setFormData2((prev) => ({ ...prev, condition: e.target.value }))
              }
              className="hidden"
            />

            {locale == "en" ? "New" : "ថ្មី"}
          </label>

          <label
            className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
              formData2?.condition === "Used"
                ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                : "border-gray-300 text-gray-800"
            }`}
          >
            <input
              type="radio"
              name="condition"
              value="Used"
              checked={formData2?.condition === "Used"}
              onChange={(e) =>
                setFormData2((prev) => ({ ...prev, condition: e.target.value }))
              }
              className="hidden"
            />

            {locale == "en" ? "Used" : "មួយទឹក"}
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="text-shadow font-semibold bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
        >
          {t("applyFilter")}
        </button>
      </div>
    </div>
  );
}

export default ConditionFilter;
