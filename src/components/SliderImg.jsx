import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function SliderImg({
  images,
  displayIndex,
  setDisplayIndex,
  handleToggleDisplaySliderImg,
  toggleDisplaySliderImg,
}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (toggleDisplaySliderImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleDisplaySliderImg]);

  useEffect(() => {
    if (swiperRef.current && displayIndex !== undefined) {
      swiperRef.current.slideTo(displayIndex);
    }
  }, [displayIndex]);
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center transition-all duration-300 ease-in-out ${
        toggleDisplaySliderImg ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={() => handleToggleDisplaySliderImg(0)}
        className="absolute top-4 z-20 right-4 text-white bg-gray-800 bg-opacity-45 active:bg-gray-700 active:bg-opacity-45 transition-all p-1 rounded"
      >
        <IoMdClose size={20} />
      </button>

      <div
        className={`relative max-w-[1104px] w-full mx-auto transition-all duration-300 ease-in-out ${
          toggleDisplaySliderImg ? "scale-100" : "scale-95"
        }`}
      >
        {/* Swiper Slider */}
        <Swiper
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper"
          initialSlide={displayIndex}
          onSlideChange={(swiper) => setDisplayIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {Array.isArray(images) &&
            images.length > 0 &&
            images[0] !== null &&
            images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center h-[95vh] md:h-[90vh] lg:h-[95vh]">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    width={500}
                    height={300}
                    className="h-[85vh] md:h-[90vh] lg:h-[95vh] w-auto object-contain"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <button
        className="absolute z-40 lg:left-20 md:left-6 left-0.5 top-1/2 transform -translate-y-1/2 text-white active:bg-gray-500 active:bg-opacity-35 transition-all p-3 rounded-full"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        className="absolute z-40 lg:right-20 md:right-6 right-0.5 top-1/2 transform -translate-y-1/2 text-white active:bg-gray-500 active:bg-opacity-35 transition-all p-3 rounded-full"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
}
