import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { APP_HTML_PLACEHOLDER, buildHeadTags, HEAD_PLACEHOLDER } from './src/site/head.ts'
import { findPageByPath } from './src/site/pages.ts'

const DEV_SITE_URL = 'http://localhost:5173'

/**
 * Só no `npm run dev`: preenche o <head> com os dados da página acessada.
 * No build, quem faz isso é scripts/prerender.ts, junto com o HTML de cada página.
 */
function devPageHead(): Plugin {
  return {
    name: 'dev-page-head',
    apply: 'serve',
    transformIndexHtml(html, context) {
      const page = findPageByPath(new URL(context.originalUrl ?? context.path, DEV_SITE_URL).pathname)
      return html
        .replace(HEAD_PLACEHOLDER, buildHeadTags(page, DEV_SITE_URL))
        .replace(APP_HTML_PLACEHOLDER, '')
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devPageHead()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
