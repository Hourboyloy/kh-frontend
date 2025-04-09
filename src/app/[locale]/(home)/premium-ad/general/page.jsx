"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/GlobalContext";

const Loading = dynamic(() => import("@/components/Loading"), {
  ssr: false,
});
const RightPlan = dynamic(() => import("@/components/boost/RightPlan"), {
  ssr: false,
});
const SmNavNormal = dynamic(() => import("@/components/SmNavNormal"), {
  ssr: false,
});

function Page() {
  const router = useRouter();
  const { domain, token, setSubscription, account } = useAppContext();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isPending, setIsPending] = useState(false);
  const [terms, setTerms] = useState({ perWeek: 4, perMonth: 16 });
  const [getTerm, setGetTerm] = useState(terms?.perWeek);
  const [subscribePer, setSubscribePer] = useState("7 Days");
  const [product, setProduct] = useState();

  const handleSetSubScription = () => {
    if (product && getTerm) {
      localStorage.setItem(
        "subScription",
        JSON.stringify({ product, term: getTerm, subscribePer })
      );
      setSubscription({ product, term: getTerm, subscribePer });
      router.push("/checkout");
    }
  };

  const handleSetTerm = (getTerm, SubscribePer) => {
    setSubscribePer(SubscribePer);
    setGetTerm(getTerm);
  };

  const fetchProduct = useCallback(async () => {
    if (!account) return;
    try {
      setIsPending(true);
      const res = await axios.get(
        `${domain}/subscription-product/${id}/account/${account?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  }, [id, setProduct, account, domain, token]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      {isPending && <Loading />}

      <div className="lg:hidden sticky top-0 z-[9]">
        <SmNavNormal name={"General"} />
      </div>

      <div className="max-w-[820px] mx-auto pt-5 mb-20">
        <div>
          <RightPlan
            terms={terms}
            getTerm={getTerm}
            handleSetTerm={handleSetTerm}
            handleSetSubScription={handleSetSubScription}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
