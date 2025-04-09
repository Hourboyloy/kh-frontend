"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  {
    ssr: false,
  }
);

function AutoRenew({
  setProducts,
  toggleAutoRenew,
  setToggleAutoRenew,
  accID,
  proID,
  token,
  domain,
  setIsPending,
  autoRenews,
  accType,
}) {
  const autoRenewRef = useRef(null);
  const [alert, setAlert] = useState(false);
  const [time, setTime] = useState("01");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState("AM");

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleAutoRenew(false);
      }
    },
    [setToggleAutoRenew]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        autoRenewRef.current &&
        !autoRenewRef.current.contains(event.target)
      ) {
        setToggleAutoRenew(false);
      }
    };

    if (toggleAutoRenew) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleAutoRenew, setToggleAutoRenew]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleAutoRenew) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleAutoRenew, handleKeyDown]);

  useEffect(() => {
    if (!autoRenews) {
      setTime("01");
      setMinutes("00");
      setPeriod("AM");
    } else {
      const match = autoRenews.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)?$/);
      if (match) {
        setTime(match[1]);
        setMinutes(match[2]);
        setPeriod(match[3] || "AM");
      }
    }
  }, [autoRenews]);

  const handleSave = async () => {
    const type = process.env.NEXT_PUBLIC_TYPE;
    if (!time || !minutes || !period) return;
    setToggleAutoRenew(false);
    setIsPending(true);
    const reNewProductAtTime = `${time}:${minutes} ${period}`;
    try {
      const res = await axios.put(
        `${domain}${
          accType == type ? "/manager" : ""
        }/set-renew/product/${proID}/account/${accID}`,
        { reNewProductAtTime },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setAlert(true);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === proID ? { ...product, reNewProductAtTime } : product
          )
        );
      } else {
        window.alert("Couldn't renew, please try again later.");
      }
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="font-battambang">
      <div
        className={`fixed inset-0 mt-2 z-30 w-fit h-fit mx-auto bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          alert ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <AlertSuccessWarning
          text="Set Auto Renews Successfuly"
          alert={alert}
          icons={"success"}
          handleIsAlert={() => setAlert(false)}
        />
      </div>

      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleAutoRenew ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 top-0 inset-0 z-20 text-lg flex justify-center items-center w-full h-screen transition-all duration-500 ease-in-out ${
          toggleAutoRenew ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <section
          ref={autoRenewRef}
          className="px-4 pb-4 lg:px-0 md:pb-0 w-full md:w-[820px] h-fit z-20 -translate-y-[72px]"
        >
          <div className="bg-white rounded shadow w-full px-4 pb-3 pt-4">
            <h1 className="text-[16px] font-bold">Set Auto Renews</h1>
            <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6 font-sans text-[16.5px] pt-0.5 pb-[18px]">
              <select
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`appearance-none w-full border border-gray-200 focus:outline-none rounded-md py-[5px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
              >
                {["01", "03", "06", "09", "12"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>

              <select
                name="minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className={`appearance-none w-full border border-gray-200 focus:outline-none rounded-md py-[5px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300`}
              >
                {["00", "15", "30", "45", "59"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>

              <select
                name="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={`appearance-none w-full border border-gray-200 focus:outline-none rounded-md py-[5px] px-3 focus:ring-4 focus:ring-[#C9DFFF] focus:border-blue-300 text-[16.2px]`}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            <div className="flex items-center justify-end md:space-x-8 space-x-4 text-[16.5px] md:pr-3.5">
              <button
                onClick={() => setToggleAutoRenew(false)}
                className="text-[#5a5d60] select-none focus:outline-none outline-none"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="text-[#028dcf] select-none focus:outline-none outline-none"
              >
                Save
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default AutoRenew;
