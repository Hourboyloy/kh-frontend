"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const Posts = dynamic(() => import("@/components/Posts"), { ssr: false });

const MainCategoryList = dynamic(
  () => import("@/components/MainCategoryList"),
  { ssr: false }
);
const SubCategoryList = dynamic(() => import("@/components/SubCategoryList"), {
  ssr: false,
});
const AlertActionOfPhoto = dynamic(
  () => import("@/components/AlertActionOfPhoto"),
  {
    ssr: false,
  }
);

const Locations = dynamic(() => import("@/components/Locations"), {
  ssr: false,
});

function Page() {
  const locale = useLocale();
  const t = useTranslations("staticInformProduct");
  const { domain, token, account, profile, categories } = useAppContext();
  const router = useRouter();

  const [phoneNumArr, setPhoneNumArr] = useState([
    {
      display: false,
      value: "",
    },
    {
      display: false,
      value: "",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    descriptions: "",
    address: "",
    locations: {
      province: { en: "", kh: "" },
      district: { en: "", kh: "" },
      commune: { en: "", kh: "" },
    },
    mainCategory: "",
    subCategory: "",
    keySearchmainCategory: "",
    keySearchsubCategory: "",
    name: "",
    phoneNum: "",
    mail: "",
    username: "",
  });

  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [fields, setFields] = useState([]);
  const [displayComponent, setDisplayComponent] = useState({
    mainCategory: true,
    subCategory: false,
    form: false,
  });

  const [errors, setErrors] = useState({});
  const [toggleGetField, setToggleGetField] = useState(false);
  const [isToggleLocation, setToggleLocation] = useState(false);
  const [alertActionPhoto, setAlertActionPhoto] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // ✅ Optimize: useCallback() to prevent function re-creation
  const handleGetSubCategory = useCallback(
    (categoryName, keySearch, index) => {
      setFormData((prev) => ({
        ...prev,
        mainCategory: categoryName,
        keySearchmainCategory: keySearch,
      }));
      const selectedCategory = categories[index] || {};
      setSubCategories(selectedCategory.subcategories || []);
      setDisplayComponent({
        mainCategory: false,
        subCategory: true,
        form: false,
      });
      window.scroll(0, 0);
    },
    [categories]
  );

  const handleGetForm = useCallback(
    (categoryName, keySearch, index) => {
      setFormData((prev) => ({
        ...prev,
        subCategory: categoryName,
        keySearchsubCategory: keySearch,
      }));
      const selectedSubCategory = subCategories[index] || {};
      setFields(selectedSubCategory.fields || []);
      setDisplayComponent({
        mainCategory: false,
        subCategory: false,
        form: true,
      });
      window.scroll(0, 0);
    },
    [subCategories]
  );

  const handleBackMainCategory = useCallback(() => {
    setDisplayComponent((prev) => ({
      ...prev,
      mainCategory: true,
      subCategory: false,
      form: false,
    }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setDisplayComponent]);

  const handleBackSubCategory = useCallback(() => {
    setDisplayComponent((prev) => ({
      ...prev,
      mainCategory: false,
      subCategory: true,
      form: false,
    }));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setDisplayComponent]);

  const handleSetLocations = useCallback(
    (arrayLocation = []) => {
      setFormData((prev) => ({
        ...prev,
        locations: {
          province: arrayLocation[0] || { en: "", kh: "" },
          district: arrayLocation[1] || { en: "", kh: "" },
          commune: arrayLocation[2] || { en: "", kh: "" },
        },
      }));

      if (errors?.locations) {
        setErrors((prev) => ({ ...prev, locations: false }));
      }
    },
    [setFormData, setErrors, errors]
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
  }, []);

  const handleClickAlert = useCallback((index) => {
    setAlertActionPhoto(true);
    setIndex(index);
  }, []);

  const callSubmit = () => {
    setToggleGetField(true);
  };

  const submit = async (val) => {
    const TYPE = process.env.NEXT_PUBLIC_TYPE;
    const phoneArr = phoneNumArr
      .map((item) => item.value)
      .filter((value) => value && !isNaN(value) && value.trim().length > 0);

    const combinedPhoneNum = [formData.phoneNum, ...phoneArr];

    const uniquePhoneNum = [...new Set(combinedPhoneNum)];

    setIsPending(true);

    const form = new FormData();
    const dynamicFields = Object.fromEntries(
      Object.entries(val).filter(([_, value]) => value)
    );

    if (photos.length > 0) {
      photos.forEach((photo) => {
        form.append("photos", photo.file);
      });
    }

    [
      "title",
      "name",
      "descriptions",
      "address",
      "mail",
      "subCategory",
      "mainCategory",
      "keySearchsubCategory",
      "keySearchmainCategory",
      "username",
    ].forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    uniquePhoneNum.forEach((phone) => {
      form.append("phoneNum", phone);
    });

    // Append locations
    Object.entries(formData.locations).forEach(([key, value]) => {
      if (value) {
        // Append both 'en' and 'kh' fields for each location
        form.append(`locations[${key}][en]`, value.en);
        form.append(`locations[${key}][kh]`, value.kh);
      }
    });
    // Append dynamicFields if available
    if (Object.keys(dynamicFields).length > 0) {
      Object.entries(dynamicFields).forEach(([key, value]) => {
        form.append(`dynamicFields[${key}]`, value);
      });
    }

    try {
      const res = await axios.post(
        `${domain}${account?.type == TYPE ? "/manager" : ""}/product/${
          account._id
        }`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        res.status === 200 &&
        res.data.message === "Product created successfully"
      ) {
        router.push("/success");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      address: profile?.address || "",
      locations: profile?.location || {
        province: { en: "", kh: "" },
        district: { en: "", kh: "" },
        commune: { en: "", kh: "" },
      },
      name: profile
        ? `${profile.firstName || ""} ${profile.lastName || ""}`.trim()
        : "",
      phoneNum: account?.phoneNum ? `0${account.phoneNum}` : "",
      mail: profile?.mail || "",
      username: profile?.username || "",
    }));
  }, [profile, account]);

  useEffect(() => {
    if (account === undefined) return;
    if (!account || !account._id) {
      router.replace("/login");
    }
  }, [account, router]);

  if (!account) return <div></div>;

  return (
    <div
      className={`lg:pt-4 max-w-[820px] mx-auto mb-14 lg:mb-28 ${
        locale == "en" ? "font-sans" : ""
      }`}
    >
      <AlertActionOfPhoto
        alertActionPhoto={alertActionPhoto}
        setPhotos={setPhotos}
        photos={photos}
        index={index}
        setAlertActionPhoto={setAlertActionPhoto}
      />
      <Locations
        locale={locale}
        setToggleLocation={setToggleLocation}
        isToggleLocation={isToggleLocation}
        myLocations={formData?.locations}
        handleSetLocations={handleSetLocations}
        handleClearLocations={handleClearLocations}
      />

      <h2 className="text-[24px] font-semibold pb-[15px] hidden lg:block">
        {t("postAd")}
      </h2>

      <section className={`${displayComponent.mainCategory ? "" : "hidden"}`}>
        <MainCategoryList
          categories={categories}
          handleGetSubCategory={handleGetSubCategory}
          locale={locale}
        />
      </section>

      <section className={`${displayComponent.subCategory ? "" : "hidden"}`}>
        <SubCategoryList
          handleBackMainCategory={handleBackMainCategory}
          categories={subCategories}
          handleGetForm={handleGetForm}
          locale={locale}
        />
      </section>

      <section
        className={`space-y-[18px] ${displayComponent.form ? "" : "hidden"}`}
      >
        <Posts
          t={t}
          locale={locale}
          setFormData={setFormData}
          displayComponent={displayComponent}
          handleBackSubCategory={handleBackSubCategory}
          formData={formData}
          fields={fields}
          setPhotos={setPhotos}
          photos={photos}
          setErrors={setErrors}
          errors={errors}
          setToggleGetField={setToggleGetField}
          toggleGetField={toggleGetField}
          setToggleLocation={setToggleLocation}
          handleClickAlert={handleClickAlert}
          submit={submit}
          setPhoneNumArr={setPhoneNumArr}
          phoneNumArr={phoneNumArr}
        />

        <div className="px-4 md:px-5 lg:px-0">
          <button
            onClick={callSubmit}
            disabled={isPending}
            className="text-shadow cursor-pointer bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
          >
            {isPending ? (
              <>
                <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span className="ml-2">{t("submitingBtn")}...</span>
              </>
            ) : (
              <span>{t("submitBtn")}</span>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Page;
