import React, { useEffect, useState } from 'react'
import './EditModal.css'
import { useData } from '../../context/DataContext';
import axios from 'axios';


const EditModal = ({ selectedRefrigerator }) => {
    const [enableSave, setEnableSave] = useState(true)
    const [refriName, setRefriName] = useState(selectedRefrigerator.refri_name)
    const [selectedAmount, setSelectedAmount] = useState(selectedRefrigerator.total_capacity)
    const { flavors, categories, buckets, refrigerators, setRefrigerators } = useData();

    useEffect(() => {
    },[])

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
            const updatedRefrigeratorFetch = await axios.put(`${url}/refrigerators/${selectedRefrigerator._id}`, updatedRefrigerator)
            console.log(updatedRefrigeratorFetch);

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
            </form>
            <div className="modal-btn-container">
                <button className="save-bucket" disabled={enableSave} onClick={saveChanges}>Guardar</button>
            </div>
        </div>
    )
}

export default EditModal  