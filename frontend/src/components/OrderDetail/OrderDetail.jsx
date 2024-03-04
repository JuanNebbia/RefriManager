import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './OrderDetail.css'
import Loader from '../Loader/Loader'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import Login from '../Login/Login'
import { useCookies } from 'react-cookie'

const OrderDetail = () => {
    const { oid } = useParams()
    const [order, setOrder] = useState({})
    const { mockOrderList } = useData()
    const [loadingOrder, setLoadingOrder] = useState(true)
    const {user, guest} = useAuth()
    const navigate = useNavigate()
    const [cookies] = useCookies(["sessionId"]);

    useEffect(()=>{;
        const fetchOrder = async() => {
            const url = process.env.REACT_APP_BACKEND_URL
            const token = cookies.sessionId
            const ordersResponse = await axios.get(`${url}/orders/${oid}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
            })
            ordersResponse.data.items.sort((a, b) => {
                if(a.amount < b.amount) return 1
                if(a.amount > b.amount) return -1
                else return 0
            })
            console.log(ordersResponse.data);
            setOrder(ordersResponse.data)
        }
        try {
            if(user){
                fetchOrder()
                setLoadingOrder(false)
            }else{
                if(mockOrderList.length){
                    const copyMockOrderList = [...mockOrderList]
                    const currentOrder = copyMockOrderList.find(order => order._id === oid)
                    const copyCurrentOrder = currentOrder;
                    setOrder(copyCurrentOrder)
                    setLoadingOrder(false)
                }else{
                    navigate('/pedidos/')
                }
            }
          } catch (error) {
            console.error("Error fetching order data:", error);
          }
    },[oid, mockOrderList])

    return (
        <>
        {(user || guest) ? 
            <>
            { (loadingOrder || !order.items?.length) ? <Loader /> :
                <div className='order-container'>
                    <h2>Detalle del pedido</h2>
                    <p>Fecha: {new Date(order.date).toLocaleString()}</p>
                    {order.items.length > 0 &&
                        <>
                        <h3 className='order-detail-subtitle'>Helados</h3>
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
                        </>
                    }
                    
                    { order.supplies.length > 0 &&
                    <>
                    <h3 className='order-detail-subtitle'>Insumos</h3>
                        <table className="supplies-detail-table">
                            <thead>
                                <tr>
                                    <th className='supplies-detail-item-header'>Item</th>
                                    <th className='supplies-detail-amount-header'>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.supplies.map((item, idx) => {
                                    return (
                                        <tr key={idx} className='item-supplies-detail-row'>
                                            <td className='supplies-detail-item-cell'>{item.supply_id.name}</td>
                                            <td>{item.amount}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </>
                    }
                    { order.notes &&
                    <>
                    <h3 className='order-detail-subtitle'>Comentarios</h3>
                        <p className='order-detail-comments'>{order.notes}</p>
                    </>
                    }
                </div>
            }
            </>:
        <Login />}
        </>
    )
}

export default OrderDetail