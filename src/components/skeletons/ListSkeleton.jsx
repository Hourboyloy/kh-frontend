import React from "react";

function ListSkeleton({ ArrNumber }) {
  return (
    <section className="w-full mb-10 mt-5">
      {ArrNumber?.map((e, i) => (
        <div
          key={e + i}
          className="bg-white border p-2.5 gap-2.5 flex rounded-md"
        >
          {/* Image Skeleton */}
          <div className="w-[200px] h-[120px] relative overflow-hidden bg-[#eeeeee]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
          </div>

          {/* Text Skeleton */}
          <div className="space-y-2.5 w-full">
            <div className="relative w-full py-2.5 bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>

            <div className="flex items-center">
              <div className="relative w-full py-[8px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <p className="w-full py-2"></p>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <p className="w-5/12 py-2"></p>
            </div>

            <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>

            <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ListSkeleton;
