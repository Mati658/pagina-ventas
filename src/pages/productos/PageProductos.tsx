import { useLocation } from 'react-router-dom'
import Categorias from '../../components/categorias/Categorias'
import Resultados from '../../components/resultados/Resultados'
import './pageProductos.css'

export default function PageProductos() {
    const location = useLocation();

  return (
    <div className='container-page-productos'>
        <label className='inter'>{location.pathname.split('/')[3] ? (`${location.pathname.split('/')[2]} - ${location.pathname.split('/')[3]}`) : `${location.pathname.split('/')[2]}`} </label>
        <div className='categorias'>
            <Categorias></Categorias>
        </div>
        <div className='paneles'>
            <Resultados titulo={location.pathname.split('/')[3] ? location.pathname.split('/')[3] : location.pathname.split('/')[2]} productos=''></Resultados>
        </div>
    </div>
  )
}
