import React, { useState } from 'react'
import './Refrigerator.css'
import buckets from '../../mock/buckets.json'
import flavors from '../../mock/flavors.json'
import categories from '../../mock/categories.json'
import BucketModal from '../BucketModal/BucketModal'
import { TbArrowBadgeUpFilled } from "react-icons/tb";
import { TbArrowBadgeDownFilled } from "react-icons/tb";




const Refrigerator = ({ _id, total_capacity, refri_name, status }) => {
  const [side, setSide] = useState(0)
  const [openModal, setOpenModal] = useState(false) 
  const [selectedBucket, setSelectedBucket] = useState({})

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
    if(!flavor) return '#aaa'
    const category = categories.find( category => category._id === flavor.category_id)
    return category.color
  }

  const openBucket = (bucket) => {
    setSelectedBucket(bucket)
    setOpenModal(true)
  }

  const bucketMap = orderedBuckets.map( (bucket, idx) => {
    return (
      <div onClick={() => openBucket(bucket)} className="bucket" key={idx} style={{gridRow: Math.ceil(idx % 2) + 1, gridColumn: Math.ceil((bucket.position ) / 2), backgroundColor: calculateColor(bucket)}}>
        <p className="bucket-flavor">
          { findFlavor(bucket) }
        </p>
      </div>
      )
  })

  return (
    <div className='refri-container' id={_id}>
      {
        openModal &&
        <BucketModal openModal={openModal} setOpenModal={setOpenModal} selectedBucket={selectedBucket} />
      }
      <p className="refri-name">{refri_name} - {side === 0 ? 'arriba' : 'abajo'}</p>
      <div className="refri" style={{backgroundColor: side === 0 ? '#fff' : '#aaa'}}>
        <div className="side-selector-container">
          <button className="side-up" onClick={()=>setSide(0)}>
            <div className="arrow-container arrow-up" style={{color: side===0 ? '#666' : '#222'}}>
              <TbArrowBadgeUpFilled />
            </div>
          </button>
          <button className="side-down" onClick={()=>setSide(1)}>
            <div className="arrow-container" style={{color: side===1 ? '#666' : '#222'}}> 
              <TbArrowBadgeDownFilled />
            </div>
          </button>
        </div>
        <div className="buckets-container">
          {bucketMap}
        </div>
      </div>
      <p className="refri-count">{total_capacity - refriBuckets.length} lugares libres</p>
    </div>
  )
}

export default Refrigerator