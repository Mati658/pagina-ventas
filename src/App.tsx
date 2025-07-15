import { lazy, Suspense } from 'react'
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

function App() {

  const Home = lazy(()=>import('./pages/home/Home'));

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
