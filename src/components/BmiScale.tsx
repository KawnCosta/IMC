import { CATEGORY_STYLES } from '@/components/bmiCategoryStyles'
import { BMI_CATEGORIES, formatNumber, type BmiCategory } from '@/lib/bmi'

const SCALE_MIN = 15
const SCALE_MAX = 40
const SCALE_SPAN = SCALE_MAX - SCALE_MIN

function clampToScale(value: number): number {
  return Math.min(Math.max(value, SCALE_MIN), SCALE_MAX)
}

function toPercent(value: number): number {
  return ((clampToScale(value) - SCALE_MIN) / SCALE_SPAN) * 100
}

/** Largura de cada faixa calculada a partir de BMI_CATEGORIES: mudar uma faixa atualiza a barra sozinha. */
function segmentWidthPercent(category: BmiCategory): number {
  return toPercent(category.max ?? SCALE_MAX) - toPercent(category.min)
}

/** Limites entre faixas (18,5, 25, 30) usados como marcações abaixo da barra. */
const BOUNDARIES = BMI_CATEGORIES.slice(1).map((category) => category.min)

type BmiScaleProps = {
  bmi: number
  category: BmiCategory
}

export function BmiScale({ bmi, category }: BmiScaleProps) {
  const markerPosition = toPercent(bmi)
  const description = `Escala de IMC de ${SCALE_MIN} a ${SCALE_MAX}. Seu valor, ${formatNumber(bmi)}, está em: ${category.label.toLowerCase()}.`

  return (
    <div role="img" aria-label={description} className="px-4 pt-7 pb-6">
      <div aria-hidden="true" className="relative">
        <div className="flex h-3 overflow-hidden rounded-full">
          {BMI_CATEGORIES.map((item) => (
            <div
              key={item.id}
              className={CATEGORY_STYLES[item.id].bar}
              style={{ width: `${segmentWidthPercent(item)}%` }}
            />
          ))}
        </div>

        <div
          className="absolute -top-7 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${markerPosition}%` }}
        >
          <span className="rounded bg-foreground px-1.5 py-0.5 text-xs font-semibold text-background tabular-nums">
            {formatNumber(bmi)}
          </span>
          <span className="h-5 w-0.5 bg-foreground" />
        </div>

        {BOUNDARIES.map((boundary) => (
          <span
            key={boundary}
            className="absolute top-4 -translate-x-1/2 text-xs text-muted-foreground tabular-nums"
            style={{ left: `${toPercent(boundary)}%` }}
          >
            {formatNumber(boundary)}
          </span>
        ))}
      </div>
    </div>
  )
}
