"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/helper/formatDate";

import { MdMoreVert, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { MdPhotoSizeSelectActual } from "react-icons/md";

const ShareOption = dynamic(() => import("@/components/buttons/ShareOption"), {
  ssr: false,
});

const MoreOptionCard = dynamic(
  () => import("@/components/buttons/MoreOptionCard"),
  { ssr: false }
);
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

function CardsProducts({
  setIsPending,
  products,
  setProducts,
  toggleDisplayCards,
  isHasStartSelling,
  accID,
  token,
  domain,
  page,
  productName,
  currentPathAtViewAccount,
  accType,
}) {
  const t = useTranslations("cardSellingAndProduct");
  const locale = useLocale();
  const router = useRouter();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;
  const [linkCopy, setLinkCopy] = useState("");
  const [proId, setProID] = useState("");
  const [proUserID, setProUserID] = useState("");
  const [userSaved, setUserSaved] = useState([]);
  const [province, setProvince] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [username, setUsername] = useState("");

  const [toggleMoreOptionCard, setToggleMoreOptionCard] = useState(false);
  const [toggleShareOption, setToggleShareOption] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});

  const handleClickMore = (
    id,
    linkCopy,
    province,
    url,
    userName,
    proUserID,
    title,
    userSaved,
    price
  ) => {
    setToggleMoreOptionCard(true);
    setProID(id);
    setLinkCopy(linkCopy);
    setProvince(province);
    setUrl(url);
    setUsername(userName);
    setProUserID(proUserID);
    setTitle(title);
    setUserSaved(userSaved);
    setPrice(price);
  };

  const handleClickShare = (id) => {
    setToggleMoreOptionCard(false);
    setToggleShareOption(true);
  };

  const handleLike = async (
    proid,
    prouserId,
    title,
    photoUrl,
    province,
    price
  ) => {
    if (!accID) {
      router.push("/login");
      return;
    }
    if (accID === prouserId) return;

    setIsPending(true);
    try {
      const res = await axios.post(
        `${domain}${
          accType == TYPE ? "/manager" : ""
        }/like/product/${proid}/account/${accID}`,
        { title, photoUrl, province, price },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fix typo here
          },
        }
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (page === "search") {
              return {
                ...product,
                [productName]: product[productName].map((item) =>
                  item._id === proid ? { ...item, likes: res.data.likes } : item
                ),
              };
            } else {
              return product._id === proid
                ? { ...product, likes: res.data.likes }
                : product;
            }
          })
        );
      }
    } catch (error) {
      console.error(
        "Error liking product:",
        error.response?.data || error.message
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleUnLike = async (proid, prouserid) => {
    if (!accID) {
      router.push("/login");
      return;
    }
    if (accID === prouserid) return;

    setIsPending(true);
    try {
      const res = await axios.delete(
        `${domain}${
          accType == TYPE ? "/manager" : ""
        }/like/product/${proid}/account/${accID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (page === "search" && product[productName]) {
              return {
                ...product,
                [productName]: product[productName].map((item) =>
                  item._id === proid ? { ...item, likes: res.data.likes } : item
                ),
              };
            } else {
              return product._id === proid
                ? { ...product, likes: res.data.likes }
                : product;
            }
          })
        );
      }
    } catch (error) {
      console.error(
        "Error unliking product:",
        error.response?.data || error.message
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleSave = async () => {
    if (!accID) {
      router.push("/login");
      return;
    }
    if (accID === proUserID) return;

    setToggleMoreOptionCard(false);
    setIsPending(true);
    try {
      const res = await axios.post(
        `${domain}${
          accType == TYPE ? "/manager" : ""
        }/save/product/${proId}/account/${accID}`,
        {
          title,
          photoUrl: url,
          province,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (page === "search") {
              return {
                ...product,
                [productName]: product[productName].map((item) =>
                  item._id === proId ? { ...item, saves: res.data.saves } : item
                ),
              };
            } else {
              return product._id === proId
                ? { ...product, saves: res.data.saves }
                : product;
            }
          })
        );
      }
    } catch (error) {
      console.error(
        "Error saving product:",
        error.response?.data || error.message
      );
    } finally {
      setIsPending(false);
    }
  };

  const handleRemoveSave = async () => {
    if (!accID) {
      router.push("/login");
      return;
    }
    if (accID === proUserID) return;

    setToggleMoreOptionCard(false);
    setIsPending(true);
    try {
      const res = await axios.delete(
        `${domain}${
          accType == TYPE ? "/manager" : ""
        }/save/product/${proId}/account/${accID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            if (page === "search" && product[productName]) {
              return {
                ...product,
                [productName]: product[productName].map((item) =>
                  item._id === proId ? { ...item, saves: res.data.saves } : item
                ),
              };
            } else {
              return product._id === proId
                ? { ...product, saves: res.data.saves }
                : product;
            }
          })
        );
      }
    } catch (error) {
      console.error(
        "Error removing save:",
        error.response?.data || error.message
      );
    } finally {
      setIsPending(false);
    }
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
    <div>
      <MoreOptionCard
        accID={accID}
        userSaved={userSaved}
        proUserID={proUserID}
        username={username}
        toggleMoreOptionCard={toggleMoreOptionCard}
        setToggleMoreOptionCard={setToggleMoreOptionCard}
        handleClickShare={handleClickShare}
        handleSave={handleSave}
        handleRemoveSave={handleRemoveSave}
        currentPathAtViewAccount={currentPathAtViewAccount}
      />

      <ShareOption
        linkCopy={linkCopy}
        toggleShareOption={toggleShareOption}
        setToggleShareOption={setToggleShareOption}
      />

      <ul
        className={`grid gap-[9.33px] ${
          toggleDisplayCards
            ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {isHasStartSelling && (
          <li
            className={`bg-gradient-to-b from-[#4477E2] via-[#3068DE] to-[#0248DB] border border-gray-300 rounded text-white`}
          >
            <Link
              href={"/post"}
              className={`focus:outline-none flex flex-col pb-[16px] ${
                toggleDisplayCards ? "min-h-[317.9px]" : ""
              }`}
            >
              <div
                className={`mb-auto px-3.5 pt-[18px] ${
                  toggleDisplayCards ? "space-y-3.5 text-center" : "space-y-1"
                }`}
              >
                <h1 className={`${toggleDisplayCards ? "text-[18px]" : ""}`}>
                  {t("title")}
                </h1>
                <p
                  className={`${
                    toggleDisplayCards ? "text-[14.5px]" : "text-[13.5px]"
                  }`}
                >
                  {t("description")}
                </p>
              </div>

              <div
                className={`px-3.5 w-full flex items-center justify-center select-none text-[#0052FF] *:rounded ${
                  toggleDisplayCards ? "" : "pt-6"
                }`}
              >
                <button
                  className={`bg-white hover:bg-transparent hover:text-white hover:shadow-none transition-all duration-300 shadow flex items-center justify-center focus:outline-none outline-none ${
                    toggleDisplayCards
                      ? "w-[215.2px] h-[39.75px] text-[17.5px]"
                      : "w-full h-[32px] text-[14px]"
                  }`}
                >
                  {t("btn")}
                </button>
              </div>
            </Link>
          </li>
        )}

        {products?.map((product, i) => {
          const imageStatus = loadingImages[product?._id];
          // const photoUrl = product?.photos[0];

          return (
            <li
              key={product + i}
              className="h-full w-full bg-white border border-gray-300 rounded overflow-hidden hover:shadow transition-all ease-in-out"
            >
              <div
                className={`h-full flex ${
                  toggleDisplayCards ? "flex-col" : "flex-row"
                }`}
              >
                {/* Image Section */}
                <div
                  className={`bg-gray-50 relative ${
                    toggleDisplayCards ? "" : "w-[277px]"
                  }`}
                >
                  <Link
                    href={`/details/${product.title
                      .replace(/[^\w\s-]/g, "") // Remove special characters & emoji
                      .replace(/\s+/g, "-") // Replace spaces with "-"
                      .toLowerCase()}-${product._id}`}
                    className="focus:outline-none outline-none"
                  >
                    <div
                      className={`${
                        toggleDisplayCards
                          ? "h-[175px] md:h-[210px] w-full"
                          : "h-[160px] w-[160px] md:h-[220px] md:w-[220px]"
                      }`}
                    >
                      {imageStatus === "loading" && (
                        <div className="skeleton-loaderCard bg-white h-full w-full"></div>
                      )}

                      {imageStatus === "loaded" &&
                        product.photos.length > 0 &&
                        product.photos[0] && (
                          <Image
                            className={`${
                              toggleDisplayCards
                                ? "h-[175px] md:h-[210px] w-full"
                                : "h-[160px] w-[160px] md:h-[220px] md:w-[220px]"
                            } object-cover object-center`}
                            src={product.photos[0] || null}
                            priority
                            width={1000}
                            height={1000}
                            alt=""
                          />
                        )}

                      {(imageStatus === "error" ||
                        product?.photos[0] == null ||
                        (!product?.photos?.length &&
                          imageStatus !== "loading")) && (
                        <div className="w-full h-full border rounded flex items-center justify-center">
                          <MdPhotoSizeSelectActual
                            size={40}
                            className="text-gray-200"
                          />
                        </div>
                      )}
                    </div>

                    {/* Discount Tag */}
                    {product?.dynamicFields?.discount > 0 && (
                      <div className="absolute top-0 left-0 bg-[#F58800] text-white pl-2 pr-3 py-2 rounded-br-full font-sans">
                        <p className="text-[12px] font-semibold">
                          {product?.dynamicFields?.discountAs}
                          {product?.dynamicFields?.discount} <span>OFF</span>
                        </p>
                      </div>
                    )}

                    {/* Image Count */}
                    <div
                      className={`absolute text-white bottom-2 flex items-center gap-1.5 ${
                        toggleDisplayCards ? "right-2" : "left-2"
                      }`}
                    >
                      {product?.dynamicFields?.freeDelivery &&
                        toggleDisplayCards && (
                          <div className="bg-opacity-50 bg-gray-900 flex items-center gap-[5px] rounded-md px-1 md:h-[27.5px] h-[22px]">
                            <MdLocalShipping className="text-[13.5px] md:text-[15px]" />
                            <span className="text-[10px] md:text-[11.5px]">
                              {t("freeDelivery")}
                            </span>
                          </div>
                        )}

                      {product?.photos.length > 1 && (
                        <div className="bg-opacity-50 bg-gray-900 flex items-center gap-[5px] rounded-md px-2 md:h-[27.5px] h-[22px]">
                          <MdOutlinePhotoSizeSelectActual className="text-[13.5px] md:text-[15px]" />
                          <span className="text-[10px] md:text-[13px] font-semibold font-sans">
                            {product?.photos.length}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* More Options Button */}
                  <button
                    onClick={() =>
                      handleClickMore(
                        product._id,
                        `${product.title
                          .replace(/[^\w\s-]/g, "")
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${product._id}`,
                        product?.locations?.province.en,
                        product.photos[0],
                        product?.username,
                        product?.accID,
                        product?.title,
                        product?.saves,
                        product?.dynamicFields.price ||
                          product?.dynamicFields.salePrice ||
                          product?.dynamicFields.salary
                      )
                    }
                    className="h-[23px] w-[23px] md:w-[26px] md:h-[26px] rounded-full flex items-center justify-center bg-gray-900 bg-opacity-50 absolute top-1.5 right-1.5 md:top-2 md:right-2 z-[1] select-none focus:outline-none"
                  >
                    <MdMoreVert className="text-white text-[15px] md:text-[20px]" />
                  </button>
                </div>

                <div
                  className={`relative border-t border-gray-200 w-full h-full ${
                    toggleDisplayCards
                      ? "px-[7px] py-2.5"
                      : "md:pl-[13.5px] md:pr-6 md:py-5 p-2"
                  }`}
                >
                  {/* Product Details */}
                  <Link
                    href={`/details/${product.title
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-")
                      .toLowerCase()}-${product._id}`}
                    className="focus:outline-none outline-none"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-auto text-[10.5px] md:text-[11.5px]">
                        <p className="text-gray-800 text-[14px] mb-[1px] hidden md:block">
                          {product.title.length > 30 && toggleDisplayCards
                            ? product.title.slice(0, 30) + "..."
                            : product.title}
                        </p>
                        <p className="text-gray-800 text-[14px] mb-[1px] md:hidden">
                          {product.title.length > 18 && toggleDisplayCards
                            ? product.title.slice(0, 18) + "..."
                            : product.title.slice(0, 35) + "..."}
                        </p>
                        <div className="text-gray-500">
                          {formatDate(product?.updatedAt)} •{" "}
                          {product?.locations?.district[locale]},
                          {" " + product?.locations?.province[locale]}
                        </div>

                        {/* dynamic field for display */}
                        <div className="text-gray-500">
                          {product?.keySearchmainCategory ===
                            "cars-and-vehicles" && (
                            <div>
                              <span>
                                {product?.dynamicFields?.condition.toLowerCase() ==
                                "used"
                                  ? locale == "en"
                                    ? "Used"
                                    : "មួយទឹក"
                                  : product?.dynamicFields?.condition.toLowerCase() ==
                                    "new"
                                  ? locale == "en"
                                    ? "New"
                                    : "ថ្មី"
                                  : ""}
                              </span>
                              <span className="font-sans">
                                {" • "} {product?.dynamicFields?.year + " "}
                              </span>
                              <span>
                                {" • "}
                                {product?.dynamicFields?.taxType.toLowerCase() ==
                                "tax paper"
                                  ? locale == "en"
                                    ? "Tax Paper"
                                    : "ក្រដាសពន្ធ"
                                  : product?.dynamicFields?.taxType.toLowerCase() ==
                                    "plate number"
                                  ? locale == "en"
                                    ? "Plate Number"
                                    : "ស្លាកលេខ"
                                  : ""}
                              </span>
                            </div>
                          )}

                          {product?.keySearchmainCategory === "Jobs" && (
                            <div>
                              <span className="font-sans">
                                {product?.dynamicFields?.type}
                              </span>
                              <span>
                                {" • " +
                                  product?.dynamicFields?.experience +
                                  " "}
                                {t("experience")}
                              </span>
                            </div>
                          )}

                          {(product?.keySearchmainCategory ===
                            "phones-and-tablets" ||
                            product?.keySearchmainCategory ===
                              "computers-and-accessories" ||
                            product?.keySearchmainCategory ===
                              "electronics-and-appliances") && (
                            <span>
                              {" "}
                              {product?.dynamicFields?.condition.toLowerCase() ==
                              "used"
                                ? locale == "en"
                                  ? "Used"
                                  : "មួយទឹក"
                                : product?.dynamicFields?.condition.toLowerCase() ==
                                  "new"
                                ? locale == "en"
                                  ? "New"
                                  : "ថ្មី"
                                : ""}
                            </span>
                          )}

                          {product?.keySearchmainCategory ===
                            "house-and-lands" && (
                            <div>
                              <span>
                                {product?.dynamicFields?.bedroom + " "}
                                {t("bedroom")}
                              </span>
                              <span>
                                {" • " + product?.dynamicFields?.bathroom + " "}
                                {t("bathroom")}
                              </span>
                              <span>
                                {" • " + product?.dynamicFields?.size}m
                                <sup>2</sup>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {product?.dynamicFields?.freeDelivery &&
                        !toggleDisplayCards && (
                          <label className="mt-[1px] flex items-center gap-[5px] rounded px-1.5 h-[27.5px] w-fit text-[#006DA1] bg-[#EBF6FB]">
                            <MdLocalShipping />
                            <span className="text-[11.5px]">
                              {t("freeDelivery")}
                            </span>
                          </label>
                        )}

                      {/* Price & Like Button */}
                      <div className="mt-[1px] relative">
                        {product?.dynamicFields?.discount > 0 ? (
                          <p>
                            <span className="text-lg font-semibold text-[#DF2E00]">
                              $
                              {product?.dynamicFields?.discountAs === "$"
                                ? product?.dynamicFields?.price -
                                    product?.dynamicFields?.discount ||
                                  product?.dynamicFields?.salePrice -
                                    product?.dynamicFields?.discount
                                : product?.dynamicFields?.price -
                                    product?.dynamicFields?.price *
                                      (product?.dynamicFields?.discount /
                                        100) ||
                                  product?.dynamicFields?.salePrice -
                                    product?.dynamicFields?.salePrice *
                                      (product?.dynamicFields?.discount / 100)}
                            </span>
                            <span className="text-[14.5px] pl-2 text-gray-600 line-through">
                              $
                              {product?.dynamicFields?.price ||
                                product?.dynamicFields?.salePrice}
                            </span>
                          </p>
                        ) : (
                          <p className="text-lg font-semibold text-[#DF2E00]">
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
                        )}
                      </div>
                    </div>
                  </Link>

                  {product?.accID === accID ? (
                    ""
                  ) : product?.likes?.includes(accID) ? (
                    <button
                      onClick={() => handleUnLike(product?._id, product.accID)}
                      className={`text-gray-400 cursor-pointer focus:outline-none outline-none absolute ${
                        toggleDisplayCards
                          ? "right-[11px] bottom-3"
                          : "right-2.5 bottom-2.5 md:right-6 md:bottom-5"
                      }`}
                    >
                      <p className="flex-shrink-0 text-[#028DCE]">
                        <IoMdHeart className="hidden md:block" size={21} />
                        <IoMdHeart className="md:hidden" size={20} />
                      </p>
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleLike(
                          product?._id,
                          product.accID,
                          product.title,
                          product.photos[0],
                          product?.locations?.province.en,
                          product?.dynamicFields?.price ||
                            product?.dynamicFields?.salePrice ||
                            product?.dynamicFields?.salary
                        )
                      }
                      className={`text-gray-400 cursor-pointer focus:outline-none outline-none absolute ${
                        toggleDisplayCards
                          ? "right-[11px] bottom-3"
                          : "right-2.5 bottom-2.5 md:right-6 md:bottom-5"
                      }`}
                    >
                      <p className="flex-shrink-0">
                        <FiHeart className="hidden md:block" size={19} />
                        <FiHeart className="md:hidden" size={18} />
                      </p>
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CardsProducts;
