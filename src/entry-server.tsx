/**
 * Ponto de entrada do build de pré-renderização (vite build --ssr).
 * Roda no Node, durante o build: aqui não existem window, document nem localStorage.
 */
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import App from '@/App'
import type { PageMeta } from '@/site/pages'

async function streamToString(stream: AsyncIterable<string | Uint8Array>): Promise<string> {
  const decoder = new TextDecoder()
  let html = ''
  for await (const chunk of stream) {
    html += typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true })
  }
  return html + decoder.decode()
}

/** Gera o HTML da página esperando todo o conteúdo ficar pronto, como pede a geração de site estático. */
export async function renderPage(page: PageMeta): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <App page={page} />
    </StrictMode>,
  )
  return streamToString(prelude)
}
