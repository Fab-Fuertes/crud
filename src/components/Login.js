import React, { useState } from 'react'
import appFirebase from '../credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import './Login.css';


const auth  = getAuth(appFirebase)

const Login = () =>{
    const [registro, setRegistro] =useState(false)

    const handlerSubmit = async(e)=>{
        e.preventDefault()
        const correo = e.target.email.value;
        const contraseña = e.target.contraseña.value;

        if(registro){
            await createUserWithEmailAndPassword(auth, correo, contraseña)
        }
        else{
            await signInWithEmailAndPassword(auth, correo, contraseña)
        }

    }

    return (
      <div className="row-container-p-4">
        <div className="col-md-4"></div>
        <div className='mt5-ms5'>
            <h1>{registro ? 'registrate' :'inicia sesion' }</h1>
            <form onSubmit={handlerSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Direccion de email:</label>
                    <input type="email" className='form-control' placeholder='Ingresar Email' id='email' required/>
                </div>

                <div className='mb-3'>
                    <label className='form-label'>Contraseña:</label>
                    <input type="password" className='form-control' placeholder='Ingresar contraseña' id='contraseña' required/>
                </div>

                <button className='button' type='submit'>
                    {registro ? 'registrate': 'inicia sesion'}
                </button>
            </form>

            <div className='form-group'>
                <button className='button' onClick= {() => setRegistro(!registro)}>
                    {registro ? 'ya tienes una cuenta? Inicia sesion': 'no tienes cuenta? Registrate'}

                </button>

            </div>

        </div>
      </div>
    );
}

export default Login