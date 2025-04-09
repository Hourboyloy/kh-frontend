"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";

const ListProducts = dynamic(
  () => import("@/components/dashboardComponents/ListProducts"),
  { ssr: false }
);
const ActionUser = dynamic(
  () => import("@/components/dashboardComponents/ActionUser"),
  { ssr: false }
);

function Page() {
  const t = useTranslations("productsPage");
  const locale = useLocale();
  const router = useRouter();
  const { token, domain, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;
  const [products, setProducts] = useState([]);
  const [updates, setUpdates] = useState({});
  const [product, setProduct] = useState(null);
  const [toggleAction, setToggleAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch users with page number
  const fetchProfucts = useCallback(
    async (page) => {
      try {
        const res = await axios.get(`${domain}/products?limit=10&page=${page}`);
        if (res.data.products.length > 0) {
          setProducts(res.data.products);
          setCurrentPage(res.data.currentPage);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [domain]
  );

  useEffect(() => {
    if (products.length === 0) {
      fetchProfucts(1); // Fetch users on initial load
    }
  }, [fetchProfucts, products.length]);

  const handleClick = (id) => {
    setToggleAction(!toggleAction);
    if (product === null) {
      const filterProduct = products.filter((product) => product._id === id);
      setProduct(filterProduct[0]);
    } else {
      setProduct(null);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "radio" ? value === "true" : value;
    setUpdates((prev) => ({ ...prev, [name]: newValue }));
    setUser((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${domain}/manager/remove/account/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(users.filter((u) => u._id !== user._id));
        handleClick();
        alert(response.data.message);
        setUpdates({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSave = async () => {
    const validUpdates = Object.entries(updates)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (Object.keys(validUpdates).length === 0) {
      console.log("No fields to update");
      return;
    }

    try {
      const response = await axios.put(
        `${domain}/manager/update/account/${user._id}`,
        { updates: validUpdates },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.account;
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        handleClick();
        alert(response.data.message);
        setUpdates({});
      }
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  // Handle page change with Ant Design Pagination
  const handlePageChange = (page) => {
    fetchProfucts(page); // Fetch product for the selected page
    setCurrentPage(page); // Update the current page
  };

  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);

  if (account === null || account?.type !== TYPE) return <div></div>;

  return (
    <div className="md:px-4 lg:px-0">
      <div className="">
        <h1
          className={`text-xl lg:text-2xl font-semibold mb-[14px] text-[#0098D5] px-4 md:px-0 ${
            locale == "en" ? "font-sans" : "font-battambang"
          }`}
        >
          {t("titleList")}
        </h1>
        <ListProducts
          t={t}
          locale={locale}
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handleClick}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Page;
