import React from "react";
import Image from "next/image";
import Link from "next/link";

function ListUserInfeniteScroll({ users }) {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-2 font-sans">
        {users?.map((user, i) => (
          <li key={i + user}>
            <Link
              href={`/${user?.username}`}
              className=" outline-none focus:outline-none"
            >
              <section className="w-full flex space-x-5 px-[19px] py-[10.5px] bg-white border border-gray-300 rounded-md">
                <div className="w-[60px]">
                  <Image
                    className="w-[60px] h-[60px] rounded-full object-center object-cover"
                    src={
                      user?.photoProfile || require(`@/assets/user-icon.png`)
                    }
                    width={600}
                    height={800}
                    priority
                    alt=""
                  />
                </div>

                <div className=" leading-none space-y-1 pt-2.5">
                  <div className="flex items-center space-x-1 text-[15px] font-semibold capitalize">
                    <span>{user?.firstName}</span>
                    <span>{user?.lastName}</span>
                  </div>
                  <p className="text-[#707070] text-[14.7px] font-semibold">
                    {user?.username && "@" + user?.username}
                  </p>
                </div>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListUserInfeniteScroll;
