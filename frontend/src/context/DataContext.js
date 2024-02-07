import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//Mocks
import categoriesJson from "../mock/categories.json";
import flavorsJson from "../mock/flavors.json";
import bucketsJson from "../mock/buckets.json";
import refrigeratorsJson from "../mock/refrigerators.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [refrigerators, setRefrigerators] = useState(refrigeratorsJson);
  const [refriAmount, setRefriAmount] = useState(refrigerators.length);
  const [buckets, setBuckets] = useState(bucketsJson);
  const [categories, setCategories] = useState(categoriesJson);
  const [flavors, setFlavors] = useState(flavorsJson);

  const [refrigeratorsData, setRefrigeratorsData] = useState([]);

  const fetchRefrigeratorData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/refrigerators");
      setRefrigeratorsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching refrigerator data:", error);
    }
  };

  useEffect(() => {
    fetchRefrigeratorData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        flavors,
        setFlavors,
        categories,
        setCategories,
        refrigerators: refrigeratorsData,
        setRefrigerators,
        refriAmount,
        setRefriAmount,
        buckets,
        setBuckets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
