import FormAlta from '../../components/formAlta/FormAlta'
import './alta.css'


export default function Alta() {
    return(
        <div className='container-page-alta'>
            <FormAlta productoEdit={null} onSubmit={()=>{}} sendProducto={()=>{}}></FormAlta>
        </div>
    )
}
