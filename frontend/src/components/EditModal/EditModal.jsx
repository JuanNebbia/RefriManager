import React, { useState } from 'react'
import './EditModal.css'
import { useData } from '../../context/DataContext';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useCookies } from 'react-cookie';


const EditModal = ({ selectedRefrigerator, setOpenModal }) => {
    const [enableSave, setEnableSave] = useState(true)
    const [refriName, setRefriName] = useState(selectedRefrigerator.refri_name)
    const [selectedAmount, setSelectedAmount] = useState(selectedRefrigerator.total_capacity)
    const [hideWarning, setHideWarning] = useState(true)
    const { setRefrigerators, setLoadingRefrigerators, updateMockRefrigerator, refriAmount, setRefriAmount } = useData();
    const { user } = useAuth() 
    const [cookies] = useCookies(["sessionId"]);

    const handleAmountChange = (event) => {
        setSelectedAmount(+event.target.value)
        if(+event.target.value < selectedRefrigerator.total_capacity){
            setHideWarning(false)
        }else(
            setHideWarning(true)
        )
        setEnableSave(false)
    }

    const handleNameChange = (event) => {
        setRefriName(event.target.value)
        setEnableSave(false)
    }

    const saveChanges = async () => {
        try {   
            const url = process.env.REACT_APP_BACKEND_URL
            const token = cookies.sessionId
            const updatedRefrigerator = {
                refri_name: refriName,
                total_capacity: selectedAmount,
                status: selectedRefrigerator.status
            }
            if(user){
                await axios.put(`${url}/refrigerators/${selectedRefrigerator._id}`, updatedRefrigerator,{
                    headers: {'Authorization': `Bearer ${token}`}}
                )
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
                        await axios.post(`${url}/buckets`, newBucket, {
                            headers: {'Authorization': `Bearer ${token}`}}
                        )
                    }
                }
                if(amount < 0){
                    const selectedRefrigeratorCopy = selectedRefrigerator
                    const sortedBuckets = selectedRefrigeratorCopy.buckets.sort((a, b) => b.position - a.position);
                    for (let i = 0; i < (amount * -1); i++) {
                            if (i < sortedBuckets.length) {
                                    await axios.delete(`${url}/buckets/${sortedBuckets[i]._id}`, {
                                        headers: {'Authorization': `Bearer ${token}`}}
                                    )
                            } else {
                                break;
                            }
                    }
                }
                setOpenModal(false)
                const refrigeratorsFetch = await axios.get(`${url}/refrigerators`, {
                    headers: {'Authorization': `Bearer ${token}`}}
                );
                setRefrigerators(refrigeratorsFetch.data)
            
            }else{
                updateMockRefrigerator(updatedRefrigerator.refri_name, selectedRefrigerator._id)
                setOpenModal(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRefrigerator = async() => {
        const url = process.env.REACT_APP_BACKEND_URL
        const token = cookies.sessionId
        if(window.confirm('Estás por eliminar una heladera y todo su contenido. ¿Continuar?') && user){
            setOpenModal(false)
            setLoadingRefrigerators(true)
            const deletedRefrigeratorFetch = await axios.delete(`${url}/refrigerators/${selectedRefrigerator._id}`, {
                headers: {'Authorization': `Bearer ${token}`}}
            )
            setRefrigerators(deletedRefrigeratorFetch.data)
            setLoadingRefrigerators(false)
            setRefriAmount(refriAmount - 1)
        }
    }

    return (
    <div className='bucketmodal-container'>
            <h3 className='modal-title'>Editar {selectedRefrigerator.refri_name}</h3>
            <form action="" className='modal-form'>
                <label htmlFor="edit-refri-name-input" className='input-label'>Nombre de la heladera</label>
                <input type="text" id='edit-refri-name-input' defaultValue={selectedRefrigerator.refri_name}  onChange={handleNameChange}/>
                <label htmlFor="edit-refri-capacity-input" className='input-label'>Capacidad (baldes totales)</label>
                <input type="number" id='edit-refri-capacity-input' defaultValue={selectedRefrigerator.total_capacity} min={6} max={32} step={2} onChange={handleAmountChange} disabled={!user} style={{cursor: !user && 'not-allowed'}} /> 
                <small className='edit-modal-warn' hidden={hideWarning}>Advertencia: reducir la capacidad del refrigerador eliminará los baldes sobrantes</small>   
            </form>
            <div className="modal-btn-container">
                <button className="save-bucket" disabled={enableSave} onClick={saveChanges}>Guardar</button>
                <button className="delete-bucket" onClick={deleteRefrigerator} disabled={!user} style={{cursor: !user && "not-allowed"}}>Eliminar Heladera</button>
            </div>
        </div>
    )
}

export default EditModal  