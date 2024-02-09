import React, { useEffect } from 'react'
import Refrigerator from '../Refrigerator/Refrigerator'
import "./RefrigeratorContainer.css"
import { useData } from '../../context/DataContext'

const RefrigeratorContainer = ({refrigerators}) => {
    const {refriAmount, setRefriAmount, setRefrigerators } = useData()

    useEffect(() => {
    },[refriAmount])

  return (
    <div>
        {
          refrigerators.map((refri, idx) => {
            return <Refrigerator key={idx} {...refri} refrigerators={refrigerators} setRefrigerators={setRefrigerators} refriAmount={refriAmount} setRefriAmount={setRefriAmount} />
          })
        }
    </div>
  )
}

export default RefrigeratorContainer