import React from "react";
import Image from "next/image";
import { FaRegImages } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

function PostPhoto({ photos, inputFile, handleClickAlert, t }) {
  return (
    <div>
      <section className="border-t border-b lg:border border-gray-300 rounded-md px-[20px] pb-5 pt-2 bg-white space-y-2">
        <div className=" space-y-0.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] text-gray-600 font-semibold font-sans">
              {t("postAd")}
            </h2>
            <h2 className="text-[19px] text-gray-600 font-semibold">
              {photos?.length || 0}/8
            </h2>
          </div>
          <hr />
        </div>

        {photos?.length > 0 ? (
          <section className=" space-y-2">
            <div
              onClick={() => handleClickAlert(0)}
              className="h-[212px] cursor-pointer relative block rounded-md border border-gray-300 overflow-hidden"
            >
              <Image
                src={photos[0]?.preview || photos[0]}
                width={500}
                height={500}
                quality={100}
                priority
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
              <div className=" absolute flex items-center justify-center w-[23px] h-[24px] bg-white rounded-full top-1 right-1 z-[1] border border-gray-300">
                <CiMenuKebab className="text-xs" />
              </div>
            </div>

            {photos?.length > 1 && (
              <div className="flex gap-2.5 overflow-x-scroll pt-[2px]">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="border rounded-md">
                    {photos[index + 1] ? (
                      <div
                        onClick={() => handleClickAlert(index + 1)}
                        className="cursor-pointer relative w-[53.40px] h-[54px]"
                      >
                        <Image
                          src={photos[index + 1].preview || photos[index + 1]}
                          width={500}
                          height={500}
                          quality={100}
                          alt="Uploaded"
                          className="w-[53.40px] h-[54px] object-cover object-center rounded-md"
                        />

                        <div className=" absolute flex items-center justify-center w-[19px] h-[19px] bg-white rounded-full top-[2px] right-[2px] z-[1] border border-gray-300">
                          <CiMenuKebab className="text-xs" />
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="inputfile"
                        className="w-[53.40px] h-[54px] text-3xl text-gray-500 flex items-center justify-center cursor-pointer"
                      >
                        <FaPlus size={18} />
                        <input
                          id="inputfile"
                          type="file"
                          accept="image/*"
                          onChange={inputFile}
                          className="hidden absolute"
                          alt=""
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            )}

            {photos.length <= 7 && (
              <label
                htmlFor="inputfile"
                className="h-[43.60px] bg-[#E5F3FA] rounded-md border border-[#B7DEF1] flex items-center justify-center space-x-1 text-[#028DCF] select-none relative cursor-pointer"
              >
                <FaRegImages />
                <p className="font-semibold">{t("addPhoto")}</p>
                <input
                  id="inputfile"
                  type="file"
                  accept="image/*"
                  onChange={inputFile}
                  className="hidden absolute"
                  alt=""
                />
              </label>
            )}
          </section>
        ) : (
          <label
            htmlFor="inputfile"
            className="border relative border-gray-300 rounded-md h-[105.60px] mt-1 flex items-center justify-center space-x-2 text-gray-600 cursor-pointer"
          >
            <FaRegImages />
            <span>{t("addPhoto")}</span>
            <input
              id="inputfile"
              type="file"
              accept="image/*"
              onChange={inputFile}
              className="hidden absolute"
              alt=""
            />
          </label>
        )}
      </section>
    </div>
  );
}

export default PostPhoto;
