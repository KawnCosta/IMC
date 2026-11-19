/**
 * Lista de páginas do site: uma URL por intenção de busca, cada uma com título e descrição próprios.
 * TypeScript puro (sem React), para ser usada também no build e no sitemap.
 */

export type PageId = 'home' | 'privacy' | 'terms' | 'notFound'

export interface PageMeta {
  id: PageId
  /** Caminho público, sempre terminando em "/" (cada página vira uma pasta com index.html). */
  path: string
  title: string
  description: string
}

export const PAGES: readonly PageMeta[] = [
  {
    id: 'home',
    path: '/',
    title: 'Calculadora de IMC online gratuita — resultado e classificação',
    description:
      'Calcule seu IMC grátis: informe peso e altura e veja a classificação para adultos, a faixa de peso adequada e o que o resultado significa.',
  },
  {
    id: 'privacy',
    path: '/privacidade/',
    title: 'Política de privacidade — Calculadora de IMC',
    description:
      'Saiba o que a Calculadora de IMC guarda (só IMC, faixa e data, no seu navegador), o que nunca é enviado e como apagar o histórico.',
  },
  {
    id: 'terms',
    path: '/termos/',
    title: 'Termos de uso — Calculadora de IMC',
    description:
      'Termos de uso da Calculadora de IMC: ferramenta informativa de triagem para adultos, que não substitui a avaliação de um profissional de saúde.',
  },
]

/** Página servida para endereços que não existem (vira 404.html no build). Não entra no sitemap. */
export const NOT_FOUND_PAGE: PageMeta = {
  id: 'notFound',
  path: '/404.html',
  title: 'Página não encontrada — Calculadora de IMC',
  description: 'O endereço acessado não existe. Volte para a Calculadora de IMC.',
}

/** "/privacidade", "/privacidade/" e "/privacidade/index.html" levam à mesma página. */
export function normalizePath(pathname: string): string {
  const withoutIndex = pathname.replace(/index\.html$/, '')
  return withoutIndex.endsWith('/') ? withoutIndex : `${withoutIndex}/`
}

export function findPageByPath(pathname: string): PageMeta {
  const path = normalizePath(pathname)
  return PAGES.find((page) => page.path === path) ?? NOT_FOUND_PAGE
}

export function getPage(id: Exclude<PageId, 'notFound'>): PageMeta {
  const page = PAGES.find((item) => item.id === id)
  if (!page) throw new Error(`Página desconhecida: ${id}`)
  return page
}
