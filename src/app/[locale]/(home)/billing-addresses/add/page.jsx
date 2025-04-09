"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";
const FormAddress = dynamic(() => import("@/components/FormAddress"), {
  ssr: false,
});
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

function Page() {
  const router = useRouter();
  const t = useTranslations("formBillingAddress");
  const locale = useLocale();
  const { token, domain, account } = useAppContext();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNumRef = useRef(null);

  const [SaveAs, setSaveAs] = useState("");
  const [phoneNumArr, setPhoneNumArr] = useState([
    { display: false, value: "" },
    { display: false, value: "" },
  ]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNum: "",
    address: "",
    locations: {
      province: { en: "", kh: "" },
      district: { en: "", kh: "" },
      commune: { en: "", kh: "" },
    },
    mail: "",
    company: "",
    saveAs: "",
    taxID: "",
    setAsDefault: false,
  });

  const submit = async () => {
    const phoneArr = phoneNumArr
      .map((item) => item.value)
      .filter((value) => value && !isNaN(value))
      .map((value) => value.toString());

    let phoneNum = [formData.phoneNum, ...phoneArr];

    const updatedFormData = { ...formData, phoneNum };

    const TYPE = process.env.NEXT_PUBLIC_TYPE;

    try {
      setIsPending(true);
      const res = await axios.post(
        `${domain}${account?.type == TYPE ? "/manager" : ""}/address/account/${
          account?._id
        }`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        router.back();
      }
    } catch (error) {
      console.log(error);
      setIsPending(false);
    }
  };

  const handleCallSubmit = () => {
    if (!account) {
      router.push("/login");
    }
    const fields = ["name", "address", "phoneNum", "saveAs"];

    const newErrors = fields.reduce((acc, field) => {
      const value = field.includes(".")
        ? field.split(".").reduce((obj, key) => obj && obj[key], formData)
        : formData[field];

      if (typeof value === "string" && value.trim() === "") acc[field] = true;
      return acc;
    }, {});

    if (formData.locations && formData.locations.province.en.trim() === "") {
      newErrors["locations"] = true;
    }

    if (!/^\d+$/.test(formData.phoneNum)) {
      newErrors["phoneNum"] = true;
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);

      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.phoneNum) {
        phoneNumRef.current?.focus();
      } else if (newErrors.address) {
        addressRef.current?.focus();
      }

      return;
    }

    submit();
  };

  return (
    <div className="mx-auto max-w-[820px] lg:mb-14">
      <div className="lg:hidden z-[9] sticky top-0">
        <SmNavNormal name={t("addTitle")} />
      </div>

      <div>
        <FormAddress
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleCallSubmit}
          nameRef={nameRef}
          addressRef={addressRef}
          phoneNumRef={phoneNumRef}
          isPending={isPending}
          errors={errors}
          setErrors={setErrors}
          title={t("addTitle")}
          phoneNumArr={phoneNumArr}
          setPhoneNumArr={setPhoneNumArr}
          setSaveAs={setSaveAs}
          SaveAs={SaveAs}
          t={t}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default Page;
