import { createContext, useContext, useState } from "react";

//Mocks
import categoriesJson from "../mock/categories.json";
import flavorsJson from "../mock/flavors.json";
import bucketsJson from "../mock/buckets.json";
import refrigeratorsJson from "../mock/refrigerators.json";

const MockDataContext = createContext();

export const DataProvider = ({ children }) => {
  const [refrigerators, setRefrigerators] = useState(refrigeratorsJson);
  const [refriAmount, setRefriAmount] = useState(refrigerators.length);
  const [buckets, setBuckets] = useState(bucketsJson);
  const [categories, setCategories] = useState(categoriesJson);
  const [flavors, setFlavors] = useState(flavorsJson);

  return (
    <MockDataContext.Provider
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
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => useContext(MockDataContext);
