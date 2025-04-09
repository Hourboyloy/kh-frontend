import React from "react";
import Image from "next/image";

function ListBrandTypeAndMore({ path, lists, keyName, handleSetValue }) {
  return (
    <div className="">
      <ul className="overflow-x-auto flex w-full border-b pr-2">
        {lists?.length > 0 &&
          lists.map((item, i) => (
            <li
              onClick={() => handleSetValue(keyName, item.name)}
              key={item + i}
              className=""
            >
              <div className="w-[105px] flex flex-col items-center justify-center py-4">
                <div className="w-[60px] h-[60px]">
                  <Image
                    width={500}
                    height={800}
                    className="w-[60px] h-[60px]"
                    src={require(`@/assets/${path}/${item.url}`)}
                    priority
                    alt=""
                  />
                </div>
                <h1 className="text-[13.9px] text-center font-sans">
                  {item.name.length > 20
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </h1>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListBrandTypeAndMore;
