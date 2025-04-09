import React from "react";
import Image from "next/image";
import { Pagination } from "antd";

function ListOrders({
  t,
  locale,
  orders,
  currentPage,
  totalPages,
  handlePageChange,
  handleReplyOrder,
  handleToggleShowDelete,
}) {
  return (
    <div>
      <div className="border min-h-[653.6px] md:max-h-[653.6px] border-gray-300 bg-white md:p-6 pb-4 md:rounded-lg md:shadow-md">
        <ul className="text-[13px]">
          <li
            className={`grid grid-cols-9 md:gap-6 gap-3 px-3 md:px-4 py-3 bg-gray-100 text-sm font-semibold text-gray-700 md:rounded-t-lg ${
              locale == "en" ? "font-sans" : "font-battambang"
            }`}
          >
            <p>#</p>
            <p className="col-span-2 md:col-span-1">{t("name")}</p>
            <p className="hidden md:block">Photo</p>
            <div className="hidden md:block col-span-2">{t("title")}</div>
            <div className="col-span-2 md:col-span-1 text-center">
              {t("orderAt")}
            </div>
            <div className="hidden md:flex">{t("replyAt")}</div>
            <div className="col-span-2 md:col-span-1">{t("status")}</div>
            <div className="col-span-2 md:col-span-1">{t("action")}</div>
          </li>

          {/* order Rows */}
          {orders?.length > 0 &&
            orders.map((order, index) => (
              <li
                key={order + index}
                className="grid grid-cols-9 md:gap-6 gap-3 px-3 md:px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-100 font-sans"
              >
                <div className="">
                  <p>{(currentPage - 1) * 10 + (index + 1)}</p>
                </div>

                <div className="capitalize col-span-2 md:col-span-1">
                  {order?.firstName + " " + order?.lastName}
                </div>

                <div className="w-[60px] h-[40px] bg-gray-50 md:flex hidden">
                  {order?.photoURLs?.length > 0 && (
                    <Image
                      className="w-[60px] h-[40px] object-cover object-center rounded"
                      src={order?.photoURLs[0] || null}
                      width={800}
                      height={800}
                      priority
                      alt=""
                    />
                  )}
                </div>

                <div className="col-span-2 md:flex hidden">
                  {order.title?.length > 68
                    ? order.title.substring(0, 68) + "..."
                    : order.title}
                </div>

                <div className=" text-center col-span-2 md:col-span-1">
                  {new Date(order.orderAt).toLocaleDateString()}
                </div>

                <div className="text-center md:flex hidden">
                  {order.statusUpdatedAt
                    ? new Date(order.statusUpdatedAt).toLocaleDateString()
                    : "Waiting"}
                </div>

                <div className="col-span-2 md:col-span-1">
                  {order?.status !== "" && order?.status !== "pending" ? (
                    <div
                      className={`capitalize font-semibold ${
                        order?.status === "accept"
                          ? " text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order?.status + "ed"}
                    </div>
                  ) : (
                    <div className="flex items-start space-x-4 text-[12px] font-semibold *:outline-none *:focus:outline-none">
                      <button
                        onClick={() => handleReplyOrder(order, "reject")}
                        className="text-red-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleReplyOrder(order, "accept")}
                        className="text-green-600"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                </div>

                <div className="*:outline-none *:focus:outline-none col-span-2 md:col-span-1">
                  <button
                    onClick={() => handleToggleShowDelete(order?._id)}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
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

export default ListOrders;
