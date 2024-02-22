import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Orders.css'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    setLoadingOrders(true)
    const fetchOrders = async() => {
      const url = process.env.REACT_APP_BACKEND_URL
      const ordersResponse = await axios.get(`${url}/orders`)
      ordersResponse.data.sort((a, b) => {
        if(a.date < b.date) return 1
        if(a.date > b.date) return -1
        else return 0
      })
      setOrders(ordersResponse.data)
      setLoadingOrders(false)
    }
    try {
      fetchOrders()
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  }, [])

  return (
    <>
    { loadingOrders ? <Loader /> :
    <div className='orders-container'>
      <h2>Pedidos</h2>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th className='orders-date-header'>Fecha</th>
              <th className='orders-amount-header'>Cantidad de baldes</th>
              <th id='orders-actions-header'></th>
            </tr>
          </thead>
          <tbody>
            {orders.length ?
              (orders.map(order => {
                return (
                  <tr className='item-order-row' key={order._id}>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td>{order.total_amount} <small>{order.supplies?.length ? '(+insumos)' : ''}</small></td>
                    <td id='see-order-cell'>
                      <button className='white-button see-order-btn'><Link to={`/pedidos/${order._id}`}>Ver detalle</Link></button>
                    </td>
                  </tr>
                )
              })):
              <tr className='item-order-row'>
                <td colSpan={3}>No hay pedidos guardados</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <button className="red-button new-order-btn"><Link to={'/pedidos/nuevo'}>Nuevo pedido</Link></button>
    </div>
}
    </>
  )
}

export default Orders