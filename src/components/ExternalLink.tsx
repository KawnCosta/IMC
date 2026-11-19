import type { ReactNode } from 'react'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ExternalLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

/** Link para outro site: abre em nova aba, sem dar acesso à nossa janela, e avisa o leitor de tela. */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground/70', className)}
    >
      {children}
      <ExternalLinkIcon aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}
