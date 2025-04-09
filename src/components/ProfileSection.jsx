import React from "react";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import userIcon from "@/assets/user-icon.png";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ProfileSection = ({
  profile,
  handleFile,
  handleDropOptionViewChange,
}) => {
  const t = useTranslations("AccountPage");
  return (
    <section>
      <div className="bg-[#ffffff] h-[150px] flex justify-between px-[17px] py-[15.7px]">
        <div className={`h-full -translate-y-[61px] space-y-1`}>
          <div>
            <label
              htmlFor={profile?.photoProfile ? "" : "photoProfile"}
              onClick={() =>
                profile?.photoProfile &&
                handleDropOptionViewChange(
                  "photoProfile",
                  profile?.photoProfile
                )
              }
              className="relative w-[90px] h-[90px] -translate-x-[5px] block cursor-pointer"
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-sm bg-white">
                <Image
                  className="w-full h-full object-cover object-center"
                  src={profile?.photoProfile ? profile?.photoProfile : userIcon}
                  width={1000}
                  height={600}
                  priority={false}
                  loading="lazy"
                  alt=""
                />
              </div>
              <button className="absolute bottom-[2px] right-[5px] w-[25px] h-[25px] border-2 border-white bg-[#028DCF] flex items-center justify-center rounded-full">
                <FaPencilAlt className="text-white text-xs" />
              </button>

              <input
                onChange={(e) => handleFile(e)}
                id="photoProfile"
                type="file"
                accept="image/*"
                className="hidden"
                alt="photoProfile"
              />
            </label>
          </div>

          <div className="space-y-1">
            {/* title */}
            <h1 className="capitalize font-semibold text-[20px] text-gray-900">
              {profile?.firstName} {profile?.lastName}
            </h1>
            <h5 className="text-sm text-gray-500">
              {profile && "@" + profile?.username}
            </h5>
            <div className="text-[13px] text-gray-700 hidden items-center space-x-[5px]">
              <p>0 Followers</p>
              <span className="text-lg translate-y-[3px]">•</span>
              <p>0 Following</p>
            </div>
          </div>
        </div>

        <div>
          <Link
            href={"setting/edit-profile"}
            prefetch={true}
            className="select-none focus:outline-none"
          >
            <button className="w-[92.11px] h-[32.41px] border border-gray-600 rounded text-[15px] font-medium select-none focus:outline-none">
              {t("btnEdit")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
