import React, { useEffect, useState } from 'react'
import Refrigerator from '../Refrigerator/Refrigerator'
import Modal from '../Modal/Modal'
import RefriModal from '../RefriModal/RefriModal'
import "./RefrigeratorContainer.css"
import { useData } from '../../context/DataContext'

const RefrigeratorContainer = ({refrigerators}) => {
    const {refriAmount, setRefriAmount, setRefrigerators } = useData()
    const [openModal, setOpenModal] = useState(false) 

    useEffect(() => {
    },[refriAmount])

    

  return (
    <div>
        {
          openModal &&
          <Modal openModal={openModal} setOpenModal={setOpenModal}  content={<RefriModal refriAmount={refriAmount} setRefriAmount={setRefriAmount} setOpenModal={setOpenModal}/>} />
        }
        {
          refrigerators.map((refri, idx) => {
            return <Refrigerator key={idx} {...refri} refrigerators={refrigerators} setRefrigerators={setRefrigerators} refriAmount={refriAmount} setRefriAmount={setRefriAmount} />
          })
        }
        <button className="add-refri__btn" onClick={() => setOpenModal(true)}>
          +
        </button>
    </div>
  )
}

export default RefrigeratorContainer