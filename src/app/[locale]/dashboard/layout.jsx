"use client";
import { useEffect } from "react";
import NavDashboard from "@/components/dashboardComponents/NavDashboard";
import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
// export const metadata = {
//   title: "Dashboard",
//   description: "Manage your dashboard here.",
// };

export default function DashboardLayout({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <div className="min-h-screen flex flex-col">
        <div className="flex h-full">
          <NavDashboard />

          <div className="w-full min-h-screen">
            <div className="hidden lg:block lg:sticky z-10 top-0 left-0">
              <DashboardHeader />
            </div>
            <main className="2xl:px-8 lg:px-6 w-full mb-[48px] lg:mt-[20px] mt-[70px]">
              <div className="max-w-[1155px]">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
