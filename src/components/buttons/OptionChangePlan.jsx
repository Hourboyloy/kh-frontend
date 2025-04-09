import React, { useEffect, useCallback, useRef } from "react";
import Link from "next/link";

function OptionChangePlan({
  toggleChangePlan,
  handleToggleChangePlan,
  subScription,
}) {
  const changePlanRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        handleToggleChangePlan();
      }
    },
    [handleToggleChangePlan]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        changePlanRef.current &&
        !changePlanRef.current.contains(event.target)
      ) {
        handleToggleChangePlan();
      }
    };

    if (toggleChangePlan) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleChangePlan, handleToggleChangePlan, changePlanRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleChangePlan) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleChangePlan, handleKeyDown]);

  return (
    <div className="font-battambang">
      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleChangePlan ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 lg:inset-0 z-20 text-lg flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          toggleChangePlan
            ? "opacity-100 bottom-0 lg:translate-y-[120px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-[60px] pointer-events-none"
        }`}
      >
        <section
          ref={changePlanRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20 space-y-4"
        >
          <div className="w-full rounded-xl overflow-hidden *:px-5">
            <h1 className="text-[14px] text-gray-600 bg-white text-center py-2">
              Options
            </h1>
            <Link
              href={`/premium-ad/general?id=${subScription.product?._id}`}
              className="bg-white w-full h-[59.05px] select-none outline-none focus:outline-none flex items-center justify-center"
            >
              <span className="text-[#169ADD]">Change Plan</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleChangePlan}
              className="w-full h-[58px] font-medium select-none outline-none focus:outline-none text-gray-800 bg-white hover:bg-[#f5f5f5] transition-all ease-in-out flex justify-center items-center rounded-xl border"
            >
              Cancel
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default OptionChangePlan;
