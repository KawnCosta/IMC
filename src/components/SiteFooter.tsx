import { getPage } from '@/site/pages'

const FOOTER_LINKS = [
  { label: 'Calculadora', page: getPage('home') },
  { label: 'Privacidade', page: getPage('privacy') },
  { label: 'Termos de uso', page: getPage('terms') },
] as const

export function SiteFooter() {
  return (
    <footer className="mt-8 grid gap-3 border-t pt-6 text-sm text-muted-foreground">
      <nav aria-label="Links do rodapé">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {FOOTER_LINKS.map(({ label, page }) => (
            <li key={page.id}>
              <a href={page.path} className="underline underline-offset-4 hover:text-foreground">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p>Esta calculadora tem caráter informativo e não substitui a avaliação de um profissional de saúde.</p>
    </footer>
  )
}
