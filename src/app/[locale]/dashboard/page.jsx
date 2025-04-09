"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";
import dynamic from "next/dynamic";
const WebStatistics = dynamic(
  () => import("@/components/dashboardComponents/WebStatistics"),
  { ssr: false }
);
const ApexChart = dynamic(
  () => import("@/components/dashboardComponents/Chart"),
  { ssr: false }
);

const userViewsData = [
  { x: "2025-01-15", y: 1500 },
  { x: "2025-01-16", y: 2000 },
  { x: "2025-01-17", y: 2400 },
  { x: "2025-01-18", y: 1800 },
  { x: "2025-01-19", y: 2200 },
  { x: "2025-01-20", y: 500 },
  { x: "2025-01-21", y: 800 },
  { x: "2025-01-22", y: 460 },
  { x: "2025-01-23", y: 600 },
  { x: "2025-01-24", y: 1000 },
  { x: "2025-01-25", y: 2200 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;
  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);
  if (account === null || account?.type !== TYPE) return <div></div>;

  return (
    <div className="px-4 md:px-0">
      <h1 className="md:text-2xl text-xl text-gray-700 font-semibold lg:mb-[33px] mb-[10px]">
        Website Statistics
      </h1>
      <WebStatistics />

      <div className="md:mt-[48px] mt-[20px]">
        <ApexChart data={userViewsData} title="Website User Views Over Time" />
      </div>
    </div>
  );
}
