import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { findPageById, findPageByPath, type PageMeta } from '@/site/pages'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado no index.html.')

/** HTML gerado no build, se houver. No `npm run dev` o #root chega vazio. */
const prerenderedRoot = container.firstElementChild instanceof HTMLElement ? container.firstElementChild : null

/**
 * Com HTML pronto, a página é a que o build gerou (data-page-id), não a deduzida pela URL:
 * alguns hosts entregam o index.html para endereços desconhecidos, e o primeiro render precisa
 * ser idêntico ao HTML recebido para a hidratação funcionar.
 */
function resolvePage(): PageMeta {
  return findPageById(prerenderedRoot?.dataset.pageId) ?? findPageByPath(window.location.pathname)
}

const app = (
  <StrictMode>
    <App page={resolvePage()} />
  </StrictMode>
)

if (prerenderedRoot) {
  // hydrateRoot reaproveita o HTML pronto em vez de recriá-lo.
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
