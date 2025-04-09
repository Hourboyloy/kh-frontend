"use client";
import React, { use, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";
import { useAppContext } from "@/context/GlobalContext";

import { IoHomeOutline } from "react-icons/io5";
import { useLocale, useTranslations } from "next-intl";

const SmHeader = dynamic(() => import("@/components/SmHeader"), {
  ssr: false,
});

const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});

const DetailsLeft = dynamic(() => import("@/components/DetailsLeft"), {
  ssr: false,
});

const DetailsRight = dynamic(() => import("@/components/DetailsRight"), {
  ssr: false,
});

const ShareOption = dynamic(() => import("@/components/buttons/ShareOption"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

const DeleteReasonProduct = dynamic(
  () => import("@/components/buttons/DeleteReasonProduct"),
  { ssr: false }
);

const SkeletonPageDetails = dynamic(
  () => import("@/components/skeletons/SkeletonPageDetails"),
  { ssr: false }
);

const NotFound = dynamic(() => import("@/components/NotFound"), {
  ssr: false,
});
const SliderImg = dynamic(() => import("@/components/SliderImg"), {
  ssr: false,
});

function Page({ params }) {
  const t = useTranslations("detailsPage");
  const locale = useLocale();
  const router = useRouter();
  const { domain, account, token, changePage, ads } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;
  const { id } = use(params);
  const match = id.match(/([a-f0-9]{24})$/);
  const getid = match ? match[0] : null;

  const [product, setProduct] = useState(null);
  const [profile, setProfile] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [toggleDeleteReason, setToggleDeleteReason] = useState(false);

  const [toggleDisplaySliderImg, setToggleDisplaySliderImg] = useState(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const [toggleShareOption, setToggleShareOption] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [proId, setProID] = useState("");
  const [proUserID, setProUserID] = useState("");
  const [province, setProvince] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${domain}/product/${getid}`);

      if (res.status === 200) {
        const ProductRes = res.data?.product;
        setProfile(res.data?.profile || null);
        setProduct(ProductRes || null);
        setRelatedPosts(res.data?.relatedPosts || []);

        setProID(ProductRes?._id);
        setProUserID(ProductRes?.accID);
        setProvince(ProductRes?.locations?.province);
        setPhotoUrl(ProductRes?.photos[0]);
        setTitle(ProductRes?.title);
        setPrice(
          ProductRes?.dynamicFields?.price ||
            ProductRes?.dynamicFields?.salePrice ||
            ProductRes?.dynamicFields?.salary
        );
      }
    } catch (error) {
      setTimeout(() => {
        setNotFound(true);
      }, 2000);
      console.error("Error fetching product data:", error);
    }
  }, [domain, getid]);

  const handleToggleDisplaySliderImg = (index) => {
    if (!toggleDisplaySliderImg) {
      setDisplayIndex(index);
    }
    setTimeout(() => {
      setToggleDisplaySliderImg((prev) => !prev);
    }, 200);
  };

  useEffect(() => {
    changePage();
    const controller = new AbortController();
    fetchData().catch(console.error);
    return () => {
      controller.abort();
    };
  }, [fetchData]);

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
    if (!product || !product.phoneNum || product.phoneNum.length === 0) {
      return <div>Loading...</div>;
    }

    const handleVisible = () => {
      setIsVisible((prev) => !prev);
    };

    return (
      <div className="space-y-2">
        {product.phoneNum.map((phone, index) => {
          const networkIcon = getNetworkIcon(phone);
          const maskedPhone = phone.slice(0, 7) + "xxx"; // Mask the phone number

          return (
            <div key={index} className="flex items-center space-x-2">
              <p>{networkIcon}</p>
              <div className="flex items-center space-x-2 text-[#006DA1]">
                <span>{isVisible ? phone : maskedPhone}</span>
                {!isVisible && (
                  <button
                    onClick={handleVisible}
                    className="text-[14px] border-b border-[#006DA1] border-dashed"
                  >
                    <i className="font-battambang">{t("clickCall")}</i>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleClickRemoveProduct = () => {
    setToggleDeleteReason(true);
  };

  const handleClickShare = () => {
    setToggleShareOption(true);
  };

  const handleLike = async () => {
    if (!account?._id) {
      return router.push("/login");
    }
    if (account?._id === proUserID) return;
    setIsPending(true);
    try {
      const res = await axios.post(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/like/product/${proId}/account/${account?._id}`,
        {
          title,
          photoUrl,
          province,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        setIsPending(false);
        setProduct((prev) => ({ ...prev, likes: res.data.likes }));
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error liking product:", error);
    }
  };

  const handleUnLike = async () => {
    if (!account?._id) {
      return router.push("/login");
    }
    if (account?._id === proUserID) return;
    try {
      setIsPending(true);
      const res = await axios.delete(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/like/product/${proId}/account/${account?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        const updatedLikes = res.data.likes;
        setProduct((prev) => ({ ...prev, likes: updatedLikes }));
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error liking product:", error);
    }
  };

  const handleSave = async () => {
    if (!account?._id) {
      return router.push("/login");
    }
    if (account?._id === proUserID) return;
    setIsPending(true);
    try {
      const res = await axios.post(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/save/product/${proId}/account/${account?._id}`,
        {
          title: title,
          photoUrl,
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
        setIsPending(false);
        setProduct((prev) => ({ ...prev, saves: res.data.saves }));
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error saving product:", error);
    }
  };

  const handleRemoveSave = async () => {
    if (!account?._id) {
      return router.push("/login");
    }
    if (account?._id === proUserID) return;
    setIsPending(true);
    try {
      const res = await axios.delete(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/save/product/${proId}/account/${account?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setIsPending(false);
        const updatedSaves = res.data.saves;
        setProduct((prev) => ({ ...prev, saves: updatedSaves }));
      }
    } catch (error) {
      setIsPending(false);
      console.error("Error saving product:", error);
    }
  };

  return (
    <div>
      <SliderImg
        images={product?.photos}
        displayIndex={displayIndex}
        setDisplayIndex={setDisplayIndex}
        handleToggleDisplaySliderImg={handleToggleDisplaySliderImg}
        toggleDisplaySliderImg={toggleDisplaySliderImg}
      />

      {notFound ? (
        <div className="lg:pt-5">
          <NotFound />
        </div>
      ) : (
        <div>
          <div className="top-0 sticky z-[9] lg:hidden w-full">
            <SmHeader
              name={"Khmer24"}
              currentAt="details"
              handleSave={handleSave}
              handleRemoveSave={handleRemoveSave}
              isSaved={product?.saves?.includes(account?._id)}
              handleClickShare={handleClickShare}
            />
          </div>
          {product === null ? (
            <div className="max-w-[1104px] mx-auto">
              <SkeletonPageDetails />
            </div>
          ) : (
            <div>
              <DeleteReasonProduct
                domain={domain}
                isDetailsPage={true}
                setIsPending={setIsPending}
                accID={account?._id}
                accType={account?.type}
                token={token}
                proID={proId}
                toggleDeleteReason={toggleDeleteReason}
                setToggleDeleteReason={setToggleDeleteReason}
              />

              {isPending && <Loading />}

              <ShareOption
                toggleShareOption={toggleShareOption}
                setToggleShareOption={setToggleShareOption}
                linkCopy={`${product?.title
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${product?._id}`}
              />

              <div className="max-w-[1104px] mx-auto lg:pt-5 lg:mb-[118px] mb-[50px] font-sans min-h-screen lg:px-4 xl:px-0">
                {ads.length > 0 && (
                  <div className="hidden lg:flex items-center justify-center lg:pt-5">
                    <Image
                      className="w-full lg:w-auto lg:h-[250px] object-cover object-center"
                      src={
                        ads[3]?.image || ads[2]?.image || ads[1]?.image || ""
                      }
                      priority
                      alt=""
                      width={600}
                      height={800}
                    />
                  </div>
                )}

                <div className="hidden lg:flex items-center space-x-[8.5px] text-[#006DA1] text-[15px] py-3.5">
                  <Link href={"/"} className="flex items-center space-x-1">
                    <IoHomeOutline />
                    <span>Home</span>
                  </Link>
                  <p className="text-gray-800">/</p>
                  <Link href={"/"}>{product?.mainCategory}</Link>
                  <p className="text-gray-800">/</p>
                  <Link href={"/"}>{product?.subCategory}</Link>
                </div>

                <div className="flex justify-between space-x-5">
                  <div className="w-full lg:w-[725.9px]">
                    <DetailsLeft
                      t={t}
                      locale={locale}
                      accID={account?._id}
                      product={product}
                      handleClickShare={handleClickShare}
                      PhoneNumberWithNetworkIcon={PhoneNumberWithNetworkIcon}
                      profile={profile}
                      account={account}
                      handleLike={handleLike}
                      handleUnLike={handleUnLike}
                      handleSave={handleSave}
                      handleRemoveSave={handleRemoveSave}
                      handleClickRemoveProduct={handleClickRemoveProduct}
                      handleToggleDisplaySliderImg={
                        handleToggleDisplaySliderImg
                      }
                    />
                  </div>

                  <div className="w-[349.4px] min-h-screen hidden lg:block">
                    <DetailsRight
                      t={t}
                      profile={profile}
                      product={product}
                      PhoneNumberWithNetworkIcon={PhoneNumberWithNetworkIcon}
                    />
                  </div>
                </div>

                <div className="mt-3.5 space-y-2.5 px-3 lg:px-1">
                  <h3 className="text-xl text-gray-800 font-semibold">
                    {t("relatedPosts")}
                  </h3>
                  <CardsProducts
                    setProducts={setRelatedPosts}
                    products={relatedPosts}
                    toggleDisplayCards={true}
                    loadingImage={[]}
                    domain={domain}
                    token={token}
                    accID={account?._id}
                    accType={account?.tpye}
                    setIsPending={setIsPending}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Page;
