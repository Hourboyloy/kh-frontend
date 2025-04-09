"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import { AiOutlineSearch } from "react-icons/ai";
import { HiChevronRight } from "react-icons/hi";
import { processImage } from "@/helper/fileHandlers";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const SmNavAccount = dynamic(() => import("@/components/SmNavAccount"), {
  ssr: false,
  loading: () => <Loading />,
});
const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false, loading: () => <Loading /> }
);
const DropOptionViewChangeImg = dynamic(
  () => import("@/components/DropOptionViewChangeImg"),
  { ssr: false, loading: () => <Loading /> }
);

const ProfileSection = dynamic(() => import("@/components/ProfileSection"), {
  ssr: false,
});
const CoverPhotoEditorAccount = dynamic(
  () => import("@/components/CoverPhotoEditorAccount"),
  { ssr: false }
);

const CardsProductsStatus = dynamic(
  () => import("@/components/CardsProductsStatus"),
  { ssr: false }
);

const ListSkeleton = dynamic(
  () => import("@/components/skeletons/ListSkeleton"),
  {
    ssr: false,
  }
);

const EmptyBoxItem = dynamic(() => import("@/components/EmptyBoxItem1"), {
  ssr: false,
});

const LoadingItem = dynamic(() => import("@/components/LoadingItem"), {
  ssr: false,
});

const SmFooter = dynamic(() => import("@/components/SmFooter"), { ssr: false });

