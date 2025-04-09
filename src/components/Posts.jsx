"use client";
import React from "react";
import dynamic from "next/dynamic";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleBold } from "react-icons/pi";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";

const CarsandVehiclesUser = dynamic(
  () => import("@/components/feildsForDynamicForms/CarsandVehiclesUser"),
  {
    ssr: false,
  }
);
const ComputersAccessoriesUser = dynamic(
  () => import("@/components/feildsForDynamicForms/ComputersAccessoriesUser"),
  {
    ssr: false,
  }
);

const PhonesTabletsUser = dynamic(
  () => import("@/components/feildsForDynamicForms/PhonesTabletsUser"),
  {
    ssr: false,
  }
);

const ElectronicsAppliancesUser = dynamic(
  () => import("@/components/feildsForDynamicForms/ElectronicsAppliancesUser"),
  {
    ssr: false,
  }
);
const JobsUser = dynamic(
  () => import("@/components/feildsForDynamicForms/JobsUser"),
  {
    ssr: false,
  }
);
const Services = dynamic(
  () => import("@/components/feildsForDynamicForms/Services"),
  {
    ssr: false,
  }
);

const FoodsAndPets = dynamic(
  () => import("@/components/feildsForDynamicForms/FoodsAndPets"),
  {
    ssr: false,
  }
);

const BooksSportsHobbiesUser = dynamic(
  () => import("@/components/feildsForDynamicForms/BooksSportsHobbiesUser"),
  {
    ssr: false,
  }
);

const FurnitureDecorUser = dynamic(
  () => import("@/components/feildsForDynamicForms/FurnitureDecorUser"),
  {
    ssr: false,
  }
);

const FashionBeautyUser = dynamic(
  () => import("@/components/feildsForDynamicForms/FashionBeautyUser"),
  {
    ssr: false,
  }
);
const HouseLandsUser = dynamic(
  () => import("@/components/feildsForDynamicForms/HouseLandsUser"),
  {
    ssr: false,
  }
);

const PostPhoto = dynamic(() => import("@/components/PostPhoto"), {
  ssr: false,
});

const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

