import React from "react";

function ListSkeletonUserInfenite({ ArrNumber }) {
  return (
    <section className="w-full grid grid-cols-1 gap-2">
      {ArrNumber?.map((e, i) => (
        <div
          key={e + i}
          className="bg-white border border-gray-300 px-[19px] py-[10.5px] gap-2.5 flex items-center rounded-md"
        >
          {/* Image Skeleton */}
          <div className="w-[60px]">
            <div className="w-[60px] h-[60px] relative overflow-hidden bg-[#eeeeee] rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
          </div>

          {/* Text Skeleton */}
          <div className="space-y-2.5 w-full">
            <div className="relative w-9/12 py-[8px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
            <div className="relative w-9/12 py-[6px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListSkeletonUserInfenite;
