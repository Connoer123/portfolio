import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // Make sure this matches the filename exactly

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)