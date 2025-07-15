import Resultados from '../../components/resultados/Resultados'
import './perfil.css'

export default function Perfil() {
  return (
    <div className='container-page-perfil'>
        <Resultados titulo='Historial de compras' productos={[]}></Resultados>
        <div className='gap'></div>
        <Resultados titulo='Favoritos' productos={[]}></Resultados>
    </div>
  )
}
