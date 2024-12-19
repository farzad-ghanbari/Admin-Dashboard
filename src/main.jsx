import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './contextes/app-contextes.jsx'



createRoot(document.getElementById('root')).render(
      <AppProvider>
            <App />
      </AppProvider>



)
