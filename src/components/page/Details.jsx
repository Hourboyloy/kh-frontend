"use client";
import React, { use, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { formatDate } from "@/helper/formatDate";
import { formatKey } from "@/helper/formatKey";
import { FiHeart } from "react-icons/fi";
import { GrDeliver } from "react-icons/gr";
import { FaBookmark } from "react-icons/fa";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosShareAlt } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});

function Page({ params }) {
  const { domain } = useAppContext();
  const { id } = use(params);
  const match = id.match(/([a-f0-9]{24})$/);
  const getid = match ? match[0] : null;

  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${domain}/product/${getid}`);

      if (res.status === 200) {
        setProfile(res.data?.profile || null);
        setProduct(res.data?.product || null);
        setRelatedPosts(res.data?.relatedPosts || []);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }, [domain, getid]);

  useEffect(() => {
    var isMounted = true;

    fetchData().catch(console.error);

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  const getNetworkIcon = (phoneNumber) => {
    if (!phoneNumber) return null; // Check if phoneNumber is available

    if (
      phoneNumber.startsWith("011") ||
      phoneNumber.startsWith("012") ||
      phoneNumber.startsWith("017") ||
      phoneNumber.startsWith("061") ||
      phoneNumber.startsWith("076") ||
      phoneNumber.startsWith("077") ||
      phoneNumber.startsWith("078") ||
      phoneNumber.startsWith("079") ||
      phoneNumber.startsWith("085") ||
      phoneNumber.startsWith("089") ||
      phoneNumber.startsWith("092") ||
      phoneNumber.startsWith("095") ||
      phoneNumber.startsWith("099")
    ) {
      return (
        <Image
          className="w-[18px] h-[18px] object-center object-cover"
          src={require(`@/assets/cellcard.png`)}
          width={500}
          height={500}
          alt=""
        />
      );
    }

    if (
      phoneNumber.startsWith("031") ||
      phoneNumber.startsWith("060") ||
      phoneNumber.startsWith("066") ||
      phoneNumber.startsWith("067") ||
      phoneNumber.startsWith("068") ||
      phoneNumber.startsWith("071") ||
      phoneNumber.startsWith("088") ||
      phoneNumber.startsWith("090") ||
      phoneNumber.startsWith("097")
    ) {
      return (
        <Image
          className="w-[18px] h-[18px] object-center object-cover"
          src={require(`@/assets/metfone.webp`)}
          width={500}
          height={500}
          alt=""
        />
      );
    }

    if (
      phoneNumber.startsWith("010") ||
      phoneNumber.startsWith("015") ||
      phoneNumber.startsWith("016") ||
      phoneNumber.startsWith("069") ||
      phoneNumber.startsWith("070") ||
      phoneNumber.startsWith("081") ||
      phoneNumber.startsWith("086") ||
      phoneNumber.startsWith("087") ||
      phoneNumber.startsWith("093") ||
      phoneNumber.startsWith("098") ||
      phoneNumber.startsWith("096")
    ) {
      return (
        <Image
          className="w-[18px] h-[18px] object-center object-cover"
          src={require(`@/assets/smart.png`)}
          width={500}
          height={500}
          alt=""
        />
      );
    }

    return null;
  };

  const PhoneNumberWithNetworkIcon = ({ product }) => {
    if (!product || !product.phoneNum) {
      return <div>Loading...</div>;
    }

    const networkIcon = getNetworkIcon(product.phoneNum);
    const maskedPhone = product.phoneNum.slice(0, 7) + "xxx";

    return (
      <div className="flex items-center space-x-2">
        <p>{networkIcon}</p>
        <div className="flex items-center space-x-2 text-[#006DA1]">
          <span>{isVisible ? product.phoneNum : maskedPhone}</span>
          {!isVisible && (
            <button
              onClick={handleVisible}
              className="text-[14px] border-b border-[#006DA1] border-dashed"
            >
              <i>Click To Call</i>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1104px] mx-auto pt-5 mb-[118px] font-sans min-h-screen">
      <div>
        <div className="flex items-center justify-center">
          <Image
            src={require("@/assets/happy-news-year-2025.jpg")}
            alt="Happy New Year 2025"
            width={0}
            height={0}
          />
        </div>
      </div>

      <div className="flex items-center space-x-[8.5px] text-[#006DA1] text-[15px] py-3.5">
        <Link href={"/en"} className="flex items-center space-x-1">
          <IoHomeOutline />
          <span>Home</span>
        </Link>
        <p className="text-gray-800">/</p>
        <Link href={"/en"}>{product?.mainCategory}</Link>
        <p className="text-gray-800">/</p>
        <Link href={"/en"}>{product?.subCategory}</Link>
      </div>

      <div className="flex justify-between space-x-5">
        <section className="w-[725.9px] space-y-3">
          <div className="border border-gray-200 bg-white space-y-4 pb-[10px]">
            {/* photo */}
            <section>
              <div className="w-full flex justify-center h-[480px] relative overflow-hidden cursor-pointer">
                {product?.photos?.[0] && (
                  <>
                    {/* Background Blur */}
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-[90px] scale-110"
                      style={{ backgroundImage: `url(${product.photos[0]})` }}
                    ></div>

                    {/* Main Image */}
                    <Image
                      className="h-[480px] w-auto object-cover object-center relative z-[1]"
                      src={product.photos[0]}
                      width={800}
                      height={500}
                      alt="Product Image"
                      priority
                      unoptimized
                      quality={100}
                    />
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product?.photos?.length > 1 && (
                <div className="bg-[#C6C6C6] flex gap-[3px] pt-[3px]">
                  {product.photos.slice(1, 3).map((photo, index) => (
                    <div key={index} className="cursor-pointer">
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
                        className=" h-[90px] w-[124px]  object-cover object-center"
                        src={product.photos[3]}
                        width={1000}
                        height={1000}
                        alt="More Images"
                      />
                      {product.photos.length > 4 && (
                        <div className="">
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
            <section className="px-3.5 space-y-5">
              <section className="space-y-2.5">
                <p className="font-medium">{product?.title}</p>
                <div className="text-[13px] text-gray-600">
                  <span className="">AD ID:</span>
                  <span className="px-1">{product?._id}</span>•
                  <span className="px-1">{product?.locations?.province}</span>•
                  <span className="px-1">{formatDate(product?.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <div className=" space-y-1.5">
                    <p className="text-[#DF2E00] font-semibold text-[22px]">
                      $
                      {(
                        parseFloat(
                          product?.dynamicFields?.price ||
                            product?.dynamicFields?.salePrice ||
                            product?.dynamicFields?.salary ||
                            0
                        ) || 0
                      )
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        .replace(/\.00$/, "")}
                    </p>
                    {product?.dynamicFields?.freeDelivery && (
                      <button className="flex items-center space-x-1 text-[#006DA1] cursor-text bg-[#E5F3FA] rounded px-2 py-1">
                        <GrDeliver size={15} />{" "}
                        <span className="text-xs">Free Delivery</span>
                      </button>
                    )}
                  </div>

                  <button className="flex items-center space-x-1 text-[#7b7a7a] focus:outline-none outline-none">
                    <FiHeart size={25} />
                    <span>2</span>
                  </button>
                </div>
              </section>

              {/* dynamic fields */}
              <section className="space-y-2">
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
              <section className=" space-y-2 pt-2">
                {product?.descriptions?.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </section>

              <section>
                <div className="space-x-1">
                  <span className="font-semibold">Contact Info:</span>
                  <span>
                    Please don`&apos;t forget to mention that you found this ad
                    on khmer24.com.
                  </span>
                </div>

                <div className="pt-2">
                  <PhoneNumberWithNetworkIcon product={product} />
                </div>
              </section>

              <section className="space-x-1">
                <span className="font-semibold">Location:</span>
                <span>
                  {product?.address +
                    ", " +
                    product?.locations?.commune +
                    ", " +
                    product?.locations?.district +
                    ", " +
                    product?.locations?.province}
                </span>
              </section>
            </section>

            <section className="flex items-center space-x-2.5 border-t pt-3 px-3.5">
              <button className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none">
                <FaBookmark className="text-gray-600" />
                <span className="text-gray-700 font-semibold">Save</span>
              </button>

              <button className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none">
                <PiWarningCircleFill className="text-gray-600" size={19} />
                <span className="text-gray-700 font-semibold">Report</span>
              </button>

              <button className="w-full h-[38px] flex items-center justify-center bg-[#F0F0F0] space-x-1 px-2 py-1 rounded select-none focus:outline-none outline-none">
                <IoIosShareAlt className="text-gray-600" size={24} />
                <span className="text-gray-700 font-semibold">Share</span>
              </button>
            </section>
          </div>

          <div className="p-4 border-l-[5px] border-l-[#FF8900] bg-white space-y-3 text-gray-600 border border-gray-200">
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

          <div className="bg-white p-3 pb-5 border border-gray-200 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div>
                <Image
                  className="w-[60px] h-[60px] rounded-full object-cover object-center"
                  src={
                    profile?.photoProfile || require(`@/assets/user-icon.png`)
                  }
                  width={500}
                  height={500}
                  alt=""
                />
              </div>

              <div className="leading-none space-y-0.5">
                <p className="text-sm font-semibold text-gray-800">
                  {[profile?.firstName, profile?.lastName]
                    .filter(Boolean)
                    .join(" ") || "N/A"}
                </p>
                <p className="text-[13px] text-gray-800">
                  @{profile?.username || "N/A"}
                </p>
                <p className="text-[13px] text-gray-600">
                  Members Since{" "}
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2.5">
              <button className="w-full h-[34px] bg-[#E5F3FA] text-[#006DA1]  flex items-center justify-center rounded">
                View Profile
              </button>
              <button className="px-24 h-[34px] border text-nowrap border-[#006DA1] text-[#006DA1] flex items-center justify-center space-x-1.5 rounded">
                <FaPlus size={14} /> <span>Follow</span>
              </button>
            </div>
          </div>
        </section>

        <section className="w-[349.4px] space-y-10 min-h-screen">
          <div className=" top-[62px] sticky space-y-5">
            <section className="w-full border border-gray-200 bg-[#FFFBF6] rounded overflow-hidden">
              <div className="flex items-center space-x-2.5 bg-[#018CCF] px-4 py-3">
                <div>
                  <Image
                    className="w-[60px] h-[60px] rounded-full object-cover object-center"
                    src={
                      profile?.photoProfile || require(`@/assets/user-icon.png`)
                    }
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>

                <div className="leading-none space-y-1 text-white">
                  <p className="text-sm font-semibold">
                    {[profile?.firstName, profile?.lastName]
                      .filter(Boolean)
                      .join(" ") || "N/A"}
                  </p>
                  <p className="text-[13px]">@{profile?.username || "N/A"}</p>
                  <p className="text-[13px] pt-[1px]">
                    Members Since{" "}
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 space-y-3">
                <PhoneNumberWithNetworkIcon product={product} />
                <Link
                  href={`/${profile?.username}`}
                  className=" focus:outline-none outline-none flex items-center space-x-2 border-t border-gray-200 py-2 text-gray-800"
                >
                  <HiOutlineBuildingStorefront size={21} />
                  <span> https://www.khmer24.com/{profile?.username}</span>
                </Link>
              </div>
            </section>

            <section className="w-full border border-[#FCD8C1] bg-[#FFFBF6] px-3.5 pt-4 pb-6 space-y-3.5 rounded">
              <div className="flex  items-center justify-center space-x-1.5">
                <div>
                  <Image
                    className="w-[32px] h-[32px] object-cover object-center"
                    src={require(`@/assets/warranty.png`)}
                    width={500}
                    height={500}
                    alt=""
                  />
                </div>
                <div className="text-[#DF2E00] font-semibold text-sm leading-none space-y-1">
                  <p>ព័ត៌មានសុវត្ថិភាពសម្រាប់អ្នកទិញ</p>
                  <p className="font-bold">Safety Tips for Buyers</p>
                </div>
              </div>
              <ul className="text-[13.5px] list-decimal space-y-3.5">
                <li className="flex items-center space-x-2">
                  <p className="text-[15px]">1.</p>
                  <div className="leading-none space-y-1">
                    <p>មិនត្រូវធ្វើការផ្ញើប្រាក់ទៅមុន មុនពេលទទួលទំនិញ</p>
                    <p>Do note sent money before receiving the goods</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <p className="text-[15px]">2.</p>
                  <div className="leading-none space-y-1">
                    <p>សូមពិនិត្យមើលទំនិញមុនពេលដែលអ្នកទិញ</p>
                    <p>Check the item before you buy</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <p className="text-[15px]">3.</p>
                  <div className="leading-none space-y-1">
                    <p>បង់ប្រាក់បន្ទាប់ពីទទួលបានទំនិញ</p>
                    <p>Payment ofter receiving the goods</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <p className="text-[15px]">4.</p>
                  <div className="leading-none space-y-1">
                    <p>ត្រូវជួបអ្នកលក់នៅទីតាំងដែលមានសុវត្ថិភាព</p>
                    <p>Meet the seller at a safe location</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>

      <div className="mt-3.5 space-y-2.5">
        <h3 className="text-xl text-gray-700 font-semibold">Related posts</h3>
        <CardsProducts
          products={relatedPosts}
          toggleDisplayCards={true}
          loadingImage={[]}
        />
      </div>
    </div>
  );
}

export default Page;
