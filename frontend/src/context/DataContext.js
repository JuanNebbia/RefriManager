import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import mockFlavors from '../mock/flavors.json'
import mockCategories from '../mock/categories.json'
import mockBuckets from '../mock/buckets.json'
import mockRefrigerators from '../mock/refrigerators.json'

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

  const url = process.env.REACT_APP_BACKEND_URL;

  const fetchBuckets = async () => {
    try {
      const response = await axios.get(
        `${url}/buckets`
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
        `${url}/categories`
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
        `${url}/flavors`
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
        `${url}/refrigerators`
      );
      setRefrigerators(response.data);
      setRefriAmount(response.data.length);
      setLoadingRefrigerators(false);
    } catch (error) {
      console.error("Error fetching refrigerators data:", error);
    }
  };

  const getMockFlavors = () => {
    const copyMockFlavors = [...mockFlavors]
    const copyMockCategories = [...mockCategories]
    const populatedFlavors = copyMockFlavors.map(flavor => {
      const categoryData = copyMockCategories.find(category => category._id === flavor.category_id)
      if(typeof flavor.category_id !== 'object'){
        flavor.category_id = categoryData
      }
      return flavor
    })
    setFlavors(populatedFlavors)
    setLoadingFlavors(false)
  }

  const getMockBuckets = () => {
    const copyMockBuckets = [...mockBuckets]
    setBuckets(copyMockBuckets)
    setLoadingBuckets(false)
  }

  const getMockCategories = () => {
    const copyMockCategories = [...mockCategories]
    setCategories(copyMockCategories)
    setLoadingCategories(false)
  }

  const getMockRefrigerators = () => {
    const copyMockRefrigerators = [...mockRefrigerators]
    const copyMockBuckets = [...mockBuckets]
    const copyMockFlavors = [...mockFlavors]
    const copyMockCategories = [...mockCategories]
    const populatedRefrigerators = copyMockRefrigerators.map(refrigerator => {
      if(!refrigerator.buckets){
        refrigerator.buckets = []
        for(let i = 0; i < copyMockBuckets.length; i++){
          if(copyMockBuckets[i].refrigerator_id === refrigerator._id){
            refrigerator.buckets.push(copyMockBuckets[i])
          }
        }
        const bucketsMap = refrigerator.buckets.map(bucket => {
          const flavorData = copyMockFlavors.find(flavor => flavor._id === bucket.flavor_id)
          if(flavorData){
            const newFlavorData = {
              category_id: flavorData.category_id._id,
              category: [copyMockCategories.find(category => category._id === flavorData.category_id)],
              ...flavorData
            }
            bucket.flavor = newFlavorData
          }else{
            const newFlavorData = {
              category: []
            }
            bucket.flavor = newFlavorData
          }
          return bucket
        })
        refrigerator.buckets = bucketsMap
    
      } 
      return refrigerator
    })
    setRefrigerators(populatedRefrigerators);
    setLoadingRefrigerators(false)
  }

  useEffect(() => {
    if (false){
      fetchRefrigerators();
      fetchBuckets();
      fetchCategories();
      fetchFlavors()
    }else{
      getMockRefrigerators()
      getMockFlavors()
      getMockBuckets()
      getMockCategories()
    }
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
        setLoadingRefrigerators,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
