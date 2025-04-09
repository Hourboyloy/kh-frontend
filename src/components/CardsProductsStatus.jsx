"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsMegaphone } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import { IoIosShareAlt } from "react-icons/io";
import { IoRefreshOutline } from "react-icons/io5";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { useTranslations } from "next-intl";

const DeleteReasonProduct = dynamic(
  () => import("@/components/buttons/DeleteReasonProduct"),
  { ssr: false }
);

const ShareOption = dynamic(() => import("@/components/buttons/ShareOption"), {
  ssr: false,
});

const MoreOptionCard2 = dynamic(
  () => import("@/components/buttons/MoreOptionCard2"),
  {
    ssr: false,
  }
);

const AutoRenew = dynamic(() => import("@/components/buttons/AutoRenew"), {
  ssr: false,
});

const formatDate2 = dynamic(
  () => import("@/helper/formatDate2").then((mod) => mod.formatDate2),
  { ssr: false }
);

// Function to trim text based on screen size
const getTrimmedText = (text, size) => {
  const length = size === "lg" ? 80 : size === "md" ? 70 : 26;
  return text?.length > length ? text?.slice(0, length) + "..." : text;
};

function CardsProductsStatus({
  products,
  domain,
  accID,
  accType,
  token,
  setIsPending,
  setProducts,
  handleRenew,
  status,
  handleBoostProduct,
}) {
  const t = useTranslations("productStatus");

  const [proID, setProID] = useState();
  const [autoRenews, setAutoRenews] = useState();
  const [title, setTitle] = useState("");
  const [toggleDeleteReason, setToggleDeleteReason] = useState(false);
  const [toggleShareOption, setToggleShareOption] = useState(false);
  const [toggleOptionCard, setToggleOptionCard] = useState(false);
  const [toggleAutoRenew, setToggleAutoRenew] = useState(false);
  const [linkCopy, setLinkCopy] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});

  const handleToggleDeleteReason = (id) => {
    setProID(id || proID);
    setToggleOptionCard(false);
    setToggleDeleteReason(true);
  };

  const handleToggleShowShareOption = (link) => {
    setToggleShareOption(true);
    setLinkCopy(link);
  };

  const handleClickMore = (proid, title, renews) => {
    setProID(proid);
    setToggleOptionCard(true);
    setTitle(title);
    setAutoRenews(renews);
  };

  const handleClickAutoRenew = () => {
    setToggleOptionCard(false);
    setToggleAutoRenew(true);
  };

  const checkImage = (url, id) => {
    const img = new window.Image();
    img.src = url;
    img.onload = () => {
      setLoadingImages((prev) => ({ ...prev, [id]: "loaded" }));
    };
    img.onerror = () => {
      setLoadingImages((prev) => ({ ...prev, [id]: "error" }));
    };
  };

  useEffect(() => {
    products.forEach((pro) => {
      const photoUrl = pro?.photos?.[0];
      if (photoUrl && !loadingImages[pro._id]) {
        setLoadingImages((prev) => ({ ...prev, [pro._id]: "loading" }));
        checkImage(photoUrl, pro._id);
      }
    });
  }, [products]);

  return (
    <div className="">
      <DeleteReasonProduct
        domain={domain}
        setProducts={setProducts}
        setIsPending={setIsPending}
        accID={accID}
        accType={accType}
        token={token}
        proID={proID}
        toggleDeleteReason={toggleDeleteReason}
        setToggleDeleteReason={setToggleDeleteReason}
      />

      <ShareOption
        linkCopy={linkCopy}
        toggleShareOption={toggleShareOption}
        setToggleShareOption={setToggleShareOption}
      />

      <MoreOptionCard2
        toggleOptionCard={toggleOptionCard}
        setToggleOptionCard={setToggleOptionCard}
        handleToggleDeleteReason={handleToggleDeleteReason}
        title={title}
        proID={proID}
        handleClickAutoRenew={handleClickAutoRenew}
      />

      <AutoRenew
        setProducts={setProducts}
        toggleAutoRenew={toggleAutoRenew}
        setToggleAutoRenew={setToggleAutoRenew}
        accID={accID}
        proID={proID}
        token={token}
        accType={accType}
        domain={domain}
        setIsPending={setIsPending}
        autoRenews={autoRenews}
      />

      <ul>
        {products.length > 0 &&
          products?.map((product, index) => {
            const imageStatus = loadingImages[product?._id];
            const isExpired =
              product?.promotionExpiresAt &&
              new Date(product.promotionExpiresAt) < new Date();
            return (
              <li key={index} className="bg-white rounded-md p-3.5 border mb-2">
                <Link
                  href={`/details/${product.title
                    ?.replace(/[^\w\s-]/g, "") // Remove special characters & emoji
                    ?.replace(/\s+/g, "-") // Replace spaces with "-"
                    ?.toLowerCase()}-${product._id}`}
                  className=" focus:outline-none outline-none"
                >
                  <section className="flex flex-1 space-x-2">
                    {imageStatus === "loading" && (
                      <div className="w-[120px] h-[120px] relative">
                        <div className="skeleton-loaderCard bg-white h-full w-full"></div>
                      </div>
                    )}

                    {imageStatus === "loaded" &&
                      product?.photos?.length > 0 &&
                      product?.photos[0] && (
                        <div className="w-[120px] h-[120px]">
                          <Image
                            className="w-[120px] h-[120px] object-cover object-center border rounded"
                            src={product.photos[0] || null}
                            priority
                            width={800}
                            height={500}
                            alt=""
                          />
                        </div>
                      )}

                    {(imageStatus === "error" ||
                      product?.photos[0] == null ||
                      (!product?.photos?.length &&
                        imageStatus !== "loading")) && (
                      <div className="w-[120px] h-[120px] border rounded flex items-center justify-center">
                        <MdPhotoSizeSelectActual
                          size={40}
                          className="text-gray-200"
                        />
                      </div>
                    )}

                    <div className=" md:pt-1 space-y-1 leading-1">
                      {/* Display title based on screen size */}
                      <h1 className="text-[15px] font-battambang hidden lg:block">
                        {getTrimmedText(product?.title, "lg")}
                      </h1>
                      <h1 className="text-[15px] font-battambang hidden md:block lg:hidden">
                        {getTrimmedText(product?.title, "md")}
                      </h1>
                      <h1 className="text-[15px] font-battambang md:hidden">
                        {getTrimmedText(product?.title, "sm")}
                      </h1>

                      <p className="text-[#DF2E00] text-[16px] font-semibold">
                        {product?.dynamicFields?.price ||
                        product?.dynamicFields?.salePrice ||
                        product?.dynamicFields?.salary
                          ? `$${
                              product?.dynamicFields?.price ||
                              product?.dynamicFields?.salePrice ||
                              product?.dynamicFields?.salary
                            }`
                          : "Negotiable"}
                      </p>
                      <div className="text-xs md:space-y-1 space-y-0 text-gray-600">
                        <div className="md:space-y-1 space-y-0">
                          <p className="">Ad ID: {product?._id}</p>
                          <p className="md:hidden">View: {product?.views}</p>
                        </div>

                        <p className="flex md:flex-row flex-col md:items-center md:space-x-2.5">
                          <span>
                            {t("postDate")} {formatDate2(product?.createdAt)}
                          </span>
                          <span>
                            {t("renewDate")} {formatDate2(product?.updatedAt)}
                          </span>
                        </p>
                        <p className="hidden md:block">
                          {t("view")}: {product?.views}
                        </p>
                      </div>
                    </div>
                  </section>
                </Link>

                {status === "active" && (
                  <div className="flex items-center justify-between mt-5 space-x-10 font-battambang">
                    <p className="space-x-2 flex items-center text-gray-500">
                      <BsMegaphone size={19} />
                      <span className="text-sm">{t("detailsAboutBoost")}</span>
                    </p>

                    {isExpired && product.boostStatus !== "pending" ? (
                      <button
                        onClick={() => handleBoostProduct(product)}
                        className="bg-[#028DCF] text-white outline-none focus:outline-none select-none px-4 py-2 rounded text-nowrap"
                      >
                        {t("boostBtn")}
                      </button>
                    ) : (
                      <div>
                        {(!product?.boostStatus ||
                          product?.boostStatus === "rejected") && (
                          <button
                            onClick={() => handleBoostProduct(product)}
                            className="bg-[#028DCF] text-white outline-none focus:outline-none select-none px-4 py-2 rounded text-nowrap"
                          >
                            {t("boostBtn")}
                          </button>
                        )}

                        {product?.boostStatus &&
                          product?.boostStatus !== "rejected" && (
                            <div className="w-fit">
                              {product?.boostStatus === "accepted" ? (
                                <span className="text-green-600">
                                  {t("isBoost")}
                                </span>
                              ) : (
                                <span className="text-[#028DCF]">
                                  {t("isPending")}
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                )}

                <hr className="my-3" />

                <div className="flex items-center space-x-2 text-sm *:text-gray-700">
                  <button
                    onClick={() =>
                      handleRenew(product?._id, product?.updatedAt)
                    }
                    disabled={
                      (Date.now() - new Date(product?.updatedAt).getTime()) /
                        (1000 * 60 * 60) <
                      12
                    }
                    className={`bg-[#ececec] space-x-1 w-full flex items-center justify-center rounded h-[38px] select-none focus:outline-none ${
                      (Date.now() - new Date(product?.updatedAt).getTime()) /
                        (1000 * 60 * 60) <
                      12
                        ? "opacity-50 cursor-not-allowed"
                        : "active:bg-gray-100"
                    }`}
                  >
                    <IoRefreshOutline size={18} />
                    <span>{t("renewBtn")}</span>
                  </button>
                  <Link
                    href={`/post/${product._id}`}
                    className="hidden bg-[#ececec] space-x-1 w-full lg:flex items-center justify-center rounded h-[38px] select-none focus:outline-none active:bg-gray-100"
                  >
                    <BiEdit size={18} />
                    <span>{t("editBtn")}</span>
                  </Link>

                  <button
                    onClick={() => handleToggleDeleteReason(product._id)}
                    className="hidden bg-[#ececec] space-x-1 w-full lg:flex items-center justify-center rounded h-[38px] select-none focus:outline-none active:bg-gray-100"
                  >
                    <RiDeleteBin6Line size={18} />
                    <span>{t("deleteBtn")}</span>
                  </button>

                  <button
                    onClick={() =>
                      handleToggleShowShareOption(
                        `${product.title
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${product._id}`
                      )
                    }
                    className="bg-[#ececec] space-x-1 w-full flex items-center justify-center rounded h-[38px] select-none focus:outline-none active:bg-gray-100"
                  >
                    <IoIosShareAlt size={18} />
                    <span>{t("shareBtn")}</span>
                  </button>

                  <button
                    onClick={() =>
                      handleClickMore(
                        product?._id,
                        product?.title,
                        product?.reNewProductAtTime
                      )
                    }
                    className="bg-[#ececec] space-x-1 w-[80px] lg:w-[170px] flex items-center justify-center rounded h-[38px] select-none focus:outline-none active:bg-gray-100"
                  >
                    <IoMdMore size={18} />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default CardsProductsStatus;
