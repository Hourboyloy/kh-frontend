import React from "react";
import Link from "next/link";
import Image from "next/image";

function ListUserSearching({ users, keyword, t, locale }) {
  return (
    <div className="w-full bg-white rounded-md border border-gray-300 px-3.5 py-3">
      <h1
        className={`font-bold ${
          locale == "en" ? " font-sans" : "font-battambang"
        }`}
      >
        {t("users")}
      </h1>
      <ul className="pt-4 pb-1 font-sans">
        {users?.map((user, i) => (
          <li key={user + i}>
            <Link
              href={`/${user?.username}`}
              className={`outline-none focus:outline-none hover:bg-[#f7f7f7] transition-all w-full flex space-x-2.5 py-2 
                ${users.length - 1 == i ? "" : "border-b border-gray-100"}`}
            >
              <div className="">
                <Image
                  className="w-[60px] h-[60px] rounded-full object-cover object-center"
                  src={user?.photoProfile || require("@/assets/user-icon.png")}
                  width={600}
                  height={800}
                  priority
                  alt=""
                />
              </div>
              <div className="leading-none space-y-[5px]">
                <div className="flex items-center space-x-1 text-[15px] font-semibold capitalize">
                  <span>{user.firstName}</span>
                  <span>{user.lastName}</span>
                </div>
                <p className="text-[#707070] text-[14.7px] font-semibold">
                  {user?.username && "@" + user?.username}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {users?.length == 5 && (
        <Link
          href={`/search-result/users?keyword=${keyword}`}
          className={`focus:outline-none outline-none bg-[#D9EEF8] hover:bg-white text-[#028DCF] hover:text-gray-800 transition-all duration-300 rounded h-[33px] flex justify-center items-center pt-[3px] font-medium text-[15px] ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          {t("viewMore")}
        </Link>
      )}
    </div>
  );
}

export default ListUserSearching;
