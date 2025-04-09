"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale } from "next-intl";
const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});
const CardsSkeleton = dynamic(
  () => import("@/components/skeletons/CardsSkeleton"),
  {
    ssr: false,
  }
);
const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });
const SmHeader = dynamic(() => import("@/components/SmHeader"), { ssr: false });

function Page() {
  const locale = useLocale();
  const { token, account, domain } = useAppContext();
  const [products, setProducts] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${domain}/get-product-notification?limit=23`
      );
      if (res.data.products.length > 0) {
        setProducts(res.data.products);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setProducts, setHasMore, setLoading, domain, token, loading]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <div>
      {isPending && <Loading />}
      <div className="top-0 sticky z-[9] lg:hidden w-full">
        <SmHeader name={"Khmer24"} currentAt="home" locale={locale} />
      </div>

      <div className=" mx-auto max-w-[1104px] pt-5 mb-20 lg:px-0 px-4">
        {products.length > 0 && (
          <CardsProducts
            products={products}
            setProducts={setProducts}
            setIsPending={setIsPending}
            toggleDisplayCards={true}
            accID={account?._id}
            token={token}
            domain={domain}
            accType={account?.type}
            isHasStartSelling={true}
            page={"notification"}
          />
        )}

        {products.length <= 0 && loading && <CardsSkeleton />}

        {products.length <= 0 && !hasMore && (
          <section className={`lg:bg-white p-4 h-[263px]`}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-[8.5px] pb-[25px]">
              <div className="w-[110px] h-[110px] mt-2">
                <Image
                  className="w-full h-full object-cover object-center"
                  src={require(`@/assets/empty-box.png`)}
                  width={500}
                  height={500}
                  alt=""
                />
              </div>
              <p className=" font-sans text-[17px] text-[#9A9A9A] text-center">
                You don&apos;t have any list posts right now
              </p>
            </div>
          </section>
        )}
      </div>

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Page;
