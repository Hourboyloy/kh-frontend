import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { RxDashboard } from "react-icons/rx";
import { MdFormatListBulleted } from "react-icons/md";
const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function HomeAccount({
  toggleDisplayCards,
  handleDisplayCardsAsCols,
  handleDisplayCardsAsRow,
  products,
  domain,
  token,
  setProducts,
  accID,
  accType,
  t,
  locale,
}) {
  const [isPending, setIsPending] = useState(false);
  return (
    <div
      className={`px-3 lg:px-4 xl:px-0 ${locale == "en" ? " font-sans" : ""}`}
    >
      {isPending && <Loading isPending={isPending} />}
      {/* Empty State */}
      {products.length <= 0 && (
        <div className="h-[263px] flex flex-col items-center justify-center gap-3 border bg-white shadow">
          <div className="w-[110px] h-[110px]">
            <Image
              className="w-full h-full object-cover object-center"
              src={require("@/assets/empty-box.png")}
              width={500}
              height={500}
              alt="empty-box"
            />
          </div>
          <p className="text-gray-400 pb-4">
            You don&apos;t have any post has been active.
          </p>
        </div>
      )}
      {/* Posts List */}
      {products.length > 0 && (
        <div className="pt-[22px] space-y-[11px]">
          <div className="flex items-center justify-between">
            <h2 className=" font-semibold text-gray-800 text-xl">
              {t("lastest")}
            </h2>
            <div className="bg-white rounded overflow-hidden">
              <button
                onClick={handleDisplayCardsAsRow}
                className={`py-1.5 px-2 transition-all ease-in-out ${
                  toggleDisplayCards
                    ? "bg-gray-50 text-gray-800"
                    : "text-[#028DCF]"
                }`}
              >
                <MdFormatListBulleted size={20} />
              </button>
              <button
                onClick={handleDisplayCardsAsCols}
                className={`py-1.5 px-2 transition-all ease-in-out ${
                  toggleDisplayCards
                    ? "text-[#028DCF]"
                    : "bg-gray-50 text-gray-800"
                }`}
              >
                <RxDashboard size={20} />
              </button>
            </div>
          </div>

          <CardsProducts
            products={products}
            setProducts={setProducts}
            toggleDisplayCards={toggleDisplayCards}
            domain={domain}
            token={token}
            accID={accID}
            accType={accType}
            setIsPending={setIsPending}
            currentPathAtViewAccount={true}
          />
        </div>
      )}
    </div>
  );
}

export default HomeAccount;
