import { Trash2 } from 'lucide-react'
import { CATEGORY_STYLES } from '@/components/bmiCategoryStyles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BmiHistoryEntry } from '@/hooks/useBmiHistory'
import { formatNumber, getBmiCategory } from '@/lib/bmi'
import { cn } from '@/lib/utils'

type BmiHistoryProps = {
  entries: readonly BmiHistoryEntry[]
  onClear: () => void
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

export function BmiHistory({ entries, onClear }: BmiHistoryProps) {
  if (entries.length === 0) return null

  return (
    <section aria-labelledby="history-title">
      <Card>
        <CardHeader>
          <CardTitle id="history-title" className="text-xl">
            Seus últimos cálculos
          </CardTitle>
          <CardDescription>Salvos só neste navegador. Peso e altura não são guardados.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ol className="grid gap-2">
            {entries.map((entry) => {
              const category = getBmiCategory(entry.categoryId)
              return (
                <li key={entry.id} className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 last:border-b-0">
                  <time dateTime={entry.calculatedAt} className="text-sm text-muted-foreground">
                    {dateFormatter.format(new Date(entry.calculatedAt))}
                  </time>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold tabular-nums">{formatNumber(entry.bmi)}</span>
                    <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', CATEGORY_STYLES[category.id].badge)}>
                      {category.label}
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>
          <Button type="button" variant="outline" className="h-11 justify-self-start" onClick={onClear}>
            <Trash2 aria-hidden="true" />
            Apagar histórico
          </Button>
        </CardContent>
      </Card>
    </section>
  )
}
