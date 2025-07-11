import Producto from '../producto/Producto'
import './resultados.css'

type Props = {
    titulo:string,
    productos:string,
}

export default function Resultados({titulo, productos}: Props) {
    let res = [
        {prod:'Motorola G8', precio:'130.000', img:'/temp/2.png'}
    ]
  return (
    <div className='container-resultados'>
        <h1 className='inter uppercase'>{titulo}</h1>
        <div className='productos'>
            {res.map((item:any)=>(
                <>
                    <span key={item.id} className='line'></span>
                    <Producto key={item.id} producto={item}></Producto>
                </>
            ))}
        </div>
    </div>
  )
}