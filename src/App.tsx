import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import PageProductos from './pages/productos/PageProductos';
import PageProducto from './pages/producto/PageProducto';
import Perfil from './pages/perfil/Perfil';
import Admin from './pages/admin/Admin';
import Alta from './pages/alta/Alta';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { Usuario } from './classes/Usuario';
import { useDatabase } from './context/DatabaseContext';
import { useAuth } from './context/AuthContext';

function App() {
  const { altaDB, getUno } = useDatabase()
  let { usuario } = useAuth()
  const [usuarioCreado, setUsuarioCreado] = useState(false);

  const Home = lazy(()=>import('./pages/home/Home'));

  useEffect(()=>{
    if (!usuario || usuarioCreado) return;

    console.log(usuario)
    if (usuario) {
      getUno('usuarios', '*', 'mail', usuario.identity_data.email).then((res:any)=>{
        console.log(res)
        if (res.length == 0) {
          const User = new Usuario(usuario.identity_data.full_name, usuario.identity_data.email, [], [])
          altaDB('usuarios', User.toJson())
        }
      })
    }

    setUsuarioCreado(true);

  },[usuario, usuarioCreado])


  return (
   <>
    <div className="app">
      <Suspense fallback={<div>Cargando...</div>}>
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos/:categoria/:prod" element={<PageProductos />} />
            <Route path="/productos/:categoria" element={<PageProductos />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/alta" element={<Alta />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            
            {/* agregar el id en el path */}
            <Route path="/producto/:id/:prod" element={<PageProducto />} />
        
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
   </>
  )
}

export default App
