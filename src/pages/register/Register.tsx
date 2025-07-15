import { useEffect, useRef, useState } from 'react'
import './register.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../classes/Usuario';
import { useDatabase } from '../../context/DatabaseContext';

export default function Register() {
    const { register, loginWithGoogle, getState } = useAuth();
    const { altaDB } = useDatabase();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    
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

    const registrar = async () =>{
        if (!verificar()) {
            setMensaje('Las Contraseñas no coinciden');
            abrirModal();
            return
        }
        const User = new Usuario(`${nombre} ${apellido}` , email, [], [])

        const res : boolean = await register(User, password);

        if (res) {
            if(await altaDB('usuarios', User.toJson())){
                setMensaje('¡Verifique su casilla y confirme su mail!');
                abrirModal();
            };
        }
    }

    const loguearWithGoogle = async () =>{
        if (!await loginWithGoogle()) {
            setMensaje('Error al ingresar con Google');
            abrirModal();
            return
        }
    }

    const verificar = () => {
        if (password === confirmPassword) {
            return true;
        }
        return false;
    }

     const abrirModal = () => {
        dialogRef.current?.showModal();
    };

    const cerrarModal = () => {
        dialogRef.current?.close();
    };

    return (
        <div className='container-page-registro'>
            
            <dialog ref={dialogRef} className='msj-error'>
                <p>{mensaje}</p>
                <button onClick={cerrarModal}>Continuar</button>
            </dialog>

            <form className="form">
                <p className="title inter">Registrar</p>

                <p className="message inter">¡Inicia sesión para poder comprar! </p>
                <div className="flex">
                    <label>
                        <input required={true} placeholder="" type="text" className="input" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                        <span>Nombre</span>
                    </label>

                    <label>
                        <input required={true} placeholder="" type="text" className="input" value={apellido} onChange={(e)=>setApellido(e.target.value)}/>
                        <span>Apellido</span>
                    </label>
                </div>  
                        
                <label>
                    <input required={true} placeholder="" type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <span>Email</span>
                </label> 
                    
                <label>
                    <input required={true} placeholder="" type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <span>Contraseña</span>
                </label>
                <label>
                    <input required={true} placeholder="" type="password" className="input" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <span>Confirmar Contraseña</span>
                </label>
                <button className="submit" type='button' onClick={registrar}>Registrar</button>
                <p className="signin">¿Ya tenés una cuenta? <a href="/login">Iniciar</a> </p>

                <button className="button" type='button' onClick={loguearWithGoogle}>
                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
                    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                    </svg>
                    Iniciar sesión con Google
                </button>
            </form>
        </div>
    )
}
