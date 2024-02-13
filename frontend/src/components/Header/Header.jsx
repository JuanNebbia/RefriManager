import React from 'react'
import './Header.css'
import logo2 from "../../img/android-chrome-192x192.png"
import { useAuth } from '../../context/AuthContext'

const Header = () => {

  const {user, logout} = useAuth()

  return (
    <div className='header-container'>
      <div className="logo-container">
        <a href="/"><img src={logo2} alt="" className="logo-jauja" /></a>
      </div>
      <ul className="btn-container">
        <li className='header__li'><button className='header__btn'>Heladeras</button></li>
        <li className='header__li'><button className='header__btn'>Pedidos</button></li>
        <li className='header__li'><button className='header__btn'>Sabores</button></li>
      </ul>
      {
        user && 
          <button onClick={logout}>Out</button>
      }
    </div>
  )
}

export default Header