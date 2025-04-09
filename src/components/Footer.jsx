import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import KhmerFooter from "../assets/FooterImgs/khmer_footer.png";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import QRCode from "../assets/FooterImgs/qr-code.png";
import AppStore from "../assets/FooterImgs/appstore.png";
import APPGallery from "../assets/FooterImgs/appGallery_.jpg";
import playstore from "../assets/FooterImgs/playstore.png";
import download from "../assets/FooterImgs/download.png";

function Footer() {
  const t = useTranslations("Footer");
  return (
    <div>
      <section className="max-w-[1140px] mx-auto px-[18px] flex items-center justify-center">
        <div className="">
          <Image
            className="xl:translate-y-[42.5px] translate-y-[40.8px] -z-0 xl:w-[1002px] w-[952px]"
            src={KhmerFooter}
            width={1000}
            height={1000}
            alt="Khmer Footer"
          />
        </div>
      </section>

      <section className="min-h-[293.90px] bg-[#006699] sticky">
        <div className="max-w-[1140px] mx-auto px-[18px] pt-11 pb-4 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 md:gap-10 lg:gap-0 text-white">
          <section className="space-y-4">
            <h2 className="font-semibold pb-1">{t("follow")}</h2>
            <div>
              <Link
                href="/"
                className="flex items-center space-x-[9px] focus:outline-none outline-none"
              >
                <span className="text-4xl">
                  <FaFacebook />
                </span>
                <span className="text-sm">Facebook</span>
              </Link>
            </div>

            <div>
              <Link
                href="/"
                className="flex items-center space-x-[9px] focus:outline-none outline-none"
              >
                <span className="text-[27px] text-red-600 bg-white p-1 rounded-full">
                  <FaYoutube />
                </span>
                <span className="text-sm">Youtube</span>
              </Link>
            </div>
          </section>

          <section className="xl:pl-[15px] space-y-[6px] md:space-y-[19px]">
            <h2 className="font-semibold pb-1">{t("cusServices.title")}</h2>
            <section className="text-sm space-y-[10px]">
              <div>
                <Link href="/" className="focus:outline-none outline-none">
                  {t("cusServices.contactUs")}
                </Link>
              </div>
              <div>
                <Link href="/" className="focus:outline-none outline-none">
                  {t("cusServices.membership")}
                </Link>
              </div>
              <div>
                <Link href="/" className="focus:outline-none outline-none">
                  {t("cusServices.privacyPolicy")}
                </Link>
              </div>
            </section>
          </section>

          <section className="xl:pl-[15px] space-y-[6px] md:space-y-[19px]">
            <h2 className="font-semibold pb-1">
              {t("usefulInformation.title")}
            </h2>
            <section className="text-sm space-y-[8px]">
              <div className="pb-[2px]">
                <Link href="/" className="focus:outline-none outline-none">
                  {t("usefulInformation.safetyTips")}
                </Link>
              </div>
              <div className="pb-[0.5px]">
                <Link href="/" className="focus:outline-none outline-none">
                  {t("usefulInformation.postingRule")}
                </Link>
              </div>
              <div>
                <Link href="/" className="focus:outline-none outline-none">
                  {t("usefulInformation.feedback")}
                </Link>
              </div>
            </section>
          </section>

          <section className="xl:pl-[15px] space-y-[19px] col md:col-span-4 lg:col-span-1 pb-5 lg:pb-0">
            <h2 className="font-semibold">{t("downloadApp")}</h2>
            <section className="text-sm flex items-center">
              <div className="w-[117.89px] h-[117.89px]">
                <Image
                  className="w-full h-full object-cover object-center"
                  width={1000}
                  height={1000}
                  src={QRCode}
                  alt=""
                />
              </div>
              <section className="space-y-[5.5px] xl:translate-x-[21px] translate-x-[9px]">
                <div className="w-[121.86px] h-[35px] rounded-lg overflow-hidden">
                  <Image
                    className="w-full object-cover object-center"
                    width={243.72} // Double the display width for HD
                    height={70} // Double the display height for HD
                    src={AppStore}
                    alt="App Store"
                  />
                </div>
                <div className="w-[121.86px] h-[35px] rounded-lg pb-[1px]">
                  <Image
                    className="w-full object-cover object-center"
                    width={243.72}
                    height={70}
                    src={playstore}
                    alt="Play Store"
                  />
                </div>
                <div className="w-[121.86px] h-[35px] rounded-lg overflow-hidden">
                  <Image
                    className="w-full object-cover object-center"
                    width={243.72}
                    height={70}
                    src={APPGallery}
                    alt="App Gallery"
                  />
                </div>
              </section>
            </section>
            <section className="flex items-center justify-end space-x-2.5 pt-1 lg:pt-[18px]">
              <p>{t("weAccept")}:</p>
              <div className="w-[60px] h-[34.8px]">
                <Image
                  className="w-full h-full object-cover object-center"
                  width={1000}
                  height={1000}
                  src={download}
                  alt=""
                />
              </div>
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Footer;
