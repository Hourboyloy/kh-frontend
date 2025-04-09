"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

const locations = [
  { name: "Phnom Penh", khName: "ភ្នំពេញ" },
  { name: "Preah Sihanouk", khName: "ព្រះសីហនុ" },
  { name: "Kampong Cham", khName: "កំពង់ចាម" },
  { name: "Siem Reap", khName: "សៀមរាប" },
  { name: "Battambang", khName: "បាត់ដំបង" },
  { name: "Kandal", khName: "កណ្តាល" },
  { name: "Banteay Meanchey", khName: "បន្ទាយមានជ័យ" },
  { name: "Kampong Chhnang", khName: "កំពង់ឆ្នាំង" },
  { name: "Kampong Speu", khName: "កំពង់ស្ពឺ" },
  { name: "Kampong Thom", khName: "កំពង់ធំ" },
  { name: "Kampot", khName: "កំពត" },
  { name: "Kep", khName: "កែប" },
  { name: "Koh Kong", khName: "កោះកុង" },
  { name: "Kratie", khName: "ក្រចេះ" },
  { name: "Mondulkiri", khName: "មណ្ឌលគិរី" },
  { name: "Oddar Meanchey", khName: "ឧត្តរមានជ័យ" },
  { name: "Pailin", khName: "បៃលិន" },
  { name: "Preah Vihear", khName: "ព្រះវិហារ" },
  { name: "Prey Veng", khName: "ព្រៃវែង" },
  { name: "Pursat", khName: "ពោធិ៍សាត់" },
  { name: "Ratanakiri", khName: "រតនគិរី" },
  { name: "Stung Treng", khName: "ស្ទឹងត្រែង" },
  { name: "Svay Rieng", khName: "ស្វាយរៀង" },
  { name: "Takeo", khName: "តាកែវ" },
  { name: "Tboung Khmum", khName: "ត្បូងឃ្មុំ" },
];

function BrowsebyLocation() {
  const locale = useLocale();
  return (
    <div className="bg-white p-4 pb-[19px] lg:rounded border-r border-l lg:border space-y-4">
      {locale == "en" ? (
        <h1 className="font-semibold">Browse by Location</h1>
      ) : (
        <h1 className="font-semibold font-battambang">ស្វែងរកតាមទីតាំង</h1>
      )}
      <ul className={`grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1`}>
        {locations.map((location, i) => {
          const slug = location?.name?.toLowerCase().replace(/\s+/g, "-"); // Generate slug

          return (
            <li key={location + i}>
              <Link
                href={`/search?province=${slug}`}
                className={`focus:outline-none outline-none text-[#006DA1]`}
              >
                {locale == "en" ? (
                  <span>{location.name}</span>
                ) : (
                  <span className="text-sm font-battambang">
                    {location.khName}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BrowsebyLocation;
