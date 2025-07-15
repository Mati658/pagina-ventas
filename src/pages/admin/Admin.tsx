import Productos from '../../components/productos/Productos'
import Resultados from '../../components/resultados/Resultados'
import './admin.css'

export default function Admin() {
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
