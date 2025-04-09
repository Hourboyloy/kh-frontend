"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
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

function CardSlider({
  setIsPending,
  products,
  setProducts,
  accID,
  token,
  domain,
  page,
  accType,
  productName,
}) {
  const t = useTranslations("cardSellingAndProduct");
  const locale = useLocale();
  const router = useRouter();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [loadingImages, setLoadingImages] = useState({});

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
      router.push("en/login");
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
    <div className="">
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
      />

      <ShareOption
        linkCopy={linkCopy}
        toggleShareOption={toggleShareOption}
        setToggleShareOption={setToggleShareOption}
      />

      <ul className={`flex flex-nowrap gap-[9.7px]`}>
        {products?.map((product, i) => {
          const imageStatus = loadingImages[product?._id];
          const photoUrl = product?.photos[0];

          return (
            <li
              key={product + i}
              className="h-auto min-w-[264px] max-w-[264px] bg-white border border-gray-200 rounded-md overflow-hidden"
            >
              <div className={`h-full flex flex-col`}>
                {/* Image Section */}
                <div className={`bg-gray-50 relative`}>
                  <Link
                    href={`/details/${product.title
                      .replace(/[^\w\s-]/g, "") // Remove special characters & emoji
                      .replace(/\s+/g, "-") // Replace spaces with "-"
                      .toLowerCase()}-${product._id}`}
                    className="focus:outline-none outline-none"
                  >
                    <div className={`h-[175px] md:h-[210px] w-full`}>
                      {imageStatus === "loading" && (
                        <div className="skeleton-loaderCard bg-white h-full w-full"></div>
                      )}

                      {imageStatus === "loaded" &&
                        product.photos.length > 0 &&
                        product.photos[0] && (
                          <Image
                            className={`h-[175px] md:h-[210px] w-full object-cover object-center`}
                            src={photoUrl || null}
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
                      className={`absolute text-white bottom-2 flex items-center gap-1.5 right-2`}
                    >
                      {product?.dynamicFields?.freeDelivery && (
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
                  className={`relative border-t border-gray-200 w-full h-full px-[7px] py-2.5`}
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
                          {product.title.length > 30
                            ? product.title.slice(0, 30) + "..."
                            : product.title}
                        </p>
                        <p className="text-gray-800 text-[14px] mb-[1px] md:hidden">
                          {product.title.length > 18
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
                      className={`text-gray-400 cursor-pointer focus:outline-none outline-none absolute right-[11px] bottom-3`}
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
                      className={`text-gray-400 cursor-pointer focus:outline-none outline-none absolute right-[11px] bottom-3`}
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
        <div className="w-1 pr-0.5"></div>
      </ul>
    </div>
  );
}

export default CardSlider;
