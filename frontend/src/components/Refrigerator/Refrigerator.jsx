import React, { useEffect, useState } from 'react'
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
  const [refriFlavors, setRefriFlavors] = useState([])
  const { setBuckets, flavors } = useData();
  
  useEffect(()=> {
    const flavorCounts = {};
    buckets.forEach(bucket => {
      if(bucket.flavor_id){
        flavorCounts[bucket.flavor._id] = (flavorCounts[bucket.flavor._id] || 0) + 1;
      }
    });
    const flavorsArray = Object.keys(flavorCounts).map(flavor => ({
      flavor: flavor,
      count: flavorCounts[flavor]
    }));
    const flavorObjects = flavorsArray.map(flavor => {
      flavor.flavor = flavors.find(fla => flavor.flavor === fla._id) || {}
      return flavor
    })
    flavorObjects.sort((a, b) => {
      if (a.flavor.category_id._id !== b.flavor.category_id._id) {
        return a.flavor.category_id._id.localeCompare(b.flavor.category_id._id);
      } else {
        return a.flavor.name.localeCompare(b.flavor.name);
      }
    });
    setRefriFlavors(flavorObjects);
  },[])

  const freeSpaces = ( total_capacity - buckets.filter(bucket => bucket.flavor_id !== null).length )

  const openBucket = (bucket) => {
    setSelectedBucket(bucket)
    setOpenBucketModal(true)
  }
  


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
            viewMode ? 
              buckets.filter(buck => buck.side === side).map((bucket, idx) => {
                let color = bucket.flavor.category.length === 1 ? bucket.flavor.category[0].color : '#e5e5e5'
                return (
                  <div onClick={() => openBucket(bucket)} className="bucket" key={bucket._id} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: color + '55', border: `4px outset ${color}`}}>
                    <p className="bucket-flavor">
                      { bucket.flavor.name || 'vacío'}
                    </p>
                  </div>
                )
              }) :
                refriFlavors.map((flavor, idx) => {
                  return <div className="flavor-count" key={idx} style={{ backgroundColor: flavor.flavor.category_id.color + 'bb', gridRow:Math.ceil((idx+1) % 4), gridColumn: Math.ceil((idx+1) / 4)}}>{flavor.flavor.name}: {flavor.count}</div>
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