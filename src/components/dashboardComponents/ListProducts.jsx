import React from "react";
import Image from "next/image";
import { Pagination } from "antd";

function ListProducts({
  t,
  locale,
  products,
  currentPage,
  totalPages,
  handleClick,
  handlePageChange,
}) {
  return (
    <div>
      <div className="border-t md:border min-h-[653.6px] border-gray-300 bg-white md:p-6 pb-4 md:rounded-lg md:shadow-md">
        <ul className="text-[13px]">
          {/* Table Header */}
          <li
            className={`grid md:grid-cols-8 grid-cols-5 gap-3 md:gap-6 md:px-4 px-3 py-3 bg-gray-100 text-sm font-semibold text-gray-700 md:rounded-t-lg ${
              locale == "en" ? "font-sans" : "font-battambang"
            }`}
          >
            <p>#</p>
            <p className="col-span-1">{t("photo")}</p>
            <div className="col-span-2">{t("title")}</div>
            <div className="hidden md:flex">{t("category")}</div>
            <div className="text-center">{t("renewAt")}</div>
            <div className="col-span-2 text-center hidden md:flex justify-center">
              {t("createdAt")}
            </div>
          </li>

          {/* product Rows */}
          {products?.length > 0 &&
            products.map((product, index) => (
              <li
                key={product + index}
                onClick={() => handleClick(product._id)}
                className="grid md:grid-cols-8 grid-cols-5 gap-3 md:gap-6 md:px-4 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 font-sans"
              >
                <div className="">
                  <p>{(currentPage - 1) * 10 + (index + 1)}</p>
                </div>

                <div className="w-[60px] h-[40px] bg-gray-50">
                  {product?.photos.length > 0 && (
                    <Image
                      className="w-[60px] h-[40px] object-cover object-center rounded"
                      src={product?.photos[0] || null}
                      width={800}
                      height={800}
                      alt=""
                    />
                  )}
                </div>

                <div className="col-span-2">
                  {product.title.length > 68
                    ? product.title.substring(0, 68) + "..."
                    : product.title}
                </div>

                <div className="text-sm text-gray-700 hidden md:flex">
                  {product.subCategory}
                </div>

                <div className="text-center col-span-1">
                  {product?.reNewProductAtTime} {index + 1}
                </div>

                <div className="col-span-2 hidden md:flex justify-center">
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center md:justify-end mt-3">
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          onChange={handlePageChange}
          showSizeChanger={false} // Hide size changer (if you don't want to change items per page)
          showQuickJumper={false} // Enable quick jump to page feature
          className="pagination"
        />
      </div>
    </div>
  );
}

export default ListProducts;
