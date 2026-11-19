import type { ReactNode } from 'react'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { TermsPage } from '@/pages/TermsPage'
import type { PageId, PageMeta } from '@/site/pages'

const PAGE_COMPONENTS: Record<PageId, () => ReactNode> = {
  home: HomePage,
  privacy: PrivacyPage,
  terms: TermsPage,
  notFound: NotFoundPage,
}

type AppProps = {
  page: PageMeta
}

/** Cada URL é um HTML próprio, ligado por <a href>: sem biblioteca de rotas, a página vem da URL. */
function App({ page }: AppProps) {
  const Page = PAGE_COMPONENTS[page.id]

  return (
    <div className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-6">
      <SiteHeader />
      <main className="flex flex-col gap-6">
        <Page />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
