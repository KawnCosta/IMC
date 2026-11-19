/**
 * Monta as tags do <head> de cada página (título, descrição, canonical, Open Graph).
 * TypeScript puro: usado pelo script de pré-renderização e pelo servidor de desenvolvimento.
 */
import { AUTHOR, SITE_NAME } from './config.ts'
import { NOT_FOUND_PAGE, type PageMeta } from './pages.ts'

export const HEAD_PLACEHOLDER = '<!--page-head-->'
export const APP_HTML_PLACEHOLDER = '<!--app-html-->'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

export function buildPageUrl(siteUrl: string, page: PageMeta): string {
  return `${siteUrl}${page.path}`
}

/**
 * Dados estruturados (schema.org) da calculadora. Ajudam o Google a entender a página; não garantem destaque.
 * Sem avaliações: notas inventadas violam as diretrizes do Google.
 */
function buildWebApplicationJsonLd(page: PageMeta, siteUrl: string): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    description: page.description,
    url: buildPageUrl(siteUrl, page),
    inLanguage: 'pt-BR',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    creator: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
  }
  // "<" escapado: nenhum texto do JSON consegue fechar a tag <script> antes da hora.
  const json = JSON.stringify(data).replaceAll('<', '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

export function buildHeadTags(page: PageMeta, siteUrl: string): string {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const url = escapeHtml(buildPageUrl(siteUrl, page))

  // A página 404 não deve ser indexada nem ter canonical: ela é servida em qualquer endereço inexistente.
  if (page.id === NOT_FOUND_PAGE.id) {
    return [`<title>${title}</title>`, `<meta name="robots" content="noindex" />`].join('\n    ')
  }

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
  ]
  if (page.id === 'home') tags.push(buildWebApplicationJsonLd(page, siteUrl))
  return tags.join('\n    ')
}
