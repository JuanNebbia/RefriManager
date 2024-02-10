import React, { useState } from 'react'
import './EditModal.css'
import { useData } from '../../context/DataContext';
import axios from 'axios';


const EditModal = ({ selectedRefrigerator, setOpenModal }) => {
    const [enableSave, setEnableSave] = useState(true)
    const [refriName, setRefriName] = useState(selectedRefrigerator.refri_name)
    const [selectedAmount, setSelectedAmount] = useState(selectedRefrigerator.total_capacity)
    const { setRefrigerators } = useData();

    const handleAmountChange = (event) => {
        setSelectedAmount(+event.target.value)
        setEnableSave(false)
    }

    const handleNameChange = (event) => {
        setRefriName(event.target.value)
        setEnableSave(false)
    }

    const saveChanges = async () => {
        try {
            const updatedRefrigerator = {
                refri_name: refriName,
                total_capacity: selectedAmount,
                status: selectedRefrigerator.status
            }
            const url = process.env.REACT_APP_BACKEND_URL
            await axios.put(`${url}/refrigerators/${selectedRefrigerator._id}`, updatedRefrigerator)
            const amount = selectedAmount - selectedRefrigerator.total_capacity
            if(amount > 0){
                for(let i = 0; i < amount; i++){
                    let startPosition = Math.floor(selectedRefrigerator.total_capacity / 2) + 1
                    const newBucket = {
                        refrigerator_id: selectedRefrigerator._id,
                        flavor_id: null,
                        position: startPosition + Math.floor(i / 2), 
                        side: i % 2
                    }
                    await axios.post(`${url}/buckets`, newBucket)
                }
            }
            if(amount < 0){
                const sortedBuckets = selectedRefrigerator.buckets.toSorted((a, b) => b.position - a.position);
                for (let i = 0; i < (amount * -1); i++) {
                    if (i < sortedBuckets.length) {
                        await axios.delete(`${url}/buckets/${sortedBuckets[i]._id}`)
                    } else {
                        break;
                    }
                }
            }
            setOpenModal(false)
            const refrigeratorsFetch = await axios.get(`${url}/refrigerators`);
            setRefrigerators(refrigeratorsFetch.data)

        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className='bucketmodal-container'>
            <h3 className='modal-title'>Editar {selectedRefrigerator.refri_name}</h3>
            <form action="" className='modal-form'>
                <label htmlFor="edit-refri-name-input" className='select-label'>Nombre de la heladera</label>
                <input type="text" id='edit-refri-name-input' defaultValue={selectedRefrigerator.refri_name}  onChange={handleNameChange}/>
                <label htmlFor="category-select" className='select-label'>Capacidad (baldes totales)</label>
                <input type="number" defaultValue={selectedRefrigerator.total_capacity} min={6} max={32} step={2} onChange={handleAmountChange} /> 
                <small>Advertencia: reducir la capacidad del refrigerador eliminará los baldes sobrantes</small>   
            </form>
            <div className="modal-btn-container">
                <button className="save-bucket" disabled={enableSave} onClick={saveChanges}>Guardar</button>
            </div>
        </div>
    )
}

export default EditModal  