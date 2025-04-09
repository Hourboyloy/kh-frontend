"use client";
import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import Loading from "@/components/Loading";
const Locations = dynamic(() => import("@/components/Locations"), {
  ssr: false,
});

const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);

function FormAddress({
  handleSubmit,
  formData,
  setFormData,
  nameRef,
  addressRef,
  phoneNumRef,
  isPending,
  errors,
  setErrors,
  title,
  phoneNumArr,
  setPhoneNumArr,
  setSaveAs,
  SaveAs,
  locale,
  t,
}) {
  const [isToggleLocation, setToggleLocation] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleToggleDisplayPhoneNum = (index) => {
    setPhoneNumArr((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              display: !item.display,
              value: item.display ? "" : item.value,
            }
          : item
      )
    );
  };

  const handleValueChangePhoneNum = (index, newValue) => {
    setPhoneNumArr((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name in errors) {
      setErrors((prev) => ({
        ...prev,
        [name]: value.trim() === "" ? true : false,
      }));
    }
  };

  const handleSaveAs = (val) => {
    setSaveAs(val);
    if (val !== "Other") {
      setFormData((prev) => ({ ...prev, saveAs: val }));
      setErrors((prev) => ({
        ...prev,
        saveAs: false,
      }));
    } else {
      setFormData((prev) => ({ ...prev, saveAs: "" }));
    }
  };

  const handlePhoneNum = useCallback(
    (e) => {
      const phoneNum = e.target.value;
      const phoneRegex = /^[0-9]{9,10}$/;
      setFormData((prev) => ({ ...prev, phoneNum }));
      setErrors((prev) => ({ ...prev, phoneNum: !phoneRegex.test(phoneNum) }));
    },
    [setFormData, setErrors]
  );

  const handleIsAlert = () => {
    setAlertSuccess(!alertSuccess);
  };

  const handleSetLocations = useCallback(
    (arrayLocation) => {
      setFormData((prev) => ({
        ...prev,
        locations: {
          province: arrayLocation[0],
          district: arrayLocation[1],
          commune: arrayLocation[2],
        },
      }));

      setErrors((prev) => ({
        ...prev,
        locations: false,
      }));
    },
    [setFormData, setErrors]
  );

  const handleClearLocations = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      locations: {
        province: { en: "", kh: "" },
        district: { en: "", kh: "" },
        commune: { en: "", kh: "" },
      },
    }));

    setErrors((prev) => ({
      ...prev,
      locations: true,
    }));
  }, [setFormData, setErrors]);

  return (
    <div className="pt-3.5 lg:pt-5 bg-white lg:bg-transparent min-h-screen font-sans">
      <div>
        <div
          className={`fixed top-0 left-1/2 z-20 -translate-x-1/2 transform transition-all duration-300 ${
            alertSuccess
              ? "opacity-100 scale-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <AlertSuccessWarning
            alert={alertSuccess}
            icons={"success"}
            text={"Your settings have been saved successfully"}
            handleIsAlert={handleIsAlert}
          />
        </div>

        <Locations
          setToggleLocation={setToggleLocation}
          isToggleLocation={isToggleLocation}
          myLocations={formData?.locations}
          handleSetLocations={handleSetLocations}
          handleClearLocations={handleClearLocations}
          locale={locale}
        />
        {isPending && <Loading isPending={isPending} />}
      </div>

      <div className="lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[17px]">
        <div className="lg:space-y-3 hidden lg:block">
          <h1 className="text-gray-800 font-semibold text-[22px] font-sans">
            {title}
          </h1>
          <hr className="" />
        </div>

        <div className="space-y-[17.5px]">
          {/* n */}
          <div className="space-y-[4px]">
            <label className="text-[15px]">
              {t("name")} <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                ref={nameRef}
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-300"
                }`}
                value={formData?.name || ""}
                name="name"
                type="text"
                alt="name"
                onChange={handleChange}
              />
              {errors.name && (
                <RiErrorWarningLine
                  className=" absolute top-2/4 -translate-y-2/4 right-2 text-red-600"
                  size={22}
                />
              )}
            </div>
            {errors.name && (
              <p className="text-red-600 text-[13px]">
                Please enter the &apos;Name&apos;.
              </p>
            )}
          </div>

          <div className="space-y-[4px]">
            <label className="text-[15px]">{t("email")}</label>
            <input
              className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
              value={formData?.mail || ""}
              name="mail"
              type="text"
              onChange={handleChange}
            />
          </div>

          {/* c */}
          <div className="space-y-[4px]">
            <label className="text-[15px]">{t("company")}</label>
            <input
              className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
              value={formData?.company || ""}
              name="company"
              type="text"
              onChange={handleChange}
            />
          </div>

          {/* pn */}
          <div className="space-y-[4px]">
            <label className="text-[15px]">
              {t("phoneNum")}
              <span className="text-red-600">*</span>
            </label>

            <div className="flex items-center space-x-5">
              <input
                className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4
              ${
                errors.phoneNum
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-[#C9DFFF] focus:border-blue-300 "
              }`}
                ref={phoneNumRef}
                name="phoneNum"
                type="text"
                value={formData?.phoneNum || ""}
                onChange={handlePhoneNum}
                placeholder={`${t("phoneNum")} 1`}
              />
              {phoneNumArr.every((item) => item.display !== true) && (
                <FaPlusCircle
                  onClick={() => handleToggleDisplayPhoneNum(0)}
                  className="text-[#0D6EFD] cursor-pointer"
                  size={24}
                />
              )}
            </div>

            {errors.phoneNum && formData.phoneNum ? (
              <p className="text-red-600 text-[12px] tracking-wide">
                The Phone number is invalid.
              </p>
            ) : errors.phoneNum && !formData.phoneNum ? (
              <p className="text-red-600 text-[12px] tracking-wide">
                Please enter the &apos;Phone Number&apos;.
              </p>
            ) : (
              ""
            )}

            {phoneNumArr.some((item) => item.display) && (
              <ul className="space-y-[18px] pt-[18px]">
                {phoneNumArr.map(
                  (item, i) =>
                    item.display && (
                      <div key={i} className="flex items-center space-x-5">
                        <div className="relative w-full">
                          <input
                            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                            type="text"
                            value={item.value || ""}
                            placeholder={`${t("phoneNum") + " "}${i + 2}`}
                            onChange={(e) =>
                              handleValueChangePhoneNum(i, e.target.value)
                            }
                          />

                          {i ===
                            phoneNumArr
                              .map((item) => item.display)
                              .lastIndexOf(true) && (
                            <MdRemoveCircle
                              className="absolute top-1/2 -translate-y-1/2 right-3 text-red-600 cursor-pointer"
                              size={20}
                              onClick={() => handleToggleDisplayPhoneNum(i)}
                            />
                          )}
                        </div>

                        {phoneNumArr.some((item) => !item.display) && (
                          <FaPlusCircle
                            onClick={() => handleToggleDisplayPhoneNum(i + 1)}
                            className="text-[#0D6EFD] cursor-pointer"
                            size={24}
                          />
                        )}
                      </div>
                    )
                )}
              </ul>
            )}
          </div>

          {/* l */}
          <div className="space-y-[4px]">
            <label className="text-[15px]">
              {t("locations")} <span className="text-red-600">*</span>
            </label>
            <div
              onClick={() => setToggleLocation(true)}
              className={`h-[38px] flex items-center justify-between border rounded-md px-3 cursor-pointer select-none ${
                errors.locations ? "border-red-600" : "border-gray-300"
              }`}
            >
              <div
                className={`${
                  formData?.locations?.province !== ""
                    ? "text-gray-800"
                    : "text-gray-500"
                }`}
              >
                {formData?.locations?.province.en
                  ? `${
                      locale === "en"
                        ? `${formData.locations.province.en}, ${formData.locations.district.en}, ${formData.locations.commune.en}`
                        : `${formData.locations.province.kh}, ${formData.locations.district.kh}, ${formData.locations.commune.kh}`
                    }`
                  : t("chooseLocation")}
              </div>
              <label className="text-2xl text-gray-900">
                <MdArrowDropDown />
              </label>
            </div>

            {/* {errors.location && errors.location.province && (
          )} */}
            {errors.locations && (
              <p className="text-red-600 text-[13px]">
                Please enter the &quot;Location&quot;.
              </p>
            )}
          </div>

          <div className="space-y-[4px]">
            <label className="text-[15px]">
              {t("address")}
              <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                className={`w-full border focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-300"
                }`}
                ref={addressRef}
                value={formData?.address || ""}
                name="address"
                type="text"
                alt="address"
                onChange={handleChange}
              />
              {errors.address && (
                <RiErrorWarningLine
                  className=" absolute top-2/4 -translate-y-2/4 right-2 text-red-600"
                  size={22}
                />
              )}
            </div>
            {errors.address && (
              <p className="text-red-600 text-[13px]">
                Please enter the &quot;Address&quot;.
              </p>
            )}
          </div>

          <div className="space-y-[4px]">
            <label className="text-[15px]">{t("taxID")}</label>
            <input
              className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
              name="taxID"
              type="text"
              value={formData?.taxID || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-[4px]">
            <label className="text-[15px]">{t("saveAs")}</label>
            <div className="flex items-center space-x-4">
              <label
                className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                  SaveAs === "Home"
                    ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                    : "border-gray-300 text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="saveAs"
                  value="Home"
                  checked={SaveAs === "Home"}
                  onChange={(e) => handleSaveAs(e.target.value)}
                  className="hidden"
                />
                Home
              </label>

              <label
                className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                  SaveAs === "Work"
                    ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                    : "border-gray-300 text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="saveAs"
                  value="Work"
                  checked={SaveAs === "Work"}
                  onChange={(e) => handleSaveAs(e.target.value)}
                  className="hidden"
                />
                Work
              </label>

              <label
                className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                  SaveAs === "Other"
                    ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                    : "border-gray-300 text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="saveAs"
                  value="Other"
                  checked={SaveAs === "Other"}
                  onChange={(e) => handleSaveAs(e.target.value)}
                  className="hidden"
                />
                Other
              </label>
            </div>

            {SaveAs === "Other" && (
              <div className="pt-[24px]">
                <input
                  className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
                  name="saveAs"
                  type="text"
                  placeholder={t("saveAs")}
                  value={formData?.saveAs || ""}
                  onChange={handleChange}
                />
              </div>
            )}

            {errors.saveAs && (
              <p className="text-red-600 text-[13px]">
                Please select any &quot;Save as&quot;.
              </p>
            )}
          </div>

          <div className="pt-[10px]">
            <div
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  setAsDefault: !formData.setAsDefault,
                }))
              }
              className="h-[38px] px-3 border border-gray-300 rounded-md flex items-center justify-between"
            >
              <span>{t("setAsDefault")}</span>
              <div className="flex items-center">
                <button
                  className={`cursor-pointer w-[47px] h-[26px] rounded-full outline-none focus:outline-none ${
                    formData.setAsDefault ? "bg-[#028DCF]" : "bg-[#CCCCCC]"
                  }`}
                >
                  <p
                    className={`bg-white h-[18px] w-[18px] rounded-full translate-x-[1.5px] transition-all transform duration-200 ${
                      formData.setAsDefault
                        ? "translate-x-[26.4px]"
                        : "translate-x-[2px]"
                    }`}
                  ></p>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3.5">
            <button
              onClick={handleSubmit}
              className=" text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
            >
              {t("submitBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAddress;
