"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { mainCategories } from "@/utils/mainCategories";
import { useAppContext } from "@/context/GlobalContext";
import { RxDashboard } from "react-icons/rx";
import { MdFormatListBulleted } from "react-icons/md";

const CardCategories = dynamic(() => import("@/components/CardCategories"), {
  ssr: false,
});

const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});
const CardSlider = dynamic(() => import("@/components/CardSlider"), {
  ssr: false,
});
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });
const SmHeader = dynamic(() => import("@/components/SmHeader"), { ssr: false });
const BrowsebyLocation = dynamic(
  () => import("@/components/BrowsebyLocation"),
  { ssr: false }
);
const Loading = dynamic(() => import("@/components/Loading"), { ssr: false });

function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const { domain, token, account, changePage, ads } = useAppContext();
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [toggleDisplayCards, setToggleDisplayCards] = useState(true);

  // Fetch data function to be used in useEffect
  const FetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${domain}/get-product-home`);
      if (res.status === 200) {
        setProducts(res.data.latestAds);
        setTopProducts(res.data.topProducts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [domain]);

  useEffect(() => {
    changePage();
  }, []);

  useEffect(() => {
    FetchData();
  }, [FetchData]);

  return (
    <div
      className={`lg:mb-14 mb-[50px] ${
        locale == "en" ? "font-sans" : "font-battambang"
      }`}
    >
      <div className="top-0 sticky z-[9] lg:hidden w-full">
        <SmHeader name={"Khmer24"} currentAt="home" locale={locale} />
      </div>

      {isPending && <Loading />}

      <div className="max-w-[1140px] mx-auto lg:px-[18px] min-h-screen lg:mb-0 md:mb-[94px]">
        {ads.length > 0 && (
          <div className="flex items-center justify-center lg:pt-5">
            <Image
              className="w-full lg:w-auto lg:h-[250px] object-cover object-center"
              src={ads[0].image || ""}
              alt="Advertisement"
              width={600}
              height={800}
            />
          </div>
        )}

        <div className="pt-6 hidden md:block">
          <h1 className=" font-semibold text-xl text-gray-800 font-battambang">
            {t("title")}
          </h1>
        </div>

        <CardCategories mainCategories={mainCategories} />

        {/* Top products */}
        {topProducts?.length > 0 && (
          <div className="pb-8 md:pt-0 pt-2">
            <h1 className="font-battambang bg-gradient-to-b from-[#94DDFF] via-[#94DDFF] to-[#94DDFF] text-xl font-bold text-gray-800 py-4 px-2.5 lg:rounded-t-md">
              {t("topAds")}
            </h1>

            <div className="bg-gradient-to-b from-[#94DDFF] via-[#C5EDFF] to-[#F9FDFF] overflow-x-scroll pb-3 px-2.5">
              <CardSlider
                products={topProducts}
                setProducts={setTopProducts}
                setIsPending={setIsPending}
                domain={domain}
                token={token}
                accType={account?.type}
                accID={account?._id}
              />
            </div>
          </div>
        )}

        {/* Latest products */}
        <div className="space-y-3 px-2.5 md:px-4 lg:px-0 pt-4 lg:pt-0">
          <div className="flex items-center justify-between">
            <h1 className=" font-battambang text-xl font-bold text-gray-800">
              {t("lastestAds")}
            </h1>
            <div className="bg-white rounded overflow-hidden lg:hidden">
              <button
                onClick={() => setToggleDisplayCards(false)}
                className={`py-1.5 px-2 transition-all ease-in-out ${
                  toggleDisplayCards
                    ? "bg-gray-50 text-gray-800"
                    : "text-[#028DCF]"
                }`}
              >
                <MdFormatListBulleted size={20} />
              </button>
              <button
                onClick={() => setToggleDisplayCards(true)}
                className={`py-1.5 px-2 transition-all ease-in-out ${
                  toggleDisplayCards
                    ? "text-[#028DCF]"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <RxDashboard size={20} />
              </button>
            </div>
          </div>

          <CardsProducts
            toggleDisplayCards={toggleDisplayCards}
            isHasStartSelling={true}
            products={products}
            setProducts={setProducts}
            setIsPending={setIsPending}
            domain={domain}
            token={token}
            accID={account?._id}
            accType={account?.type}
          />
        </div>

        <div className="max-w-[938.4px] mx-auto text-[17.5px] text-white mt-6 mb-7 md:mb-8 lg:mb-14 px-2.5 md:px-4 lg:px-0 font-battambang">
          {products?.length > 0 && (
            <Link
              href="/search"
              className="w-full h-[38px] outline-none focus:outline-none rounded select-none flex items-center justify-center bg-[#0096DE] hover:bg-[#0083c2] transition-all"
            >
              {t("viewAll")}
            </Link>
          )}
        </div>

        <BrowsebyLocation />
      </div>

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Home;
