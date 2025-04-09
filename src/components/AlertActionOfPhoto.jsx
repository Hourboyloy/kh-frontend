"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RiCloseLine } from "react-icons/ri";

function AlertActionOfPhoto({
  alertActionPhoto,
  index,
  setPhotos,
  photos,
  setAlertActionPhoto,
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const alertRef = useRef(null);
  const viewRef = useRef(null);
  const handleRemovePhoto = () => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setAlertActionPhoto(false);
  };

  const handleSetAsCover = () => {
    setPhotos((prev) => {
      const newPhotos = [...prev];
      const selectedPhoto = newPhotos.splice(index, 1)[0];
      newPhotos.splice(0, 0, selectedPhoto);
      setAlertActionPhoto(false);
      return newPhotos;
    });
  };

  const handleViewPhoto = () => {
    setAlertActionPhoto(false);

    const photo = photos[index];
    if (!photo) return;

    const photoUrl = photo.preview || photo || null;
    if (photoUrl) {
      setSelectedPhoto(photoUrl);
      setIsViewMode(true);
    }
  };

  const closeImage = () => {
    setSelectedPhoto(null);
    setIsViewMode(false);
  };

  useEffect(() => {
    if (alertActionPhoto || isViewMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [alertActionPhoto, isViewMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        setAlertActionPhoto(false);
      }
      if (viewRef.current && !viewRef.current.contains(event.target)) {
        closeImage();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAlertActionPhoto]);

  return (
    <div>
      <div
        className={`fixed inset-0 z-20 bg-[#0f0d0d] bg-opacity-[0.6] transition-opacity duration-300 ease-in-out ${
          alertActionPhoto ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed px-4 pb-4 md:px-0 md:pb-0 md:inset-0 z-20 flex justify-center w-full md:h-screen transition-all ease-in-out ${
          alertActionPhoto
            ? "opacity-100 bottom-0 md:translate-y-[200px] lg:translate-y-[170px] duration-300"
            : "bottom-4 md:translate-y-[130px] lg:translate-y-[100px] duration-300 opacity-0 pointer-events-none"
        }`}
      >
        <section ref={alertRef} className="w-[500px] z-20 h-fit">
          <div className="bg-white w-full rounded-xl shadow text-lg">
            <button
              onClick={handleViewPhoto}
              className="h-[61.80px] w-full select-none focus:outline-none border-gray-100 text-blue-600 cursor-pointer flex items-center justify-center"
            >
              View Picture
            </button>

            <button
              onClick={handleSetAsCover}
              className={`${
                index === 0 ? "hidden" : ""
              } h-[61.80px] w-full select-none focus:outline-none border-t border-gray-100 text-blue-600 cursor-pointer flex items-center justify-center`}
            >
              Set As Cover
            </button>

            <button
              onClick={handleRemovePhoto}
              className="h-[61.80px] w-full select-none focus:outline-none border-t border-gray-100 text-blue-600 cursor-pointer flex items-center justify-center"
            >
              Remove
            </button>
          </div>

          <div className="mt-3.5">
            <h1
              onClick={() => setAlertActionPhoto(false)}
              className="cursor-pointer select-none h-[61.80px] w-full font-semibold text-lg text-red-600 bg-white flex justify-center items-center rounded-xl shadow"
            >
              Cancel
            </h1>
          </div>
        </section>
      </div>

      {/* View Image Modal */}
      <div
        className={`fixed inset-0 z-30 flex justify-center items-center bg-[#0f0d0d] bg-opacity-[0.6] transition-opacity duration-500 ease-in-out ${
          isViewMode && selectedPhoto
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {selectedPhoto && selectedPhoto !== "" ? (
          <div className="max-w-[1104px] mx-auto h-fit">
            <Image
              ref={viewRef}
              src={selectedPhoto}
              alt="Selected Image"
              width={1000}
              height={1000}
              quality={100}
              priority
              // className="max-w-[500px] max-h-[400px] object-cover object-center"
              className="h-[85vh] md:h-[90vh] lg:h-[95vh] w-auto object-contain"
            />
          </div>
        ) : null}

        <button
          onClick={closeImage}
          className="absolute top-5 right-5 text-white bg-gray-700 rounded-full p-2"
        >
          <RiCloseLine size={24} />
        </button>
      </div>
    </div>
  );
}

export default AlertActionOfPhoto;