function Posts({
  dynamicFields,
  setFormData,
  formData,
  setPhotos,
  photos,
  setErrors,
  errors,
  setToggleGetField,
  toggleGetField,
  fields,
  handleBackSubCategory,
  setToggleLocation,
  displayComponent,
  handleClickAlert,
  submit,
  phoneNumArr,
  setPhoneNumArr,
  t,
  locale,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldsToResetError = [
      "title",
      "name",
      "descriptions",
      "address",
      "phoneNum",
    ];

    if (fieldsToResetError.includes(name) && errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (name === "phoneNum") {
      const phoneRegex = /^[0-9]{9,11}$/;
      if (!phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          phoneNum: true,
        }));
      } else {
        setErrors((prev) => ({ ...prev, phoneNum: false }));
      }
    }
  };

  const inputFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhoto = {
        file: file,
        preview: URL.createObjectURL(file),
      };
      setPhotos((prev) => [...prev, newPhoto]);
      e.target.value = "";
    }
  };

  const handleValueChangePhoneNum = (index, newValue) => {
    setPhoneNumArr((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
    );
  };

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

  return (
    <div className="">
      <div className="lg:hidden top-0 sticky z-10">
        <SmNavNormal name={t("postAd")} />
      </div>
      <section className=" space-y-[18px]">
        <PostPhoto
          t={t}
          photos={photos}
          inputFile={inputFile}
          handleClickAlert={handleClickAlert}
        />
        <section className="border-t border-b lg:border border-gray-300 rounded-md px-[20px] bg-white pt-2 pb-9">
          <div className=" space-y-0.5 mb-[15px]">
            <h2 className="text-[20px] text-gray-600 font-semibold">
              {t("detailPost")}
            </h2>
            <hr />
          </div>
          <section className="space-y-[17.5px]">
            <div className="space-y-[4px] w-full">
              <label className="text-[15px]">
                {t("title")} <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  placeholder=""
                  value={formData.title || ""}
                  className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                    errors.title
                      ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                      : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                  }`}
                  onChange={handleInputChange}
                />
                <PiWarningCircleBold
                  className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                    errors.title ? "" : "hidden"
                  }`}
                />
              </div>
              {errors.title && (
                <p className="text-[13px] text-[#FF0000]">
                  Please enter your title
                </p>
              )}
            </div>

            <div className="space-y-[4px] w-full">
              <label className="text-[15px]">
                {t("chooseACategory")}
                <span className="text-red-600">*</span>
              </label>
              <div
                onClick={handleBackSubCategory}
                className=" flex items-center space-x-2 cursor-pointer"
              >
                <span>{formData.mainCategory}</span>
                <RiArrowRightSLine size={20} />
                <span>{formData.subCategory}</span>
                <div className="pl-1">
                  <button className="bg-[#0096DE] font-normal text-white rounded px-2.5 h-[32.56px] flex items-center justify-center">
                    {t("changeCategoryBtn")}
                  </button>
                </div>
              </div>
            </div>

            <div>
              {["Cars and Vehicles", "រថយន្ត និង យានយន្ត"].includes(
                formData.mainCategory
              ) ? (
                <CarsandVehiclesUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Phones & Tablets", "ទូរស័ព្ទ និង Tablets"].includes(
                  formData.mainCategory
                ) ? (
                <PhonesTabletsUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : [
                  "Computers & Accessories",
                  "កុំព្យូទ័រ និង គ្រឿងបន្លាស់",
                ].includes(formData.mainCategory) ? (
                <ComputersAccessoriesUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : [
                  "Electronics & Appliances",
                  "អេឡិចត្រូនិច និង គ្រឿង​ប្រើប្រាស់",
                ].includes(formData.mainCategory) ? (
                <ElectronicsAppliancesUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Jobs", "ការងារ"].includes(formData.mainCategory) ? (
                <JobsUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Furniture & Decor", "គ្រឿងសង្ហារឹម និង ដេ​គ័​រ"].includes(
                  formData.mainCategory
                ) ? (
                <FurnitureDecorUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : [
                  "Books, Sports & Hobbies",
                  "សៀវភៅ, កីឡា និង ចំណូលចិត្ត",
                ].includes(formData.mainCategory) ? (
                <BooksSportsHobbiesUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Fashion & Beauty", "សម្លៀកបំពាក់"].includes(
                  formData.mainCategory
                ) ? (
                <FashionBeautyUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["House & Lands", "ផ្ទះ និង ដី"].includes(
                  formData.mainCategory
                ) ? (
                <HouseLandsUser
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  fields={fields}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Pets", "Foods", "អាហារ", "សត្វចិញ្ចឹម"].includes(
                  formData.mainCategory
                ) ? (
                <FoodsAndPets
                  dynamicFields={dynamicFields}
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  setErrors={setErrors}
                  errors={errors}
                  FormData={formData}
                  displayComponent={displayComponent}
                  submit={submit}
                  locale={locale}
                />
              ) : ["Services", "សេវាកម្ម"].includes(formData.mainCategory) ? (
                <Services
                  toggleGetField={toggleGetField}
                  setToggleGetField={setToggleGetField}
                  submit={submit}
                />
              ) : null}
            </div>

            <section className="space-y-[17.5px]">
              <div className="space-y-[4px] w-full">
                <label className="text-[15px]">
                  {t("description")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="descriptions"
                    placeholder=""
                    value={formData.descriptions || ""}
                    className={`w-full  h-[200px] text-gray-800 px-3 focus:ring-4  py-[7px] border rounded-md outline-none focus:outline-none ${
                      errors.descriptions
                        ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                        : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                    }`}
                    onChange={handleInputChange}
                  ></textarea>

                  <PiWarningCircleBold
                    className={`absolute text-red-600 right-[12px] text-xl  top-[12px] ${
                      errors.descriptions ? "" : "hidden"
                    }`}
                  />
                </div>

                {errors.descriptions && (
                  <p className="text-[13px] text-[#FF0000]">
                    Please enter your description
                  </p>
                )}
              </div>

              <div className="space-y-[4px] w-full">
                <label className="text-[15px]">
                  {t("locations")} <span className="text-red-600"> *</span>
                </label>
                <div
                  onClick={() => setToggleLocation(true)}
                  className="border bg-white border-gray-300 h-[38px] rounded-md relative w-full flex items-center px-3 cursor-pointer"
                >
                  <div
                    className={`${
                      formData?.locations?.province !== undefined
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`}
                  >
                    {!formData?.locations?.province?.en
                      ? "Choose Location"
                      : `${formData.locations.commune[locale]}, ${formData.locations.district[locale]}, ${formData.locations.province[locale]}`}
                  </div>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <IoMdArrowDropdown className="text-gray-800" size={20} />
                  </div>
                  <input
                    type="text"
                    className="focus:outline-none w-0 h-0 absolute right-3"
                    name="locations"
                  />
                </div>
                {errors.locations && (
                  <p className="text-[13px] text-[#FF0000] font-sans">
                    This field is required.
                  </p>
                )}
              </div>

              <div className="space-y-[4px] w-full">
                <label className="text-[15px]">
                  {t("address")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    placeholder=""
                    value={formData.address || ""}
                    className={`w-full h-[38px] text-gray-800 px-3 pb-[3px] focus:ring-4  border rounded-md outline-none focus:outline-none font-sans ${
                      errors.address
                        ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                        : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                    }`}
                    onChange={handleInputChange}
                  />

                  <PiWarningCircleBold
                    className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                      errors.address ? "" : "hidden"
                    }`}
                  />
                </div>

                {errors.address && (
                  <p className="text-[13px] text-[#FF0000] font-sans">
                    Please enter your address
                  </p>
                )}
              </div>
            </section>
          </section>
        </section>

        <section className="border-t border-b lg:border border-gray-300 rounded-md px-[20px] bg-white pt-2 pb-9">
          <div className=" space-y-0.5 mb-[15px]">
            <h2 className="text-[20px] text-gray-600 font-semibold">
              {t("contactDetail")}
            </h2>
            <hr />
          </div>

          <section className="space-y-[17.5px]">
            <div className="space-y-[4px] w-full">
              <label className="text-[15px]">
                {t("name")} <span className="text-red-600">*</span>
              </label>
              <div className="relative font-sans">
                <input
                  type="text"
                  name="name"
                  placeholder=""
                  value={formData.name || ""}
                  className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none ${
                    errors.name
                      ? "focus:border-red-400 border-red-400 focus:ring-red-200"
                      : "focus:border-blue-300 focus:ring-[#C9DFFF]"
                  }`}
                  onChange={handleInputChange}
                />
                <PiWarningCircleBold
                  className={`absolute text-red-600 right-[12px] text-xl -translate-y-1/2 top-1/2 ${
                    errors.name ? "" : "hidden"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-[13px] text-[#FF0000] font-sans">
                  Please enter your name
                </p>
              )}
            </div>

            {/* pn */}
            <div className="space-y-[4px]">
              <label className="text-[15px]">{t("phoneNum")}</label>

              <div className="flex items-center space-x-5 font-sans">
                <input
                  className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4
              ${
                errors.phoneNum
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-[#C9DFFF] focus:border-blue-300 "
              }`}
                  name="phoneNum"
                  type="text"
                  value={formData?.phoneNum || ""}
                  onChange={handleInputChange}
                  placeholder="Phone number 1"
                />
                {phoneNumArr.every((item) => item.display !== true) && (
                  <FaPlusCircle
                    onClick={() => handleToggleDisplayPhoneNum(0)}
                    className="text-[#0D6EFD] cursor-pointer"
                    size={24}
                  />
                )}
              </div>

              {errors.phoneNum && (
                <p className="text-[13px] text-[#FF0000] font-sans">
                  {formData?.phoneNum === ""
                    ? "Please enter your phone number"
                    : "The phone number is invalid."}
                </p>
              )}

              {phoneNumArr.some((item) => item.display) && (
                <ul className="space-y-[18px] pt-[18px]">
                  {phoneNumArr.map(
                    (item, i) =>
                      item.display && (
                        <div key={i} className="flex items-center space-x-5">
                          <div className="relative w-full">
                            <input
                              className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
                              type="text"
                              value={item.value || ""}
                              placeholder={`Phone number ${i + 2}`}
                              onChange={(e) =>
                                handleValueChangePhoneNum(i, e.target.value)
                              }
                            />
                            <MdRemoveCircle
                              className="absolute top-1/2 -translate-y-1/2 right-3 text-red-600 cursor-pointer"
                              size={20}
                              onClick={() => handleToggleDisplayPhoneNum(i)}
                            />
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

            <div className="space-y-[4px] w-full">
              <label className="text-[15px]">
                {t("email")} <span className="text-red-600">*</span>
              </label>
              <div className="relative font-sans">
                <input
                  type="text"
                  name="mail"
                  placeholder=""
                  value={formData.mail || ""}
                  className={`w-full text-gray-800 px-3 focus:ring-4  py-[6.2px] border rounded-md outline-none focus:outline-none`}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}

export default Posts;
