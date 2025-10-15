import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Admin from './Admin'

const container = document.getElementById('root')!
const root = createRoot(container)

// Check if we're on the admin page
const isAdminPage = window.location.pathname === '/admin' || window.location.hash === '#/admin'

root.render(
  <React.StrictMode>
    {isAdminPage ? <Admin /> : <App />}
  </React.StrictMode>
)
