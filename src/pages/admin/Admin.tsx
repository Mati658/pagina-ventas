import { useNavigate } from 'react-router-dom';
import Productos from '../../components/productos/Productos'
import Resultados from '../../components/resultados/Resultados'
import { useAuth } from '../../context/AuthContext';
import './admin.css'
import { useEffect } from 'react';

export default function Admin() {
  const { getState } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
      verificarUsuario();
  },[])
  
  const verificarUsuario = async() =>{
      if (!await getState()) {
          navigate('/');
      }
  }

  return (
    <div className='container-page-admin'>
      <Resultados titulo='Pedidos en espera' productos={[]}></Resultados>
      <div className='gap'></div>
      <Productos titulo='Más vendidos' productos={[]}></Productos>
      <div className='gap'></div>
      <Resultados titulo='Todos los productos' productos={[]}></Resultados>
      <div className='gap'></div>
    </div>
  )
}
