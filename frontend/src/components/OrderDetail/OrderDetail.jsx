import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './OrderDetail.css'
import Loader from '../Loader/Loader'

const OrderDetail = () => {
    const { oid } = useParams()
    const [order, setOrder] = useState({})

    useEffect(()=>{
        const fetchOrder = async() => {
            const url = process.env.REACT_APP_BACKEND_URL
            const ordersResponse = await axios.get(`${url}/orders/${oid}`)
            ordersResponse.data.items.sort((a, b) => {
                if(a.amount < b.amount) return 1
                if(a.amount > b.amount) return -1
                else return 0
            })
            setOrder(ordersResponse.data)
          }
          try {
            fetchOrder()
          } catch (error) {
            console.error("Error fetching order data:", error);
          }
    },[oid])
  return (
    <>
    { !Object.keys(order).length ? <Loader /> :
        <div className='order-container'>
            <h2>Detalle del pedido</h2>
            <p>Fecha: {new Date(order.date).toLocaleString()}</p>
            <table className="order-table">
                <thead>
                    <tr>
                        <th className='order-detail-flavor-header'>Sabor</th>
                        <th className='order-detail-amount-header'>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, idx) => {
                        return (
                            <tr key={idx} className='item-order-detail-row'>
                                <td className='order-flavor-cell'>{item.flavor_id.name}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    })}
                    <tr className='total-row'>
                        <td className='order-detail-total'>Total</td>
                        <td className='order-detail-total-number'>{order.total_amount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
    </>
  )
}

export default OrderDetail