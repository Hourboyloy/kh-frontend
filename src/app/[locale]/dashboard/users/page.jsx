"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale, useTranslations } from "next-intl";

const ListUsers = dynamic(
  () => import("@/components/dashboardComponents/ListUsers"),
  { ssr: false }
);
const ActionUser = dynamic(
  () => import("@/components/dashboardComponents/ActionUser"),
  { ssr: false }
);

function Page() {
  const t = useTranslations("userPage");
  const locale = useLocale();
  const router = useRouter();
  const { token, domain, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [users, setUsers] = useState([]);
  const [updates, setUpdates] = useState({});
  const [user, setUser] = useState(null);
  const [toggleAction, setToggleAction] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch users with page number
  const fetchUsers = useCallback(
    async (page) => {
      try {
        console.log(page);
        const res = await axios.get(`${domain}/accounts?limit=10&page=${page}`);
        if (res.data.accounts.length > 0) {
          setUsers(res.data.accounts);
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
    if (users.length === 0) {
      fetchUsers(1); // Fetch users on initial load
    }
  }, [fetchUsers, users.length]);

  const handleClick = (id) => {
    setToggleAction(!toggleAction);
    if (user === null) {
      const filterUser = users.filter((user) => user._id === id);
      setUser(filterUser[0]);
    } else {
      setUser(null);
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
    fetchUsers(page); // Fetch users for the selected page
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
    <div className="md:px-4 lg:px-0 min-h-screen">
      <ActionUser
        toggleAction={toggleAction}
        handleClick={handleClick}
        handleDelete={handleDelete}
        handleEditSave={handleEditSave}
        user={user}
        setUpdates={setUpdates}
        handleChange={handleChange}
      />

      <h1
        className={`lg:text-2xl text-xl font-semibold mb-[14px] text-[#0098D5] px-4 md:px-0 ${
          locale == "en" ? "font-sans" : ""
        }`}
      >
        {t("title")}
      </h1>

      <div className="">
        <ListUsers
          t={t}
          locale={locale}
          users={users}
          currentPage={currentPage}
          totalPages={totalPages}
          handleClick={handleClick}
          handlePageChange={handlePageChange}
          setUser={setUser}
          user={user}
        />
      </div>
    </div>
  );
}

export default Page;
