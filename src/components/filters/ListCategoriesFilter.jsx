import Image from "next/image";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function ListCategoriesFilter({ categories, setCategory, locale }) {
  return (
    <div className="py-3.5">
      <ul className="grid md:grid-cols-6 grid-cols-4 gap-3">
        {categories?.length > 0 &&
          categories?.map((category, i) => (
            <li
              onClick={() => setCategory(category?.name)}
              key={category + i}
              className="cursor-pointer"
            >
              <div className="h-full">
                <div className="flex flex-col items-center min-h-[97px] space-y-3 md:px-1">
                  <div className="h-[60px] w-[60px] bg-[#DEF2FF] rounded-full overflow-hidden">
                    <div className="">
                      {category?.photo ? (
                        <Image
                          className="h-[60px] w-[60px] object-cover object-center"
                          src={category?.photo}
                          width={800}
                          height={500}
                          priority
                          alt=""
                        />
                      ) : (
                        <div className="h-[60px] w-[60px] flex items-center justify-center text-gray-400">
                          <MdOutlinePhotoSizeSelectActual size={26} />
                        </div>
                      )}
                    </div>
                  </div>
                  {locale == "en" ? (
                    <>
                      <h2 className="text-center mb-auto px-1 text-[13px] text-wrap lg:text-nowrap hidden md:block">
                        {category.name?.length > 35
                          ? `${category.name?.slice(0, 35)}...`
                          : category.name}
                      </h2>
                      <h2 className="text-center text-wrap mb-auto px-1 text-[13px] md:hidden">
                        {category.name.includes("Accessories") ||
                        category.name.includes("Hobbies")
                          ? category.name.split("&")[0].trim() + " &..."
                          : category.name}
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2 className="text-center mb-auto px-1 text-[13px] text-wrap lg:text-nowrap">
                        {category.khName?.length > 35
                          ? `${category.khName?.slice(0, 35)}...`
                          : category.khName}
                      </h2>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListCategoriesFilter;
