"use client";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "@/context/GlobalContext";

const DashboardHeader = ({ handleToggleSideBar, isMenuOpen }) => {
  const { account, profile } = useAppContext();

  if (account?.type !== "admin") return <div></div>;
  return (
    <header className="bg-white w-full py-2 lg:py-3.5 lg:px-6 px-3 shadow flex items-center justify-between font-sans">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-800 uppercase">Khmer 24</div>

      {/* Search Bar */}
      <div className="relative w-[450px] hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#0098D5]"
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      {/* Profile & Toggle Button */}
      <div className="flex items-center lg:gap-4 gap-2">
        {/* Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <FiBell size={22} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          {profile.photoProfile && (
            <Link href={`/dashboard/personal-setting`}>
              <Image
                src={profile.photoProfile}
                width={500}
                height={500}
                className="lg:w-10 lg:h-10 w-9 h-9 rounded-full border-2 border-gray-300 shadow-md object-cover"
                alt=""
              />
            </Link>
          )}
        </div>

        <button
          onClick={handleToggleSideBar}
          className="lg:hidden text-2xl text-gray-800 outline-none focus:outline-none"
        >
          {isMenuOpen ? <IoMdClose /> : <FiMenu />}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
