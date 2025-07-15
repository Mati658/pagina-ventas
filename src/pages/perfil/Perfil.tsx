import { useEffect } from 'react'
import Resultados from '../../components/resultados/Resultados'
import './perfil.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Perfil() {
  const { getState, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    verificarUsuario();
  },[])

  const verificarUsuario = async() =>{
    if (! await getState()) {
      navigate('/login');
    }
  }

  const salir = async() =>{
    await signOut();
    navigate('/login');
  }

  return (
    <div className='container-page-perfil'>
      <button className='inter' onClick={salir}>Cerrar Sesión</button>
        <Resultados titulo='Historial de compras' productos={[]}></Resultados>
        <div className='gap'></div>
        <Resultados titulo='Favoritos' productos={[]}></Resultados>
    </div>
  )
}
