import React from "react";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";

const CoverPhotoEditorAccount = ({
  profile,
  handleFile,
  handleDropOptionViewChange,
}) => {
  return (
    <section className="relative">
      <label
        onClick={() =>
          profile?.photoCover &&
          handleDropOptionViewChange("photoCover", profile?.photoCover)
        }
        htmlFor={profile?.photoCover ? "" : "photoCover"}
        className="cursor-pointer absolute bottom-[10px] right-[17px] w-[25px] h-[25px] bg-white flex items-center justify-center rounded"
      >
        <FaPencilAlt className="text-[#028DCF]" />
      </label>

      <label
        onClick={() =>
          profile?.photoCover &&
          handleDropOptionViewChange("photoCover", profile?.photoCover)
        }
        htmlFor={profile?.photoCover ? "" : "photoCover"}
        className={`bg-[#028DCF] w-full block cursor-pointer ${
          profile?.photoCover
            ? "h-[200px] md:h-[300px] lg:h-[430px]"
            : "h-[150px]"
        }`}
      >
        <input
          onChange={(e) => handleFile(e)}
          id="photoCover"
          type="file"
          accept="image/*"
          className="hidden"
          alt="photoCover"
        />
        {profile?.photoCover && (
          <Image
            src={profile.photoCover}
            className="h-full w-full object-cover object-center"
            width={1000}
            height={600}
            quality={100}
            alt="photoCover"
            priority={false}
            loading="lazy"
          />
        )}
      </label>
    </section>
  );
};

export default CoverPhotoEditorAccount;
