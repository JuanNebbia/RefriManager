import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [buckets, setBuckets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [refrigerators, setRefrigerators] = useState([]);
  const [refriAmount, setRefriAmount] = useState(0);
  const [loadingBuckets, setLoadingBuckets] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [loadingRefrigerators, setLoadingRefrigerators] = useState(true);

  const fetchBuckets = async () => {
    try {
      const response = await axios.get(
        "https://refri-manager-backend.vercel.app/api/buckets"
      );
      setBuckets(response.data);
      setLoadingBuckets(false);
    } catch (error) {
      console.error("Error fetching buckets data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://refri-manager-backend.vercel.app/api/categories"
      );
      setCategories(response.data);
      setLoadingCategories(false);
    } catch (error) {
      console.error("Error fetching categories data:", error);
    }
  };

  const fetchFlavors = async () => {
    try {
      const response = await axios.get(
        "https://refri-manager-backend.vercel.app/api/flavors"
      );
      setFlavors(response.data);
      setLoadingFlavors(false);
    } catch (error) {
      console.error("Error fetching flavors data:", error);
    }
  };

  const fetchRefrigerators = async () => {
    try {
      const response = await axios.get(
        "https://refri-manager-backend.vercel.app/api/refrigerators"
      );
      setRefrigerators(response.data);
      setRefriAmount(response.data.length);
      setLoadingRefrigerators(false);
    } catch (error) {
      console.error("Error fetching refrigerators data:", error);
    }
  };

  useEffect(() => {
    fetchRefrigerators();
    fetchBuckets();
    fetchCategories();
    fetchFlavors();
  }, []);

  return (
    <DataContext.Provider
      value={{
        flavors,
        setFlavors,
        categories,
        setCategories,
        refrigerators,
        setRefrigerators,
        refriAmount,
        setRefriAmount,
        buckets,
        setBuckets,
        loadingBuckets,
        loadingCategories,
        loadingFlavors,
        loadingRefrigerators,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
