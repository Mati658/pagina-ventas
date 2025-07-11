import { useEffect, useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import './categorias.css'
import { Link } from 'react-router-dom';

export default function Categorias() {

    const { getTabla} = useDatabase()
    const [categorias, setCategorias] = useState<any>([]);

    useEffect(()=>{
        getTabla('categorias', '*').then((res:any)=>{
            setCategorias(res)
        })
    },[])

    return (
        <div className='container-categorias'>
            <p className='titulo inter'>Categorías</p>
            {categorias.map((item:any)=>(
                <details key={item.categoria} className='container-etiquetas' open={true}>
                    
                    <summary className='inter'>{item.categoria}
                        <span className="icon">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'><path fillRule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>
                        </span>
                    </summary>
                    {item.etiquetas.map((etiqueta:string)=>(
                        <Link
                        key={etiqueta}
                        className='link'
                        to={`/productos/${item.categoria}/${etiqueta}`}>
                            <p className='inter' onClick={()=>{localStorage.setItem('categoria',item.categoria); localStorage.setItem('subCategoria',etiqueta)}}>{etiqueta}</p>
                        </Link>
                    ))}
                </details>
            ))}
        </div>
    )
}
