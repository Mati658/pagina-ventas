// src/context/AuthContext.jsx
import { Usuario } from '../classes/Usuario';
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// =================================================PROD==============================================
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
// ==================================================DEV==============================================
// import { environment } from '../../env/environment.prod'; const supabase = createClient(environment.VITE_SUPABASE_URL, environment.VITE_SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface AuthContextType {
    usuario: any;
    login:(email:string,password:string) => Promise<boolean>;
    loginWithGoogle:() => Promise<boolean>;
    register:(usuario:Usuario,password:string) =>Promise<boolean>;
    signOut: () => Promise<void>;
    getState:() => Promise<boolean>;
    decodeJWT:(token:string) => {header:any, payload:any};
    flagLogin:boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [flagLogin, setFlagLogin] = useState(false);

  const getState = async () => {
    const { data } = await supabase.auth.getUserIdentities();
    const identity : any = data?.identities?.[0];
    console.log(identity)
    if (identity) {
      setUsuario(identity);
      setFlagLogin(true);
      // console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
      return true;
    }
    setFlagLogin(false);
    return false
  };

  const login = async (email:string, password:string) =>{    
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      console.log(error)
      return false;
    }
    
    // console.log(data.user?.email)
    if (data.user?.email) {
      getState();
    }
    return true;
  }

  const loginWithGoogle = async () =>{    
    let { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
    })
    if (error) {
      console.log(error)
      return false;
    }
    
    if (data.provider) {
      getState();
    }
    return true;
  }

  const register = async (usuario:Usuario, password:string) =>{    
    let { data, error } = await supabase.auth.signUp({
      email: usuario.mail,
      password: password,
    })
    if (error) {
      console.log(error)
      return false;
    }
    
    // console.log(data.user?.email)

    if (data.user?.email) {
      localStorage.setItem('usuario', data.user.email);
    }
    return true;
  }

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('usuario');
    window.location.reload();
  };

  const decodeJWT = (token:string) =>{
    const partes = token.split('.');
    if(partes.length != 3){
      throw new Error("Token inválido!!");
    }
    const header = JSON.parse(atob(partes[0]))
    const payload = JSON.parse(atob(partes[1]))
    setUsuario({header,payload})
    return {header,payload}
  }

  useEffect(() => {
    getState();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        getState,
        login,
        loginWithGoogle,
        register,
        decodeJWT,
        signOut,
        flagLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Error context useAuth");
    return context;
};