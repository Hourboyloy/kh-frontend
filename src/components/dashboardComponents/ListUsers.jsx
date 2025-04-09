import React from "react";
import { Pagination } from "antd";

function ListUsers({
  users,
  currentPage,
  totalPages,
  handleClick,
  handlePageChange,
  t,
  locale,
}) {
  return (
    <div className="border-t md:border border-gray-300 bg-white md:p-6 md:rounded-lg md:shadow-md">
      <ul className="text-[13px]">
        {/* Table Header */}
        <li
          className={`grid md:grid-cols-9 grid-cols-4 md:gap-6 gap-3 p-3 md:p-4 bg-gray-100 text-sm font-semibold text-gray-700 md:rounded-t-lg *:text-nowrap ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          <p>#</p>
          <p>{t("username")}</p>
          <div>{t("phoneNumber")}</div>
          <div className="hidden md:flex">{t("password")}</div>
          <div className="hidden md:flex">{t("post")}</div>
          <div className="hidden md:flex">{t("isPremium")}</div>
          <div className="hidden md:flex">{t("isVerified")}</div>
          <div className="text-center md:text-start">{t("type")}</div>
          <div className="hidden md:flex">{t("createdAt")}</div>
        </li>

        {/* User Rows */}
        {users?.length > 0 &&
          users.map((user, index) => (
            <li
              key={user + index}
              onClick={() => handleClick(user._id)}
              className="grid md:grid-cols-9 grid-cols-4 md:gap-6 gap-3 px-3 md:px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors font-sans"
            >
              <p>{(currentPage - 1) * 10 + (index + 1)}</p>
              <p className="font-medium text-gray-800">{user.username}</p>
              <div>{user.phoneNum}</div>
              <div className="text-sm text-gray-500 hidden md:flex">
                $2b$10$6KTI3B...
              </div>
              <div className="hidden md:flex">{user.posts}</div>
              <div className="hidden md:flex pl-2">
                {user.isPremium ? "Yes" : "No"}
              </div>
              <div className="hidden md:flex">
                {user.isVerify ? "Yes" : "No"}
              </div>
              <div className="text-center md:text-start">
                {user.type === null ? "User" : user.type}
              </div>
              <div className="hidden md:flex">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
      </ul>
      <hr className="my-1" />
      {/* Pagination Controls */}
      <div className="flex md:justify-end justify-center mt-3 pb-4 md:pb-0">
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={false}
          className="pagination"
        />
      </div>
    </div>
  );
}

export default ListUsers;
