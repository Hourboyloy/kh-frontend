"use client";
import React, { useState, useEffect, useCallback, use } from "react";
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

function Page({ params }) {
  const { id } = use(params);
  const t = useTranslations("staticInformProduct");
  const locale = useLocale();
  const { domain, token, account, categories } = useAppContext();
  const router = useRouter();

  const [dynamicFields, setDynamicFieldsData] = useState();
  const [userID, setID] = useState();

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
    mainCategory: false,
    subCategory: false,
    form: true,
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
    setDisplayComponent({
      mainCategory: true,
      subCategory: false,
      form: false,
    });
    window.scroll(0, 0);
  }, []);

  const handleBackSubCategory = useCallback(() => {
    setDisplayComponent({
      mainCategory: false,
      subCategory: true,
      form: false,
    });
    window.scroll(0, 0);
  }, []);

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
      if (errors.locations) {
        setErrors((prev) => ({ ...prev, locations: false }));
      }
    },
    [errors.locations]
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
    if (!account) return;
    const TYPE = process.env.NEXT_PUBLIC_TYPE;

    setIsPending(true);

    const form = new FormData();
    const dynamicFields = Object.fromEntries(
      Object.entries(val).filter(([key, value]) => value)
    );

    const photoUrls = photos.map((p) => (typeof p === "string" ? p : null));
    const newPhotos = photos.filter((p) => typeof p === "object");
    if (photoUrls.length > 0) {
      Array.from(photoUrls).forEach((photo) => {
        form.append("photoUrls", photo);
      });
    }

    if (newPhotos.length > 0) {
      Array.from(newPhotos).forEach((photo) => {
        form.append("newPhotos", photo.file);
      });
    }

    form.append("title", formData.title);
    form.append("name", formData.name);
    form.append("descriptions", formData.descriptions);
    form.append("address", formData.address);
    form.append("mail", formData.mail || "");
    form.append("username", account?.username || formData.username);
    form.append("subCategory", formData.subCategory);
    form.append("mainCategory", formData.mainCategory);
    form.append("keySearchsubCategory", formData.keySearchsubCategory);
    form.append("keySearchmainCategory", formData.keySearchmainCategory);

    const phoneArr = [
      formData.phoneNum,
      ...phoneNumArr.map((item) => item.value),
    ].filter((value) => value && !isNaN(value) && value.trim().length > 0);
    phoneArr.forEach((phone) => {
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

    const plainDynamicFields = JSON.parse(JSON.stringify(dynamicFields));
    if (Object.keys(plainDynamicFields).length > 0) {
      Object.entries(plainDynamicFields).forEach(([key, value]) => {
        form.append(`dynamicFields[${key}]`, value);
      });
    }

    try {
      const res = await axios.put(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/product-edit/account/${account?._id}/product/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        if (res.data.message === "Product updated successfully") {
          router.push(`/success`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPending(false);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${domain}/product-edit/${id}`);

      if (res.status === 200) {
        if (account && account?._id !== res.data.product?.accID) {
          router.replace("/login");
        }

        setID(res.data.product?.accID || null);
        const productData = res.data.product || null;
        setDynamicFieldsData(res.data?.product?.dynamicFields);

        const mainCategory = categories.find(
          (e) => e.name === res.data?.product?.mainCategory
        );

        const subCategory = mainCategory?.subcategories?.find(
          (e) => e.name === res.data?.product?.subCategory
        );

        setSubCategories(mainCategory?.subcategories);
        setFields(subCategory?.fields || []);

        setFormData({
          title: productData?.title ?? "",
          descriptions: productData?.descriptions ?? "",
          address: productData?.address ?? "",
          locations:
            productData?.locations && typeof productData.locations === "object"
              ? productData.locations
              : {
                  province: { en: "", kh: "" },
                  district: { en: "", kh: "" },
                  commune: { en: "", kh: "" },
                },
          mainCategory: productData?.mainCategory ?? "",
          subCategory: productData?.subCategory ?? "",
          name: productData?.name ?? "",
          phoneNum: productData?.phoneNum[0] ?? "",
          mail: productData?.mail ?? "",
          username: productData?.username ?? "",
        });

        setPhoneNumArr([
          {
            display: productData?.phoneNum[1] ? true : false,
            value: productData?.phoneNum[1] || "",
          },
          {
            display: productData?.phoneNum[2] ? true : false,
            value: productData?.phoneNum[2] || "",
          },
        ]);

        if (productData?.photos) {
          setPhotos(productData.photos);
        }
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [domain, categories, id, account, router]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData().catch(console.error);
    return () => {
      controller.abort();
    };
  }, [fetchData]);

  useEffect(() => {
    if (account === undefined || !userID) return;
    if (!account || account?._id !== userID) {
      router.replace("/login");
    }
  }, [account, router, userID]);

  if (!account?._id || account?._id !== userID) {
    return <div>Loading...</div>;
  }
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
          locale={locale}
          t={t}
          dynamicFields={dynamicFields}
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
          phoneNumArr={phoneNumArr}
          setPhoneNumArr={setPhoneNumArr}
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
                <span className="ml-2">Submiting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}

export default Page;
