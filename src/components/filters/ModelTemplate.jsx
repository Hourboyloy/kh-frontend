import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

function ModelTemplate({
  lists,
  path,
  keyName,
  handleSetValue,
  toggle,
  handleToggle,
  name,
}) {
  const templateRef = useRef(null);
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    }
    const handleClickOutside = (event) => {
      if (templateRef.current && !templateRef.current.contains(event.target)) {
        handleToggle(); // Close the modal
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [toggle, handleToggle]);

  return (
    <div className=" font-sans">
      <div
        className={`h-screen fixed inset-0 z-20 bg-[#2d2727] bg-opacity-60 transition-opacity duration-200 ${
          toggle ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 inset-0 w-full md:rounded-none h-screen flex md:justify-center z-30 transition-all ease-in-out duration-200 md:duration-300 ${
          toggle
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <section className="mx-auto w-full h-screen overflow-y-scroll">
          <div className="h-[91.5vh]">
            <div className="md:mt-[70px]"></div>
            <div
              ref={templateRef}
              className="h-[537.23px] w-[500px] mx-auto bg-white rounded border p-4"
            >
              <div className="flex items-center justify-between space-x-3 px-3 py-[9.4px] bg-[#f1f1f1] border-b">
                <button
                  onClick={handleToggle}
                  className=" outline-none focus:outline-none"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="pl-3">{name}</div>
                <button
                  onClick={() => handleSetValue(keyName, null)}
                  className="text-[#028dcf]"
                >
                  Clear
                </button>
              </div>

              <section className="">
                <ul className="w-full max-h-[460px] overflow-y-scroll pb-4">
                  {lists?.length > 0 &&
                    lists.map((item, i) => (
                      <li
                        onClick={() => handleSetValue(keyName, item.name)}
                        key={item + i}
                        className=" hover:bg-[#f6f6f6] transition-all duration-200 ease-in-out cursor-pointer"
                      >
                        <div className="w-full py-1 px-3 border-b flex items-center space-x-2.5">
                          <div className="w-[45px] h-[45px]">
                            <Image
                              width={500}
                              height={800}
                              className="w-[45px] h-[45px]"
                              src={
                                path
                                  ? require(`@/assets/${path}/${item.url}`)
                                  : require(`@/assets/${item.url}`)
                              }
                              priority
                              alt=""
                            />
                          </div>
                          <p className="text-[15px]">{item.name}</p>
                        </div>
                      </li>
                    ))}
                </ul>
              </section>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ModelTemplate;
