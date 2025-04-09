import React from "react";

function SkeletonListUserSearching() {
  return (
    <div>
      <div className="">
        <ul className="grid grid-cols-1 gap-2.5">
          {[1, 2].map((Num, i) => (
            <li
              key={Num + i}
              className="w-full bg-white p-3.5 border border-gray-300 rounded-md"
            >
              <div className="relative w-4/12 py-2.5 bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              {[1, 2].map((num, i) => (
                <div
                  key={num + i}
                  className="flex items-center space-x-2 py-2 border-b border-gray-100"
                >
                  <div className="w-[60px]">
                    <div className="w-[60px] h-[60px] relative overflow-hidden bg-[#eeeeee] rounded-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                    </div>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="relative w-full py-[8px] bg-[#eeeeee] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                    </div>
                    <div className="relative w-8/12 py-[6px] bg-[#eeeeee] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SkeletonListUserSearching;
