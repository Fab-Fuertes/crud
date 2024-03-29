//import React from 'react'
import React, { useEffect, useState } from 'react';

import appFirebase from '../credenciales'
import {getAuth, signOut} from 'firebase/auth'
import './Home.css'; 
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)



const Home = ({correoUsuario}) => {

    const valorInicial = {
        nombre: '',
        apellido:'',
        username:'',
        juego:'',
    }
    
    //variables de estado
    const [user, setUser] = useState(valorInicial)
    const [lista, setLista] = useState([])
    const [subId, setSubId] = useState('')

    //funciones para capturar inputs
    const capturarInputs = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})

    }

    
    const guardarDatos = async(e) =>{
        e.preventDefault();
        //console.log(user);
        try{
            await addDoc(collection(db,'usuarios'),{
                ...user
            })

        }catch(error){
            console.log(error)
        }
        setUser({...valorInicial})
    }

    //funciones para renderizar lista de clubes

    
    useEffect(() => {
        const getLista = async() =>{
            try{
                const querySnapshot  = await getDocs(collection(db, 'clubes'))
                const docs = []
                
                querySnapshot.forEach((doc) =>{
                    docs.push({...doc.data(), id:doc.id})
                })

                setLista(docs)


            } catch(error){
                console.log(error)
            }
        }

        getLista()

    }, [lista])

    //funcion para eliminar el club
    const deleteClub = async(id)=>{
        await deleteDoc(doc(db, 'clubes', id))
    }

    
    const getOne = async(id) =>{
        try{
            const docRef = doc(db, "clubes", id)
            const docSnap = await getDoc(docRef)
            setUser(docSnap.data())

        }catch (error){
            console.log(error)

        }

    }

    
    useEffect(() =>{
        
        if(subId !== ''){
            getOne(subId)
        }


    }, [subId])



    return (
        <div className='container'>

            <p>Bienvenido,<strong>{correoUsuario}</strong> Haz iniciado sesión</p>

            <button className='btn btn-primary' onClick={()=>signOut(auth)}>
                Cerrar Sesion
            </button>


            <hr />

            <div className='row'>
                <div className='col-md-4'>
                    <h3 className='text-center mb-3'>Ingresar datos perfil</h3>
                    <form onSubmit={guardarDatos}>
                        <div className='card sidecard-body'>
                            <div className='form-group'>
                                <input type="text" name='nombre' className='form-control' placeholder='Ingresar nombre' onChange={capturarInputs} value={user.nombre}/>

                                <input type="text" name='apellido' className='form-control' placeholder='Ingresar apellido' onChange={capturarInputs} value={user.apellido}/>

                                <input type="text" name='username' className='form-control' placeholder='Ingresar nombre de usuario' onChange={capturarInputs} value={user.username}/>

                                <input type="text" name='juego' className='form-control' placeholder='Ingresar su juego preferido' onChange={capturarInputs} value={user.juego}/>

                            </div>

                            <button className='btn btn-secondary'>
                                Guardar
                            </button>

                        </div>
                    </form>

                </div>

                <div className='col-md-8'>
                    <h2 className='text-center' mb-5>Lista de clubes</h2>

                    <div className='container card'>
                        <div className='card-body'>
                            {
                                
                                lista.map(list =>(

                                    
                                    <div key={list.id}>
                                        <p>ID: {list.ID} </p>

                                        <p>Nombre: {list.nombre} </p>

                                        <p>Descripcion: {list.descripcion}</p>

                                        <p>Videojuegos: {list.videojuegos}</p>

                                        <button className='btn btn-danger' onClick={() =>deleteClub(list.id)}>
                                         Eliminar Club
                                        </button>                                        

                                        <button className='btn btn-success m-1' onClick={() => setSubId(list.id)}>
                                         Suscripcion
                                        
                                        </button>
                                        
                                        
                                    </div>
                                ))

                            }
                        </div>

                    </div>

                </div>
                


            </div>

        </div>
    )
}

export default Home