import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi2";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMoreVert } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { FaRegIdCard } from "react-icons/fa";
import { IoRadioButtonOffSharp } from "react-icons/io5";
import { IoRadioButtonOn } from "react-icons/io5";

const EditDialog = dynamic(() => import("@/components/buttons/EditDialog"), {
  ssr: false,
});

const ButtonDeleteAddress = dynamic(
  () => import("@/components/buttons/ButtonDeleteAddress"),
  {
    ssr: false,
  }
);
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function ListAddress({
  addresses,
  setAddresses,
  domain,
  token,
  account,
  change_address,
  addressID,
  handleSetAddress,
  t,
  locale,
}) {
  const [id, setId] = useState(null);
  const [toggleShow, setToggleShow] = useState(null);
  const [toggleShowDeleteAddress, setToggleShowDeleteAddress] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [asDefault, setAsDefault] = useState(false);
  const editButtonRefs = useRef({});

  const handleSetToggle = (id, asDefault) => {
    setToggleShow((prev) => (prev === id ? null : id));
    setToggleEdit(true);
    setAsDefault(asDefault);
    setId(id);
  };

  const handleToggleButtonDelete = () => {
    setToggleShowDeleteAddress(!toggleShowDeleteAddress);
    setToggleShow(null);
    setToggleEdit(false);
  };

  const handleDelete = async () => {
    if (!account || !id) return;
    setIsPending(true);
    setToggleShowDeleteAddress(false);
    const TYPE = process.env.NEXT_PUBLIC_TYPE;
    try {
      const res = await axios.delete(
        `${domain}${
          account?.type == TYPE ? "/manager" : ""
        }/address/${id}/account/${account?._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        const filterAddress = addresses.filter((e) => e._id !== id);
        setAddresses(filterAddress);
        setTimeout(() => {
          alert("Delete Successfuly");
        }, 100);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg = 1024px
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        toggleShow &&
        editButtonRefs.current[toggleShow] &&
        !editButtonRefs.current[toggleShow].contains(event.target)
      ) {
        setToggleShow(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleShow]);

  return (
    <div>
      {isPending && <Loading />}

      <div>
        <ButtonDeleteAddress
          handleDelete={handleDelete}
          toggleShowDeleteAddress={toggleShowDeleteAddress}
          handleToggleButtonDelete={handleToggleButtonDelete}
        />
      </div>

      <div>
        {isMobile && (
          <EditDialog
            t={t}
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
            id={id}
            setId={setId}
            setToggleShow={setToggleShow}
            asDefault={asDefault}
            handleToggleButtonDelete={handleToggleButtonDelete}
          />
        )}
      </div>
      <ul className="grid grid-cols-1 gap-4 font-sans">
        {addresses?.map((address, i) => (
          <li
            onClick={() => {
              if (change_address === "true") {
                handleSetAddress(address?._id);
              }
            }}
            key={address._id || i}
            className="rounded-lg border overflow-hidden bg-white relative"
          >
            <div
              ref={(el) => (editButtonRefs.current[address._id] = el)}
              className="flex flex-col items-end w-fit absolute z-[1] top-1 right-1"
            >
              <button
                onClick={() =>
                  handleSetToggle(address?._id, address.setAsDefault)
                }
                className="select-none focus:outline-none text-gray-300 w-[50px] h-[50px] flex items-center justify-center rounded-full active:bg-gray-50"
              >
                <MdOutlineMoreVert size={25} />
              </button>

              {toggleShow === address?._id && (
                <div className="border border-gray-300 rounded-md hidden lg:block">
                  <Link
                    href={`/billing-addresses/edit?id=${address?._id}`}
                    className="w-[170px] h-[52.6px] lg:flex items-center  py-3 px-4 select-none focus:outline-none hover:bg-gray-50"
                  >
                    {t("editBtn")}
                  </Link>
                  {!address.setAsDefault && (
                    <button
                      onClick={handleToggleButtonDelete}
                      className="w-[170px] h-[52.6px] lg:flex items-center py-3 px-4 select-none focus:outline-none text-red-600 hover:bg-gray-50"
                    >
                      {t("deleteBtn")}
                    </button>
                  )}
                </div>
              )}
            </div>

            {address.setAsDefault && (
              <p className="w-fit text-xs bg-gradient-to-r from-[#4D28FF] via-[#454AFF] to-[#3E64FF] px-2 py-1 rounded-br-lg">
                <span className="text-white">{t("defualt")}</span>
              </p>
            )}

            <section
              className={`flex items-center px-4 pb-5  ${
                address.setAsDefault ? "pt-2" : "pt-4"
              }`}
            >
              {change_address === "true" && (
                <div className="pr-4">
                  {addressID === address?._id ? (
                    <IoRadioButtonOn size={23} className="text-[#0096DE]" />
                  ) : (
                    <IoRadioButtonOffSharp
                      size={23}
                      className="text-gray-600"
                    />
                  )}
                </div>
              )}

              <div className="">
                <div className={`pb-2.5`}>
                  <h1 className="font-semibold">{address.saveAs}</h1>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 -translate-x-0.5">
                    <HiUserCircle className="text-gray-500" size={17} />
                    <span className="text-sm">{address.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-gray-500" size={15} />

                    <div className="flex items-center text-sm">
                      {address.phoneNum?.map((number, i) => (
                        <p key={number + i}>
                          {i !== 0 && <span>, </span>} {number}
                        </p>
                      ))}
                    </div>
                  </div>

                  {address?.mail && (
                    <div className="flex items-center space-x-2">
                      <IoMdMail className="text-gray-500" size={15} />
                      <span className="text-sm">{address.mail}</span>
                    </div>
                  )}

                  {address?.company && (
                    <div className="flex items-center space-x-2">
                      <BsBuildingsFill className="text-gray-500" size={15} />
                      <span className="text-sm">{address.company}</span>
                    </div>
                  )}

                  {address?.taxID && (
                    <div className="flex items-center space-x-2">
                      <FaRegIdCard className="text-gray-500" size={15} />
                      <span className="text-sm">{address.taxID}</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <FaLocationDot className="text-gray-500" size={15} />
                    <div className="space-y-2">
                      <p className="text-sm">
                        {`${address.locations.commune[locale] || ""}, ${
                          address.locations.district[locale] || ""
                        }, ${address.locations.province[locale] || ""}`}
                      </p>
                      <p className="text-sm text-gray-600">{address.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListAddress;
