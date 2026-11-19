/**
 * Dados do site num só lugar. TypeScript puro, sem React e sem o alias "@/":
 * também é importado pelo vite.config.ts e pelo script de pré-renderização.
 */

export const SITE_NAME = 'Calculadora de IMC'

export const AUTHOR = {
  name: 'Kawn Costa',
  url: 'https://github.com/KawnCosta',
} as const

export const REPOSITORY_URL = 'https://github.com/KawnCosta/IMC'

/** Canal de contato público. Troque por um e-mail criado só para o projeto, se preferir. */
export const CONTACT = {
  label: 'abrir uma issue no GitHub do projeto',
  url: `${REPOSITORY_URL}/issues`,
} as const

/**
 * Provedor de hospedagem, citado na política de privacidade. Preencha ao escolher o host:
 * ex.: { name: 'Vercel', privacyUrl: 'https://vercel.com/legal/privacy-policy' }.
 */
export const HOSTING_PROVIDER: { name: string; privacyUrl: string } | null = null

/** Datas em ISO (AAAA-MM-DD). Atualize sempre que o texto correspondente mudar. */
export const LAST_UPDATED = {
  about: '2026-11-19',
  privacy: '2026-11-19',
  terms: '2026-11-19',
} as const
