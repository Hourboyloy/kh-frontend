"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function Page() {
  const t = useTranslations("formBillingAddress");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const { token, domain, account } = useAppContext();
  const [isPending, setIsPending] = useState(false);
  const [isPendingFetch, setIsPendingFetch] = useState(false);
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const phoneNumRef = useRef(null);

  const [SaveAs, setSaveAs] = useState("");
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
    name: "",
    phoneNum: "",
    address: "",
    locations: { province: "", district: "", commune: "" },
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
      const res = await axios.put(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/address/${id}/account/${account?._id}`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res);
        setIsPending(false);
        router.push("/billing-addresses");
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

  const fetchData = useCallback(
    async (id) => {
      try {
        setIsPendingFetch(true);
        const res = await axios.get(`${domain}/address/${id}`);
        if (res.status === 200) {
          setIsPendingFetch(false);
          const Address = res.data.address;
          setFormData({
            name: Address?.name || "",
            phoneNum: Address?.phoneNum[0] || "",
            address: Address?.address || "",
            locations: Address?.locations || {
              province: "",
              district: "",
              commune: "",
            },
            mail: Address?.mail || "",
            company: Address?.company || "",
            saveAs: Address?.saveAs || "",
            taxID: Address?.taxID || "",
            setAsDefault: Address?.setAsDefault || false,
          });

          setPhoneNumArr([
            {
              display: Address?.phoneNum[1] ? true : false,
              value: Address?.phoneNum[1] || "",
            },
            {
              display: Address?.phoneNum[2] ? true : false,
              value: Address?.phoneNum[2] || "",
            },
          ]);

          setSaveAs(
            ["Home", "Work"].includes(Address?.saveAs)
              ? Address?.saveAs
              : "Other"
          );
        }
      } catch (error) {
        console.log("Error fetching address:", error.response || error);
      }
    },
    [domain, setIsPendingFetch, setFormData, setPhoneNumArr, setSaveAs] // Dependencies
  );

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id, fetchData]);

  return (
    <div className="mx-auto max-w-[820px] lg:mb-14">
      <div className="lg:hidden z-[9] sticky top-0">
        <SmNavNormal name={t("editTitle")} />
      </div>

      {isPendingFetch && <Loading />}

      <div>
        <Suspense fallback={<div>Loading Address Form...</div>}>
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
            title={t("editTitle")}
            phoneNumArr={phoneNumArr}
            setPhoneNumArr={setPhoneNumArr}
            setSaveAs={setSaveAs}
            SaveAs={SaveAs}
            t={t}
            locale={locale}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
