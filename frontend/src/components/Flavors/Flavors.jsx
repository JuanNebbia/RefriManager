import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'
import './Flavors.css'
import Loader from '../Loader/Loader'

const Flavors = () => {
  const [populatedCategories, setPopulatedCategories] = useState([])
  const { flavors, loadingFlavors, categories, LoadingCategories, buckets, loadingBuckets } = useData()


  useEffect(() => {
    const flavorCount = flavors.map(flavor => {
      flavor.count = buckets.filter(bucket => bucket.flavor_id === flavor._id).length
      return flavor
    })
    const categoriesWithFlavors = categories.map(category => {
      category.flavors = flavorCount.filter(flavor => flavor.category_id._id === category._id)
      return category
    })
    setPopulatedCategories(categoriesWithFlavors)

  },[categories, flavors, buckets])
  return (
    <>
      { (loadingBuckets || loadingFlavors || LoadingCategories ) ? <Loader /> :
        <div className='flavors-container'>
          <div className="falvors-table-container">
            <table className='flavors-table'>
              <thead>
                <tr>
                  <th>Sabor</th>
                  <th>Descripción</th>
                  <th>Almacenados</th>
                </tr>
              </thead>
              <tbody>
                {
                  populatedCategories.map((category, idx) => {
                    return (
                      <>
                        <tr key={idx} style={{backgroundColor: category.color + 'bb'}}>
                          <td colSpan={3} className='flavor-category-table'>{category.category}</td>
                        </tr>
                        {category.flavors.map((flavor, idx) => {
                        return (
                          <tr key={idx} style={{backgroundColor: category.color + '88'}}>
                            <td className='flavor-name-table'>{flavor.name}</td>
                            <td>{flavor.description}</td>
                            <td className='flavor-count-table'>{flavor.count}</td>
                          </tr>
                        )

                        })}
                      </>
                    )
                  })
                }

              </tbody>
            </table>
          </div>
        </div>
      }
  </>
  )
}

export default Flavors