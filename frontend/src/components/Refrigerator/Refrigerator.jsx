import React, { useState } from 'react'
import './Refrigerator.css'
import BucketModal from '../BucketModal/BucketModal'
import { TbArrowBadgeUpFilled } from "react-icons/tb";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { useData } from '../../context/DataContext';
import Modal from '../Modal/Modal';

const Refrigerator = ({ _id, total_capacity, refri_name, status, refrigerators, setRefrigerators, refriAmount, setRefriAmount }) => {
  const [side, setSide] = useState(0)
  const [viewMode, setViewMode] = useState(true)
  const [openModal, setOpenModal] = useState(false) 
  const [selectedBucket, setSelectedBucket] = useState({})

  const { flavors, categories, buckets, setBuckets } = useData();

  const refriBuckets = buckets.filter(bucket => {
    return bucket.refrigerator_id === _id
  })

  const sideBuckets = refriBuckets.filter(bucket => {
    return bucket.side === side
  })

  const orderedBuckets = sideBuckets.sort((a, b) => {
    return (a.position - b.position)
  })

  const findFlavor = bucket => {
    const flavor = flavors.find( flavor => flavor._id === bucket.flavor_id)
    if(flavor){
      return flavor.name
    }
    return 'vacío'
  }

  const calculateColor = bucket => {
    const flavor = flavors.find( flavor => flavor._id === bucket.flavor_id)
    if(!flavor) return '#777'
    const category = categories.find( category => category._id === flavor.category_id)
    return category.color
  }

  const openBucket = (bucket) => {
    setSelectedBucket(bucket)
    setOpenModal(true)
  }

  const bucketMap = orderedBuckets.map((bucket, idx) => {
    return (
      <div onClick={() => openBucket(bucket)} className="bucket" key={bucket.id} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: calculateColor(bucket)}}>
        <p className="bucket-flavor">
          { findFlavor(bucket) }
        </p>
      </div>
      )
  })

  const bucketAmounts = () => {
    const flavorsArray = []
    refriBuckets.forEach((bucket) => {
      const flavorIdx = flavorsArray.findIndex(flavor => +flavor.flavorObject?._id === +bucket.flavor_id)
      const flavorObject = flavors.find(flavor => +flavor._id === +bucket.flavor_id)
      if(flavorIdx === -1){
        flavorsArray.push({flavorObject, amount: 1})
      }else{
        flavorsArray[flavorIdx].amount++
      }
    })
    const filteredFlavors = flavorsArray.filter(flavor => flavor.flavorObject !== undefined)
    const orderedBuckets = filteredFlavors.sort((a, b) => {
      return (b.amount - a.amount)
    })
    return orderedBuckets
  }

  const bucketAmountMap = bucketAmounts().map((bucket, idx) => {
    const falseBucket = {
      flavor_id: +bucket.flavorObject._id
    }
    return (
      <div className="bucket-amount" key={idx} style={{gridRow: Math.ceil(idx % 3) + 1, gridColumn: Math.ceil((idx ) / 3), backgroundColor: calculateColor(falseBucket)}}>
        <p className="bucket-flavor-name">
          { findFlavor(falseBucket) }
        </p>
        <p className="bucket-flavor-amount">
        {bucket.amount}
        </p>
      </div>
      )
  })

  const deleteRefri = (event) => {
    if(window.confirm('Estás por eliminar una heladera. Continuar?')){
    const refriId = event.target.parentNode.parentNode.id.substring('refri-'.length)
    const refrigeratorsCopy = refrigerators
    const refriIdx = refrigeratorsCopy.findIndex(refri => +refriId === refri._id)
    refrigeratorsCopy.splice(refriIdx, 1)
    setRefrigerators(refrigeratorsCopy)
    setRefriAmount(refriAmount - 1)
    const bucketsCopy = buckets
    const bucketsToKeep= bucketsCopy.filter(bucket => bucket.refrigerator_id !== +refriId)
    setBuckets(bucketsToKeep)}
  }
  


  return (
    <div className='refri-container' id={`refri-${_id}`}>
      {
        openModal &&
        <Modal openModal={openModal} setOpenModal={setOpenModal}  content={<BucketModal selectedBucket={selectedBucket} setOpenModal={setOpenModal}/>} />
      }
      <div className="refri-name-container">
        <p className="refri-name">{refri_name} - <span className='side-title' style={{backgroundColor: side === 0 ? '#fff': "#ccc"}}>{side === 0 ? 'arriba' : 'abajo'}</span></p>
        <button className="view-mode-selector" onClick={() => setViewMode(!viewMode)}>{viewMode ? 'Ver cantidades' : 'Ver posiciones'}</button>
      </div>
      <div className="refri" style={{backgroundColor: side === 0 ? '#fff' : '#ccc'}}>
       { viewMode && <div className="side-selector-container">
          <button className="side-up" onClick={()=>setSide(0)}>
            <div className="arrow-container arrow-up" style={{color: side===0 ? '#ccc' : '#ba0016'}}>
              <TbArrowBadgeUpFilled />
            </div>
          </button>
          <button className="side-down" onClick={()=>setSide(1)}>
            <div className="arrow-container" style={{color: side===1 ? '#999' : '#ba0016'}}> 
              <TbArrowBadgeDownFilled />
            </div>
          </button>
        </div>}
        <div className="buckets-container">
          { viewMode === true ? bucketMap : (bucketAmountMap) }
        </div>
      </div>
      <div className="under-container">
        <button className="delete-refri" onClick={deleteRefri}>-</button>
        <p className="refri-count">{total_capacity - refriBuckets.filter(bucket => bucket.flavor_id !== null).length} lugares libres</p>
      </div>
    </div>
  )
}

export default Refrigerator