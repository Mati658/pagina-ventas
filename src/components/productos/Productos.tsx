import { Link } from 'react-router-dom'
import './productos.css'

type Props = {
    titulo:string,
    productos:string,
}

export default function Productos({titulo, productos}: Props) {
    let res = ["/temp/1.png", "/temp/2.png", "/temp/3.png"] //Obtener la lista de productos con el string de productos
    return (
        <div className='productos'>
            <div className='container-text'>
                <label className='titulo inter'>{titulo}</label>
                <Link className='link' to={`/productos/${titulo}`}>
                    <label className='ver-todo inter'>Ver todo ➜</label>
                </Link>
            </div>  
            <div className='container-productos'>
                <div className='fila-producto'>
                    {res && res.map(item=>(
                        <img src={item} className='img-prodcuto'/>
                    ))}
                </div>
            </div>
        </div>
    )
}