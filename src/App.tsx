
import { lazy, Suspense } from 'react'
import './App.css'
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'

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
        
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
   </>
  )
}

export default App
