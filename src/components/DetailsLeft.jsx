import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/helper/formatDate";
import { formatKey } from "@/helper/formatKey";
import { FiHeart } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { GrDeliver } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosShareAlt } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

function DetailsLeft({
  t,
  locale,
  accID,
  product,
  PhoneNumberWithNetworkIcon,
  profile,
  account,
  handleClickShare,
  handleLike,
  handleUnLike,
  handleSave,
  handleRemoveSave,
  handleClickRemoveProduct,
  handleToggleDisplaySliderImg,
}) {
  return (
    <div>
      <section className="w-full space-y-3">
        <div className="border-t border-b lg:border border-gray-200 bg-white space-y-4 pb-[10px]">
          {/* photo */}
          <section className="">
            <div className="w-full h-auto flex justify-center relative overflow-hidden cursor-pointer">
              {product?.photos?.[0] && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-[60px] scale-110"
                    style={{ backgroundImage: `url(${product.photos[0]})` }}
                  ></div>

                  <div
                    onClick={() => handleToggleDisplaySliderImg(0)}
                    className="relative z-[1] flex items-center justify-center w-full"
                  >
                    <Image
                      className="object-cover object-center lg:object-contain w-full h-[350px] md:h-auto max-h-[480px]"
                      src={product.photos[0]}
                      width={800}
                      height={500}
                      alt="Product Image"
                      priority
                      unoptimized
                      quality={100}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product?.photos?.length > 1 && (
              <div className="bg-[#C6C6C6] flex gap-[3px] pt-[3px]">
                {product.photos.slice(1, 3).map((photo, index) => (
                  <div
                    onClick={() => handleToggleDisplaySliderImg(index + 1)}
                    key={index}
                    className="cursor-pointer"
                  >
                    <Image
                      className=" h-[90px] w-[125px] object-cover object-center"
                      src={photo}
                      width={1000}
                      height={1000}
                      alt={`Product Image ${index + 1}`}
                    />
                  </div>
                ))}

                {product.photos.length > 3 && (
                  <div className="relative">
                    <Image
                      onClick={() => handleToggleDisplaySliderImg(3)}
                      className=" h-[90px] w-[125px] md:w-[124px]  object-cover object-center"
                      src={product.photos[3]}
                      width={1000}
                      height={1000}
                      alt="More Images"
                    />
                    {product.photos.length > 4 && (
                      <div onClick={() => handleToggleDisplaySliderImg(3)}>
                        <div className="absolute inset-0 bg-black opacity-40"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold cursor-pointer">
                          +{product.photos.length - 4}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* details */}
          <section className="lg:px-3.5 space-y-5">
            <section className="space-y-2.5 px-3.5 lg:px-0">
              <p className="font-medium">{product?.title}</p>
              <div className="text-[13px] text-gray-600 flex items-center">
                <span className="hidden lg:block">AD ID:</span>
                <span className="px-1 hidden lg:block">{product?._id}</span>
                <span className="hidden lg:block">•</span>
                <span className="px-1">
                  {product?.locations?.province[locale]}
                </span>
                <span>•</span>
                <span className="px-1">{formatDate(product?.updatedAt)}</span>
              </div>

              <div className="flex justify-between">
                <div className=" space-y-1.5">
                  <div className="flex items-center space-x-2">
                    {/* Final Price */}
                    {product?.dynamicFields?.price ||
                    product?.dynamicFields?.salePrice ||
                    product?.dynamicFields?.salary ? (
                      <p className="text-[#DF2E00] font-bold text-[22px]">
                        $
                        {(() => {
                          const price = parseFloat(
                            product?.dynamicFields?.price ||
                              product?.dynamicFields?.salePrice ||
                              product?.dynamicFields?.salary ||
                              0
                          );

                          const discountAs = product?.dynamicFields?.discountAs; // "%" or "$"
                          const discountValue =
                            parseFloat(product?.dynamicFields?.discount) || 0;

                          let finalPrice = price;

                          if (discountAs === "%" && discountValue > 0) {
                            finalPrice = price - (price * discountValue) / 100;
                          } else if (discountAs === "$" && discountValue > 0) {
                            finalPrice = price - discountValue;
                          }

                          return finalPrice.toLocaleString("en-US", {
                            // minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          });
                        })()}
                      </p>
                    ) : (
                      <p className="text-[#DF2E00] font-bold text-[22px]">
                        Negotiable
                      </p>
                    )}

                    {product?.dynamicFields?.discountAs &&
                      product?.dynamicFields?.discount > 0 && (
                        <p className="text-gray-700 text-[12px] bg-[#EBEBEB] px-1.5 p-0.5 rounded line-through">
                          $
                          {parseFloat(
                            product?.dynamicFields?.salePrice ||
                              product?.dynamicFields?.price
                          ).toLocaleString("en-US", {
                            // minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      )}

                    {/* Discount Badge */}
                    {product?.dynamicFields?.discountAs &&
                      product?.dynamicFields?.discount > 0 && (
                        <p className="text-[#AE4B00] text-[12px] bg-[#FCE6D5] px-2 p-0.5 rounded">
                          {product?.dynamicFields?.discountAs === "%"
                            ? `${product.dynamicFields.discount}% OFF`
                            : `$${product.dynamicFields.discount} OFF`}
                        </p>
                      )}
                  </div>

                  {product?.dynamicFields?.freeDelivery && (
                    <button className="flex items-center space-x-1 text-[#006DA1] cursor-text bg-[#E5F3FA] rounded px-2 py-1">
                      <GrDeliver size={15} />{" "}
                      <span className="text-xs">Free Delivery</span>
                    </button>
                  )}
                </div>

                {product?.accID === accID ? (
                  ""
                ) : product?.likes?.includes(accID) ? (
                  <button
                    onClick={handleUnLike}
                    className="flex items-center space-x-1 text-[#7b7a7a] focus:outline-none outline-none"
                  >
                    <IoMdHeart size={27} className="text-[#028DCE]" />
                    <span>{product?.likes?.length || 0}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-1 text-[#7b7a7a] focus:outline-none outline-none"
                  >
                    <FiHeart size={25} />
                    <span>{product?.likes?.length || 0}</span>
                  </button>
                )}
              </div>

              {/* action button */}
              <div
                className={`pt-5 flex items-center space-x-2.5 ${
                  account?._id !== product?.accID ? "hidden" : ""
                } ${locale == "en" ? " font-sans" : "font-battambang"}`}
              >
                <button
                  onClick={handleClickRemoveProduct}
                  className="w-full h-[40px] bg-[#fae1e1] hover:bg-white transition-all duration-300 text-[#a3371d] rounded select-none outline-none focus:outline-none"
                >
                  {t("deleteBtn")}
                </button>

                <Link
                  href={`/post/${product?._id}`}
                  className="w-full flex items-center justify-center h-[40px] bg-[#e5f2fa] hover:bg-white transition-all duration-300 text-[#25ace0] rounded select-none outline-none focus:outline-none"
                >
                  {t("editBtn")}
                </Link>
              </div>
            </section>

            <div className="lg:hidden flex items-center justify-center py-2.5 bg-gray-100">
              <Image
                src={require("@/assets/happy-news-year-2025.jpg")}
                alt="Happy New Year 2025"
                width={0}
                height={0}
              />
            </div>

            {/* dynamic fields */}
            <section className="space-y-2 px-3.5 lg:px-0">
              <p className="font-medium pb-2 lg:hidden">Details</p>
              <div className=" lg:hidden">
                <span className="">ID:</span>
                <span className="px-1">{product?._id}</span>
              </div>
              <p className="lg:hidden">Like : {product?.likes.length}</p>
              <p>Main Category : {product?.mainCategory}</p>
              <p>Category : {product?.subCategory}</p>

              {product?.dynamicFields && (
                <div className="space-y-2.5">
                  {[
                    "brand",
                    "model",
                    "vehicleType",
                    "type",
                    "accessory",
                    "network",
                  ].map((key) =>
                    product.dynamicFields[key] ? (
                      <p key={key}>
                        {formatKey(key)}: {product.dynamicFields[key]}
                      </p>
                    ) : null
                  )}

                  {Object.entries(product.dynamicFields)
                    .filter(
                      ([key]) =>
                        ![
                          "freeDelivery",
                          "salePrice",
                          "price",
                          "salary",
                          "discountAs",
                          "discount",
                          //
                          "brand",
                          "model",
                          "vehicleType",
                          "type",
                          "accessory",
                          "network",
                        ].includes(key)
                    )
                    .map(([key, value]) => (
                      <p key={key}>
                        {formatKey(key)}: {value}
                      </p>
                    ))}
                </div>
              )}
            </section>

            {/* descriptions */}
            <section className=" space-y-2 pt-2 px-3.5 lg:px-0">
              {product?.descriptions?.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </section>

            <section className="px-3.5 lg:px-0">
              <div className="space-x-1">
                <span className="font-semibold">{t("contactInfo")}:</span>
                <span>{t("notContactToClient")}</span>
              </div>

              <div className="pt-2">
                <PhoneNumberWithNetworkIcon product={product} />
              </div>
            </section>

            <section className="space-x-1 px-3.5 lg:px-0">
              <span className="font-semibold">{t("location")}:</span>
              <span>
                {product?.address +
                  ", " +
                  product?.locations?.commune[locale] +
                  ", " +
                  product?.locations?.district[locale] +
                  ", " +
                  product?.locations?.province[locale]}
              </span>
            </section>
          </section>

          {/* save report share */}
          <section className="flex items-center space-x-2.5 border-t pt-3 px-3.5">
            {product?.accID === accID ? (
              ""
            ) : product?.saves?.includes(accID) ? (
              <div className=" w-full">
                <button
                  onClick={handleRemoveSave}
                  className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none text-nowrap"
                >
                  <FaBookmark className="text-gray-600" />
                  <span className="text-gray-700 font-semibold">
                    {t("savedBtn")}
                  </span>
                </button>
              </div>
            ) : (
              <div className=" w-full">
                <button
                  onClick={handleSave}
                  className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none text-nowrap"
                >
                  <FaBookmark className="text-gray-600" />
                  <span className="text-gray-700 font-semibold">
                    {" "}
                    {t("saveBtn")}
                  </span>
                </button>
              </div>
            )}

            {product?.accID === accID ? (
              ""
            ) : (
              <div className="w-full">
                <button className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none text-nowrap">
                  <PiWarningCircleFill className="text-gray-600" size={19} />
                  <span className="text-gray-700 font-semibold">
                    {t("reportBtn")}
                  </span>
                </button>
              </div>
            )}

            <div className="w-full">
              <button
                onClick={handleClickShare}
                className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none text-nowrap"
              >
                <IoIosShareAlt className="text-gray-600" size={24} />
                <span className="text-gray-700 font-semibold">
                  {" "}
                  {t("shareBtn")}
                </span>
              </button>
            </div>
          </section>
        </div>

        {/* about secure */}
        <div className="hidden lg:block p-4 border-l-[5px] border-l-[#FF8900] bg-white space-y-3 text-gray-600 border border-gray-200">
          <p className="text-[#CD4B00] font-semibold text-sm">
            ការមិនទទួលខុសត្រូវ / Disclaimer
          </p>
          <p className="text-[13px]">
            យើងខ្ញុំមិនគ្រប់គ្រងមាតិកា ដែលបានបង្ហោះឡើងដោយសមាជិកឡើយ។
            ដូច្នេះយើងមិនទទួលខុសត្រូវលើការផ្សាយផលិតផលនេះទេ
            ហើយក៏មិនធានាចំពោះបញ្ហាដែលទាក់ទងដោយផ្ទាល់ ឬ ប្រយោលទៅនឹងសកម្មភាព ឬ
            អសកម្មណាមួយឡើយ។
          </p>
          <p className="text-[13px]">
            We does not control the content posted by members and therefore
            assumes no responsibility and disclaims any liability for any
            consequence relating directly or indirectly to any action or
            inaction.
          </p>
        </div>

        {/* product owner */}
        <div className="bg-white p-3 pb-5 border-t border-b lg:border border-gray-200 space-y-3">
          <Link
            href={`/${profile?.username}`}
            className="flex items-center space-x-2.5 focus:outline-none outline-none"
          >
            <div>
              <Image
                className="w-[60px] h-[60px] rounded-full object-cover object-center"
                src={profile?.photoProfile || require(`@/assets/user-icon.png`)}
                width={500}
                height={500}
                alt=""
              />
            </div>

            <div className="leading-none space-y-0.5">
              <p className="text-sm font-semibold text-gray-800">
                {/* {[profile?.firstName, profile?.lastName]
                  .filter(Boolean)
                  .join(" ") || "N/A"} */}

                {product?.name || "N/A"}
              </p>
              <p className="text-[13px] text-gray-800">
                @{profile?.username || "N/A"}
              </p>
              <p className="text-[13px] text-gray-600">
                {t("membersSince")}{" "}
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-2.5">
            <Link
              href={`/${profile?.username}`}
              className="w-full h-[34px] bg-[#E5F3FA] text-[#006DA1]  flex items-center justify-center rounded select-none focus:outline-none outline-none"
            >
              {t("viewProfileBtn")}
            </Link>
            {product?.accID !== accID && (
              <button className="px-10 md:px-16 lg:px-24 h-[34px] border text-nowrap border-[#006DA1] text-[#006DA1] flex items-center justify-center space-x-1.5 rounded  select-none focus:outline-none outline-none">
                <FaPlus size={14} /> <span> {t("followBtn")}</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetailsLeft;
