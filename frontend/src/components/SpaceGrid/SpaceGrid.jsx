import React, { useState } from 'react'
import './SpaceGrid.css'
import { useData } from '../../context/DataContext';
import Modal from '../Modal/Modal';
import RefriModal from '../RefriModal/RefriModal';

const SpaceGrid = () => {
    const { refrigerators, buckets, refriAmount, setRefriAmount, setRefrigerators } = useData()
    const [openModal, setOpenModal] = useState(false) 

    const calculateRefriEmptySpaces = (refri) => {
        return refri.total_capacity - refri.buckets.filter(bucket => bucket.flavor_id !== null).length   
    }

    const calculateTotalEmptySpaces = () => {
        const totalCapacity = refrigerators.reduce((acumulador, refrigerator) => {
            return acumulador + refrigerator.total_capacity;
        }, 0);
        return totalCapacity - buckets.filter(bucket => bucket.flavor_id !== null).length  
    }

    const refris = refrigerators.map((refri, idx) => {
        return (
            <a href={`#refri-${refri._id}`} key={idx} className='refri-box' style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((idx + 1) / 2)}}>
                <p className='refri-spaces-number'>{calculateRefriEmptySpaces(refri) } <span className="slash-total">/{refri.total_capacity}</span></p>
                <p className='refri-spaces-tag'>{refri.refri_name}</p>
            </a>
        )
    })

    return (
        <>
            {
            openModal &&
            <Modal openModal={openModal} setOpenModal={setOpenModal}  content={<RefriModal refriAmount={refriAmount} setRefriAmount={setRefriAmount} setOpenModal={setOpenModal}/>} />
            }
            <div className='spacegrid-container'>
                <div className="total-box">
                    <p className='total-spaces-number'>{calculateTotalEmptySpaces()}</p>
                    <p className='total-spaces-tag'>Espacios Disponibles</p>
                </div>
                <div className='refris-container'>
                    {refris} 
                    <button className='add-refri-btn' style={{gridRow: Math.ceil(refrigerators.length % 2)+1}} onClick={() => setOpenModal(true)}>+</button>
                    </div>
            </div>
        </>
    )
}

export default SpaceGrid