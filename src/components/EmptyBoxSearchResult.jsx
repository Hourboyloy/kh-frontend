import React from "react";
import Image from "next/image";

function EmptyBoxSearchResult({ keyword }) {
  return (
    <section className={`mt-[24px] lg:bg-white p-4 h-[267px] md:h-[467px]`}>
      <div className="w-full h-full flex flex-col items-center justify-center gap-[8.5px] pb-[25px]">
        <div className="w-[110px] h-[110px] mt-2">
          <Image
            className="w-full h-full object-cover object-center"
            src={require(`@/assets/empty-box.png`)}
            width={500}
            height={500}
            alt=""
          />
        </div>
        <div className=" font-sans text-[17px] text-[#9A9A9A] text-center">
          Your search {keyword || ""} did not match any listings
        </div>
      </div>
    </section>
  );
}

export default EmptyBoxSearchResult;
