import { useEffect, useRef, useState } from 'react';
import './login.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login, loginWithGoogle, getState } = useAuth()
    const navigate = useNavigate();


    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [mensaje, setMensaje] = useState('');

    useEffect(()=>{
        verificarUsuario();
    },[])

    const verificarUsuario = async() =>{
        if (await getState()) {
            navigate('/');
        }
    }

    const loguear = async () =>{
        if (!await login(email, password)) {
            setMensaje('Mail o Contraseña incorrectos');
            abrirModal();
            return
        }
        
        navigate('/');
    }

    const loguearWithGoogle = async () =>{
        if (!await loginWithGoogle()) {
            setMensaje('Error al ingresar con Google');
            abrirModal();
            return
        }
    }
    
    const abrirModal = () => {
        dialogRef.current?.showModal();
    };

    const cerrarModal = () => {
        dialogRef.current?.close();
    };

    return (
        <div className='container-page-login'>

            <dialog ref={dialogRef} className='msj-error'>
                <p>{mensaje}</p>
                <button onClick={cerrarModal}>Continuar</button>
            </dialog>


            <form className="form">
                <p className="title inter">Iniciar sesión</p>

                <p className="message inter">¡Inicia sesión para poder comprar! </p>
                        
                <label>
                    <input required={true} placeholder="" type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <span>Email</span>
                </label> 
                    
                <label>
                    <input required={true} placeholder="" type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <span>Contraseña</span>
                </label>
            
                <button className="submit" type='button' onClick={loguear}>Inciar Sesión</button>
                <p className="signin">¿No tenés una cuenta? <a href="/registro">Regsitrar</a> </p>
                <button className="submit" type='button' onClick={loguearWithGoogle}>Iniciar sesión con Google</button>
            </form>
        </div>
    )
}
