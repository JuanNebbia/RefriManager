import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'
import './Flavors.css'
import Loader from '../Loader/Loader'
import { useAuth } from '../../context/AuthContext'
import Login from '../Login/Login'

const Flavors = () => {
  const [populatedCategories, setPopulatedCategories] = useState([])
  const { flavors, loadingFlavors, categories, LoadingCategories, buckets, loadingBuckets } = useData()
  const {user, guest} = useAuth()


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
    {(user || guest) ?
      <>
        { (loadingBuckets || loadingFlavors || LoadingCategories ) ? <Loader /> :
          <div className='flavors-container'>
            <h2>Sabores</h2>
            <div className="falvors-table-container">
              <table className='flavors-table'>
                <thead>
                  <tr>
                    <th className='flavors-table-flavor-header'>Sabor</th>
                    <th className='flavors-table-description-header'>Descripción</th>
                    <th className='flavors-table-stored-header'>Cantidad</th>
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
      </>:
      <Login />
    }
  </>
  )
}

export default Flavors