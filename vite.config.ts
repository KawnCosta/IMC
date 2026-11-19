import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const SITE_URL_PLACEHOLDER = '__SITE_URL__'
const DEV_SITE_URL = 'http://localhost:5173'

function buildRobotsTxt(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

function buildSitemapXml(siteUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`
}

/**
 * O endereço do site vem de um único lugar (VITE_SITE_URL): ele preenche canonical/Open Graph
 * no index.html e gera robots.txt e sitemap.xml no build. Assim não sobra "SEU-DOMINIO" em produção.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    transformIndexHtml(html) {
      return html.replaceAll(SITE_URL_PLACEHOLDER, siteUrl)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemapXml(siteUrl) })
    },
  }
}

function resolveSiteUrl(command: 'build' | 'serve', mode: string): string {
  const configured = loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL?.trim().replace(/\/+$/, '')
  if (configured) return configured
  if (command === 'serve') return DEV_SITE_URL
  throw new Error(
    'Defina VITE_SITE_URL com o endereço público do site (ex.: VITE_SITE_URL=https://meu-site.vercel.app) ' +
      'no arquivo .env.production ou nas variáveis de ambiente do host.',
  )
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), tailwindcss(), seoFiles(resolveSiteUrl(command, mode))],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
}))