function Page() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("AccountPage");
  const DropOptionViewChangeRef = useRef(null);
  const { setProfile, profile, token, domain, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [alt, setAlt] = useState("");
  const [url, setUrl] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [photoCover, setPhotoCover] = useState(null);
  const [photoProfile, setPhotoProfile] = useState(null);
  const [alertWarning, setAlertWarning] = useState(false);
  const [dropOptionViewChange, setDropOptionViewChange] = useState(false);

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);

  const [loadingImage, setLoadingImage] = useState([]);
  const [active, setActive] = useState(0);
  const [expired, setExpired] = useState(0);
  const [page, setPage] = useState(1);
  const [productStatus, setProductStatus] = useState("active");
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleSuccess = useCallback(
    (updatedProfile) => {
      setProfile(updatedProfile);
      localStorage.setItem("profile", JSON.stringify(updatedProfile));
      setPhotoCover(null);
      setPhotoProfile(null);
    },
    [setProfile]
  );

  const handleFile = useCallback(
    (e) => {
      const file = e.target.files[0];
      const alt = e.target.alt;

      processImage(file, alt, setPhotoCover, setPhotoProfile, setAlertWarning);
    },
    [setPhotoCover, setPhotoProfile, setAlertWarning]
  );

  const handleSubmitFile = useCallback(async () => {
    const formData = new FormData();
    if (photoProfile) {
      formData.append("photoProfile", photoProfile);
    } else if (photoCover) {
      formData.append("photoCover", photoCover);
    } else {
      return;
    }
    formData.append("accID", profile?.accID);
    setIsPending(true);

    try {
      const res = await axios.put(
        `${domain}/${
          account?.type == TYPE ? "manager" : "user"
        }/update/profile/photo-profile-or-cover/${profile?.accID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        handleSuccess(res.data.profile);
      }
    } catch (error) {
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  }, [
    photoProfile,
    photoCover,
    profile?.accID,
    account?.type,
    token,
    domain,
    handleSuccess,
    TYPE,
  ]);

  const handleDropOptionViewChange = (alt, url) => {
    setAlt(alt);
    setUrl(url);
    setDropOptionViewChange(!dropOptionViewChange);
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (
        DropOptionViewChangeRef.current &&
        !DropOptionViewChangeRef.current.contains(e.target)
      ) {
        setDropOptionViewChange(false);
      }
    },
    [DropOptionViewChangeRef]
  );

  const getProductsByStatus = useCallback(
    async (accID) => {
      if (!hasMore || loadingMore) return;
      setLoadingMore(true);
      try {
        const res = await axios.get(
          `${domain}/products/${accID}/${productStatus}?page=${page}`
        );
        if (res.status === 200) {
          setProducts((prev) => [...prev, ...res.data.products]);
          setPage((prevPage) => prevPage + 1);
          setLoadingImage(res.data.products.map((e) => e._id));

          setHasMore(res.data.products.length > 11);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingMore(false);
        setTimeout(() => {
          setLoadingImage([]);
        }, 2000);
      }
    },
    [hasMore, loadingMore, domain, page, productStatus]
  );

  const handleSearch = async (status) => {
    if (!keyword || !account) return;
    setSearching(true);
    setHasMore(true);
    setProducts([]);
    try {
      const response = await axios.get(
        `${domain}/search/account/${account?._id}/status/${status}/keyword/${keyword}`
      );

      if (response.status === 200) {
        console.log([response.data.product]);
        setProducts([response.data.product]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setHasMore(false);
    }
  };

  const handleSetSearchKeyword = (value) => {
    setKeyword(value);
  };

  const getCountProductStatus = useCallback(
    async (accID) => {
      try {
        const res = await axios.get(`${domain}/count-product-status/${accID}`);
        if (res.status === 200) {
          setActive(res.data.activeCount);
          setExpired(res.data.expiredCount);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [domain]
  );

  const handleProductStatus = (val) => {
    if (productStatus !== val) {
      setProducts([]);
      setHasMore(true);
      setPage(1);
      if (searching && keyword) {
        handleSearch(val);
      }
    }
    setProductStatus(val);
  };

  const handleRenew = async (proid, updatedAt) => {
    if ((Date.now() - new Date(updatedAt).getTime()) / (1000 * 60 * 60) < 12)
      return;

    try {
      setIsPending(true);
      const res = await axios.put(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/renew/product/${proid}/account/${account?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === proid
              ? { ...product, ...res.data.product }
              : product
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const handleBoostProduct = async (product) => {
    try {
      if (
        product.promotionExpiresAt &&
        new Date(product.promotionExpiresAt) > new Date()
      )
        return;
      const requiredFields = {
        proID: product?._id,
        title: product?.title,
        username: profile?.username,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        alert(`Missing required fields: ${missingFields.join(", ")}`);
        return;
      }

      if (!account?._id) {
        alert("Account id not found!");
        return;
      }

      setIsPending(true);
      const response = await axios.post(
        `${domain}${account?.type == TYPE ? "/manager" : ""}/order/${
          account?._id
        }`,
        {
          proID: product?._id,
          title: product?.title,
          username: profile?.username,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
          photoURLs: product?.photos || [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsPending(false);
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod._id === product?._id
              ? { ...prod, boostStatus: "pending" }
              : prod
          )
        );

        setTimeout(() => {
          alert("Order created successfully!");
        }, 400);
      }
    } catch (error) {
      setIsPending(false);
      setTimeout(() => {
        alert("Failed to create order. Please try again.");
      }, 400);
    }
  };

  useEffect(() => {
    if (account?._id) {
      getCountProductStatus(account?._id);
    }
  }, [account, getCountProductStatus]);

  useEffect(() => {
    if (keyword === "" && searching) {
      setSearching(false);
      setProducts([]);
      setHasMore(true);
      setPage(1);
    }
  }, [keyword, searching]);

  useEffect(() => {
    if (account && products.length <= 0 && !searching) {
      getProductsByStatus(account?._id);
    }

    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const bottomPosition = document.documentElement.offsetHeight;
      if (
        scrollPosition >= bottomPosition - 500 &&
        !loadingMore &&
        hasMore &&
        account &&
        products.length > 0 &&
        !searching
      ) {
        getProductsByStatus(account?._id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    hasMore,
    loadingMore,
    account,
    productStatus,
    products,
    searching,
    getProductsByStatus,
  ]);

  useEffect(() => {
    if (photoCover !== null || photoProfile !== null) {
      handleSubmitFile();
    }
  }, [photoCover, photoProfile, handleSubmitFile]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (account === undefined) return;
    if (!account) {
      router.push("/login");
    }
  }, [account, router]);
  if (account === undefined || account === null) return <div></div>;

  return (
    <>
      <div
        className={` max-w-[820px] mx-auto lg:pt-5 lg:mb-28 md:mb-12 mb-20 ${
          locale == "en" ? " font-sans" : ""
        }`}
      >
        <DropOptionViewChangeImg
          dropdownRef={DropOptionViewChangeRef}
          dropOptionViewChange={dropOptionViewChange}
          setDropOptionViewChange={setDropOptionViewChange}
          setAlertWarning={setAlertWarning}
          alt={alt}
          url={url}
          handleFile={handleFile}
        />

        {/* Alert for warnings */}
        {alertWarning && (
          <div className="fixed w-full z-20 top-0 left-0 transition-opacity duration-200">
            <AlertSuccessWarning
              alert={alertWarning}
              icons="warning"
              text="Please choose a photo that's at least 360 pixels wide."
              handleIsAlert={() => setAlertWarning(false)}
            />
          </div>
        )}

        <div>{isPending && <Loading isPending={isPending} />}</div>

        <div className="lg:hidden sticky top-0 z-[9]">
          <SmNavAccount
            url={profile?.photoProfile}
            name={profile?.firstName + " " + profile?.lastName}
          />
        </div>

        <div className="border-t-[2px] border-white">
          <CoverPhotoEditorAccount
            profile={profile}
            handleFile={handleFile}
            handleDropOptionViewChange={handleDropOptionViewChange}
          />

          <ProfileSection
            profile={profile}
            handleFile={handleFile}
            handleDropOptionViewChange={handleDropOptionViewChange}
          />
        </div>

        <div className="bg-white mt-2 border py-3 px-8 grid md:grid-cols-4 grid-cols-3 lg:hidden">
          <Link href={"/liked"} className=" focus:outline-none outline-none">
            <div className="space-y-1">
              <p className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                <FaBookmark className="text-gray-700" size={20} />
              </p>
              <p className="text-[13px] text-nowrap text-gray-800 w-12 text-center">
                {t("liked")}
              </p>
            </div>
          </Link>

          <Link href={"/saved"} className=" focus:outline-none outline-none">
            <div className="flex flex-col items-center justify-center space-y-1">
              <p className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
                <FaHeart className="text-gray-700" size={21} />
              </p>
              <p className="text-[13px] text-nowrap text-gray-800 w-12 text-center">
                {t("saved")}
              </p>
            </div>
          </Link>
        </div>

        <section className="mt-2 bg-white border p-4">
          <div className="font-semibold mb-4">{t("manageAds")}</div>

          <div className="flex items-center gap-2.5 mb-4">
            {/* Search Input */}
            <div className="w-full flex items-center border rounded-md bg-white overflow-hidden">
              <button
                onClick={() => handleSearch(productStatus)}
                className="flex items-center justify-end h-[38px] w-[30px]"
              >
                <AiOutlineSearch className="text-gray-400 text-xl" />
              </button>
              <input
                type="text"
                placeholder={`${t("searchPlaceholder")}`}
                value={keyword || ""}
                onChange={({ target }) => handleSetSearchKeyword(target.value)}
                className="w-full h-[38px] border-none focus:ring-0 focus:outline-none text-sm text-gray-700 pl-2"
              />
            </div>

            {/* Category Selector */}
            <div className=" cursor-not-allowed w-full h-[38px] flex items-center border rounded-md px-2 bg-white justify-between">
              <span className="h-full text-sm text-gray-700 flex items-center justify-center">
                {t("filterCategory")}
              </span>
              <HiChevronRight className="h-full w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center bg-[#ECECEC] h-[38px] rounded-md overflow-hidden border-2 border-[#ECECEC]">
            <button
              onClick={() => handleProductStatus("active")}
              className={`w-full h-full text-sm text-center text-gray-700  ${
                productStatus == "active" &&
                "bg-white rounded transition-all duration-200"
              }`}
            >
              {t("activeStatus")} ({active || 0})
            </button>
            <button
              onClick={() => handleProductStatus("expired")}
              className={`w-full h-full text-sm text-center text-gray-700 ${
                productStatus == "expired" &&
                "bg-white rounded transition-all duration-200"
              }`}
            >
              {t("expiredStatus")} ({expired || 0})
            </button>
          </div>
        </section>

        {products.length <= 0 && !hasMore && (
          <EmptyBoxItem
            text={
              productStatus === "active"
                ? t("emptyBoxActive")
                : t("emptyBoxExpired")
            }
          />
        )}

        <div className="mt-2">
          {products?.length <= 0 && hasMore ? (
            <ListSkeleton ArrNumber={[1, 2, 3]} />
          ) : (
            <CardsProductsStatus
              status={productStatus}
              handleBoostProduct={handleBoostProduct}
              products={products}
              setProducts={setProducts}
              domain={domain}
              accID={account?._id}
              accType={account?.type}
              token={token}
              setIsPending={setIsPending}
              handleRenew={handleRenew}
            />
          )}

          <div>
            {!hasMore && products.length > 0 ? (
              <p className="text-center text-gray-500 mt-7 text-sm">
                No more result!
              </p>
            ) : products?.length > 0 && hasMore ? (
              <LoadingItem />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="-bottom-0.5 z-[9] fixed w-full lg:hidden">
        <SmFooter />
      </div>
    </>
  );
}

export default Page;
