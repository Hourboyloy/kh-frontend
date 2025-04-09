"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { MdArrowDropDown } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";

import { useAppContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { useLocale } from "next-intl";

const Locations = dynamic(() => import("@/components/Locations"), {
  ssr: false,
});
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});
const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);
const DatePickerDob = dynamic(() => import("@/components/DatePickerDob"), {
  ssr: false,
});

function Page() {
  const locale = useLocale();
  const t = useTranslations("editProfilePage");
  const router = useRouter();
  const { profile, token, domain, setProfile, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [isToggleLocation, setToggleLocation] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const [phoneNumArr, setPhoneNumArr] = useState([
    {
      display: profile?.phoneNum?.[1] ? true : false,
      value: profile?.phoneNum?.[1] || "",
    },
    {
      display: profile?.phoneNum?.[2] ? true : false,
      value: profile?.phoneNum?.[2] || "",
    },
  ]);

  const [myProfile, setMyProfile] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    gender: profile?.gender || "",
    company: profile?.company || "",
    mail: profile?.mail || "",
    phoneNum: profile?.phoneNum?.[0] || "",
    address: profile?.address || "",
    dob: profile?.dob || "",
    location: profile?.location || {
      province: { en: "", kh: "" },
      district: { en: "", kh: "" },
      commune: { en: "", kh: "" },
    },
  });

  const handlePhoneNum = useCallback((e) => {
    const phoneNum = e.target.value;
    const phoneRegex = /^[0-9]{9,10}$/;
    setMyProfile((prev) => ({ ...prev, phoneNum }));
    setError(!phoneRegex.test(phoneNum));
  }, []);

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

  const handleSubmit = useCallback(async () => {
    if (error) return;

    // Step 1: Combine phone numbers from myProfile and phoneNumArr
    const phoneArr = phoneNumArr
      .map((item) => item.value)
      .filter((value) => value && !isNaN(value) && value.trim().length > 0); // Ensure valid numbers and not empty

    // Combine phone numbers and remove duplicates
    const combinedPhoneNum = [
      ...new Set([myProfile.phoneNum, ...phoneArr].filter(Boolean)),
    ];

    // Step 2: Compare combined phone numbers with profile phone numbers
    const sortedCombinedPhoneNum = [...combinedPhoneNum].sort();
    const sortedOldPhoneNum = [...(profile.phoneNum || [])].sort();

    const isPhoneNumChanged =
      JSON.stringify(sortedCombinedPhoneNum) !==
      JSON.stringify(sortedOldPhoneNum);

    // Step 3: Create editProfile by comparing other fields and skip phoneNum
    const editProfile = Object.keys(myProfile).reduce((acc, key) => {
      if (key === "phoneNum") return acc; // Skip phoneNum in the comparison

      if (myProfile[key] !== profile[key] && myProfile[key] !== "") {
        acc[key] = myProfile[key];
      }
      return acc;
    }, {});

    // Step 4: If phone number changed, add phoneNum to editProfile
    if (isPhoneNumChanged) {
      editProfile.phoneNum = combinedPhoneNum; // Add updated phone numbers to editProfile
    }

    // Step 5: If no changes detected, return early
    if (Object.keys(editProfile)?.length === 0) {
      console.log("No profile changes detected, skipping update.");
      return;
    }

    try {
      setIsPending(true);

      const res = await axios.put(
        `${domain}${
          account?.type === TYPE ? "/manager" : "/user"
        }/edit/profile/${profile?.accID}`,
        editProfile, // Send profile changes including phoneNum if needed
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        setProfile(res.data.profile);
        setMyProfile(res.data.profile);
        localStorage.setItem("profile", JSON.stringify(res.data.profile));
        setAlertSuccess(true);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsPending(false);
    }
  }, [
    error,
    myProfile,
    profile,
    phoneNumArr,
    domain,
    token,
    account,
    setProfile,
    TYPE,
  ]);

  const handleIsAlert = () => {
    setAlertSuccess(!alertSuccess);
  };

  const handleSetLocations = useCallback((arrayLocation) => {
    setMyProfile((prev) => ({
      ...prev,
      location: {
        province: arrayLocation[0],
        district: arrayLocation[1],
        commune: arrayLocation[2],
      },
    }));
  }, []);

  const handleClearLocations = useCallback(() => {
    setMyProfile((prev) => ({
      ...prev,
      location: {
        province: { en: "", kh: "" },
        district: { en: "", kh: "" },
        commune: { en: "", kh: "" },
      },
    }));
  }, []);

  useEffect(() => {
    const accountLocal = localStorage.getItem("account");
    if (!accountLocal) {
      router.push("/login");
    }
  }, [router]);

  // const appColor = "#" + process.env.NEXT_APP_COLOR;

  return (
    <div
      // style={{ backgroundColor: appColor }}
      className={`lg:pt-5 bg-white lg:bg-transparent min-h-screen  ${
        locale == "en" ? "font-sans" : ""
      }`}
    >
      <div className="pb-4 lg:hidden z-[9] sticky top-0">
        <SmNavNormal name={t("title")} />
      </div>
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
          myLocations={myProfile?.location}
          handleSetLocations={handleSetLocations}
          handleClearLocations={handleClearLocations}
          locale={locale}
        />
        {isPending && <Loading isPending={isPending} />}
      </div>

      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[17px] space-y-[17.5px]">
        <div className="space-y-3">
          <h1 className="text-gray-800 font-semibold text-[22px]">
            {t("title")}
          </h1>
          <hr />
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]"> {t("firstName")}</label>
          <input
            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
            value={myProfile?.firstName || ""}
            name="firstName"
            type="text"
            alt="firstName"
            onChange={(e) =>
              setMyProfile((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]"> {t("lastName")}</label>
          <input
            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
            value={myProfile?.lastName || ""}
            name="lastName"
            type="text"
            onChange={(e) =>
              setMyProfile((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]"> {t("gender")}</label>
          <div className="flex items-center space-x-4">
            <label
              className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none font-sans ${
                myProfile?.gender === "Male"
                  ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                  : "border-gray-300 text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={myProfile?.gender === "Male"}
                onChange={(e) =>
                  setMyProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="hidden"
              />
              Male
            </label>

            <label
              className={`w-full text-center  py-[6.2px] border rounded-md cursor-pointer select-none ${
                myProfile?.gender === "Female"
                  ? "bg-[#E0F1F9] border-blue-300 text-blue-400"
                  : "border-gray-300 text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={myProfile?.gender === "Female"}
                onChange={(e) =>
                  setMyProfile((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="hidden"
              />
              Female
            </label>
          </div>
        </div>

        <div className=" space-y-[4px]">
          {/* dob */}
          <label className="text-[15px]">{t("dateOfBirth")}</label>
          <DatePickerDob setMyProfile={setMyProfile} myProfile={myProfile} />
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">{t("company")}</label>
          <input
            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
            value={myProfile?.company || ""}
            name="company"
            type="text"
            onChange={(e) =>
              setMyProfile((prev) => ({ ...prev, company: e.target.value }))
            }
          />
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">{t("email")}</label>
          <input
            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
            value={myProfile?.mail || ""}
            name="mail"
            type="text"
            onChange={(e) =>
              setMyProfile((prev) => ({ ...prev, mail: e.target.value }))
            }
          />
        </div>

        {/* pn */}
        <div className="space-y-[4px]">
          <label className="text-[15px]">{t("phoneNum")}</label>

          <div className="flex items-center space-x-5 font-sans">
            <input
              className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4
              ${
                error
                  ? "border-red-500 focus:ring-red-200"
                  : "focus:ring-[#C9DFFF] focus:border-font-sans"
              }`}
              name="phoneNum"
              type="text"
              placeholder={`${t("phoneNum") + " 1"}`}
              value={myProfile?.phoneNum || ""}
              onChange={handlePhoneNum}
            />
            {phoneNumArr.every((item) => item.display !== true) && (
              <FaPlusCircle
                onClick={() => handleToggleDisplayPhoneNum(0)}
                className="text-[#0D6EFD] cursor-pointer"
                size={24}
              />
            )}
          </div>

          {error && myProfile.phoneNum ? (
            <p className="text-red-600 text-[12px] tracking-wide font-sans">
              The Phone number is invalid.
            </p>
          ) : error && !myProfile.phoneNum ? (
            <p className="text-red-600 text-[12px] tracking-wide font-sans">
              Please enter the &apos;Phone Number&apos;.
            </p>
          ) : (
            ""
          )}

          {phoneNumArr.some((item) => item.display) && (
            <ul className="space-y-[18px] pt-[18px] font-sans">
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

        <div className={`space-y-[4px]`}>
          <label className="text-[15px]">{t("locations")}</label>
          <div
            onClick={() => setToggleLocation(true)}
            className="h-[38px] flex items-center justify-between border border-gray-300 rounded-md px-3 cursor-pointer select-none"
          >
            <div
              className={`${
                myProfile?.location?.province.en !== ""
                  ? "text-gray-800"
                  : "text-gray-500"
              } text-nowrap`}
            >
              {myProfile?.location?.province?.en
                ? `${
                    locale === "en"
                      ? `${myProfile.location.province.en}, ${myProfile.location.district.en}, ${myProfile.location.commune.en}`
                      : `${myProfile.location.province.kh}, ${myProfile.location.district.kh}, ${myProfile.location.commune.kh}`
                  }`
                : t("chooseLocation")}
            </div>
            <label className="text-2xl text-gray-900">
              <MdArrowDropDown />
            </label>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">{t("address")}</label>
          <input
            className={`w-full border border-gray-300 focus:outline-none rounded-md py-[6.2px] px-3  focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 font-sans`}
            name="address"
            type="text"
            value={myProfile?.address || ""}
            onChange={(e) =>
              setMyProfile((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>

        <p className="lg:pl-8 md:pl-4">{t("updateThisContactToYourAds")}</p>

        <div>
          <button
            onClick={handleSubmit}
            className="text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center tracking-wide"
          >
            {t("submitBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
