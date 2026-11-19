/**
 * Monta as tags do <head> de cada página (título, descrição, canonical, Open Graph).
 * TypeScript puro: usado pelo script de pré-renderização e pelo servidor de desenvolvimento.
 */
import { SITE_NAME } from './config.ts'
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

export function buildHeadTags(page: PageMeta, siteUrl: string): string {
  const title = escapeHtml(page.title)
  const description = escapeHtml(page.description)
  const url = escapeHtml(buildPageUrl(siteUrl, page))

  // A página 404 não deve ser indexada nem ter canonical: ela é servida em qualquer endereço inexistente.
  if (page.id === NOT_FOUND_PAGE.id) {
    return [`<title>${title}</title>`, `<meta name="robots" content="noindex" />`].join('\n    ')
  }

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
  ].join('\n    ')
}
