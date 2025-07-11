import { useLocation } from 'react-router-dom'
import Categorias from '../../components/categorias/Categorias'
import Resultados from '../../components/resultados/Resultados'
import './pageProductos.css'
import { useDatabase } from '../../context/DatabaseContext';
import { useEffect, useState } from 'react';

export default function PageProductos() {
    const location = useLocation();

    const { getByCategoria } = useDatabase()
    const [listaProductos, setListaProductos] = useState<any[]>([]);

    useEffect(()=>{
        getByCategoria('productos', 'id, nombre, foto, precio', localStorage.getItem('categoria'), localStorage.getItem('subCategoria')).then((res:any)=>{
            setListaProductos(res)
        })
    },[location])

  return (
    <div className='container-page-productos'>
        <label className='inter'>{decodeURIComponent(location.pathname.split('/')[3]).normalize() ? (`${decodeURIComponent(location.pathname.split('/')[2]).normalize()} - ${decodeURIComponent(location.pathname.split('/')[3]).normalize()}`) : `${location.pathname.split('/')[2]}`} </label>
        <div className='categorias'>
            <Categorias></Categorias>
        </div>
        <div className='paneles'>
            <Resultados titulo={decodeURIComponent(location.pathname.split('/')[3]).normalize() ? decodeURIComponent(location.pathname.split('/')[3]).normalize() : decodeURIComponent(location.pathname.split('/')[2]).normalize()} productos={listaProductos}></Resultados>
        </div>
    </div>
  )
}
