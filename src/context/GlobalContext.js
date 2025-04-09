"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { isTokenExpired } from "@/helper/auth";

// Create the context
const AppContext = createContext();

// Shuffle function to randomize the array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Create a custom provider component
export function AppProvider({ children }) {
  const domain = useMemo(() => "http://localhost:8081", []);
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({
    account: undefined,
    profile: undefined,
    token: undefined,
  });
  const [ads, setAds] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [subScription, setSubscription] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);

  useEffect(() => {
    const accountStorage = JSON.parse(localStorage.getItem("account"));
    const profileStorage = JSON.parse(localStorage.getItem("profile"));
    const tokenStorage = localStorage.getItem("access_token");
    const categoriesStorage = JSON.parse(localStorage.getItem("categories"));

    if (categoriesStorage) {
      setCategories(categoriesStorage);
    }
    if (tokenStorage && !isTokenExpired(tokenStorage)) {
      setUserData({
        account: accountStorage,
        profile: profileStorage,
        token: tokenStorage,
      });
    } else {
      localStorage.removeItem("account");
      localStorage.removeItem("profile");
      localStorage.removeItem("access_token");
      setUserData({ account: null, profile: null, token: null });
    }
  }, []);

  // Fetch data

  const getAccount = useCallback(async () => {
    const accountStorage = JSON.parse(localStorage.getItem("account"));
    const tokenStorage = localStorage.getItem("access_token");
    if (!accountStorage || !tokenStorage || isTokenExpired(tokenStorage))
      return;

    try {
      const res = await axios.get(
        `${domain}/${
          accountStorage?.type === "admin"
            ? "account-admin"
            : `account/${accountStorage?._id}`
        }/username/${accountStorage?.username}/phoneNum/${
          accountStorage?.phoneNum
        }`,
        {
          headers: { Authorization: `Bearer ${tokenStorage}` },
        }
      );
      if (res.data.message !== "Get successfuly") {
        setUserData({
          account: null,
          profile: null,
          token: null,
        });
        localStorage.removeItem("account");
        localStorage.removeItem("profile");
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("Error fetching account data:", error);
    }
  }, [setUserData, domain]);

  const fetchAd = useCallback(async () => {
    try {
      const response = await axios.get(`${domain}/get-ad`);
      if (response.status === 200) {
        setAds(response.data.ads);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [domain]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${domain}/categories`);
      if (response.status === 200) {
        localStorage.setItem(
          "categories",
          JSON.stringify(response.data.categories)
        );
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [domain]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getAccount(), fetchAd(), fetchCategories()]);
      } catch (error) {
        console.error("កំហុសក្នុងការទាញយកទិន្នន័យ:", error);
      }
    };
    fetchData();
  }, [getAccount, fetchAd, fetchCategories]);

  // Handle Page Change (Random Ad every 3 pages)
  const changePage = () => {
    setPageCount((prev) => {
      const newCount = prev + 1;

      if (newCount % 3 === 0) {
        const newShuffledAds = shuffleArray(ads);
        setAds(newShuffledAds);
      }

      return newCount;
    });
  };

  return (
    <AppContext.Provider
      value={{
        setAccount: (account) => setUserData((prev) => ({ ...prev, account })),
        setToken: (token) => setUserData((prev) => ({ ...prev, token })),
        setProfile: (profile) => setUserData((prev) => ({ ...prev, profile })),
        ...userData, // Spread to access all the state values in context
        domain,
        categories,
        setCategories,
        subScription,

        ads,
        changePage,

        // boost
        setSubscription,
        setBillingAddress,
        billingAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};
