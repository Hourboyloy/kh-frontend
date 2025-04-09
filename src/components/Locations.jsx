"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { locations } from "@/helper/Locations";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const Locations = ({
  isToggleLocation,
  setToggleLocation,
  handleSetLocations,
  handleClearLocations,
  myLocations,
  locale,
}) => {
  const locationRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState("City");
  const [currentData, setCurrentData] = useState(locations);
  const [breadcrumb, setBreadcrumb] = useState([]);

  const handleSelection = useCallback(
    (selectedItem) => {
      if (currentLevel === "City") {
        setCurrentLevel("District");
        setCurrentData(selectedItem.districts);
        setBreadcrumb([selectedItem.province]);
      } else if (currentLevel === "District") {
        setCurrentLevel("Commune");
        setCurrentData(selectedItem.communes);
        setBreadcrumb([...breadcrumb, selectedItem.district]);
      } else {
        const arrayLocation = [...breadcrumb, selectedItem];
        handleSetLocations(arrayLocation);
        setCurrentLevel("City");
        setCurrentData(locations);
        setBreadcrumb([]);
        setToggleLocation(false);
      }
    },
    [currentLevel, breadcrumb, setToggleLocation, handleSetLocations]
  );

  const handleBack = useCallback(() => {
    if (currentLevel === "Commune") {
      setCurrentLevel("District");
      const provinceName = breadcrumb[0];
      const province = locations.find(
        (p) =>
          p.province.en === provinceName.en || p.province.kh === provinceName.kh
      );
      setCurrentData(province.districts);
      setBreadcrumb(breadcrumb.slice(0, -1));
    } else if (currentLevel === "District") {
      setCurrentLevel("City");
      setCurrentData(locations);
      setBreadcrumb([]);
    }
  }, [currentLevel, breadcrumb]);

  const handleClear = useCallback(() => {
    handleClearLocations();
    setToggleLocation(false);
    setCurrentLevel("City");
    setCurrentData(locations);
    setBreadcrumb([]);
  }, [setToggleLocation, handleClearLocations]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleLocation(false);
      }
    },
    [setToggleLocation]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = isToggleLocation ? "hidden" : "auto";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isToggleLocation, handleKeyDown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setToggleLocation(false);
      }
    };
    if (isToggleLocation) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isToggleLocation, setToggleLocation]);

  const getLastBreadcrumbLabel = () => {
    const last = breadcrumb[breadcrumb.length - 1];
    return last ? last[locale] : "Province";
  };

  return (
    <div>
      <div
        className={`fixed inset-0 h-screen w-full bg-[#0f0d0d] bg-opacity-50 z-10 transition-all duration-300 ${
          isToggleLocation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed z-20 h-screen md:h-auto w-full top-0 left-0 transition-all duration-300 ${
          isToggleLocation
            ? "opacity-100 translate-y-0 md:translate-y-20 lg:translate-y-5"
            : "-translate-y-10 md:translate-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          ref={locationRef}
          className="max-w-[501px] h-full mx-auto md:mt-10 bg-white shadow rounded md:overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-[#028dcf] text-white px-4 py-[11px]">
            <div className="flex items-center gap-2">
              {currentLevel !== "City" ? (
                <button
                  onClick={handleBack}
                  className="select-none focus:outline-none"
                >
                  <MdOutlineArrowBackIos className="text-xl" />
                </button>
              ) : (
                <button
                  onClick={() => setToggleLocation(false)}
                  className="select-none focus:outline-none"
                >
                  <IoClose className="text-[28px]" />
                </button>
              )}
            </div>
            <h1 className="text-lg font-semibold select-none">
              {currentLevel} / {getLastBreadcrumbLabel()}
            </h1>
            <button
              onClick={handleClear}
              className="text-[16.5px] select-none focus:outline-none"
            >
              Clear
            </button>
          </div>

          {/* List */}
          <ul className="overflow-y-auto max-h-full md:max-h-[506px] md:min-h-[435px] pb-28 md:pb-12 pt-2 md:pt-0 text-[16.5px] *:border-b *:border-gray-200">
            {currentLevel === "City" &&
              currentData.map((province, i) => (
                <li
                  key={i}
                  onClick={() => handleSelection(province)}
                  className="flex justify-between items-center px-2.5 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none"
                >
                  <span>{province.province[locale]}</span>
                  <div>
                    {myLocations?.province.en === province.province.en ? (
                      <FaCheckCircle className="text-[#028DCF] text-lg" />
                    ) : (
                      <MdOutlineArrowForwardIos className="text-gray-400" />
                    )}
                  </div>
                </li>
              ))}

            {currentLevel === "District" &&
              currentData.map((district, i) => (
                <li
                  key={i}
                  onClick={() => handleSelection(district)}
                  className="flex justify-between items-center px-4 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none"
                >
                  <span>{district.district[locale]}</span>
                  {myLocations?.district.en === district.district.en ? (
                    <FaCheckCircle className="text-[#028DCF] text-lg" />
                  ) : (
                    <MdOutlineArrowForwardIos className="text-gray-400" />
                  )}
                </li>
              ))}

            {currentLevel === "Commune" &&
              currentData.map((commune, i) => (
                <li
                  key={i}
                  onClick={() => handleSelection(commune)}
                  className="px-4 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none flex items-center justify-between"
                >
                  <span>{commune[locale]}</span>
                  {myLocations?.commune.en === commune.en ? (
                    <FaCheckCircle className="text-[#028DCF] text-lg" />
                  ) : (
                    <MdOutlineArrowForwardIos className="text-gray-400" />
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Locations;

// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { locations } from "@/helper/Locations";
// import { IoClose } from "react-icons/io5";
// import { useLocale } from "next-intl";
// import {
//   MdOutlineArrowForwardIos,
//   MdOutlineArrowBackIos,
// } from "react-icons/md";
// import { FaCheckCircle } from "react-icons/fa";

// const Locations = ({
//   isToggleLocation,
//   setToggleLocation,
//   handleSetLocations,
//   handleClearLocations,
//   myLocations,
// }) => {
//   const locale = useLocale();
//   const locationRef = useRef(null);
//   const [currentLevel, setCurrentLevel] = useState("City");
//   const [currentData, setCurrentData] = useState(locations);
//   const [breadcrumb, setBreadcrumb] = useState([]);

//   // Use useCallback to prevent re-creating the function on every render
//   // const handleSelection = useCallback(
//   //   (selectedItem) => {
//   //     if (currentLevel === "City") {
//   //       setCurrentLevel("District");
//   //       setCurrentData(
//   //         locale == "en" ? selectedItem.districts.en : selectedItem.districts.kh
//   //       );
//   //       setBreadcrumb([selectedItem.province]);
//   //     } else if (currentLevel === "District") {
//   //       setCurrentLevel("Commune");
//   //       setCurrentData(
//   //         locale == "en" ? selectedItem.communes.en : selectedItem.communes.kh
//   //       );
//   //       setBreadcrumb([...breadcrumb, selectedItem.district]);
//   //     } else {
//   //       const arrayLocation = [...breadcrumb, selectedItem]
//   //         .join(",")
//   //         .split(",");
//   //       handleSetLocations(arrayLocation);
//   //       setCurrentLevel("City");
//   //       setCurrentData(locations);
//   //       setBreadcrumb([]);
//   //       setToggleLocation(false);
//   //     }
//   //   },
//   //   [currentLevel, breadcrumb, setToggleLocation, handleSetLocations]
//   // );

//   const handleSelection = useCallback(
//     (selectedItem) => {
//       if (currentLevel === "City") {
//         setCurrentLevel("District");
//         setCurrentData(
//           locale == "en" ? selectedItem.districts.en : selectedItem.districts.kh
//         );
//         setBreadcrumb([
//           locale == "en" ? selectedItem.province.en : selectedItem.province.kh,
//         ]);
//       } else if (currentLevel === "District") {
//         setCurrentLevel("Commune");
//         setCurrentData(
//           locale == "en" ? selectedItem.communes.en : selectedItem.communes.kh
//         );
//         setBreadcrumb([
//           ...breadcrumb,
//           locale == "en" ? selectedItem.district.en : selectedItem.district.kh,
//         ]);
//       } else {
//         const arrayLocation = [...breadcrumb, selectedItem];
//         handleSetLocations(arrayLocation);
//         setCurrentLevel("City");
//         setCurrentData(locations);
//         setBreadcrumb([]);
//         setToggleLocation(false);
//       }
//     },
//     [currentLevel, breadcrumb, setToggleLocation, handleSetLocations, locale]
//   );

//   // Back handler for navigating back to previous levels
//   const handleBack = useCallback(() => {
//     if (currentLevel === "Commune") {
//       setCurrentLevel("District");
//       const provinceName = breadcrumb[0];
//       const province = locations.find((p) => p.province === provinceName);
//       setCurrentData(province.districts);
//       setBreadcrumb(breadcrumb.slice(0, -1));
//     } else if (currentLevel === "District") {
//       setCurrentLevel("City");
//       setCurrentData(locations);
//       setBreadcrumb([]);
//     }
//   }, [currentLevel, breadcrumb]);

//   // Clear selection handler
//   const handleClear = useCallback(() => {
//     handleClearLocations();
//     setToggleLocation(false);
//     setCurrentLevel("City");
//     setCurrentData(locations);
//     setBreadcrumb([]);
//   }, [setToggleLocation, handleClearLocations]);

//   // Handle keydown for escape key to close the location modal
//   const handleKeyDown = useCallback(
//     (e) => {
//       if (e.key === "Escape") {
//         setToggleLocation(false);
//       }
//     },
//     [setToggleLocation]
//   );

//   // First useEffect for keyboard events and preventing scrolling
//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     if (isToggleLocation) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "auto";
//     };
//   }, [isToggleLocation, handleKeyDown]);

//   // Second useEffect for handling click outside to close the modal
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (locationRef.current && !locationRef.current.contains(e.target)) {
//         setToggleLocation(false);
//       }
//     };
//     if (isToggleLocation) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isToggleLocation, setToggleLocation]);

//   return (
//     <div className="">
//       <div
//         className={`fixed inset-0 h-screen w-full bg-[#0f0d0d] bg-opacity-50 z-10 transition-all duration-300
//         ${isToggleLocation ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//       ></div>
//       <div
//         className={`fixed z-20 h-screen md:h-auto w-full top-0 left-0 transition-all duration-300  ${
//           isToggleLocation
//             ? "opacity-100 translate-y-0 md:translate-y-20 lg:translate-y-5"
//             : "-translate-y-10 md:translate-y-0 opacity-0 pointer-events-none"
//         }`}
//       >
//         <div
//           ref={locationRef}
//           className="max-w-[501px] h-full mx-auto md:mt-10 bg-white shadow rounded md:overflow-hidden"
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center bg-[#028dcf] text-white px-4 py-[11px]">
//             <div className="flex items-center gap-2">
//               {currentLevel !== "City" ? (
//                 <button
//                   onClick={handleBack}
//                   className="select-none focus:outline-none"
//                 >
//                   <MdOutlineArrowBackIos className="text-xl" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setToggleLocation(false)}
//                   className="select-none focus:outline-none"
//                 >
//                   <IoClose className="text-[28px]" />
//                 </button>
//               )}
//             </div>
//             <h1 className="text-lg font-semibold select-none">
//               {currentLevel} / {breadcrumb[breadcrumb.length - 1] || "Province"}
//             </h1>
//             <button
//               onClick={handleClear}
//               className="text-[16.5px] select-none focus:outline-none"
//             >
//               Clear
//             </button>
//           </div>

//           {/* List */}
//           <ul className=" *:border-b *:border-gray-200 overflow-y-auto max-h-full md:max-h-[506px] md:min-h-[435px] pb-28 md:pb-12 pt-2 md:pt-0 text-[16.5px]">
//             {currentLevel === "City" &&
//               currentData.map((province, i) => (
//                 <li
//                   key={province + i}
//                   onClick={() => handleSelection(province)}
//                   className="flex justify-between items-center px-2.5 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none"
//                 >
//                   <span>
//                     {locale == "en"
//                       ? province?.province.en
//                       : province?.province.kh}
//                   </span>
//                   <div>
//                     {myLocations?.province === province.province.en ||
//                     myLocations?.province === province.province.kh ? (
//                       <FaCheckCircle className=" text-[#028DCF] text-lg" />
//                     ) : (
//                       <MdOutlineArrowForwardIos className="text-gray-400" />
//                     )}
//                   </div>
//                 </li>
//               ))}
//             {currentLevel === "District" &&
//               currentData.map((district, i) => (
//                 <li
//                   key={district + i}
//                   onClick={() => handleSelection(district)}
//                   className="flex justify-between items-center px-4 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none"
//                 >
//                   <span>
//                     {locale == "en"
//                       ? district?.district.en
//                       : district?.district.kh}
//                   </span>
//                   {myLocations?.district === district.district.en ||
//                   myLocations?.district === district.district.kh ? (
//                     <FaCheckCircle className=" text-[#028DCF] text-lg" />
//                   ) : (
//                     <MdOutlineArrowForwardIos className="text-gray-400" />
//                   )}
//                 </li>
//               ))}
//             {currentLevel === "Commune" &&
//               currentData.map((commune) => (
//                 <li
//                   key={commune}
//                   onClick={() => handleSelection(district)}
//                   className="px-4 py-[12.37px] cursor-pointer hover:bg-gray-100 select-none flex items-center justify-between"
//                 >
//                   <span>{commune}</span>
//                   {myLocations?.commune === commune.en ||
//                   myLocations?.commune === commune.kh ? (
//                     <FaCheckCircle className=" text-[#028DCF] text-lg" />
//                   ) : (
//                     <MdOutlineArrowForwardIos className="text-gray-400" />
//                   )}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Locations;
