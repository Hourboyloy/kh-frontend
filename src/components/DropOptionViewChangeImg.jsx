"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { RiZoomInLine, RiZoomOutLine, RiCloseLine } from "react-icons/ri"; // Import React Icons
import { useTranslations } from "next-intl";

function DropOptionViewChangeImg({
  dropdownRef,
  dropOptionViewChange,
  setDropOptionViewChange,
  alt,
  url,
  handleFile,
}) {
  const t = useTranslations("btnNameAndTitle");
  const fileInputRef = useRef();
  const [isViewMode, setIsViewMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isClosing, setIsClosing] = useState(false);

  const maxZoom = 1.3; // Maximum zoom level

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      closeImage(); // Close the image view on Escape
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (dropOptionViewChange) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [dropOptionViewChange, handleKeyDown]);

  const handleViewClick = () => {
    setDropOptionViewChange(false);
    setIsViewMode(true);
  };

  const handleCancel = () => {
    setDropOptionViewChange(false);
    setIsViewMode(false);
  };

  const zoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  };

  const zoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  const closeImage = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsViewMode(false);
      setIsClosing(false);
    }, 300);
  };

  const handleWheelZoom = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
    } else {
      setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
    }
  };

  useEffect(() => {
    if (isViewMode) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isViewMode]);

  useEffect(() => {
    if (isViewMode) {
      const imageContainer = document.querySelector(".image-container");

      if (imageContainer) {
        imageContainer.addEventListener("wheel", handleWheelZoom);
      }
      return () => {
        if (imageContainer) {
          imageContainer.removeEventListener("wheel", handleWheelZoom);
        }
      };
    }
  }, [isViewMode]);

  const handleBtnChange = (e) => {
    setDropOptionViewChange(false);
    fileInputRef?.current?.click();
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-10 bg-[#0f0d0d] bg-opacity-[0.6] transition-opacity duration-300 ease-in-out ${
          dropOptionViewChange ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed px-4 pb-4 lg:px-0 lg:pb-0 lg:inset-0 z-20 flex justify-center w-full lg:h-screen transition-all ease-in-out ${
          dropOptionViewChange
            ? "opacity-100 bottom-0 lg:translate-y-[170px] duration-300"
            : "bottom-4 lg:translate-y-[100px] duration-300 opacity-0 pointer-events-none"
        }`}
      >
        <section
          ref={dropdownRef}
          className={`w-full lg:w-[500px] z-20 h-[201px]`}
        >
          <div className="bg-white w-full rounded-xl shadow text-lg">
            <button
              onClick={handleViewClick}
              className="h-[61.80px] w-full select-none focus:outline-none border-gray-100 text-blue-600 cursor-pointer flex items-center justify-center"
            >
              {t("viewBtn")}
            </button>

            <button
              onClick={handleBtnChange}
              className="h-[61.80px] w-full select-none focus:outline-none border-t border-gray-100 text-blue-600 cursor-pointer flex items-center justify-center"
            >
              {t("changeBtn")}
              <input
                onChange={handleFile}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                alt={alt}
                className="hidden w-0 h-0"
              />
            </button>
          </div>

          <div className="mt-3.5">
            <h1
              onClick={handleCancel}
              className="cursor-pointer select-none h-[61.80px] w-full font-semibold text-lg text-red-600 bg-white flex justify-center items-center rounded-xl shadow"
            >
              {t("cancelBtn")}
            </h1>
          </div>
        </section>
      </div>

      {/* Conditional Rendering of Image with Zoom */}
      {isViewMode && url && (
        <div
          className={`fixed inset-0 z-30 flex justify-center items-center bg-black bg-opacity-70 transition-opacity duration-300 ease-out ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`w-full h-full flex justify-center items-center relative image-container transition-transform duration-300 ease-out ${
              isClosing ? "scale-90" : "scale-100"
            }`}
          >
            <Image
              src={url}
              alt={alt || "Image"}
              className="object-contain"
              width={500}
              height={500}
              style={{
                transform: `scale(${zoom})`,
                maxWidth: "90%",
                maxHeight: "90%",
              }}
            />
            <div className="absolute top-5 right-5 flex items-center space-x-2">
              <button
                onClick={zoomIn}
                className="px-4 py-2 text-white bg-gray-700 rounded"
              >
                <RiZoomInLine size={24} />
              </button>
              <button
                onClick={zoomOut}
                className="px-4 py-2 text-white bg-gray-700 rounded"
              >
                <RiZoomOutLine size={24} />
              </button>
              <button
                onClick={closeImage}
                className="px-4 py-2 text-white bg-gray-700 rounded"
              >
                <RiCloseLine size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropOptionViewChangeImg;
