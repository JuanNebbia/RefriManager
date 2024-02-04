import React from 'react'
import './Header.css'
import logo from '../../img/Fidela.jpg'

const Header = () => {
  return (
    <div className='header-container'>
      <div className="logo-container">
        <img src={logo} alt="" className="logo-jauja" />
      </div>
      <ul className="btn-container">
        <li className='header__li'><button className='header__btn'>Heladeras</button></li>
        <li className='header__li'><button className='header__btn'>Pedidos</button></li>
        <li className='header__li'><button className='header__btn'>Sabores</button></li>
      </ul>
    </div>
  )
}

export default Header