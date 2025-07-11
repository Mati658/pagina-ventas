import { useState } from 'react';
import './logins.css'

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className='container-page-login'>
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
            
                <button className="submit">Inciar Sesión</button>
                <p className="signin">¿No tenés una cuenta? <a href="/registro">Regsitrar</a> </p>
            </form>
        </div>
    )
}
