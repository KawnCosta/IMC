import { isAnalyticsEnabled } from '@/lib/analytics'

export function SiteFooter() {
  return (
    <footer className="mt-8 grid gap-2 border-t pt-6 text-sm text-muted-foreground">
      <p>Esta calculadora tem caráter informativo e não substitui a avaliação de um profissional de saúde.</p>
      {isAnalyticsEnabled && (
        <p>
          Privacidade: o peso e a altura que você digita ficam só no seu navegador e não são enviados a nenhum servidor.
          Usamos o Google Analytics para contar visitas e cálculos realizados, sem os valores informados.
        </p>
      )}
    </footer>
  )
}
