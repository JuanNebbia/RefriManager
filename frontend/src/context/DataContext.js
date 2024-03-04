import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import mockFlavors from '../mock/flavors.json'
import mockCategories from '../mock/categories.json'
import mockBuckets from '../mock/buckets.json'
import mockRefrigerators from '../mock/refrigerators.json'
import mockOrders from '../mock/orders.json'
import mockSupplies from '../mock/supplies.json'
import { useAuth } from "./AuthContext";
import { useCookies } from "react-cookie";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [buckets, setBuckets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [refrigerators, setRefrigerators] = useState([]);
  const [mockOrderList, setMockOrderList] = useState([]);
  const [refriAmount, setRefriAmount] = useState(0);
  const [loadingBuckets, setLoadingBuckets] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingFlavors, setLoadingFlavors] = useState(true);
  const [loadingRefrigerators, setLoadingRefrigerators] = useState(true);
  const [cookies] = useCookies(["sessionId", "guest"]);
  
  const {user, setUser, guest} = useAuth()

  const url = process.env.REACT_APP_BACKEND_URL;

  //Fetch Data
  const fetchBuckets = async () => {
    try {
      const token = cookies.sessionId
      const response = await axios.get(
        `${url}/buckets`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setBuckets(response.data);
      setLoadingBuckets(false);
    } catch (error) {
      setUser(false)
      document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      console.error("Error fetching buckets data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = cookies.sessionId
      const response = await axios.get(
        `${url}/categories`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCategories(response.data);
      setLoadingCategories(false);
    } catch (error) {
      setUser(false)
      document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      console.error("Error fetching categories data:", error);
    }
  };

  const fetchFlavors = async () => {
    try {
      const token = cookies.sessionId
      const response = await axios.get(
        `${url}/flavors`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setFlavors(response.data);
      setLoadingFlavors(false);
    } catch (error) {
      setUser(false)
      document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      console.error("Error fetching flavors data:", error);
    }
  };

  const fetchRefrigerators = async () => {
    try {
      const token = cookies.sessionId
      const response = await axios.get(
        `${url}/refrigerators`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setRefrigerators(response.data);
      setRefriAmount(response.data.length);
      setLoadingRefrigerators(false);
    } catch (error) {
      setUser(false)
      document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      console.error("Error fetching refrigerators data:", error);
    }
  };

  //Mock Data

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
    setRefriAmount(populatedRefrigerators.length);
    setLoadingRefrigerators(false)
  }

  const updateMockRefrigerator = (refri_name, id) => {
    const copyMockRefrigerators = [...mockRefrigerators]
    const refri_idx = copyMockRefrigerators.findIndex(refrigerator => refrigerator._id === id)
    copyMockRefrigerators[refri_idx].refri_name = refri_name
    copyMockRefrigerators[refri_idx]._id = id
    setRefrigerators(copyMockRefrigerators)
  }

  const getmockOrders = () => {
    const copyMockOrders = [...mockOrders]
    const copyMockSupplies = [...mockSupplies]
    const copyMockFlavors = [...mockFlavors]
    
    copyMockOrders.map(order => {
      order.items.map(item => {
        const flavorData = copyMockFlavors.find(flavor => flavor._id === item.flavor_id)
        if(flavorData){
          item.flavor_id = flavorData
        }
        return item
      })
      order.supplies.map(supplyItem => {
        const supplyData = copyMockSupplies.find(supply => supply._id === supplyItem.supply_id)
        if(supplyData){
          supplyItem.supply_id = supplyData
        }
        return supplyItem
      })
      return order
    })
    setMockOrderList(copyMockOrders)
  }

  const addMockOrder = (payload) => {
    const copyMockOrderList = [...mockOrderList]
    const copyMockSupplies = [...mockSupplies]
    const copyMockFlavors = [...mockFlavors]
    copyMockOrderList.push(payload)
    setMockOrderList(copyMockOrderList)
    copyMockOrderList.map(order => {
      order.items.map(item => {
        const flavorData = copyMockFlavors.find(flavor => flavor._id === item.flavor_id)
        if(flavorData){
          item.flavor_id = flavorData
        }
        return item
      })
      order.supplies.map(supplyItem => {
        const supplyData = copyMockSupplies.find(supply => supply._id === supplyItem.supply_id)
        if(supplyData){
          supplyItem.supply_id = supplyData
        }
        return supplyItem
      })
      return order
    })
  }

  useEffect(() => {
    setLoadingBuckets(true)
    setLoadingRefrigerators(true)
    setLoadingFlavors(true)
    setLoadingCategories(true)
    if (cookies.sessionId){
      fetchRefrigerators();
      fetchBuckets();
      fetchCategories();
      fetchFlavors()
    }
    if(cookies.guest){
      getMockRefrigerators()
      getMockFlavors()
      getMockBuckets()
      getMockCategories()
      getmockOrders()
    }
  }, [user, guest, cookies.guest, cookies.sessionId]);

  return (
    <DataContext.Provider
      value={{
        flavors,
        setFlavors,
        categories,
        setCategories,
        refrigerators,
        setRefrigerators,
        updateMockRefrigerator,
        refriAmount,
        setRefriAmount,
        buckets,
        setBuckets,
        mockOrderList,
        setMockOrderList,
        addMockOrder,
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
