import React, { useEffect, useState } from 'react'
import './NewOrder.css'
import { useData } from '../../context/DataContext'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const NewOrder = () => {
  const [sortedFlavors, setSortedFlavors] = useState([])
  const [order, setOrder] = useState([])
  const [suppliesOrder, setSuppliesOrder] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [supplies, setSupplies] = useState([])
  const navigate = useNavigate()

  const { flavors, loadingFlavors, buckets, loadingBuckets } = useData()

  useEffect(() => {
    const flavorsCopy = flavors
    flavorsCopy.sort((a, b) => {
      if(a.name > b.name) return 1
      if(a.name < b.name) return -1
      else return 0
    }).map(flavor => {
      flavor.count = buckets.filter(bucket => bucket.flavor_id === flavor._id).length
      return flavor
    })
    setSortedFlavors(flavorsCopy)

    const fetchSupplies = async()=>{
      const url = process.env.REACT_APP_BACKEND_URL
      const suppliesResponse = await axios.get(`${url}/supplies`)
      setSupplies(suppliesResponse.data)
    }
    try {
      fetchSupplies()
    } catch (error) {
      console.error(error)
    }
  },[flavors, buckets])
   
  const handleOrderChange = (event, flavor_id) => {
    const item = {
      flavor_id: flavor_id,
      amount: +event.target.value
    }
    const orderCopy = order
    const existingFlavor = order.findIndex(item => item.flavor_id === flavor_id)
    if(existingFlavor === -1){
      orderCopy.push(item)
    }else{
      if(+event.target.value > 0){
        orderCopy[existingFlavor].amount = +event.target.value
      }else{
        orderCopy.splice(existingFlavor, 1)
      }
    }
    setOrder(orderCopy)
    setTotalOrder(order.reduce((total, order) => total + order.amount, 0))
  }

  const handleSuppliesOrderChange = (event, supply_id) => {
    const item = {
      supply_id: supply_id,
      amount: +event.target.value
    }
    const suppliesOrderCopy = suppliesOrder
    const existingSupply = suppliesOrder.findIndex(item => item.supply_id === supply_id)
    if(existingSupply === -1){
      suppliesOrderCopy.push(item)
    }else{
      if(+event.target.value > 0){
        suppliesOrderCopy[existingSupply].amount = +event.target.value
      }else{
        suppliesOrderCopy.splice(existingSupply, 1)
      }
    }
    setSuppliesOrder(suppliesOrderCopy)
  }

  const saveOrder = async(event) => {
    try {
      event.preventDefault()
      if(!order.length && !suppliesOrder.length) return
      const url = process.env.REACT_APP_BACKEND_URL
      const payload = {
        items: order,
        supplies: suppliesOrder,
        date: new Date()
      }
      const response = await axios.post(`${url}/orders`, payload )
      if(response.status === 201 || response.status === 200){
        navigate('/pedidos/'+response.data._id)
      };
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    {(loadingFlavors || loadingBuckets) ? <Loader /> : 
    <div className='new-order-container'>
      <h2>Nuevo pedido</h2>
      <form action="" className="new-order-form">
        <h3 className='order-detail-subtitle'>Helados</h3>
        <table className='new-order-table'>
          <thead>
            <tr>
              <th className='new-order-flavor-header'>Sabor</th>
              <th className='new-order-amount-header'>Cantidad</th>
              <th className='new-order-saved-header'>Guardados</th>
            </tr>
          </thead>
          <tbody>
            {sortedFlavors.map(flavor => {
              return(
                <tr key={flavor._id} className='item-new-order-row'>
                  <td>{flavor.name}</td>
                  {/* <td><input type="number" onChange={(event)=>handleOrderChange(event, flavor._id)} min={0} className='new-order-input' /></td> */}
                  <td id='new-order-input-cell'>
                    <select type="select" onChange={(event)=>handleOrderChange(event, flavor._id)} className='new-order-input' >
                      <option aria-label="Please select"></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                    </select>
                  </td>
                  <td className='saved-buckets'>{flavor.count}</td>
                </tr>
              )
            })}
            <tr>
              <td id='new-order-total'>Total de baldes</td>
              <td id='new-order-total-amount' colSpan={2}>{totalOrder}</td>
            </tr>
          </tbody>
        </table>
        <h3 className='order-detail-subtitle'>Insumos</h3>
        <table className='supplies-table'>
          <thead>
            <tr>
              <th className='supplies-item-header'>Item</th>
              <th className='supplies-amount-header'>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {supplies.map(supply => {
              return(
                <tr key={supply._id} className='item-supplies-row'>
                  <td>{supply.name}</td>
                  {/* <td><input type="number" onChange={(event)=>handleOrderChange(event, flavor._id)} min={0} className='new-order-input' /></td> */}
                  <td id='supplies-input-cell'>
                    <select type="select" onChange={(event)=>handleSuppliesOrderChange(event, supply._id)} className='supplies-input' >
                      <option aria-label="Please select"></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <button className="save-order-btn red-button" onClick={saveOrder}>Guardar Pedido</button>
        <button className="send-order-btn red-button" disabled onClick={(event)=>event.preventDefault()}>Enviar Pedido</button>
      </form>
    </div>
    }
    </>
  )
}

export default NewOrder