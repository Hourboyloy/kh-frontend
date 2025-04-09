"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import Image from "next/image";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaUsers, FaProductHunt } from "react-icons/fa6";
import { FaAd } from "react-icons/fa";
import { FaRocket } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

const DashboardHeader = dynamic(
  () => import("@/components/dashboardComponents/DashboardHeader"),
  {
    ssr: false,
  }
);

export default function NavDashboard() {
  const router = useRouter();
  const { account, setAccount, setProfile, setToken } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleSideBar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("profile");
    localStorage.removeItem("access_token");
    setAccount(null);
    setProfile(null);
    setToken(null);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);

  if (account === null || account?.type !== TYPE) return <div></div>;

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: MdDashboard },
    { path: "/dashboard/users", label: "Users", icon: FaUsers },
    { path: "/dashboard/categories", label: "Categories", icon: MdCategory },
    { path: "/dashboard/products", label: "Products", icon: FaProductHunt },
    { path: "/dashboard/ad-qr-code", label: "Ad & QR Code", icon: FaAd },
    { path: "/dashboard/orders", label: "Orders", icon: FaRocket },
  ];

  return (
    <div className="relative">
      {/* Mobile Menu Toggle */}
      <div className="xl:hidden fixed top-0 left-0 z-20 w-full">
        <DashboardHeader
          handleToggleSideBar={handleToggleSideBar}
          isMenuOpen={isMenuOpen}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-[300px] xl:sticky h-screen bg-white shadow-md transform transition-transform duration-300 z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <div className="h-full pt-12 xl:pl-[26px] 2xl:pl-[32px]">
          <div className="w-[236px] mx-auto xl:mx-0">
            {/* Logo Section */}
            <section className="w-[88.58px]">
              <Image
                className="w-full h-full object-cover object-center"
                src={process.env.NEXT_PUBLIC_APP_LOGO || "/default-logo.png"}
                width={1000}
                height={1000}
                alt="Logo"
              />
            </section>

            {/* Menu Section */}
            <section className="mt-[51px] font-sans">
              <p className="px-[15px] text-[#0098D5] font-semibold border-b pb-2">
                Menu
              </p>
              <ul className="mt-[18px] space-y-[6.5px]">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-[15px] px-[15px] py-[11px] rounded-md ${
                      pathname === item.path
                        ? "bg-[#0098D5] shadow text-white"
                        : "hover:bg-gray-100 transition-all duration-300 text-[#0098D5]"
                    }`}
                  >
                    <item.icon className="text-[17px]" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}

                <button
                  onClick={logout}
                  className={`w-full flex items-center space-x-[15px] px-[15px] py-[11px] rounded-md hover:bg-gray-100 transition-all duration-300 text-[#0098D5]`}
                >
                  <IoLogOut />
                  <span className="font-semibold">Logout</span>
                </button>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 h-screen bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <IoMdClose className="fixed z-30 top-4 right-3 text-2xl text-white" />
        </div>
      )}
    </div>
  );
}
