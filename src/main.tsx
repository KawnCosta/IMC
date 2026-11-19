import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { findPageByPath } from '@/site/pages'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado no index.html.')

createRoot(container).render(
  <StrictMode>
    <App page={findPageByPath(window.location.pathname)} />
  </StrictMode>,
)
