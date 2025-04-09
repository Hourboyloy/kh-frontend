"use client";
import React from "react";
import dynamic from "next/dynamic";
const SkeletonPageDetails = dynamic(
  () => import("@/components/skeletons/SkeletonPageDetails"),
  { ssr: false }
);
function Loading() {
  return (
    <div className="mx-auto max-w-[1104px]">
      <SkeletonPageDetails />
    </div>
  );
}

export default Loading;
