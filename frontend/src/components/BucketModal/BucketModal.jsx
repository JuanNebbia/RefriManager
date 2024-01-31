import React, { useEffect, useState } from 'react'
import './BucketModal.css'
import { IoCloseSharp } from "react-icons/io5";
import { useData } from '../../context/DataContext';


const BucketModal = ({ setOpenModal, selectedBucket }) => {
    const [selectedFlavor, setSelectedFlavor] = useState({})
    const [selectedCategory, setSelectedCategory] = useState({})
    const [categoryFlavors, setCategoryFlavors] = useState([])
    const [availability, setAvailability] = useState()
    const [enableSave, setEnableSave] = useState(true)
    const { flavors, categories, buckets, setBuckets } = useData();

    useEffect(() => {
        if(selectedBucket.flavor_id){
            const flavor = flavors.find(flavor => flavor._id === selectedBucket.flavor_id)
            setSelectedFlavor(flavor)
            setSelectedCategory(flavor.category_id)
            setCategoryFlavors(flavors.filter(fl => flavor.category_id === fl.category_id))
            setAvailability(buckets.filter(bucket => +bucket.flavor_id === +flavor._id).length)
        }
    },[buckets, flavors])

    const closeModal = (event) => {
        if(event.target.classList.contains('close')){
            setOpenModal(false)
        }
    }

    const changeCategory = (event) => {
        const selectedFlavors = flavors.filter(flavor => flavor.category_id === +event.target.value)
        setCategoryFlavors(selectedFlavors)
        setSelectedCategory(event.target.value)
        setEnableSave(false)
    }

    const changeSelectedFlavor = (event) =>{
        const newSelectedFlavor = flavors.find(flavor => flavor._id === +event.target.value)
        setSelectedFlavor(newSelectedFlavor)
        setAvailability(buckets.filter(bucket => +bucket.flavor_id === +newSelectedFlavor._id).length)
        setEnableSave(false)
    }

    const emptyBucket = () => {
        setSelectedFlavor({})
        setSelectedCategory({})
        setCategoryFlavors([])
        setEnableSave(false)
    }

    const saveChanges = () => {
        const bucketsCopy = buckets.map(bucket => {
            if(+bucket.id === +selectedBucket.id){
                bucket.flavor_id = +selectedFlavor._id || null
            }
            return bucket
        })
        setBuckets(bucketsCopy)
        setOpenModal(false)
    }

    return (
    <div onClick={closeModal} className='bucketmodal-container close'>
        <div className="bucketmodal-inner">
            <button className="close-modal-btn close">
                <IoCloseSharp className='close' />
            </button>
            <h3 className='modal-title'>heladera {selectedBucket.refrigerator_id} - espacio {selectedBucket.position} - {selectedBucket.side === 0 ? 'arriba' : 'abajo'}</h3>
            <form action="" className='modal-form'>
                <label htmlFor="category-select" className='select-label'>Categoria</label>
                <select name="category" id="category-select" onChange={changeCategory} value={selectedCategory}>
                    <option value="">Selecciona una categoría</option>
                    { categories.map((category, idx) => {
                        return <option value={category._id} key={idx} style={{backgroundColor: category.color}}>{category.category}</option>
                    })}
                </select>
                <label htmlFor="flavor-select" className='select-label'>Sabor</label>
                <select name="flavor" id="flavor-select" value={selectedFlavor._id} onChange={changeSelectedFlavor}>
                    <option value="" disabled>Selecciona un sabor</option>
                    {   categoryFlavors.length > 0 ? 
                        categoryFlavors.map((flavor, idx) => {
                            return <option value={flavor._id} key={idx}>{flavor.name}</option>
                        }):
                        flavors.map((flavor, idx) => {
                            return <option value={flavor._id} key={idx}>{flavor.name}</option>
                        })
                }
                </select>
            </form>
            {Object.keys(selectedFlavor).length > 0 &&
                <>
                    <div className="description-box">
                        <h4 className="description-title">Descripción</h4>
                        <p className="flavor-description">{selectedFlavor.description}</p>
                    </div>
                    <div className="availability-box">
                        <h4 className="availability-title">Disponibilidad</h4>
                        <p className="flavor-availability">{availability > 1 ? `Hay ${availability} baldes de este sabor` : '¡Último balde!'}</p>
                    </div>
                </>
            }
            <div className="modal-btn-container">
                <button className="empty-bucket" onClick={emptyBucket}>Vaciar</button>
                <button className="save-bucket" disabled={enableSave} onClick={saveChanges}>Guardar</button>
            </div>
        </div>
    </div>
    )
}

export default BucketModal  