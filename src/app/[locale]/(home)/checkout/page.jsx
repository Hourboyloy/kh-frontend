"use client";
import React, { useEffect, useState, useCallback } from "react";
import { IoMdMore } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { FaRegIdCard } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi2";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAppContext } from "@/context/GlobalContext";

const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

const OptionChangePlan = dynamic(
  () => import("@/components/buttons/OptionChangePlan"),
  {
    ssr: false,
  }
);

const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function Page() {
  const {
    token,
    subScription,
    setSubscription,
    setBillingAddress,
    billingAddress,
    domain,
    account,
  } = useAppContext();

  const [discount, setDiscount] = useState(0);
  const [VATPerSevenDay, setVATPerSevenDay] = useState(1);
  const [VATPerMonth, setVATPerMonth] = useState(3);

  const [isPending, setIsPending] = useState(false);
  const [toggleChangePlanLg, setToggleChangePlanLg] = useState(false);
  const [toggleChangePlan, setToggleChangePlan] = useState(false);

  const handleToggleChangePlanLg = () => {
    setToggleChangePlanLg(!toggleChangePlanLg);
  };

  const handleToggleChangePlan = () => {
    setToggleChangePlan(!toggleChangePlan);
  };

  const fetchAddress = useCallback(async () => {
    if (!account || billingAddress) return;
    try {
      const res = await axios.get(`${domain}/default-address/${account?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setBillingAddress(res.data.address);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setBillingAddress, account, token, domain]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const subScriptionStorage = JSON.parse(
        localStorage.getItem("subScription") || "{}"
      );
      if (Object.keys(subScriptionStorage).length) {
        setSubscription(subScriptionStorage);
      }
    }
  }, [setSubscription]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return (
    <div className="font-sans">
      {isPending && <Loading />}
      <div className="lg:hidden sticky top-0 z-[9]">
        <SmNavNormal name={"Review Subscription"} />
      </div>

      <div className="lg:hidden">
        <OptionChangePlan
          toggleChangePlan={toggleChangePlan}
          handleToggleChangePlan={handleToggleChangePlan}
          subScription={subScription}
        />
      </div>

      <div className="mx-auto max-w-[820px] lg:pt-5 space-y-3 mb-[125px] lg:mb-10">
        <section className="bg-white space-y-[11px] lg:rounded pl-4 lg:px-4 py-5">
          <h1 className=" font-semibold">Subscription</h1>
          <div className="flex justify-between">
            <div className="flex lg:space-x-4 space-x-3">
              <div className="w-[70px] h-[70px]">
                {subScription?.product?.photos.length > 0 && (
                  <Image
                    className="w-[70px] h-[70px] object-cover object-center rounded"
                    src={subScription?.product?.photos[0] || ""}
                    width={500}
                    height={600}
                    alt=""
                  />
                )}
              </div>
              <div className="lg:space-y-0.5">
                <p className="font-semibold text-wrap">
                  {subScription?.product?.title.length > 50
                    ? `${subScription.product.title.slice(0, 50)}...`
                    : subScription?.product?.title}
                </p>
                <p className="lg:text-[14px] text-[13px]">
                  Ad ID {subScription?.product?._id}{" "}
                </p>
                <p className="lg:text-[14px] text-[13px]">
                  General: Top Ads - {subScription?.subscribePer}
                </p>
                <p className="lg:text-[14px] text-[13px]">
                  Valid Until 01, Apr 2025
                </p>
                <p className="lg:text-[14px] text-[13px] text-[#028DCF] font-semibold">
                  ${subScription?.term}
                </p>
              </div>
            </div>

            <div className="h-full relative">
              <button
                onClick={handleToggleChangePlanLg}
                className="w-[50px] h-[50px] rounded-full hidden lg:flex items-center justify-center active:bg-gray-50"
              >
                <IoMdMore size={28} className="text-gray-300" />
              </button>

              <button
                onClick={handleToggleChangePlan}
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center active:bg-gray-50 lg:hidden -translate-y-4"
              >
                <IoMdMore size={28} className="text-gray-300" />
              </button>

              {toggleChangePlanLg && (
                <div className="hidden lg:flex flex-col items-end w-fit absolute z-[1] top-14 right-0 overflow-hidden">
                  <div className="border border-gray-300 rounded-md hidden lg:block overflow-hidden">
                    <Link
                      href={`/premium-ad/general?id=${subScription?.product?._id}`}
                      className="w-[170px] h-[52.6px] lg:flex items-center  py-3 px-4 select-none focus:outline-none hover:bg-gray-50"
                    >
                      Change
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white space-y-[11px] lg:rounded pl-4 lg:px-4 py-5">
          <h1 className=" font-semibold">
            Billing Address: {billingAddress && billingAddress?.saveAs}
          </h1>
          {billingAddress && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 -translate-x-0.5">
                <HiUserCircle className="text-gray-500" size={17} />
                <span className="text-sm">{billingAddress?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-500" size={15} />

                <div className="flex items-center text-sm">
                  {billingAddress?.phoneNum?.map((number, i) => (
                    <p key={number + i}>
                      {i !== 0 && <span>, </span>} {number}
                    </p>
                  ))}
                </div>
              </div>

              {billingAddress?.mail && (
                <div className="flex items-center space-x-2">
                  <IoMdMail className="text-gray-500" size={15} />
                  <span className="text-sm">{billingAddress.mail}</span>
                </div>
              )}

              {billingAddress?.company && (
                <div className="flex items-center space-x-2">
                  <BsBuildingsFill className="text-gray-500" size={15} />
                  <span className="text-sm">{billingAddress.company}</span>
                </div>
              )}

              {billingAddress?.taxID && (
                <div className="flex items-center space-x-2">
                  <FaRegIdCard className="text-gray-500" size={15} />
                  <span className="text-sm">{billingAddress.taxID}</span>
                </div>
              )}

              <div className="flex space-x-2">
                <FaLocationDot className="text-gray-500" size={15} />
                <div className="space-y-2">
                  <p className="text-sm">
                    {billingAddress?.locations.commune +
                      ", " +
                      billingAddress?.locations.district +
                      ", " +
                      billingAddress?.locations.province}
                  </p>
                  <p className="text-sm text-gray-600">
                    {billingAddress?.address}
                  </p>
                </div>
              </div>
            </div>
          )}

          {billingAddress ? (
            <Link
              href={`/billing-addresses?change_address=true`}
              className="w-full h-[44px] bg-[#EDF7FF] text-[#036C9E] flex items-center justify-center space-x-2"
            >
              <span>Change Address</span>
              <MdOutlineArrowForwardIos className=" translate-y-0.5" />
            </Link>
          ) : (
            <Link
              href={`/billing-addresses/add`}
              className="w-full h-[44px] bg-[#EDF7FF] text-[#036C9E] flex items-center justify-center space-x-2"
            >
              <span>Add Address</span>
              <MdOutlineArrowForwardIos className=" translate-y-0.5" />
            </Link>
          )}
        </section>

        <section className="bg-white space-y-[11px] lg:rounded px-4 py-5">
          <h1 className=" font-semibold">Payment Methods</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <Image
                  className="w-[74px] h-[44px] object-contain"
                  src={require(`@/assets/aba-khqr.webp`)}
                  width={500}
                  height={600}
                  alt=""
                />
              </div>
              <div className="">
                <h1 className="font-semibold">KHQR</h1>
                <p className="text-[14.5px] text-gray-600">
                  Scan to pay with any banking app
                </p>
              </div>
            </div>
            <div>
              <button className="bg-[#03A9F4] text-[#0075FF] hover:text-[#005cc8] w-[18px] h-[18px] rounded-full flex items-center justify-center outline-none focus:outline-none">
                <FaCheck size={10} />
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white space-y-[11px] lg:rounded px-4 py-4">
          <h1 className=" font-semibold">Summary</h1>
          <div className="space-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[14.5px]">Subtotal</span>
              <span>${subScription?.term || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14.5px]">Discount</span>
              <span>${discount || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14.5px]">VAT</span>
              <span>
                $
                {subScription?.subscribePer === "7 Days"
                  ? VATPerSevenDay
                  : VATPerMonth || 0}
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white space-y-[12px] lg:rounded px-4 py-4 w-full fixed lg:static bottom-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-[5px]">
              <h1 className=" font-semibold">Total</h1>
              <p className="text-[13px]">(incl. VAT)</p>
            </div>
            <h1 className="font-semibold">
              $
              {subScription?.subscribePer === "7 Days"
                ? VATPerSevenDay - discount + subScription?.term || 0
                : VATPerMonth - discount + subScription?.term || 0}
            </h1>
          </div>
          <Link
            href={`/payment`}
            className="text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[44.5px] flex items-center justify-center tracking-wide"
          >
            Check Out
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Page;
