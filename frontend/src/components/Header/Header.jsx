import React, { useState } from 'react'
import './Header.css'
import logo2 from "../../img/android-chrome-192x192.png"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const [section, setSection] = useState('home-section')

  const {user, logout} = useAuth()

  const changeSection = (event) => {
    setSection(event.target.id)
  }

  return (
    <div className='header-container'>
      <div className="logo-container">
        <a href="/"><img src={logo2} alt="" className="logo-jauja" /></a>
      </div>
      <ul className="btn-container">
        <li className='header__li' style={{borderBottom: section === 'home-section' && '2px solid red'}}><Link onClick={changeSection} to={"/"} className='header__btn' id='home-section'>Heladeras</Link></li>
        <li className='header__li' style={{borderBottom: section === 'flavors-section' && '2px solid red'}}><Link onClick={changeSection} to={"/sabores"} className='header__btn' id='flavors-section'>Sabores</Link></li>
        <li className='header__li' style={{borderBottom: section === 'orders-section' && '2px solid red'}}><Link onClick={changeSection} to={"/pedidos"} className='header__btn' id='orders-section'>Pedidos</Link></li>
      </ul>
      {
        user && 
          <button className='logout-btn' onClick={logout}>Salir</button>
      }
    </div>
  )
}

export default Header