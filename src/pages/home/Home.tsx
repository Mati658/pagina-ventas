import Categorias from '../../components/categorias/Categorias';
import PanelPrincipal from '../../components/panel_principal/PanelPrincipal';
import Productos from '../../components/productos/Productos';
import './home.css';

export default function Home() {
  return (
    <div className='container-home'>
      <div className='categorias'>
        <Categorias></Categorias>
      </div>
      <div className='paneles'>
          <PanelPrincipal></PanelPrincipal>
          <div className='gap'></div>
          <Productos titulo='Favoritos' productos='favoritos'></Productos>
          <Productos titulo='Ofertas' productos='ofertas'></Productos>
          <Productos titulo='Recomendados' productos='recomendados'></Productos>
          <Productos titulo='Otros productos' productos='otros'></Productos>

          <div className='gap'></div>

      </div>
    </div>
  )
}
