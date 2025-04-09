import React from "react";

function CardsSkeleton() {
  return (
    <div className="mb-10 mt-5">
      <ul className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2  gap-[9.33px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
          <li key={item + i} className="">
            <div className="w-full h-[210px] relative overflow-hidden bg-[#eeeeee]">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
            <div className="p-2.5 bg-white space-y-2.5 mb-2.5 rounded-b-sm">
              <div className="relative w-full py-2 bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <div className="relative w-9/12 py-1.5 bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
              <div className="relative w-full py-1.5 bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-t-sm flex items-center">
              <div className="w-3/12 pl-2">
                <div className="relative w-7 h-7 rounded-full py-1.5 bg-[#eeeeee] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
                </div>
              </div>
              <div className="relative w-full py-2 bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardsSkeleton;
