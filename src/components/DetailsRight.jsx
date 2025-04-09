import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

function DetailsRight({ profile, PhoneNumberWithNetworkIcon, product, t }) {
  return (
    <section className="space-y-10 h-full">
      <div className=" top-[62px] sticky space-y-5">
        <section className="w-full border border-gray-200 bg-[#FFFBF6] rounded overflow-hidden">
          <Link
            href={`/${profile?.username}`}
            className=" select-none focus:outline-none outline-none"
          >
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
                  {/* {[profile?.firstName, profile?.lastName]
                    .filter(Boolean)
                    .join(" ") || "N/A"} */}
                  {product?.name || "N/A"}
                </p>
                <p className="text-[13px]">@{profile?.username || "N/A"}</p>
                <p className="text-[13px] pt-[1px]">
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
            </div>
          </Link>
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
  );
}

export default DetailsRight;
