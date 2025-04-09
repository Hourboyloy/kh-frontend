"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";

const ListAddress = dynamic(() => import("@/components/ListAddress"), {
  ssr: false,
});
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function Page() {
  const t = useTranslations("addressPage");
  const locale = useLocale();
  const router = useRouter();
  const { domain, account, token, setBillingAddress, billingAddress } =
    useAppContext();
  const searchParams = useSearchParams();
  const change_address = searchParams.get("change_address");

  const [addresses, setAddresses] = useState([]);
  const [addressID, setAddressID] = useState(null);
  const [isPendingFetch, setIsPendingFetch] = useState(false);

  const handleSetAddressID = (val) => {
    setAddressID(val);
  };

  const handleComfirmAddress = () => {
    const findAddress = addresses.find((item) => item?._id === addressID);
    if (!findAddress) return;
    setBillingAddress(findAddress);
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!account?._id) return;
      setIsPendingFetch(true);

      try {
        const res = await axios.get(`${domain}/addresses/${account._id}`);
        if (res.status === 200) {
          setIsPendingFetch(false);
          setAddresses(res.data.addresses);
        }
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };
    fetchData();
  }, [domain, account?._id]);

  useEffect(() => {
    if (change_address !== "true") return;
    if (billingAddress) {
      setAddressID(billingAddress?._id);
    } else if (addresses?.length > 0) {
      const defaultAddress = addresses.find(
        (item) => item.setAsDefault === true
      );
      setAddressID(defaultAddress ? defaultAddress._id : "");
    }
  }, [billingAddress, addresses, change_address]);

  return (
    <div>
      <div className="lg:hidden z-[9] sticky top-0">
        <SmNavNormal name={t("billingAddress")} />
      </div>

      {isPendingFetch && <Loading />}

      <div className="max-w-[786px] mx-auto pt-5 px-4 lg:px-0 mb-[75px]">
        <h1 className="text-gray-900 font-semibold text-[20px] mb-4 hidden lg:block">
          {t("billingAddress")}
        </h1>

        <ListAddress
          addresses={addresses}
          setAddresses={setAddresses}
          domain={domain}
          account={account}
          token={token}
          t={t}
          locale={locale}
          change_address={change_address}
          addressID={addressID}
          handleSetAddress={handleSetAddressID}
        />

        {change_address === "true" ? (
          addresses.length > 0 ? (
            <div className="w-full h-fit *:h-[44.5px] *:rounded-md rounded bg-white hidden lg:flex items-center space-x-3 mt-4 py-4 px-5 *:outline-none *:focus:outline-none text-[15.5px">
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-100 hover:bg-white"
              >
                {t("cancelBtn")}
              </button>
              <button
                onClick={handleComfirmAddress}
                className="w-full bg-[#0096DE] hover:bg-[#0083c2] text-white"
              >
                Apply
                {t("applyBtn")}
              </button>

              {addresses.length <= 2 && (
                <div>
                  <Link
                    href={"/billing-addresses/add"}
                    className="w-[44.5px] h-[44.5px] text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center rounded-md select-none focus:outline-none flex items-center justify-center space-x-1 tracking-wide"
                  >
                    <BsFillPlusCircleFill size={18} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="pt-4 hidden lg:block">
              <Link
                href={"/billing-addresses/add"}
                className=" text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center space-x-1 tracking-wide"
              >
                <BsFillPlusCircleFill size={18} />
                <span className="-translate-y-[1px]">{t("addBtn")}</span>
              </Link>
            </div>
          )
        ) : (
          addresses.length <= 2 && (
            <div className="pt-4 hidden lg:block">
              <Link
                href={"/billing-addresses/add"}
                className=" text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center space-x-1 tracking-wide"
              >
                <BsFillPlusCircleFill size={18} />
                <span className="-translate-y-[1px]">{t("addBtn")}</span>
              </Link>
            </div>
          )
        )}

        {change_address == "true" ? (
          addresses.length > 0 ? (
            <div className="fixed w-full left-0 z-10 bottom-0 h-fit *:h-[44.5px] *:rounded-md bg-white flex items-center space-x-2 py-2.5 px-3 *:outline-none *:focus:outline-none text-[15.5px] lg:hidden border-t">
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-100 hover:bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleComfirmAddress}
                className="w-full bg-[#0096DE] hover:bg-[#0083c2] text-white"
              >
                Apply
              </button>

              {addresses.length <= 2 && (
                <div>
                  <Link
                    href={"/billing-addresses/add"}
                    className="w-[44.5px] h-[44.5px] text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center rounded-md select-none focus:outline-none flex items-center justify-center space-x-1 tracking-wide"
                  >
                    <BsFillPlusCircleFill size={18} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-2.5 border-t bg-white fixed w-full left-0 z-10 bottom-0 lg:hidden">
              <Link
                href={"/billing-addresses/add"}
                className=" text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center space-x-1 tracking-wide"
              >
                <BsFillPlusCircleFill size={18} />
                <span className="-translate-y-[1px]">{t("addBtn")}</span>
              </Link>
            </div>
          )
        ) : (
          addresses.length <= 2 && (
            <div className="p-2.5 border-t bg-white fixed w-full left-0 z-10 bottom-0 lg:hidden">
              <Link
                href={"/billing-addresses/add"}
                className=" text-shadow font-sans bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[38px] flex items-center justify-center space-x-1 tracking-wide"
              >
                <BsFillPlusCircleFill size={18} />
                <span className="-translate-y-[1px]">{t("addBtn")}</span>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Page;
