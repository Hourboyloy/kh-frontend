import { useState } from "react";
import { formatText } from "@/helper/formatText";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const LocationFilter = ({
  handleToggleLocation,
  handleClearLocation,
  dropdownLocationRef,
  locations,
  //
  province,
  setProvince,
  district,
  setDistrict,
  commune,
  setCommune,
  //
  setDisplayProvince,
  setDisplayDistrict,
  setDisplayCommune,
  //
  setToggleLocation,
  locale,
  t,
}) => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [getProvince, setGetProvince] = useState("");
  const [getDistrict, setGetDistrict] = useState("");

  const [getDisProvince, setGetDisProvince] = useState("");
  const [getDisDistrict, setGetDisDistrict] = useState("");

  const handleProvince = (selectedProvince, getProvince, getDisProvince) => {
    setSelectedProvince(selectedProvince);
    setGetProvince(getProvince);
    setGetDisProvince(getDisProvince);
  };

  const handleDistrict = (selectedDistrict, getDistrict, getDisDistrict) => {
    setSelectedDistrict(selectedDistrict);
    setGetDistrict(getDistrict);
    setGetDisDistrict(getDisDistrict);
  };

  const handleCommune = (getCommune, displayCommune) => {
    setCommune(getCommune);
    setDistrict(getDistrict);
    setProvince(getProvince);
    setToggleLocation(false);

    setDisplayCommune(displayCommune);
    setDisplayDistrict(getDisDistrict);
    setDisplayProvince(getDisProvince);

    setSelectedProvince(null);
    setSelectedDistrict(null);
    setGetProvince("");
    setGetDistrict("");
    setGetDisProvince("");
    setGetDisDistrict("");
  };

  const closeLocationWhere = () => {
    if (getProvince && getDistrict === "") {
      setProvince(getProvince);
      setDistrict("");
      setCommune("");
      //
      setDisplayProvince(getDisProvince);
      setDisplayDistrict("");
      setDisplayCommune("");
    } else if (getProvince && getDistrict) {
      setProvince(getProvince);
      setDistrict(getDistrict);
      setCommune("");
      //
      setDisplayProvince(getDisProvince);
      setDisplayDistrict(getDisDistrict);
      setDisplayCommune("");
    }
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setGetProvince("");
    //
    setGetDistrict("");
    setGetDisProvince("");
    setGetDisDistrict("");
    setToggleLocation(false);
  };

  const handleBack = () => {
    if (selectedDistrict) {
      setSelectedDistrict(null);
      setGetDistrict("");
      setGetDisDistrict("");
    } else {
      setSelectedProvince(null);
      setGetProvince("");
      setGetDisProvince("");
    }
  };

  return (
    <div
      ref={dropdownLocationRef}
      className="w-full border-t md:border border-gray-300 lg:rounded-md bg-white overflow-hidden"
    >
      <div className="h-[38px] flex items-center justify-between lg:justify-center pl-2 pr-3.5 lg:px-0 font-semibold text-[#212529] bg-[#e4e4e4] lg:bg-[#C7C7C7] relative border-b">
        {(selectedProvince || selectedDistrict) && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-700 hover:text-black transition"
            onClick={handleBack}
          >
            <MdKeyboardArrowLeft size={22} />
          </button>
        )}

        <div className="w-fit lg:hidden">
          {!selectedProvince && !selectedDistrict && (
            <button
              className=" flex items-center gap-1 text-gray-700 hover:text-black transition outline-none focus:outline-none"
              onClick={handleToggleLocation}
            >
              <IoMdClose size={20} />
            </button>
          )}
        </div>

        <span className="md:text-[17px] text-[15.5px] pl-4 lg:pl-0">
          {t("locationTitle")}
        </span>

        <button
          onClick={handleClearLocation}
          className="text-[15px] lg:hidden hover:text-black transition font-medium text-[#249ad1] outline-none focus:outline-none"
        >
          {t("clear")}
        </button>
      </div>

      <div className="lg:h-[430px] h-[490px] overflow-y-scroll scroll-smooth">
        {/* Show Provinces */}
        {getDisProvince && !getDisDistrict ? (
          <div
            onClick={closeLocationWhere}
            className="text-[#028DCF] font-semibold border-b  py-2 px-2 hover:bg-[#f7f7f7]"
          >
            {t("showAllAdsIn")} <span>{getDisProvince}</span>
          </div>
        ) : getDisProvince && getDisDistrict ? (
          <div
            onClick={closeLocationWhere}
            className="text-[#028DCF] font-semibold border-b  py-2 px-2 hover:bg-[#f7f7f7]"
          >
            {t("showAllAdsIn")} <span>{getDisDistrict}</span>
          </div>
        ) : (
          ""
        )}

        {!selectedProvince &&
          locations.map((location, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 pl-2 pr-2 lg:pr-0 border-b cursor-pointer hover:bg-[#f7f7f7]"
              onClick={() =>
                handleProvince(
                  location,
                  location.province.en,
                  location.province[locale]
                )
              }
            >
              <span>{location.province[locale]}</span>
              {formatText(province) === location.province.en ? (
                <IoIosCheckmarkCircle className="text-[#028DCF]" size={20} />
              ) : (
                <MdKeyboardArrowRight className="text-gray-500" size={20} />
              )}
            </div>
          ))}

        {/* Show Districts */}
        {selectedProvince &&
          !selectedDistrict &&
          selectedProvince.districts.map((dis, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 pl-2 pr-2 lg:pr-0 border-b cursor-pointer hover:bg-[#f7f7f7]"
              onClick={() =>
                handleDistrict(dis, dis.district.en, dis.district[locale])
              }
            >
              <span>{dis.district[locale]}</span>
              {formatText(district) === dis.district.en ? (
                <IoIosCheckmarkCircle className="text-[#028DCF]" size={20} />
              ) : (
                <MdKeyboardArrowRight className="text-gray-500" size={20} />
              )}
            </div>
          ))}

        {/* Show Communes */}
        {selectedDistrict &&
          selectedDistrict.communes.map((comm, index) => (
            <div
              key={index}
              onClick={() => handleCommune(comm.en, comm[locale])}
              className="flex justify-between items-center py-2 pl-2 pr-2 lg:pr-0 border-b cursor-pointer hover:bg-[#f7f7f7]"
            >
              <span>{comm[locale]}</span>
              {formatText(commune) === comm.en ? (
                <IoIosCheckmarkCircle className="text-[#028DCF]" size={20} />
              ) : (
                <MdKeyboardArrowRight className="text-gray-500" size={20} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LocationFilter;
