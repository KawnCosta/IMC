import { ExternalLink } from 'lucide-react'
import { BmiCategoriesTable } from '@/components/BmiCategoriesTable'
import { INFO_SECTIONS, SOURCES } from '@/content/bmiInfo'

export function InfoSections() {
  return (
    <div className="grid gap-10">
      {INFO_SECTIONS.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="grid gap-3">
          <h2 id={`${section.id}-title`} className="text-2xl font-semibold tracking-tight">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
          {section.showCategoriesTable && <BmiCategoriesTable />}
        </section>
      ))}

      <section id="fontes" aria-labelledby="fontes-title" className="grid gap-3">
        <h2 id="fontes-title" className="text-2xl font-semibold tracking-tight">
          Fontes
        </h2>
        <ul className="grid gap-2">
          {Object.values(SOURCES).map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base underline underline-offset-4 hover:text-foreground/70"
              >
                {source.label}
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
