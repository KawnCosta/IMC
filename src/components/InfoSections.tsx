import { BmiCategoriesTable } from '@/components/BmiCategoriesTable'
import { ExternalLink } from '@/components/ExternalLink'
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
              <ExternalLink href={source.url}>{source.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
