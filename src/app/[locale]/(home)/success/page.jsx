import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Link from "next/link";
import { useLocale } from "next-intl";

function Page() {
  const locale = useLocale();
  return (
    <div
      className={`lg:pt-4 max-w-[820px] mx-auto  mb-14 lg:mb-28 ${
        locale == "en" ? "font-sans" : ""
      }`}
    >
      <div className="h-[530px] bg-white w-full flex flex-col p-5">
        <div className=" font-sans flex flex-col space-y-5 pt-8 items-center justify-center mb-auto">
          <IoCheckmarkCircleSharp size={100} className="text-[#01bb88]" />
          <h1 className="text-[#01bb88] text-4xl font-semibold">
            {locale == "en" ? "Congratulations!" : "សូមអបអរសាទរ"}
          </h1>
          <p>
            {locale == "en"
              ? "Your post has been successful and be appear on Khmer24 within 1 to 15 minutes.!"
              : "ប្រកាស​របស់​អ្នក​បាន​ជោគជ័យ​ហើយ​ត្រូវ​បាន​បង្ហាញ​នៅ​លើ Khmer24 ក្នុង​រយៈ​ពេល ១ ទៅ ១៥ នាទី.!"}
          </p>
        </div>

        <div className="flex items-center text-white space-x-4">
          <Link
            href={"/post"}
            className="text-center select-none focus:outline-none rounded-md hover:-translate-y-0.5 transition-all duration-200 bg-[#0086c6] w-full py-1.5"
          >
            {locale == "en" ? "Post Another Item" : "ប្រកាសធាតុផ្សេងទៀត"}
          </Link>
          <Link
            href={"/account"}
            className="text-center select-none focus:outline-none rounded-md hover:-translate-y-0.5 transition-all duration-200 bg-[#ff8901] w-full py-1.5"
          >
            {locale == "en" ? "Close" : "បិទ"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
