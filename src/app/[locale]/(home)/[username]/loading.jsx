"use client";
import React from "react";
import dynamic from "next/dynamic";
const SkeletonVIewUserAcc = dynamic(
  () => import("@/components/skeletons/SkeletonVIewUserAcc"),
  {
    ssr: false,
  }
);

function Loading() {
  return (
    <div className="max-w-[1104px] mx-auto lg:mb-0 mb-24">
      <SkeletonVIewUserAcc />
    </div>
  );
}

export default Loading;
