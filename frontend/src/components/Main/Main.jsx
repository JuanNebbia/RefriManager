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
    { refrigerators.length > 1 ?
      <div className="main-inner-container">
        {/* <SpaceGrid /> */}
        <RefrigeratorContainer refrigerators={refrigerators} buckets={buckets} /> 
      </div>
      :
      <p>Loading...</p>
    }
    </div>
  )
}

export default Main