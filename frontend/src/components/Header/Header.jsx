import React, { useEffect, useState } from 'react'
import './Header.css'
import logo2 from "../../img/android-chrome-192x192.png"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const [section, setSection] = useState()

  const {user, logout, guest, goodNight} = useAuth()

  useEffect(()=> {
    const currentPath = window.location.pathname.substring(1)
    const fullSection = currentPath ? `${currentPath}-section` : 'home-section'
    setSection(fullSection)
  },[user, guest])

  const changeSection = (event) => {
    setSection(event.target.id)
  }

  return (
    <>
    { (user || guest) &&
      <div className='header-container' hidden>
        <div className="logo-container">
          <a href="/"><img src={logo2} alt="" className="logo-jauja" /></a>
        </div>
        <ul className="btn-container">
          <li className='header__li' style={{borderBottom: section === 'home-section' && '4px solid #ccc', marginBottom: section === 'home-section' && '-4px'}}><Link onClick={changeSection} to={"/"} className='header__btn' id='home-section'>Heladeras</Link></li>
          <li className='header__li' style={{borderBottom: section === 'sabores-section' && '4px solid #ccc', marginBottom: section === 'sabores-section' && '-4px'}}><Link onClick={changeSection} to={"/sabores"} className='header__btn' id='sabores-section'>Sabores</Link></li>
          <li className='header__li' style={{borderBottom: section === 'pedidos-section' && '4px solid #ccc', marginBottom: section === 'pedidos-section' && '-4px'}}><Link onClick={changeSection} to={"/pedidos"} className='header__btn' id='pedidos-section'>Pedidos</Link></li>
        </ul>
        {
          (user && !guest) &&
          <button className='logout-btn white-button' onClick={logout}>Salir</button>
        }
      </div>
    }
      { guest &&
        <div className="guest-tag">
          <p className='guest-info'>Has ingresado al sitio como invitado. La interacción con el sitio es limitada, la información que observas no es real y los cambios que realices no serán permanentes. Haz click en el siguiente botón para ingresar al sitio si eres administrador.</p>
          <button className="go-to-login-btn red-button" onClick={goodNight}>Ingresar como administrador</button>
        </div>

      }
    </>
  )
}

export default Header