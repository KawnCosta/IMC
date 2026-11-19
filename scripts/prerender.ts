/**
 * Etapa final do `npm run build`: gera um HTML pronto para cada página.
 *
 * 1. Lê o dist/index.html gerado pelo Vite (com os <script> e <link> de CSS já apontando para os arquivos finais).
 * 2. Renderiza cada página com React (dist-server/entry-server.js) e injeta o HTML e as tags do <head>.
 * 3. Escreve uma pasta por página (dist/privacidade/index.html), o 404.html, o robots.txt e o sitemap.xml.
 * 4. Apaga o dist-server/: ele só serve para este script. O site publicado é apenas o dist/.
 *
 * Roda direto no Node (que entende TypeScript sem compilar), por isso os imports usam a extensão .ts.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'
import { APP_HTML_PLACEHOLDER, buildHeadTags, buildPageUrl, HEAD_PLACEHOLDER } from '../src/site/head.ts'
import { NOT_FOUND_PAGE, PAGES, type PageMeta } from '../src/site/pages.ts'

interface ServerEntry {
  renderPage: (page: PageMeta) => Promise<string>
}

const ROOT_DIR = path.resolve(import.meta.dirname, '..')
const CLIENT_DIR = path.join(ROOT_DIR, 'dist')
const SERVER_DIR = path.join(ROOT_DIR, 'dist-server')
const SERVER_ENTRY = path.join(SERVER_DIR, 'entry-server.js')

/**
 * O endereço público vem de VITE_SITE_URL (.env.production ou variáveis do host). Na Netlify, se ela não for
 * definida, usa-se URL, que a plataforma preenche com o endereço principal do site. Sem nenhum dos dois, o build para.
 */
function resolveSiteUrl(): string {
  const configuredUrl = loadEnv('production', ROOT_DIR, 'VITE_').VITE_SITE_URL || process.env.URL
  const siteUrl = configuredUrl?.trim().replace(/\/+$/, '')
  if (!siteUrl) {
    throw new Error(
      'Defina VITE_SITE_URL com o endereço público do site (ex.: VITE_SITE_URL=https://meu-site.netlify.app) ' +
        'no arquivo .env.production ou nas variáveis de ambiente do host.',
    )
  }
  if (!/^https?:\/\//.test(siteUrl)) throw new Error(`VITE_SITE_URL precisa começar com http:// ou https://: ${siteUrl}`)
  return siteUrl
}

/** "/" vira index.html, "/privacidade/" vira privacidade/index.html e "/404.html" continua 404.html. */
function outputFileFor(page: PageMeta): string {
  const relativePath = page.path.endsWith('/') ? `${page.path}index.html` : page.path
  return path.join(CLIENT_DIR, relativePath)
}

function injectIntoTemplate(template: string, headTags: string, appHtml: string): string {
  for (const placeholder of [HEAD_PLACEHOLDER, APP_HTML_PLACEHOLDER]) {
    if (!template.includes(placeholder)) throw new Error(`dist/index.html não contém ${placeholder}.`)
  }
  return template.replace(HEAD_PLACEHOLDER, headTags).replace(APP_HTML_PLACEHOLDER, appHtml)
}

function buildRobotsTxt(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
}

function buildSitemapXml(siteUrl: string): string {
  const urls = PAGES.map((page) => `  <url>\n    <loc>${buildPageUrl(siteUrl, page)}</loc>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function writeOutput(filePath: string, content: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, content)
  console.log(`  ${path.relative(ROOT_DIR, filePath)}`)
}

async function main(): Promise<void> {
  const siteUrl = resolveSiteUrl()
  const template = await readFile(path.join(CLIENT_DIR, 'index.html'), 'utf8')
  const { renderPage } = (await import(pathToFileURL(SERVER_ENTRY).href)) as ServerEntry

  console.log(`Pré-renderizando para ${siteUrl}:`)
  for (const page of [...PAGES, NOT_FOUND_PAGE]) {
    const appHtml = await renderPage(page)
    await writeOutput(outputFileFor(page), injectIntoTemplate(template, buildHeadTags(page, siteUrl), appHtml))
  }
  await writeOutput(path.join(CLIENT_DIR, 'robots.txt'), buildRobotsTxt(siteUrl))
  await writeOutput(path.join(CLIENT_DIR, 'sitemap.xml'), buildSitemapXml(siteUrl))
  await rm(SERVER_DIR, { recursive: true, force: true })
}

await main()
