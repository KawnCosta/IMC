import { ThemeToggle } from '@/components/ThemeToggle'
import { SITE_NAME } from '@/site/config'

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <a href="/" className="text-base font-semibold underline-offset-4 hover:underline">
        {SITE_NAME}
      </a>
      <ThemeToggle />
    </header>
  )
}
