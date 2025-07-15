import { useEffect } from 'react';
import FormAlta from '../../components/formAlta/FormAlta'
import './alta.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Alta() {
    const { getState } = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        verificarUsuario();
    },[])
    
    const verificarUsuario = async() =>{
        if (!await getState()) {
            navigate('/');
        }
    }
    return(
        <div className='container-page-alta'>
            <FormAlta productoEdit={null} onSubmit={()=>{}} sendProducto={()=>{}}></FormAlta>
        </div>
    )
}
