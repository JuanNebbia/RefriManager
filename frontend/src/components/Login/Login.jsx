import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState()
    const [pass, setPass] = useState()

    const { login } = useAuth()

    const handleFormChange = (event) => {
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
        <div className="login-inner">
            <h3 className="login-title">Inicio de sesión</h3>
            <form action="" className="login-form" onChange={handleFormChange}>
                <label htmlFor="user-login"> Email</label>
                <input type="text" id='user-login' name='username' />
                <label htmlFor="pass-login"> Contraseña</label>
                <input type="pass" id='pass-login' name='pass' />

                <button onClick={handleLogin}>Ingresar</button>
            </form>
        </div>
    </div>
  )
}

export default Login