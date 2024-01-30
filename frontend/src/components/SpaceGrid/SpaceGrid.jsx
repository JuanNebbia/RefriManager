import React from 'react'
import './SpaceGrid.css'
import refrigerators from '../../mock/refrigerators.json'
import buckets from '../../mock/buckets.json'

const SpaceGrid = () => {
    

    const calculateRefriEmptySpaces = (refri) => {
        const bucketsOnRefri = buckets.filter(bucket => bucket.refrigerator_id === refri._id).length
        return refri.total_capacity - bucketsOnRefri  
    }


    const refris = refrigerators.map((refri, idx) => {
        return (
            <div key={idx} className='refri-box' style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((idx + 1) / 2)}}>
                <p className='refri-spaces-number'>{calculateRefriEmptySpaces(refri) } <span className="slash-total">/{refri.total_capacity}</span></p>
                <p className='refri-spaces-tag'>{refri.refri_name}</p>
            </div>
        )
    })

    const calculateTotalEmptySpaces = () => {
        const totalCapacity = refrigerators.reduce((acumulador, refrigerator) => {
            return acumulador + refrigerator.total_capacity;
        }, 0);
        return totalCapacity - buckets.length  
    }

    return (
    <div className='spacegrid-container'>
        <div className="total-box">
            <p className='total-spaces-number'>{calculateTotalEmptySpaces()}</p>
            <p className='total-spaces-tag'>Espacios Disponibles</p>
        </div>
        <div className='refris-container'>{refris}</div>
    </div>
    )
}

export default SpaceGrid