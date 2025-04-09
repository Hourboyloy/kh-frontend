"use client";
import React, { useEffect, useCallback, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";

const AlertSuccessWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);

function DeleteReasonProduct({
  toggleDeleteReason,
  setToggleDeleteReason,
  accID,
  accType,
  proID,
  domain,
  token,
  setIsPending,
  setProducts,
  isDetailsPage,
}) {
  const router = useRouter();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const alertRef = useRef(null);
  const deleteReasonRef = useRef(null); // ✅ Declare ref properly
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteDesction, setDeleteDescription] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleDeleteReason();
      }
    },
    [setToggleDeleteReason]
  );

  const handleChooseReason = (val) => {
    setDeleteReason(val);
    setDeleteDescription(val);
    if (val === "other") {
      setError("Please enter the description");
    }
  };

  const handleSetDescription = (val) => {
    setDeleteDescription(val);

    if (val.trim() === "") {
      setError("Please enter the description");
    } else if (val.length < 10 || val.length > 255) {
      setError("The description field must be between 10 and 255 characters.");
    } else {
      setError("");
    }
  };

  const handleDeleteProducts = async () => {
    if (deleteDesction === "" || deleteDesction.length < 10)
      return setAlert(true);
    setToggleDeleteReason(false);
    setIsPending(true);

    try {
      const res = await axios.delete(
        `${domain}${
          accType == TYPE ? "/manager" : ""
        }/product/account/${accID}/product/${proID}?reason=${encodeURIComponent(
          deleteDesction
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        if (!isDetailsPage) {
          setProducts((prev) => prev.filter((pro) => pro._id !== proID));
        } else {
          router.push("/account");
        }
        setTimeout(() => {
          setIsPending(false);
          window.alert("Product deleted successfully!");
        }, 200);
      }
    } catch (error) {
      alert("Error deleting product: " + error.message);
      setTimeout(() => {
        setIsPending(false);
      }, 200);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        deleteReasonRef.current &&
        !deleteReasonRef.current.contains(event.target) &&
        alertRef.current &&
        !alertRef.current.contains(event.target)
      ) {
        setToggleDeleteReason(false);
      }
    };

    if (toggleDeleteReason) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleDeleteReason, setToggleDeleteReason, deleteReasonRef, alertRef]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleDeleteReason) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleDeleteReason, handleKeyDown]);

  return (
    <div className="font-battambang">
      {/* Background overlay */}
      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleDeleteReason ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        ref={alertRef}
        className={`fixed inset-0 mt-2 z-30 w-fit h-fit mx-auto bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          alert ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <AlertSuccessWarning
          text="Please choose delete reason"
          alert={alert}
          handleIsAlert={() => setAlert(false)}
        />
      </div>

      <section
        className={`fixed lg:inset-0 z-20 flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          toggleDeleteReason
            ? "opacity-100 bottom-0 lg:translate-y-[60px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-0 pointer-events-none"
        }`}
      >
        <section
          ref={deleteReasonRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20"
        >
          <div className="bg-white w-full rounded-md shadow">
            <h1 className="h-[61px] font-semibold text-lg flex items-center justify-center text-gray-800 border-b border-gray-100">
              Delete Reason
            </h1>

            <div className="text-[16px] font-sans">
              <div
                onClick={() =>
                  handleChooseReason("this product has been sold.")
                }
                className="flex items-center justify-between space-x-4 h-[50px] px-5 border-b border-gray-100 hover:bg-gray-100 transition-all ease-in-out"
              >
                <p>This product has been sold.</p>
                {deleteReason === "this product has been sold." && (
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-[#ff9800]"
                  />
                )}
              </div>
              <div
                onClick={() => handleChooseReason("suspend this ads.")}
                className="flex items-center justify-between space-x-4 h-[50px] px-5 border-b border-gray-100 hover:bg-gray-100 transition-all ease-in-out"
              >
                <p>Suspend this ads.</p>
                {deleteReason === "suspend this ads." && (
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-[#ff9800]"
                  />
                )}
              </div>
              <div
                onClick={() => handleChooseReason("delete to post new ads.")}
                className="flex items-center justify-between space-x-4 h-[50px] px-5 border-b border-gray-100 hover:bg-gray-100 transition-all ease-in-out"
              >
                <p>Delete to post new ads.</p>
                {deleteReason === "delete to post new ads." && (
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-[#ff9800]"
                  />
                )}
              </div>
              <div
                onClick={() => handleChooseReason("other")}
                className="flex items-center justify-between space-x-4 h-[50px] px-5 border-b border-gray-100 hover:bg-gray-100 transition-all ease-in-out"
              >
                <p>Other</p>
                {deleteReason === "other" && (
                  <IoMdCheckmarkCircleOutline
                    size={22}
                    className="text-[#ff9800]"
                  />
                )}
              </div>
            </div>

            {deleteReason === "other" && (
              <div className="px-4 mt-8">
                <textarea
                  maxLength={255}
                  onChange={(e) => handleSetDescription(e.target.value)}
                  className={`w-full outline-none focus:outline-none border rounded shadow-md p-2.5 text-sm text-gray-700 ${
                    error ? "border-red-500" : "border-gray-200"
                  }`}
                ></textarea>
                {error && (
                  <div className="text-red-500 flex items-center space-x-1">
                    <RiErrorWarningLine />
                    <p className=" text-xs font-sans">{error}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-10 pb-4 px-4 flex items-center space-x-2">
              <button
                onClick={() => setToggleDeleteReason(false)}
                className="cursor-pointer font-medium select-none outline-none focus:outline-none h-[44.5px] w-[114.5px] text-gray-800 bg-[#f5f5f5] hover:bg-white transition-all ease-in-out flex justify-center items-center rounded-md border border-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProducts}
                className="cursor-pointer font-medium select-none outline-none focus:outline-none h-[44.5px] w-full text-white bg-[#ff9800] hover:bg-[#ec8d00] transition-all ease-in-out flex justify-center items-center rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default DeleteReasonProduct;
