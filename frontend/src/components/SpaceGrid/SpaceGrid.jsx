import React, { useEffect, useState } from 'react'
import './SpaceGrid.css'
import { useData } from '../../context/DataContext';
import Modal from '../Modal/Modal';
import RefriModal from '../RefriModal/RefriModal';

const SpaceGrid = () => {
    const { refrigerators, buckets, refriAmount, setRefriAmount } = useData()
    const [openModal, setOpenModal] = useState(false) 
    const [windowWidth, setWindowWidth] = useState()


    useEffect(()=>{
        setWindowWidth(window.innerWidth);
    }, [])

    const handleAddRefrigeratorClick = () => {
        if(refrigerators.length === 10){
            window.alert('Límite de heladeras alcanzado')
        }else{
            setOpenModal(true)
        }
    }

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
            <a href={`#refri-${refri._id}`} key={idx} className='refri-box' style={{gridRow: windowWidth > 767 ? (Math.ceil(idx % 2) + 1) : Math.ceil((idx + 1) / 3), gridColumn: windowWidth > 767 ? Math.ceil((idx + 1) / 2) : (Math.ceil(idx % 3) + 1)}}>
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
                    <button className='add-refri-btn' style={{gridRow: windowWidth > 767 ? Math.ceil(refrigerators.length % 2)+1 :  Math.ceil((refrigerators.length + 1) / 3)}} onClick={handleAddRefrigeratorClick}>+</button>
                    </div>
            </div>
        </>
    )
}

export default SpaceGrid