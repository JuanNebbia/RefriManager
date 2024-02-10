import React, { useState } from 'react'
import './Refrigerator.css'
import BucketModal from '../BucketModal/BucketModal'
import { TbArrowBadgeUpFilled } from "react-icons/tb";
import { TbArrowBadgeDownFilled } from "react-icons/tb";
import { BsFillPencilFill } from "react-icons/bs";
import { useData } from '../../context/DataContext';
import Modal from '../Modal/Modal';
import EditModal from '../EditModal/EditModal';

const Refrigerator = ({ _id, total_capacity, refri_name, buckets, status, refrigerators, setRefrigerators, refriAmount, setRefriAmount }) => {
  const [side, setSide] = useState(0)
  const [viewMode, setViewMode] = useState(true)
  const [openBucketModal, setOpenBucketModal] = useState(false) 
  const [openEditModal, setOpenEditModal] = useState(false) 
  const [selectedBucket, setSelectedBucket] = useState({})
  
  const freeSpaces = ( total_capacity - buckets.filter(bucket => bucket.flavor_id !== null).length )
  
  const openBucket = (bucket) => {
    setSelectedBucket(bucket)
    setOpenBucketModal(true)
  }
  
  const { setBuckets } = useData();
  
  // const refriBuckets = buckets.filter(bucket => {
  //   return bucket.refrigerator_id === _id
  // })
  
  // const sideBuckets = refriBuckets.filter(bucket => {
  //   return bucket.side === side
  // })
  
  // const orderedBuckets = sideBuckets.sort((a, b) => {
  //   return (a.position - b.position)
  // })

  // const findFlavor = bucket => {
  //   const flavor = flavors.find( flavor => flavor._id === bucket.flavor_id)
  //   if(flavor){
  //     return flavor.name
  //   }
  //   return 'vacío'
  // }
  
  // const freeSpaces = ( total_capacity - refriBuckets.filter(bucket => bucket.flavor_id !== null).length )


  // const calculateColor = bucket => {
  //   const flavor = bucket.flavor
  //   if(!flavor) return '#f9f9f9'
  //   const category = bucket.flavor.category
  //   return category.color
  // }

  // const bucketMap = orderedBuckets.map((bucket, idx) => {
  //   return (
  //     <div onClick={() => openBucket(bucket)} className="bucket" key={bucket.id} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: calculateColor(bucket) + 'aa', border: bucket.flavor_id === null ? '4px outset #888': `4px outset ${calculateColor(bucket)}`}}>
  //       <p className="bucket-flavor">
  //         { findFlavor(bucket) }
  //       </p>
  //     </div>
  //     )
  // })

  // const bucketMap2 = buckets.filter(buck => buck.side === side).map((bucket, idx) => {
  //   let color = bucket.flavor.category.length === 1 ? bucket.flavor.category[0].color : '#e5e5e5'
  //   return (
  //     <div onClick={() => openBucket(bucket)} className="bucket" key={bucket._id} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: color + 'aa', border: `4px outset ${color}`}}>
  //       <p className="bucket-flavor">
  //         { bucket.flavor.name || 'vacío'}
  //       </p>
  //     </div>
  //     )
  // })

  // const bucketAmounts = () => {
  //   const flavorsArray = []
  //   refriBuckets.forEach((bucket) => {
  //     const flavorIdx = flavorsArray.findIndex(flavor => +flavor.flavorObject?._id === +bucket.flavor_id)
  //     const flavorObject = flavors.find(flavor => +flavor._id === +bucket.flavor_id)
  //     if(flavorIdx === -1){
  //       flavorsArray.push({flavorObject, amount: 1})
  //     }else{
  //       flavorsArray[flavorIdx].amount++
  //     }
  //   })
  //   const filteredFlavors = flavorsArray.filter(flavor => flavor.flavorObject !== undefined)
  //   const orderedBuckets = filteredFlavors.sort((a, b) => {
  //     return (b.amount - a.amount)
  //   })
  //   return orderedBuckets
  // }

  // const bucketAmountMap = bucketAmounts().map((bucket, idx) => {
  //   const falseBucket = {
  //     flavor_id: +bucket.flavorObject._id
  //   }
  //   return (
  //     <div className="bucket-amount" key={idx} style={{gridRow: Math.ceil(idx % 3) + 1, gridColumn: Math.ceil((idx ) / 3), backgroundColor: calculateColor(falseBucket)}}>
  //       <p className="bucket-flavor-name">
  //         { findFlavor(falseBucket) }
  //       </p>
  //       <p className="bucket-flavor-amount">
  //       {bucket.amount}
  //       </p>
  //     </div>
  //     )
  // })

  // const deleteRefri = (event) => {
  //   if(window.confirm('Esta acción eliminará una heladera y sus respectivos baldes de forma permanente. ¿Desea continuar?')){
  //     const refriId = event.target.parentNode.parentNode.id.substring('refri-'.length)
  //     const refrigeratorsCopy = refrigerators
  //     const refriIdx = refrigeratorsCopy.findIndex(refri => +refriId === refri._id)
  //     refrigeratorsCopy.splice(refriIdx, 1)
  //     setRefrigerators(refrigeratorsCopy)
  //     setRefriAmount(refriAmount - 1)
  //     const bucketsCopy = buckets
  //     const bucketsToKeep= bucketsCopy.filter(bucket => bucket.refrigerator_id !== +refriId)
  //     setBuckets(bucketsToKeep)
  //   }
  // }
  


  return (
    <div className='refri-container' id={`refri-${_id}`}>
      {
        openBucketModal &&
        <Modal openModal={openBucketModal} setOpenModal={setOpenBucketModal}  content={<BucketModal selectedBucket={selectedBucket} setOpenModal={setOpenBucketModal} setBuckets={setBuckets}/>} />
      }
      {
        openEditModal &&
        <Modal openModal={openEditModal} setOpenModal={setOpenEditModal}  content={<EditModal selectedRefrigerator={{_id, refri_name, buckets, total_capacity}} setOpenModal={setOpenEditModal} />} />
      }
      <div className="refri-name-container">
        <p className="refri-name">{refri_name} - <span className='side-title' style={{backgroundColor: side === 0 ? '#fff': "#ccc"}} onClick={()=>setSide(side === 0 ? 1 : 0 )}>{side === 0 ? 'arriba' : 'abajo'}</span></p>
        <button className="view-mode-selector" onClick={() => setViewMode(!viewMode)}>{viewMode ? 'Ver cantidades' : 'Ver posiciones'}</button>
        <button className="edit-refri" onClick={() => setOpenEditModal(true)}>
          <BsFillPencilFill />
        </button>
      </div>
      <div className="refri" style={{backgroundColor: side === 0 ? '#fff' : '#ccc', boxShadow: side === 1 && 'inset 0 -1px 3px 0 #00000044'}}>
       { viewMode && <div className="side-selector-container">
          <button className="side-up" onClick={()=>setSide(0)}>
            <div className="arrow-container arrow-up" style={{color: side===0 ? '#ccc' : '#ba0016ee'}}>
              <TbArrowBadgeUpFilled />
            </div>
          </button>
          <button className="side-down" onClick={()=>setSide(1)}>
            <div className="arrow-container" style={{color: side===1 ? '#999' : '#ba0016ee'}}> 
              <TbArrowBadgeDownFilled />
            </div>
          </button>
        </div>}
        <div className="buckets-container">
          {
            buckets.filter(buck => buck.side === side).map((bucket, idx) => {
              let color = bucket.flavor.category.length === 1 ? bucket.flavor.category[0].color : '#e5e5e5'
              return (
                <div onClick={() => openBucket(bucket)} className="bucket" key={bucket._id} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: color + '55', border: `4px outset ${color}`}}>
                  <p className="bucket-flavor">
                    { bucket.flavor.name || 'vacío'}
                  </p>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="under-container">
        <p className="refri-count">{freeSpaces > 0 ? (freeSpaces + (freeSpaces > 1 ? ' lugares libres': ' lugar libre')) : 'Heladera llena'}</p>
      </div>
    </div>
  )
}

export default Refrigerator