import React from 'react'
import './Main.css'
import SpaceGrid from '../SpaceGrid/SpaceGrid'
import refrigerators from '../../mock/refrigerators.json'
import Refrigerator from '../Refrigerator/Refrigerator'

const Main = () => {
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