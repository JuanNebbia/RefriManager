import React, { useEffect, useState } from 'react'
import './BucketModal.css'
import { useData } from '../../context/DataContext';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


const BucketModal = ({ setOpenModal, selectedBucket, setBuckets }) => {
    const [selectedFlavor, setSelectedFlavor] = useState({})
    const [selectedCategory, setSelectedCategory] = useState({})
    const [categoryFlavors, setCategoryFlavors] = useState([])
    const [availability, setAvailability] = useState()
    const [enableSave, setEnableSave] = useState(true)
    const { flavors, categories, buckets, refrigerators, setRefrigerators } = useData();
    const { user } = useAuth()

    useEffect(() => {
        if(selectedBucket.flavor_id){
            setSelectedFlavor(selectedBucket.flavor)
            setSelectedCategory(selectedBucket.flavor.category[0])
            setCategoryFlavors(flavors)
            setAvailability(buckets.filter(bucket => bucket.flavor_id === selectedBucket.flavor_id).length)
        }
    },[buckets, flavors, selectedBucket.flavor, selectedBucket.flavor_id])

    const changeCategory = (event) => {
        try {
            let selectedFlavors, newSelectedCategory
            if(event.target.value){
                selectedFlavors = flavors.filter(flavor => flavor.category_id._id === event.target.value)
                newSelectedCategory = categories.find(category => category._id === event.target.value)
            }else{
                selectedFlavors = flavors.sort((a, b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                })
                newSelectedCategory = {}
            }
            setCategoryFlavors(selectedFlavors)
            setSelectedFlavor(selectedFlavors[0])
            setSelectedCategory(newSelectedCategory)
            setEnableSave(false)
        } catch (error) {
            console.log(error);
        }
    }

    const changeSelectedFlavor = (event) =>{
        const newSelectedFlavor = flavors.find(flavor => flavor._id === event.target.value)
        setSelectedFlavor(newSelectedFlavor)
        setAvailability(buckets.filter(bucket => bucket.flavor_id === newSelectedFlavor._id).length)
        setEnableSave(false)
    }

    const emptyBucket = async () => {
        setSelectedFlavor({_id: null})
        setSelectedCategory({})
        setCategoryFlavors([])
        setEnableSave(false)
    }

    const saveChanges = async () => {
        try {
            const url = process.env.REACT_APP_BACKEND_URL
            const currentBucket = buckets.find(bucket => bucket._id === selectedBucket._id)
            const newBucket = {
                ...currentBucket,
                flavor_id: selectedFlavor._id
            }
            const bucketsCopy = buckets.map(bucket => {
                if(bucket._id === selectedBucket._id){
                    bucket.flavor_id = selectedFlavor._id || null
                }
                return bucket
            })
            setBuckets(bucketsCopy)
            const currentRefrigerator = refrigerators.find(refrigerator => refrigerator._id === currentBucket.refrigerator_id)
            const currentRefrigeratorBuckets = currentRefrigerator.buckets.map(bucket => {
                if(bucket._id === selectedBucket._id){ 
                    bucket.flavor_id = selectedFlavor._id || null
                    bucket.flavor = selectedFlavor
                    bucket.flavor.category = Object.keys(selectedCategory).length > 0 ? [selectedCategory] : []
                }
                return bucket
            })
            currentRefrigerator.buckets = currentRefrigeratorBuckets
            const refrigeratorsCopy = refrigerators.map(refrigerator => {
                if(refrigerator._id === currentRefrigerator._id){
                    return currentRefrigerator
                }
                return refrigerator
            })
            setRefrigerators(refrigeratorsCopy)
            setOpenModal(false)
            if(user){
                await axios.put(`${url}/buckets/${newBucket._id}`, newBucket)
                const refrigeratorsFetch = await axios.get(`${url}/refrigerators`);
                setRefrigerators(refrigeratorsFetch.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
    <div className='bucketmodal-container'>
            <h3 className='modal-title'>{refrigerators.find(refri => refri._id === selectedBucket.refrigerator_id).refri_name} - espacio {selectedBucket.position} - {selectedBucket.side === 0 ? 'arriba' : 'abajo'}</h3>
            <form action="" className='modal-form'>
                <label htmlFor="category-select" className='select-label'>Categoria</label>
                <select name="category" id="category-select" onChange={changeCategory} value={selectedCategory._id}>
                    <option value="">Todos</option>
                    { categories.map((category, idx) => {
                        return <option value={category._id} key={idx} style={{backgroundColor: category.color + 'aa'}}>{category.category}</option>
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
    )
}

export default BucketModal  