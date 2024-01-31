import React from 'react'
import './Main.css'

// Components
import SpaceGrid from '../SpaceGrid/SpaceGrid'
import Refrigerator from '../Refrigerator/Refrigerator'

// Context
import { useData } from '../../context/DataContext.js';

const Main = () => {
  const { refrigerators } = useData()
  return (
    <div className='main-container'>
        <SpaceGrid />
        {refrigerators.map((refri, idx) => {
          return <Refrigerator key={idx} {...refri} />
        })}
        
        
    </div>
  )
}

export default Main