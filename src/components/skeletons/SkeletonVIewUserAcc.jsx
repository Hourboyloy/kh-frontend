import React from "react";

function SkeletonVIewUserAcc() {
  return (
    <div className="lg:mt-5">
      <section className="w-full bg-white">
        <div className="bg-white">
          <div className="bg-[#EEEEEE] w-full md:h-[364.8px] h-[200px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
          </div>

          <div className="flex px-3.5 pt-5">
            <div className="h-[70px] w-[70px] bg-[#EEEEEE] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
            <div className="w-full space-y-2">
              <div className="relative w-full py-[7px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>

              <div className="relative py-[6px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>

              <div className="relative w-full py-[5px] bg-[#eeeeee] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 px-3.5 pb-5 mt-4">
            <div className="relative w-full py-[18px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
            <div className="relative w-full py-[18px] bg-[#eeeeee] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#DDDDDD] to-[#eeeeee] animate-shimmer"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SkeletonVIewUserAcc;
