import React from 'react'
import './Main.css'

// Components
import SpaceGrid from '../SpaceGrid/SpaceGrid'
import RefrigeratorContainer from '../RefrigeratorContainer/RefrigeratorContainer.jsx';

// Context
import { useData } from '../../context/DataContext.js';
import FlavorOfTheDay from '../FlavorOfTheDay/FlavorOfTheDay.jsx';
import Loader from '../Loader/Loader.jsx';

const Main = () => {
  const { refrigerators, buckets, loadingBuckets, loadingCategories, loadingFlavors, loadingRefrigerators } = useData()

  return (
    
    <div className='main-container'>
      { (!loadingBuckets && !loadingCategories && !loadingFlavors && !loadingRefrigerators) ?
        <div className="main-inner-container">
          <FlavorOfTheDay />
          <SpaceGrid />
          <RefrigeratorContainer refrigerators={refrigerators} buckets={buckets} /> 
        </div>
        :
        <Loader />
      }
    </div>
  )
}

export default Main