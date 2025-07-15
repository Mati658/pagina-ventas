import { useEffect, useRef, useState } from 'react'
import './register.css'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../classes/Usuario';
import { useDatabase } from '../../context/DatabaseContext';

export default function Register() {
    const { register, getState } = useAuth();
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
        const User = new Usuario(nombre, apellido, email, [], [])

        const res : boolean = await register(User, password);

        if (res) {
            if(await altaDB('usuarios', User.toJson())){
                setMensaje('¡Verifique su casilla y confirme su mail!');
                abrirModal();
            };
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
            </form>
        </div>
    )
}
