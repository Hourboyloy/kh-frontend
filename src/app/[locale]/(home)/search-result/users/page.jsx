"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { IoMdArrowBack } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { useLocale } from "next-intl";

const ListUserInfeniteScroll = dynamic(
  () => import("@/components/ListUserInfeniteScroll"),
  { ssr: false }
);

const ListSkeletonUserInfenite = dynamic(
  () => import("@/components/skeletons/ListSkeletonUserInfenite"),
  { ssr: false }
);

const LoadingItem = dynamic(() => import("@/components/LoadingItem"), {
  ssr: false,
});

const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });

function Page() {
  const router = useRouter();
  const locale = useLocale();
  const { domain } = useAppContext();
  const keyword = useSearchParams().get("keyword");
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchData = useCallback(
    async (callback) => {
      if (!hasMore || loadingMore) return;
      setLoadingMore(true);
      try {
        const res = await axios.get(
          `${domain}/user-get-by-limit?keyword=${keyword}&page=${page}`
        );
        if (res.status === 200) {
          if (res.data.users.length > 0) {
            setUsers((prev) => [...prev, ...res.data.users]);
            setPage((p) => p + 1);
          } else {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
        if (callback && typeof callback === "function") {
          callback(); // Execute the callback function
        }
      }
    },
    [loadingMore, domain, keyword, page, hasMore]
  );

  useEffect(() => {
    if (keyword) {
      fetchData();
    }
  }, [keyword, fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;
      if (
        scrollPosition >= bottomPosition - 500 &&
        !loadingMore &&
        hasMore &&
        users.length > 0
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loadingMore, users, fetchData]);

  return (
    <div>
      <div className="top-0 sticky z-[9] lg:hidden w-full">
        <div className="w-full bg-[#028DCE] flex items-center space-x-3 px-3 py-[9.2px]">
          <button
            onClick={() => router.back()}
            className="outline-none focus:outline-none select-none flex items-center"
          >
            <IoMdArrowBack size={24} className="text-white" />
          </button>

          <div className="text-white text-lg">
            {locale == "en" ? (
              <span className="font-sans">Search:</span>
            ) : (
              <span className="font-battambang">ស្វែងរក:</span>
            )}
            <span className="pl-1.5 font-sans">{keyword}</span>
          </div>
        </div>
      </div>

      {!hasMore && users.length <= 0 && (
        <div className="flex flex-col items-center justify-center leading-none pt-4 space-y-2 font-sans">
          <RiErrorWarningFill className="text-[#9A9A9A] text-7xl" />
          <p className="text-[#9A9A9A]">No result!</p>
        </div>
      )}

      <div className="max-w-[787px] mx-auto pt-4 lg:pt-5 px-4 mb-20 md:mb-28 lg:mb-20 font-sans">
        {hasMore && users.length <= 0 && (
          <ListSkeletonUserInfenite ArrNumber={[1, 2, 3, 4, 5, 6]} />
        )}
        {users.length > 0 && <ListUserInfeniteScroll users={users} />}
        {hasMore && users.length > 0 && <LoadingItem />}
      </div>

      <div className="-bottom-0.5 fixed w-full z-[9] lg:hidden">
        <SmFooter />
      </div>
    </div>
  );
}

export default Page;
