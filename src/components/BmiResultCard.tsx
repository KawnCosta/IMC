import type { Ref } from 'react'
import { RotateCcw, Share2 } from 'lucide-react'
import { BmiScale } from '@/components/BmiScale'
import { CATEGORY_STYLES } from '@/components/bmiCategoryStyles'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useShareResult, type ShareStatus } from '@/hooks/useShareResult'
import { trackEvent } from '@/lib/analytics'
import { formatNumber, type BmiResult } from '@/lib/bmi'
import { cn } from '@/lib/utils'

type BmiResultCardProps = {
  result: BmiResult
  cardRef?: Ref<HTMLElement>
  onReset: () => void
}

const SHARE_FEEDBACK: Record<ShareStatus, string> = {
  idle: '',
  shared: 'Resultado compartilhado.',
  copied: 'Copiado!',
  error: 'Não foi possível compartilhar. Tente copiar o resultado manualmente.',
}

export function BmiResultCard({ result, cardRef, onReset }: BmiResultCardProps) {
  const { bmi, category, healthyWeight } = result
  const { status, share } = useShareResult()
  const formattedBmi = formatNumber(bmi)

  function handleShare(): void {
    trackEvent('share_result')
    void share({
      title: 'Meu resultado de IMC',
      text: `Meu IMC é ${formattedBmi} kg/m² (${category.label.toLowerCase()}). Calcule o seu:`,
      url: window.location.href,
    })
  }

  return (
    <section ref={cardRef} aria-labelledby="result-title" className="scroll-mt-4">
      <Card>
        <CardHeader>
          <CardTitle id="result-title" className="text-xl">
            Seu resultado
          </CardTitle>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <p className="text-5xl font-bold tracking-tight tabular-nums">
              {formattedBmi} <span className="text-lg font-medium text-muted-foreground">kg/m²</span>
            </p>
            <p className={cn('rounded-full px-3 py-1 text-sm font-semibold', CATEGORY_STYLES[category.id].badge)}>
              {category.label}
            </p>
          </div>

          <p className="text-base">{category.description}</p>

          <BmiScale bmi={bmi} category={category} />

          <p className="text-base">
            Para a sua altura, a faixa de peso considerada adequada vai de{' '}
            <strong>{formatNumber(healthyWeight.min)} kg</strong> a <strong>{formatNumber(healthyWeight.max)} kg</strong>.
          </p>

          <p className="rounded-lg bg-muted p-3 text-sm text-foreground">
            O IMC é uma ferramenta de triagem, não um diagnóstico. Ele não mede a gordura corporal diretamente e não
            diferencia gordura de músculo. Para avaliar sua saúde, procure um profissional.
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-3 py-4">
          <Button type="button" variant="outline" size="lg" className="h-12 flex-1 text-base" onClick={onReset}>
            <RotateCcw aria-hidden="true" />
            Calcular novamente
          </Button>
          <Button type="button" size="lg" className="h-12 flex-1 text-base" onClick={handleShare}>
            <Share2 aria-hidden="true" />
            Compartilhar
          </Button>
          <p role="status" className="w-full text-center text-sm text-muted-foreground empty:hidden">
            {SHARE_FEEDBACK[status]}
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
