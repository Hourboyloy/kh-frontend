import React from "react";

function SkeletonListProductsSearching() {
  return (
    <div className="">
      <ul className="grid grid-cols-1 gap-2.5">
        {[1, 2].map((Num, i) => (
          <li
            key={Num + i}
            className="w-full bg-white p-3.5 border border-gray-300 rounded-md"
          >
            <div className="flex items-center space-x-6 w-full py-1.5 border-b border-gray-100">
              <div className="relative w-[24px] h-[24px] rounded-full bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <div className="relative w-8/12 py-[9px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
            </div>
            <div className="flex pt-1.5">
              <div className="w-[105px]">
                <div className="w-[105px] h-[105px] relative overflow-hidden bg-[#eeeeee] rounded-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                </div>
              </div>

              <div className="w-full space-y-2 pt-1">
                <div className="relative w-full py-[8px] bg-[#eeeeee] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                </div>
                <div className="relative w-8/12 py-[7px] bg-[#eeeeee] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                  </div>
                  <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                  </div>
                </div>

                <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonListProductsSearching;
