import React, { useEffect, useState } from 'react'
import { useData } from '../../context/DataContext'

const Flavors = () => {
  const [populatedCategories, setPopulatedCategories] = useState([])
  const { flavors, categories, buckets } = useData()


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
    <div>
      <table>
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
                    <td>{category.category}</td>
                  </tr>
                  {category.flavors.map((flavor, idx) => {
                  return (
                    <tr key={idx} style={{backgroundColor: category.color + '88'}}>
                      <td>{flavor.name}</td>
                      <td>{flavor.description}</td>
                      <td>{flavor.count}</td>
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
  )
}

export default Flavors