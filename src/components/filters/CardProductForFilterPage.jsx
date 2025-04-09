import React, { useState } from "react";
import dynamic from "next/dynamic";

const CardsProducts = dynamic(() => import("@/components/CardsProducts"), {
  ssr: false,
});
const CardSlider = dynamic(() => import("@/components/CardSlider"), {
  ssr: false,
});
const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});

function CardProductForFilterPage({
  products,
  setProducts,
  domain,
  account,
  token,
  toggleDisplayCards,
}) {
  const [isPending, setIsPending] = useState(false);
  return (
    <div>
      {isPending && <Loading />}
      <ul className="py-3">
        {products?.length > 0 &&
          products.map((item, i) => (
            <li key={item + i}>
              <div className=" space-y-3">
                <div>
                  {item?.firstProducts?.length > 0 && (
                    <CardsProducts
                      productName={"firstProducts"}
                      accType={account?.type}
                      page={"search"}
                      products={item?.firstProducts}
                      toggleDisplayCards={toggleDisplayCards}
                      domain={domain}
                      token={token}
                      accID={account?._id}
                      setIsPending={setIsPending}
                      setProducts={setProducts}
                      isHasStartSelling={true}
                    />
                  )}
                </div>
                <div>
                  {item?.topProducts?.length > 0 && (
                    <div className="">
                      <h1 className="bg-gradient-to-b from-[#94DDFF] via-[#94DDFF] to-[#94DDFF] text-xl font-bold font-sans text-gray-800 py-4 px-2.5 lg:rounded-t-md">
                        HIGHLIGHTS
                      </h1>
                      <div className="bg-gradient-to-b from-[#94DDFF] via-[#C5EDFF] to-[#F9FDFF] overflow-x-scroll pb-3 px-2.5">
                        <CardSlider
                          productName={"topProducts"}
                          page={"search"}
                          products={item?.topProducts}
                          setProducts={setProducts}
                          setIsPending={setIsPending}
                          domain={domain}
                          accType={account?.type}
                          token={token}
                          accID={account?._id}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {item?.secondProducts?.length > 0 && (
                    <CardsProducts
                      productName={"secondProducts"}
                      accType={account?.type}
                      page={"search"}
                      products={item?.secondProducts}
                      toggleDisplayCards={toggleDisplayCards}
                      domain={domain}
                      token={token}
                      accID={account?._id}
                      setIsPending={setIsPending}
                      setProducts={setProducts}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default CardProductForFilterPage;
