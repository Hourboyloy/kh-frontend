import React from "react";
import Image from "next/image";
import { FaHeart, FaBookmark, FaRegImage } from "react-icons/fa";
import Link from "next/link";

function ListProduct({ products, isLikes, remove }) {
  return (
    <div className="">
      <ul className="grid gap-3 mb-10 lg:mb-24">
        {products?.map((pro, i) => (
          <li key={pro?._id || i} className="">
            <div className="bg-white rounded-md border overflow-hidden outline-none focus:outline-none relative">
              <Link
                href={`/details/${pro.title
                  .replace(/[^\w\s-]/g, "")
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${pro?.productID}`}
                className="flex w-full"
              >
                <div className="w-[125px] h-[121.6px]">
                  {pro?.photoUrl ? (
                    <Image
                      src={pro.photoUrl}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover object-center"
                      alt="Product Image"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#E9EEF1]">
                      <FaRegImage className="text-[#BABEC1]" size={32} />
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col px-3.5 pt-3.5 pb-1.5">
                  <div className="space-y-1">
                    <h1 className="text-sm">
                      {pro?.title?.length > 60
                        ? pro.title.slice(0, 60) + "..."
                        : pro.title}
                    </h1>
                    <p className="text-xs">{pro?.province}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <p className="text-[#EF4539] font-semibold">
                      {pro?.price ? "$" + pro.price : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>

              {/* ប៊ូតុង Remove */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(pro?.productID);
                }}
                className="outline-none select-none focus:outline-none p-2 absolute z-[8] right-0 bottom-0"
              >
                {isLikes ? (
                  <FaHeart className="text-[#028DCF]" size={20} />
                ) : (
                  <FaBookmark className="text-[#028DCF]" size={20} />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListProduct;
