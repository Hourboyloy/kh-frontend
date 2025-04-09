import React, { useState } from "react";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoRadioButtonOff } from "react-icons/io5";

function RightPlan({ terms, handleSetTerm, getTerm, handleSetSubScription }) {
  return (
    <div className="font-sans">
      <div className="px-4 lg:px-0">
        <h1 className="text-[20px] font-semibold">
          Choose the right plan for your bussiness
        </h1>
        <section className="bg-white p-6 rounded-xl border-[3px] border-[#0691D7] space-y-[8px] mt-5">
          <h2 className="text-[20px] font-semibold">Top</h2>
          <p className="">Start From ${terms.perWeek} For 7 days</p>
          <p className="text-[13px] pt-1.5">
            Show your Ad at the top of listing, highlight your Ad and display
            more times than regular Ads.
          </p>
          <div className=" space-y-3 pt-1.5">
            <p className="text-gray-500 text-[14px]">Terms:</p>
            <div className="bg-[#f5f5f5] rounded-md">
              <div
                onClick={() => handleSetTerm(terms?.perWeek, "7 Days")}
                className="w-full flex items-center space-x-2  px-3 py-4"
              >
                {getTerm === terms?.perWeek ? (
                  <IoIosCheckmarkCircle className="text-[#0691D7]" size={19} />
                ) : (
                  <IoRadioButtonOff className="" size={19} />
                )}
                <div className="w-full flex items-center justify-between font-semibold">
                  <p>7 Days</p>
                  <p className="text-[#0691D7]">${terms?.perWeek}</p>
                </div>
              </div>

              <div
                onClick={() => handleSetTerm(terms?.perMonth, "1 Month")}
                className="w-full flex items-center space-x-2 px-3 py-4 border-t"
              >
                {getTerm === terms?.perMonth ? (
                  <IoIosCheckmarkCircle className="text-[#0691D7]" size={19} />
                ) : (
                  <IoRadioButtonOff className="" size={19} />
                )}
                <div className="w-full flex items-center justify-between font-semibold">
                  <p>1 Month</p>
                  <p className="text-[#0691D7]">${terms?.perMonth}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full bg-white border-t lg:border-t-0 lg:mt-4 px-6 pb-3 pt-3.5 lg:rounded space-y-2.5 fixed lg:static bottom-0 z-10">
        <div className="w-full flex items-center justify-between font-semibold">
          <p>Top: {getTerm === terms?.perMonth ? "1 Month" : "7 Days"}</p>
          <p className="text-[#0691D7]">${getTerm}</p>
        </div>
        <button
          onClick={handleSetSubScription}
          className="text-shadow bg-[#FF8900] hover:bg-[#e67c01] transition-all duration-200 text-white text-center w-full rounded-md select-none focus:outline-none h-[44.5px] flex items-center justify-center tracking-wide"
        >
          Subscribe Now
        </button>
      </section>
    </div>
  );
}

export default RightPlan;
