import './categorias.css'
import { Link } from 'react-router-dom';

export default function Categorias() {

    let res =[
        {categoria:'Tecnologia', etiquetas:["Celulares", "Camaras", "Notebook", "CPU", "GPU", "RAM", "Mothers", "Fuentes"]},
        {categoria:'Ropa', etiquetas:['Camperas', 'Remeras', 'Camisas', 'Gorras', 'Buzos', 'Zapatillas', 'Pantalones']}
    ]

    return (
        <div className='container-categorias'>
            <p className='titulo inter'>Categorías</p>
            {res.map((item:any)=>(
                <details className='container-etiquetas' open={true}>
                    
                    <summary className='inter'>{item.categoria}
                        <span className="icon">
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/></svg>
                        </span>
                    </summary>
                    {item.etiquetas.map((etiqueta:string)=>(
                        <Link
                        className='link'
                        to={`/productos/${item.categoria}/${etiqueta}`}>
                            <p className='inter'>{etiqueta}</p>
                        </Link>
                    ))}
                </details>
            ))}
        </div>
    )
}
