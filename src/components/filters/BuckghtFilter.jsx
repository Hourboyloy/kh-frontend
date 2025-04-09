import React from "react";
import { IoMdClose } from "react-icons/io";

function PriceFilter({
  setToggle,
  handleClearField,
  handleClose,
  name,
  fieldName,
  formData2,
  handleValidatedInput,
  handleSubmit,
  dropdownRef,
  locale,
  t,
}) {
  return (
    <div ref={dropdownRef}>
      <div className="h-[38px] lg:hidden flex items-center justify-between pl-3 pr-3.5 font-semibold text-[#212529] bg-[#e4e4e4] border-t border-gray-300">
        <button
          className=" flex items-center gap-1 text-gray-700 hover:text-black transition outline-none focus:outline-none"
          onClick={handleClose}
        >
          <IoMdClose size={20} />
        </button>

        <span className="md:text-[17px] text-[15.5px] pl-5 lg:pl-0">
          {name}
        </span>

        <button
          onClick={() => handleClearField(fieldName, setToggle)}
          className="text-[15px] lg:hidden hover:text-black transition font-medium text-[#249ad1] outline-none focus:outline-none"
        >
          {t("clear")}
        </button>
      </div>

      <div className="w-full bg-white border-t lg:border border-gray-300 lg:rounded-md p-4 space-y-1.5">
        <p className="text-[15px]">{name}</p>

        <div className="flex items-center space-x-4 pb-2.5">
          <input
            value={formData2?.[`min${fieldName}`] || ""}
            type="text"
            onChange={(e) =>
              handleValidatedInput(`min${fieldName}`, e.target.value)
            }
            placeholder={`${locale == "en" ? "Minimum" : "អប្បបរមា"} $`}
            className="w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]"
          />
          <input
            value={formData2?.[`max${fieldName}`] || ""}
            type="text"
            onChange={(e) =>
              handleValidatedInput(`max${fieldName}`, e.target.value)
            }
            placeholder={`${locale == "en" ? "Maximum" : "អតិបរមា"} $`}
            className="w-full border focus:outline-none rounded-md py-[6.2px] px-3 focus:text-gray-700 focus:ring-4 focus:ring-[#C9DFFF]"
          />
        </div>

        <button
          onClick={() => handleSubmit(fieldName)}
          className="text-shadow font-semibold bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
        >
          {t("applyFilter")}
        </button>
      </div>
    </div>
  );
}

export default PriceFilter;
