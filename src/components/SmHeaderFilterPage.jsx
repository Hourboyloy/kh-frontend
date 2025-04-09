import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { LiaSlidersHSolid } from "react-icons/lia";

function SmHeaderFilterPage({
  count,
  searchKeyWord,
  handleClearKeyword,
  handleToggleFormFilter,
  handleToggleSearchingPage,
  t,
}) {
  const router = useRouter();
  return (
    <div className="w-full bg-[#028DCE] flex items-center justify-between px-3 py-[4px] space-x-3 text-white">
      <div onClick={() => router.back()} className="w-fit">
        <IoMdArrowBack size={24} />
      </div>
      <div className="w-full bg-[#44aede] rounded h-[34px] flex items-center justify-between px-2">
        <div onClick={handleToggleSearchingPage} className="w-fit pr-1.5">
          <GoSearch />
        </div>

        <div
          onClick={handleToggleSearchingPage}
          className="w-full flex items-center space-x-1"
        >
          <span>{t("search")}</span>
          <div>
            <p className="md:hidden">
              {searchKeyWord?.length > 18
                ? searchKeyWord.slice(0, 18) + "..."
                : searchKeyWord}
            </p>

            <p className=" hidden md:block">
              {searchKeyWord?.length > 64
                ? searchKeyWord.slice(0, 64) + "..."
                : searchKeyWord}
            </p>
          </div>
        </div>

        <div onClick={handleClearKeyword} className="w-fit">
          <MdClose size={18} />
        </div>
      </div>

      <div onClick={handleToggleFormFilter} className="w-fit relative">
        {count > 0 && (
          <span className="bg-[#F58800] w-3 h-3 flex items-center justify-center text-[9px] rounded-full absolute -top-[3px] -right-1">
            {count}
          </span>
        )}
        <LiaSlidersHSolid size={24} />
      </div>
    </div>
  );
}

export default SmHeaderFilterPage;
