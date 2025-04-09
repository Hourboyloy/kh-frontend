import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

function CardCategories({ mainCategories }) {
  const locale = useLocale();
  return (
    <div className="md:py-5">
      <div className="bg-white lg:rounded border-t border-b lg:border md:py-[17.6px]">
        <ul className="grid md:grid-cols-4 grid-cols-3 lg:grid-cols-6 px-1">
          {mainCategories?.map((category, i) => (
            <li key={category + i}>
              <Link
                href={category.link}
                className="outline-none focus:outline-none"
              >
                <div className="flex flex-col items-center h-[153px] space-y-3 md:px-1 md:pb-1 md:pt-5 pt-4">
                  <div className="h-[60px] w-[60px] bg-[#DEF2FF] rounded-full">
                    <Image
                      className="w-full h-full object-cover object-center"
                      src={require(`@/assets/${category.photoUrl}`)}
                      width={1000}
                      height={1000}
                      alt=""
                    />
                  </div>
                  {locale == "en" ? (
                    <h2 className="text-center text-wrap px-2 mb-auto">
                      {category.name?.length > 35
                        ? `${category.name?.slice(0, 35)}...`
                        : category.name}
                    </h2>
                  ) : (
                    <h2 className="text-center text-wrap px-2 mb-auto text-sm font-medium font-battambang">
                      {category.khName?.length > 35
                        ? `${category.khName?.slice(0, 35)}...`
                        : category.khName}
                    </h2>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CardCategories;
