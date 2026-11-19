import { BmiCategoriesTable } from '@/components/BmiCategoriesTable'
import { ExternalLink } from '@/components/ExternalLink'
import { INFO_SECTIONS, SOURCES, type SourceKey } from '@/content/bmiInfo'
import { formatIsoDate } from '@/lib/date'
import { LAST_UPDATED } from '@/site/config'

function SectionSources({ sourceKeys }: { sourceKeys: readonly SourceKey[] }) {
  if (sourceKeys.length === 0) return null

  return (
    <p className="text-sm text-muted-foreground">
      {sourceKeys.length === 1 ? 'Fonte: ' : 'Fontes: '}
      {sourceKeys.map((key, index) => (
        <span key={key}>
          {index > 0 && ', '}
          <ExternalLink href={SOURCES[key].url}>{SOURCES[key].shortLabel}</ExternalLink>
        </span>
      ))}
    </p>
  )
}

export function InfoSections() {
  return (
    <div className="grid gap-10">
      <p className="text-sm text-muted-foreground">
        Conteúdo revisado em <time dateTime={LAST_UPDATED.content}>{formatIsoDate(LAST_UPDATED.content)}</time>, com base
        nas fontes citadas em cada seção.
      </p>

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
          <SectionSources sourceKeys={section.sources} />
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
