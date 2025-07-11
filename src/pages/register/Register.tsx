import { useState } from 'react'
import './register.css'

export default function Register() {
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    return (
        <div className='container-page-registro'>
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
                <button className="submit">Registrar</button>
                <p className="signin">¿Ya tenés una cuenta? <a href="/login">Iniciar</a> </p>
            </form>
        </div>
    )
}
