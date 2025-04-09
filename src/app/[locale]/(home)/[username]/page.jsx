"use client";
import { useEffect, useState, use, useCallback } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";

const SmFooter = dynamic(() => import("@/components/SmFooter"), {
  ssr: false,
});
const SmHeader = dynamic(() => import("@/components/SmHeader"), {
  ssr: false,
});
const LoadingItem = dynamic(() => import("@/components/LoadingItem"), {
  ssr: false,
});
const HeadProfileViewAccount = dynamic(
  () => import("@/components/HeadProfileViewAccount"),
  { ssr: false }
);
const HomeAccount = dynamic(() => import("@/components/HomeAccount"), {
  ssr: false,
});
const AboutMeAccount = dynamic(() => import("@/components/AboutMeAccount"), {
  ssr: false,
});

const SkeletonVIewUserAcc = dynamic(
  () => import("@/components/skeletons/SkeletonVIewUserAcc"),
  {
    ssr: false,
  }
);

const ListSkeleton = dynamic(
  () => import("@/components/skeletons/ListSkeleton"),
  {
    ssr: false,
  }
);

const NotFound = dynamic(() => import("@/components/NotFound"), {
  ssr: false,
});

export default function ClientPage({ params }) {
  const t = useTranslations("viewAccountPage");
  const locale = useLocale();
  const { username } = use(params);
  const { domain, token, account } = useAppContext();
  const [products, setProducts] = useState([]);
  const [accountView, setAccountView] = useState();
  const [profile, setProfile] = useState();
  const [toggleDisplayCards, setToggleDisplayCards] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formattedDate, setFormattedDate] = useState("Unknown");

  const [page, setPage] = useState(1);
  const [toggleHome, setToggleHome] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreProducts = useCallback(
    async (id) => {
      if (!hasMore || loadingMore || !toggleHome) return;
      setLoadingMore(true);
      try {
        const res = await axios.get(
          `${domain}/more-products/${id}?page=${page + 1}`
        );
        if (res.status === 200) {
          const newProducts = res.data.products;

          if (newProducts.length > 0) {
            setProducts((prev) => [...prev, ...newProducts]);
            setPage((prevPage) => prevPage + 1);
          }

          // Update hasMore based on product count
          setHasMore(newProducts.length > 9);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
      }
    },
    [hasMore, loadingMore, toggleHome, domain, page] // Include dependencies here
  );

  // Fetch Initial Data
  const fetchAccount = useCallback(async () => {
    try {
      const res = await axios.get(`${domain}/viewer/${username}`);
      if (res.status === 200) {
        setAccountView(res.data.account);
        setProfile(res.data.profile);
        setProducts(res.data.products);
        setHasMore(res.data.products.length > 9);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setNotFound(true);
      }, 2000);
    }
  }, [domain, username]);

  useEffect(() => {
    const storedToggleDisplayCards = localStorage.getItem("toggleDisplayCards");
    fetchAccount();
    if (storedToggleDisplayCards !== null) {
      setToggleDisplayCards(JSON.parse(storedToggleDisplayCards));
    }
    if (accountView?.createdAt) {
      const createdDate = new Date(accountView.createdAt);
      const now = new Date();
      const isLongAgo = now.getFullYear() - createdDate.getFullYear() > 1;

      const formatted = isLongAgo
        ? createdDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : createdDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

      setFormattedDate(formatted);
    }
  }, [accountView?.createdAt, fetchAccount]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;
      if (
        scrollPosition >= bottomPosition - 520 &&
        !loadingMore &&
        hasMore &&
        accountView &&
        toggleHome
      ) {
        fetchMoreProducts(accountView?._id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loadingMore, accountView, toggleHome, fetchMoreProducts]);

  const handleOpenHomeProfile = () => setToggleHome(true);
  const handleOpenAbouutProfile = () => setToggleHome(false);

  const handleDisplayCardsAsRow = () => {
    localStorage.setItem("toggleDisplayCards", false);
    setToggleDisplayCards(false);
  };
  const handleDisplayCardsAsCols = () => {
    localStorage.setItem("toggleDisplayCards", true);
    setToggleDisplayCards(true);
  };

  return (
    <div>
      {notFound ? (
        <div className="lg:pt-5">
          <NotFound />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="top-0 sticky z-[9] lg:hidden w-full">
            <SmHeader
              name={`${profile?.firstName + " " + profile?.lastName}`}
            />
          </div>

          <div className="max-w-[1104px] mx-auto lg:mb-0 mb-24">
            {!profile ? (
              <SkeletonVIewUserAcc />
            ) : (
              <div className="lg:pt-5 space-y-2 mb-24">
                <HeadProfileViewAccount
                  account={accountView}
                  profile={profile}
                  t={t}
                  locale={locale}
                  formattedDate={formattedDate}
                  toggleBtn={toggleHome}
                  handleOpenAbouutProfile={handleOpenAbouutProfile}
                  handleOpenHomeProfile={handleOpenHomeProfile}
                />

                {toggleHome ? (
                  <>
                    {profile && products?.length <= 0 && hasMore ? (
                      <ListSkeleton ArrNumber={[1, 2, 3]} />
                    ) : (
                      <HomeAccount
                        toggleDisplayCards={toggleDisplayCards}
                        handleDisplayCardsAsCols={handleDisplayCardsAsCols}
                        handleDisplayCardsAsRow={handleDisplayCardsAsRow}
                        products={products}
                        setProducts={setProducts}
                        domain={domain}
                        token={token}
                        accID={account?._id}
                        accType={account?.type}
                        t={t}
                        locale={locale}
                      />
                    )}
                  </>
                ) : (
                  <AboutMeAccount t={t} account={account} locale={locale} />
                )}
                {products.length > 0 && hasMore && toggleHome && (
                  <LoadingItem />
                )}
              </div>
            )}
          </div>

          <div className="-bottom-0.5 z-[9] fixed w-full lg:hidden">
            <SmFooter />
          </div>
        </div>
      )}
    </div>
  );
}
