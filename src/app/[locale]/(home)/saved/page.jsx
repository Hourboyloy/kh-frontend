"use client";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import { useAppContext } from "@/context/GlobalContext";
import { useTranslations } from "next-intl";

const LoadingItem = dynamic(() => import("@/components/LoadingItem"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

const ListSkeleton = dynamic(
  () => import("@/components/skeletons/ListSkeleton"),
  {
    ssr: false,
  }
);

const ListProduct = dynamic(() => import("@/components/ListProduct"), {
  ssr: false,
});

const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

function Page() {
  const t = useTranslations("savedPage");
  const { token, domain, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(
    async (accID) => {
      if (!hasMore || loadingMore) return;
      setLoadingMore(true);
      try {
        const res = await axios.get(
          `${domain}/api/saves/${accID}?page=${page}`
        );
        if (res.status === 200) {
          if (res.data.products.length > 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...res.data.products]);
            if (res.data.products.length <= 19) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingMore(false);
      }
    },
    [domain, page, hasMore, loadingMore]
  );

  const removeSaved = async (proid) => {
    if (!account) return;
    const isComfirm = confirm(
      "Are you sure that you want to remove save from this post ?"
    );
    if (!isComfirm) return;
    setIsPending(true);
    try {
      const res = await axios.delete(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/save/product/${proid}/account/${account?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        const filterProduct = products?.filter((e) => e.productID !== proid);
        setProducts(filterProduct);
        setTimeout(() => {
          alert("Removed save successfully!");
        }, 200);
      }
    } catch (error) {
      setIsPending(false);
      setTimeout(() => {
        alert("Failed to remove save, Try again later!");
      }, 100);
    }
  };

  useEffect(() => {
    if (account && products?.length === 0) {
      fetchProducts(account?._id);
    }
  }, [account, fetchProducts, products]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;
      if (
        scrollPosition >= bottomPosition - 520 &&
        !loadingMore &&
        hasMore &&
        account
      ) {
        fetchProducts(account?._id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore, account, fetchProducts]);

  return (
    <>
      <div className="lg:hidden sticky top-0 z-[9]">
        <SmNavNormal name={t("title")} />
      </div>
      <div className="max-w-[820px] mx-auto space-y-3.5 lg:pt-5 px-4 lg:px-0">
        {isPending && <Loading />}

        {products.length === 0 && hasMore ? (
          <ListSkeleton ArrNumber={[1, 2, 3, 4, 5]} />
        ) : products.length > 0 ? (
          <>
            <div className=" font-semibold text-xl text-gray-800 lg:block hidden font-battambang">
              {t("title")}
            </div>
            <ListProduct
              products={products}
              isLikes={false}
              remove={removeSaved}
            />
          </>
        ) : (
          <div className="lg:bg-white lg:pt-[16px] pb-[30px] px-2 lg:px-4 lg:border rounded w-full h-[350px] lg:h-[417.11px] flex flex-col font-sans">
            <h1 className=" font-semibold text-xl text-gray-800 hidden lg:block font-battambang">
              {t("title")}
            </h1>
            <div className=" mt-auto">
              <div className="w-full flex items-center justify-center">
                <Image
                  className="w-[250px]"
                  src={require("@/assets/job-icon.png")}
                  width={800}
                  height={500}
                  alt=""
                />
              </div>
            </div>
            <div className="space-y-1.5 text-center">
              <h1 className=" font-medium text-[18px]">
                Listings you saved appear here
              </h1>
              <p className="text-sm text-gray-500">
                Find your favourites and start creating your own wish-list
              </p>
            </div>
          </div>
        )}

        {loadingMore && products.length > 0 && <LoadingItem />}
      </div>
    </>
  );
}

export default Page;
