"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { useAppContext } from "@/context/GlobalContext";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const ListOrders = dynamic(
  () => import("@/components/dashboardComponents/ListOrders"),
  { ssr: false }
);

const AlertSuccessAndWarning = dynamic(
  () => import("@/components/alerts/AlertSuccessAndWarning"),
  { ssr: false }
);

const Loading = dynamic(() => import("@/components/Loading"), { ssr: false });

const ButtonDeleteTemplate = dynamic(
  () => import("@/components/buttons/DeleteTemplate"),
  {
    ssr: false,
  }
);

function Page() {
  const locale = useLocale();
  const t = useTranslations("ordersPage");
  const router = useRouter();
  const { token, domain, account } = useAppContext();
  const TYPE = process.env.NEXT_PUBLIC_TYPE;

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isPending, setIsPending] = useState(false);
  const [toggleShowDelete, setToggleShowDelete] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const [text, setText] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertWan, setAlertWan] = useState(false);

  // Fetch users with page number
  const fetchOrders = useCallback(
    async (page) => {
      try {
        const res = await axios.get(
          `${domain}/order-pagination?limit=10&page=${page}`
        );
        if (res.data.orders?.length > 0) {
          setOrders(res.data.orders);
          setCurrentPage(res.data.currentPage);
          setTotalPages(res.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [domain]
  );

  // Handle page change with Ant Design Pagination
  const handlePageChange = (page) => {
    fetchOrders(page); // Fetch product for the selected page
    setCurrentPage(page); // Update the current page
  };

  const handleReplyOrder = async (order, status) => {
    if (!order || !token || !domain || !status) return;
    setIsPending(true);
    try {
      const res = await axios.put(
        `${domain}/order/${order?._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === order?._id ? res.data.order : o))
        );
        setTimeout(() => {
          setAlert(true);
          setText("Reply successfully");
        }, 300);
      }
    } catch (error) {
      setTimeout(() => {
        setAlertWan(true);
        setText("Failed to reply");
      }, 300);
    } finally {
      setTimeout(() => {
        setIsPending(false);
      }, 200);
    }
  };

  const handleRemove = async () => {
    if (!orderID || !token || !domain) return;
    setToggleShowDelete(false);
    setIsPending(true);

    try {
      const res = await axios.delete(`${domain}/order/${orderID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setTimeout(() => {
          setText("Order removed successfully");
          setAlert(true);
        }, 300);
        setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderID));
      }
    } catch (error) {
      alert("Failed to remove order");
      setTimeout(() => {
        setText("Failed to remove order");
        setAlert(true);
      }, 300);
    } finally {
      setTimeout(() => {
        setIsPending(false);
      }, 200);
    }
  };

  const handleToggleShowDelete = (id) => {
    setToggleShowDelete(!toggleShowDelete);
    setOrderID(id);
  };

  const handleIsAlertSuccess = () => {
    setAlert(!alert);
  };
  const handleIsAlertWan = () => {
    setAlertWan(!alertWan);
  };

  useEffect(() => {
    if (orders?.length === 0) {
      fetchOrders(1); // Fetch users on initial load
    }
  }, [fetchOrders, orders?.length]);

  useEffect(() => {
    if (account === undefined) return;
    if (!account || account?.type !== TYPE) {
      router.push("/signin");
    }
  }, [account, router, TYPE]);

  if (account === null || account?.type !== TYPE) return <div></div>;

  return (
    <div className=" md:px-4 lg:px-0">
      <div className="">
        {isPending && <Loading />}

        <ButtonDeleteTemplate
          question={"Are you sure you want to delete this order?"}
          handleDelete={handleRemove}
          handleToggleButtonDelete={handleToggleShowDelete}
          toggleShowDeleteTemplate={toggleShowDelete}
        />

        <div
          className={`fixed h-fit w-fit mx-auto left-1/2 -translate-x-1/2 top-10 z-20 ${
            alert ? "" : " pointer-events-none"
          }`}
        >
          <AlertSuccessAndWarning
            text={text}
            alert={alert}
            icons={"success"}
            handleIsAlert={handleIsAlertSuccess}
          />
        </div>

        <div
          className={`fixed h-fit w-fit mx-auto left-1/2 -translate-x-1/2 top-10 z-20 ${
            alertWan ? "" : " pointer-events-none"
          }`}
        >
          <AlertSuccessAndWarning
            text={text}
            alert={alertWan}
            handleIsAlert={handleIsAlertWan}
          />
        </div>

        <div className="mb-[14px] px-4 md:px-0">
          <h1
            className={`text-xl lg:text-2xl font-semibold text-[#0098D5] ${
              locale == "en" ? " font-sans" : " font-battambang"
            }`}
          >
            {t("titleList")}
          </h1>
        </div>

        <ListOrders
          t={t}
          locale={locale}
          orders={orders}
          currentPage={currentPage}
          totalPages={totalPages}
          handleReplyOrder={handleReplyOrder}
          handlePageChange={handlePageChange}
          handleToggleShowDelete={handleToggleShowDelete}
        />
      </div>
    </div>
  );
}

export default Page;
