/**
 * Medição de uso com Google Analytics 4, desligada por padrão.
 * Regra: os eventos nunca levam peso, altura nem resultado, que são dados de saúde de quem usa a página.
 */

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export type AnalyticsEvent = 'calculate_bmi' | 'share_result'

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? ''

export const isAnalyticsEnabled = MEASUREMENT_ID !== ''

/** Carrega o gtag.js. Chame uma vez, na inicialização da aplicação. */
export function initAnalytics(): void {
  if (!isAnalyticsEnabled || window.gtag) return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`
  document.head.appendChild(script)

  const dataLayer = (window.dataLayer ??= [])
  // O gtag.js espera o objeto `arguments`, não um array: por isso a função clássica em vez de arrow function.
  window.gtag = function gtag() {
    dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', MEASUREMENT_ID)
}

/** Registra que algo aconteceu, sem parâmetros: só o nome do evento. */
export function trackEvent(event: AnalyticsEvent): void {
  window.gtag?.('event', event)
}
