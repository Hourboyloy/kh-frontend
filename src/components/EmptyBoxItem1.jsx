import React from "react";
import Image from "next/image";
import emptyBoxImage from "@/assets/empty-box.png";

function EmptyBoxItem1({ height, text }) {
  return (
    <section
      className={`mt-2 lg:bg-white lg:border px-4 py-10 lg:rounded-md h-[220px] md:h-[264.6px]`}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <div className="w-[110px] h-[110px]">
          <Image
            className="w-full h-full object-cover object-center"
            src={emptyBoxImage}
            width={500}
            height={500}
            alt=""
          />
        </div>
        <div className=" font-sans text-[17px] text-[#9A9A9A] text-center font-battambang">
          {text}
        </div>
      </div>
    </section>
  );
}

export default EmptyBoxItem1;
