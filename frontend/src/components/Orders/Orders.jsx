import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Orders.css'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async() => {
      const url = process.env.REACT_APP_BACKEND_URL
      const ordersResponse = await axios.get(`${url}/orders`)
      setOrders(ordersResponse.data)
    }
    try {
      fetchOrders()
    } catch (error) {
      console.error("Error fetching orders data:", error);
    }
  }, [])

  return (
    <>
    { !orders.length ? <Loader /> :
    <div className='orders-container'>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cantidad de baldes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => {
                return (
                  <tr className='item-order-row' key={order._id}>
                    <td>{new Date(order.date).toLocaleString()}</td>
                    <td>{order.total_amount}</td>
                    <td>
                      <button className='see-order-btn'><Link to={`/pedidos/${order._id}`}>Ver detalle</Link></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <button className="new-order-btn"><Link to={'/pedidos/nuevo'}>Nuevo pedido</Link></button>
    </div>
}
    </>
  )
}

export default Orders