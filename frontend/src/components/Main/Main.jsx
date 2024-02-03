import React from 'react'
import './Main.css'

// Components
import SpaceGrid from '../SpaceGrid/SpaceGrid'
import RefrigeratorContainer from '../RefrigeratorContainer/RefrigeratorContainer.jsx';

// Context
import { useData } from '../../context/DataContext.js';

const Main = () => {
  const { refrigerators, buckets } = useData()

  return (
    <div className='main-container'>
        <SpaceGrid />
        <RefrigeratorContainer refrigerators={refrigerators} buckets={buckets} /> 
    </div>
  )
}

export default Main