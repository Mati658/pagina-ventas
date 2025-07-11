import Producto from '../producto/Producto'
import './resultados.css'

type Props = {
    titulo:string,
    productos:any[],
}

export default function Resultados({titulo, productos}: Props) {

  return (
    <div className='container-resultados'>
        <h1 className='inter uppercase'>{titulo}</h1>
        <div className='productos'>
            {productos.map((item:any)=>(
                <div key={item.id}>
                    <span  className='line'></span>
                    <Producto producto={item}></Producto>
                </div>
            ))}
        </div>
    </div>
  )
}