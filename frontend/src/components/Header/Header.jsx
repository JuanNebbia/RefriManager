import React from 'react'
import './Header.css'
import logo2 from "../../img/android-chrome-192x192.png"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {

  const {user, logout} = useAuth()

  return (
    <div className='header-container'>
      <div className="logo-container">
        <a href="/"><img src={logo2} alt="" className="logo-jauja" /></a>
      </div>
      <ul className="btn-container">
        <li className='header__li'><Link to={"/"} className='header__btn'>Heladeras</Link></li>
        <li className='header__li'><Link to={"/sabores"} className='header__btn'>Sabores</Link></li>
        <li className='header__li'><Link to={"/pedidos"} className='header__btn'>Pedidos</Link></li>
      </ul>
      {
        user && 
          <button className='logout-btn' onClick={logout}>Salir</button>
      }
    </div>
  )
}

export default Header