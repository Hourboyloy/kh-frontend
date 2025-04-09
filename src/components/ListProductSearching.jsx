import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/helper/formatDate";

function ListProductSearching({ products, keyword, t, locale }) {
  return (
    <div className="w-full pt-4 space-y-4">
      <h1
        className={`font-bold px-2.5 ${
          locale == "en" ? "font-sans" : "font-battambang"
        }`}
      >
        {" "}
        {t("posts")}
      </h1>

      <ul className="grid grid-cols-1 gap-[14px]">
        {products?.map((pro, i) => (
          <li key={pro + i}>
            <Link
              href={`/details/${pro.title
                ?.replace(/[^\w\s-]/g, "")
                ?.replace(/\s+/g, "-")
                ?.toLowerCase()}-${pro._id}`}
              className={`focus:outline-none outline-none bg-white flex space-x-3.5 px-2.5 py-2.5 border border-gray-300 rounded`}
            >
              <div className="">
                {pro?.photos?.length > 0 && pro?.photos[0] && (
                  <Image
                    className={`w-[105px] h-[105px] object-cover object-center rounded`}
                    src={pro.photos[0] || null}
                    width={1000}
                    height={1000}
                    alt=""
                  />
                )}
              </div>

              <div className="leading-none space-y-[10px] pt-[4px]">
                <div className="flex items-center space-x-1 text-[15px] font-semibold font-sans">
                  <span>{pro?.title}</span>
                </div>

                <div className="space-y-[5px]">
                  <p
                    className={`text-gray-500 text-[11px] ${
                      locale == "en" ? "font-sans" : "font-battambang"
                    }`}
                  >
                    {pro?.locations?.district[locale]},
                    {" " + pro?.locations?.province[locale]}
                  </p>
                  <p className="text-gray-500 text-[11px] font-sans">
                    {formatDate(pro?.updatedAt)}
                  </p>
                </div>

                <div className="flex items-center space-x-2 font-sans">
                  {/* Final Price */}
                  <p className="text-[#DF2E00] font-semibold text-[15px]">
                    $
                    {(() => {
                      const price = parseFloat(
                        pro?.dynamicFields?.price ||
                          pro?.dynamicFields?.salePrice ||
                          pro?.dynamicFields?.salary ||
                          0
                      );

                      const discountAs = pro?.dynamicFields?.discountAs; // "%" or "$"
                      const discountValue =
                        parseFloat(pro?.dynamicFields?.discount) || 0;

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
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {products.length === 20 && (
        <Link
          href={`/search?keyword=${keyword}`}
          className={`focus:outline-none outline-none shadow bg-white hover:bg-transparent text-[#028DCF] hover:text-gray-800 transition-all duration-300 rounded-md h-[33px] flex justify-center items-center pt-[2px] font-medium text-[15px] ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          {t("viewMore")}
        </Link>
      )}
    </div>
  );
}

export default ListProductSearching;
