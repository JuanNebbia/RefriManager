import { createContext, useContext, useState } from "react";

//Mocks
import categoriesJson from "../mock/categories.json";
import flavorsJson from "../mock/flavors.json";
import bucketsJson from "../mock/buckets.json";
import refrigeratorsJson from "../mock/refrigerators.json";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [refrigerators, setRefrigerators] = useState(refrigeratorsJson);
  const [buckets, setBuckets] = useState(bucketsJson);
  const [categories, setCategories] = useState(categoriesJson);
  const [flavors, setFlavors] = useState(flavorsJson);

  return (
    <DataContext.Provider
      value={{
        flavors,
        setFlavors,
        categories,
        setCategories,
        refrigerators,
        setRefrigerators,
        buckets,
        setBuckets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
