import React from 'react'
import './FlavorOfTheDay.css'
import { useData } from '../../context/DataContext';

const FlavorOfTheDay = () => {

    const { buckets, flavors } = useData()

    const calculateFlavor = () => {
        const availableFlavors =[]
        buckets.forEach(bucket => {
            if(availableFlavors.includes(bucket.flavor_id) || bucket.flavor_id === null){
                return
            }
            availableFlavors.push(bucket.flavor_id)
        });
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        const indiceAleatorio = (day + month) % availableFlavors.length;
        const selectedFlavor = flavors.find(flavor => flavor._id === availableFlavors[indiceAleatorio])
        return selectedFlavor.name
    }


    return (
        <>
            <div className="flavoroftheday-container">
                <h6 className='flavoroftheday-title'>Sabor del día</h6>
                <hr />
                <hr />
                <hr />
                <p> <span className='dot-decoration'>&#x2022;</span> <span className='dot-decoration'>&#x2022;</span> <span className='dot-decoration'>&#x2022;</span> <span className='flavoroftheday'>{calculateFlavor()}</span> <span className='dot-decoration'>&#x2022;</span> <span className='dot-decoration'>&#x2022;</span> <span className='dot-decoration'>&#x2022;</span></p>
                <hr />
                <hr />
                <hr />  
            </div>
        </>
    )
}

export default FlavorOfTheDay