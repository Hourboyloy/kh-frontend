"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const ListAd = dynamic(
  () => import("@/components/dashboardComponents/ListAd"),
  { ssr: false }
);
const AdForm = dynamic(
  () => import("@/components/dashboardComponents/AddAdForm"),
  { ssr: false }
);
const Loading = dynamic(() => import("@/components/Loading"), { ssr: false });

const Page = () => {
  const locale = useLocale();
  const t = useTranslations("adPage");
  const router = useRouter();
  const { domain, token, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalAds, setTotalAds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [adToEdit, setAdToEdit] = useState(null);

  const fetchAds = useCallback(async () => {
    try {
      const response = await axios.get(`${domain}/ads?page=${currentPage}`);
      setAds(response.data.ads);
      setTotalAds(response.data.totalAds);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching ads", error);
    }
  }, [domain, currentPage]);

  useEffect(() => {
    if (domain && currentPage) {
      fetchAds();
    }
  }, [fetchAds, domain, currentPage]);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const handleEdit = (ad) => {
    setAdToEdit(ad); // Set the ad to be edited
    setShowForm(true); // Show the form
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad?"
    );

    if (confirmDelete) {
      setLoading(true);
      try {
        const response = await axios.delete(`${domain}/delete-ad/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          fetchAds();
          setLoading(false);
          setTimeout(() => {
            alert("Ad deleted successfully!");
          }, 200);
        } else {
          setTimeout(() => {
            alert("Failed to delete the ad.");
          }, 200);
        }
      } catch (error) {
        setLoading(false);
        setTimeout(() => {
          alert("There was an error while deleting the ad.");
        }, 200);
      }
    }
  };

  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);

  if (account === null || account?.type !== TYPE) return <div></div>;

  return (
    <div className="container mx-auto md:px-4 lg:px-0">
      {loading && <Loading />}
      <AdForm
        showForm={showForm}
        setShowForm={setShowForm}
        setAdToEdit={setAdToEdit}
        token={token}
        domain={domain}
        setCurrentPage={setCurrentPage}
        setAds={setAds}
        ad={adToEdit}
        isUpdate={!!adToEdit}
      />
      <div
        className={`flex items-center justify-between px-4 ${
          locale == "en" ? "font-sans" : "font-battambang"
        }`}
      >
        <h1 className={`lg:text-2xl text-xl font-semibold mb-4 text-[#0098D5]`}>
          {t("title")}
        </h1>

        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#0098D5] text-white md:px-4 px-2 md:py-1.5 py-1 rounded hover:bg-[#007bb5] flex items-center space-x-1.5"
          >
            <FaPlus className="text-xs" /> <span> {t("addBtn")}</span>
          </button>
        </div>
      </div>

      <ListAd
        t={t}
        locale={locale}
        ads={ads}
        onEdit={handleEdit}
        currentPage={currentPage}
        totalAds={totalAds}
        totalPages={totalPages}
        handleDelete={handleDelete}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Page;
