import React, { useState } from 'react'
import { useData } from '../../context/DataContext';

const RefriModal = ({refriAmount, setRefriAmount, setOpenModal}) => {

    const {  buckets, setBuckets, refrigerators, setRefrigerators} = useData();
    const [selectedAmount, setSelectedAmount] = useState(8)
    const [refriName, setRefriName] = useState()
    const [enableSave, setEnableSave] = useState(true)

    const handleAmountChange = (event) => {
        setSelectedAmount(+event.target.value)
    }

    const handleNameChange = (event) => {
        setRefriName(event.target.value)
    }

    const addRefri = () => {
        const refrigeratorsCopy = refrigerators
        const newRefrigerator = {
          _id: refriAmount + 1,
          total_capacity: selectedAmount,
          refri_name: refriName || `Heladera ${refriAmount + 1}`,
          status: "active"
        }
        refrigeratorsCopy.push(newRefrigerator)
        setRefrigerators(refrigeratorsCopy)

        const bucketsCopy = buckets
        for(let i = 0; i < newRefrigerator.total_capacity; i++){
          const newBucket = {
            id: buckets.length + 1,
            refrigerator_id: newRefrigerator._id,
            flavor_id: null,
            position: (i + 1 <= newRefrigerator.total_capacity / 2 ) ? (i + 1) : ((i + 1) - (newRefrigerator.total_capacity / 2)),
            side: (i + 1 <= newRefrigerator.total_capacity / 2) ? 0 : 1
          }
          bucketsCopy.push(newBucket)
          setBuckets(bucketsCopy)
        }
        setRefriAmount(refriAmount + 1)
        setOpenModal(false)
    }

  return (
    <div className='refrimodal-container'>
        <h3 className='modal-title'>Añadir Nueva Heladera</h3>
        <form action="" className='modal-form' onChange={()=>setEnableSave(false)}>
            <label htmlFor="category-select" className='select-label'>Nombre de heladera (opcional)</label>
            <input type="text" placeholder={`Heladera ${refriAmount + 1}`} onChange={handleNameChange} />
            <label htmlFor="category-select" className='select-label'>Capacidad (baldes totales)</label>
            <input type="number" defaultValue={8} min={6} max={32} step={2} onChange={handleAmountChange} />
        </form>
        <div className="modal-btn-container">
                <button className="save-bucket" disabled={enableSave} onClick={addRefri}>Guardar</button>
            </div>
    </div>
  )
}

export default RefriModal