import type { ReactNode } from 'react'
import { formatIsoDate } from '@/lib/date'

type ProsePageProps = {
  title: string
  /** Data ISO exibida como "Última atualização". */
  updatedAt?: string
  children: ReactNode
}

/** Layout das páginas de texto (privacidade, termos, sobre): um <h1> e seções com <h2>. */
export function ProsePage({ title, updatedAt, children }: ProsePageProps) {
  return (
    <article className="grid gap-8">
      <header className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {updatedAt && (
          <p className="text-sm text-muted-foreground">
            Última atualização: <time dateTime={updatedAt}>{formatIsoDate(updatedAt)}</time>
          </p>
        )}
      </header>
      <div className="grid gap-8 text-base leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_li]:ml-5 [&_li]:list-disc [&_section]:grid [&_section]:gap-3 [&_ul]:grid [&_ul]:gap-1">
        {children}
      </div>
    </article>
  )
}
