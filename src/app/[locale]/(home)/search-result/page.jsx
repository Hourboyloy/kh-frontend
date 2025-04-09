"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";

const ListUserSearching = dynamic(
  () => import("@/components/ListUserSearching"),
  { ssr: false }
);

const ListProductSearching = dynamic(
  () => import("@/components/ListProductSearching"),
  { ssr: false }
);

const SkeletonListUserSearching = dynamic(
  () => import("@/components/skeletons/SkeletonListUserSearching"),
  { ssr: false }
);

const SkeletonListProductsSearching = dynamic(
  () => import("@/components/skeletons/SkeletonListProductsSearching"),
  { ssr: false }
);
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });
const SmHeader = dynamic(() => import("@/components/SmHeader"), { ssr: false });

function Page() {
  const t = useTranslations("searchResultPage");
  const locale = useLocale();
  const { domain } = useAppContext();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const fetchData = useCallback(async () => {
    if (!keyword) return;
    setIsPending(true);
    try {
      const res = await axios.get(`${domain}/search-result?keyword=${keyword}`);
      if (res.status === 200) {
        setUsers(res.data.users);
        setProducts(res.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsPending(false);
      }, 1000);
    }
  }, [keyword, domain, setIsPending, setUsers, setProducts]);

  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [keyword, fetchData]);

  return (
    <div>
      <div className="top-0 sticky z-[9] lg:hidden w-full">
        <SmHeader
          name={t("search")}
          currentAt="search"
          searchKeyword={keyword}
        />
        <div
          className={` *:w-full *:rounded *:h-[33px] *:flex *:justify-center *:items-center lg:*:pt-[3px] font-medium text-[15px] border-b border-gray-200 bg-white flex items-center space-x-[14px] py-2 px-2.5 mb-3.5
            ${locale == "en" ? "font-sans" : "font-battambang"}`}
        >
          <Link
            href={`/search-result/users?keyword=${keyword}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("users")}
          </Link>

          <Link
            href={`/search-result/companies?keyword=${keyword}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("company")}
          </Link>

          <Link
            href={`/search?keyword=${keyword}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("posts")}
          </Link>
        </div>
      </div>

      <div className="mb-20 lg:mb-28">
        <div
          className={`max-w-[820px] mx-auto *:w-full *:rounded *:h-[33px] *:flex *:justify-center *:items-center *:pt-[3px] font-medium text-[15px] top-[60px] left-0 z-[5] sticky border border-gray-200 bg-white hidden lg:flex items-center space-x-[14px] py-2 px-2.5 rounded ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          <Link
            href={`/search-result/users?keyword=${keyword.replace(
              /\s+/g,
              "+"
            )}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("users")}
          </Link>

          <Link
            href={`/search-result/companies?keyword=${keyword.replace(
              /\s+/g,
              "+"
            )}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("company")}
          </Link>

          <Link
            href={`/search?keyword=${keyword.replace(/\s+/g, "+")}`}
            className="focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300"
          >
            {t("posts")}
          </Link>
        </div>

        <div className="max-w-[820px] mx-auto px-3 md:px-4 lg:px-0">
          {isPending ? (
            <div className="mb-7">
              <SkeletonListUserSearching />
            </div>
          ) : users.length > 0 ? (
            <ListUserSearching
              users={users}
              keyword={keyword}
              t={t}
              locale={locale}
            />
          ) : (
            ""
          )}

          {isPending ? (
            <div className="">
              <SkeletonListProductsSearching />
            </div>
          ) : products.length > 0 ? (
            <div>
              <ListProductSearching
                products={products}
                keyword={keyword}
                t={t}
                locale={locale}
              />
            </div>
          ) : (
            ""
          )}

          {!isPending && products.length <= 0 && users.length <= 0 && (
            <section
              className={`mt-[24px] lg:bg-white p-4 h-[267px] md:h-[467px] font-sans`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-[8.5px] pb-[25px]">
                <div className="w-[110px] h-[110px] mt-2">
                  <Image
                    className="w-full h-full object-cover object-center"
                    src={require(`@/assets/empty-box.png`)}
                    width={500}
                    height={500}
                    priority
                    alt=""
                  />
                </div>
                <p className=" font-sans text-[17px] text-[#9A9A9A] text-center">
                  {`Your search "${keyword || ""}" did not match any listings`}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Page;
