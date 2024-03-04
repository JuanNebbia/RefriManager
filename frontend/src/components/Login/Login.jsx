import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Login.css'
import { IoIosIceCream } from "react-icons/io";

const Login = () => {
    const [username, setUsername] = useState()
    const [pass, setPass] = useState()
    const [hidePass, setHidePass] = useState(true)

    const { login, logError, peekABoo } = useAuth()

    const handleFormChange = (event) => {
        if(event.target.name === "show-pass"){
            setHidePass(!event.target.checked)
        }
        if(event.target.name === 'username'){
            setUsername(event.target.value)
        }
        if(event.target.name === 'pass'){
            setPass(event.target.value) 
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        login({username, pass})
    }

  return (
    <div className='login-container'>
        <h1 className='main-title'><IoIosIceCream /> Refri Manager <IoIosIceCream /></h1>
        <div className="login-inner">
            <h3 className="login-title">Inicio de sesión</h3>
            <form action="" className="login-form" onChange={handleFormChange}>
                <label htmlFor="user-login">Usuario</label>
                <input type="text" id='user-login' name='username' />
                <label htmlFor="pass-login">Contraseña</label>
                <input type={hidePass ? "password": "text"} id='pass-login' name='pass' autoComplete='new-passwor' />
                <div className="show-pass-container">
                    <input type="checkbox" name='show-pass' />
                    <label htmlFor="pass-login"> Mostrar contraseña</label>
                </div>
                { logError &&
                    <p className='login-error'>Usuario o contraseña incorrecto</p>
                }
                <button onClick={handleLogin} className='admin-login-btn'>Ingresar como administrador</button>
                <button onClick={peekABoo} className='guest-login-btn'>Ingresar como invitado</button>
            </form>
        </div>
    </div>
  )
}

export default Login