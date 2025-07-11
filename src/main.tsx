import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { DatabaseProvider } from './context/DatabaseContext.tsx'
import StorageProvider from './context/StorageContext.tsx'
import LoaderProvider from './context/LoaderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <DatabaseProvider>
        <StorageProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
        </StorageProvider>
      </DatabaseProvider>
    </AuthProvider>
  </React.StrictMode>,
)
