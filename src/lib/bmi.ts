/**
 * Regras de negócio do IMC (Índice de Massa Corporal) para adultos.
 * Este arquivo não depende de React: pode ser testado e reaproveitado sozinho.
 * Faixas segundo a OMS: https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight
 */

export const INPUT_LIMITS = {
  weight: { min: 20, max: 350, unit: 'kg' },
  height: { min: 0.8, max: 2.5, unit: 'm' },
} as const

/** Valores nesta faixa no campo de altura quase sempre são centímetros digitados por engano. */
const LIKELY_CENTIMETERS = { min: 80, max: 250 } as const

/** O IMC é exibido com 1 casa decimal; esse é o menor passo entre dois valores exibidos. */
export const BMI_STEP = 0.1

export type BmiCategoryId = 'underweight' | 'healthy' | 'overweight' | 'obesity'

export interface BmiCategory {
  id: BmiCategoryId
  label: string
  description: string
  /** Limite inferior inclusivo (kg/m²). */
  min: number
  /** Limite superior exclusivo (kg/m²); `null` quando a faixa não tem teto. */
  max: number | null
}

export const BMI_CATEGORIES: readonly BmiCategory[] = [
  {
    id: 'underweight',
    label: 'Baixo peso',
    description:
      'O valor está abaixo da faixa usada como referência para adultos. Vale conversar com um profissional de saúde para entender o contexto.',
    min: 0,
    max: 18.5,
  },
  {
    id: 'healthy',
    label: 'Faixa considerada adequada',
    description:
      'O valor está dentro da faixa usada como referência para adultos. O IMC é só um dos indicadores de saúde.',
    min: 18.5,
    max: 25,
  },
  {
    id: 'overweight',
    label: 'Sobrepeso',
    description:
      'O valor está acima da faixa de referência. Outros fatores, como massa muscular e hábitos, ajudam a interpretar o resultado.',
    min: 25,
    max: 30,
  },
  {
    id: 'obesity',
    label: 'Obesidade',
    description:
      'O valor está na faixa de obesidade. Um profissional de saúde pode avaliar o resultado junto com outros exames e indicadores.',
    min: 30,
    max: null,
  },
]

export type ValidationResult = { ok: true; value: number } | { ok: false; error: string }

export interface WeightRange {
  min: number
  max: number
}

export interface BmiResult {
  bmi: number
  category: BmiCategory
  healthyWeight: WeightRange
}

export type BmiField = 'weight' | 'height'

export type BmiFieldErrors = Partial<Record<BmiField, string>>

export type BmiEvaluation = { ok: true; result: BmiResult } | { ok: false; errors: BmiFieldErrors }

const DECIMAL_PATTERN = /^\d+([.,]\d+)?$/

/** Converte "1,80" ou "1.80" em 1.8. Retorna `null` para qualquer texto que não seja um número positivo simples. */
export function parseDecimal(raw: string): number | null {
  const trimmed = raw.trim()
  if (!DECIMAL_PATTERN.test(trimmed)) return null
  return Number(trimmed.replace(',', '.'))
}

function isNegativeNumber(raw: string): boolean {
  return /^-\s*\d/.test(raw.trim())
}

export function validateWeight(raw: string): ValidationResult {
  const { min, max, unit } = INPUT_LIMITS.weight
  if (raw.trim() === '') return { ok: false, error: 'Informe seu peso.' }
  if (isNegativeNumber(raw)) return { ok: false, error: 'O peso não pode ser negativo.' }

  const value = parseDecimal(raw)
  if (value === null) return { ok: false, error: 'Digite o peso só com números, por exemplo 72,5.' }
  if (value < min || value > max) {
    return { ok: false, error: `Informe um peso entre ${formatNumber(min, 0)} e ${formatNumber(max, 0)} ${unit}.` }
  }
  return { ok: true, value }
}

export function validateHeight(raw: string): ValidationResult {
  const { min, max, unit } = INPUT_LIMITS.height
  if (raw.trim() === '') return { ok: false, error: 'Informe sua altura.' }
  if (isNegativeNumber(raw)) return { ok: false, error: 'A altura não pode ser negativa.' }

  const value = parseDecimal(raw)
  if (value === null) return { ok: false, error: 'Digite a altura só com números, por exemplo 1,75.' }
  if (value >= LIKELY_CENTIMETERS.min && value <= LIKELY_CENTIMETERS.max) {
    const meters = formatNumber(value / 100, 2)
    return { ok: false, error: `Parece que a altura está em centímetros. Use metros: ${meters} em vez de ${raw.trim()}.` }
  }
  if (value < min || value > max) {
    return {
      ok: false,
      error: `Informe uma altura entre ${formatNumber(min, 2)} e ${formatNumber(max, 2)} ${unit}.`,
    }
  }
  return { ok: true, value }
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10
}

/** IMC = peso (kg) / altura (m)², arredondado para 1 casa decimal. */
export function calculateBmi(weightKg: number, heightM: number): number {
  return roundToOneDecimal(weightKg / (heightM * heightM))
}

/**
 * Recebe o IMC já arredondado: assim a faixa sempre bate com o número exibido
 * (24,96 vira 25,0 e é classificado como sobrepeso, não como faixa adequada).
 */
export function classifyBmi(bmi: number): BmiCategory {
  const category = BMI_CATEGORIES.find((item) => bmi >= item.min && (item.max === null || bmi < item.max))
  if (!category) throw new RangeError(`IMC fora das faixas conhecidas: ${bmi}`)
  return category
}

export function getBmiCategory(id: BmiCategoryId): BmiCategory {
  const category = BMI_CATEGORIES.find((item) => item.id === id)
  if (!category) throw new Error(`Faixa de IMC desconhecida: ${id}`)
  return category
}

/** Maior IMC exibível que ainda pertence à faixa (ex.: 24,9 na faixa adequada). */
export function highestDisplayedBmi(category: BmiCategory): number | null {
  return category.max === null ? null : roundToOneDecimal(category.max - BMI_STEP)
}

/** Faixa de peso em que o IMC fica entre 18,5 e 24,9 para a altura informada. */
export function healthyWeightRange(heightM: number): WeightRange {
  const healthy = getBmiCategory('healthy')
  const highestHealthyBmi = highestDisplayedBmi(healthy) ?? healthy.min
  const squaredHeight = heightM * heightM
  return {
    min: roundToOneDecimal(healthy.min * squaredHeight),
    max: roundToOneDecimal(highestHealthyBmi * squaredHeight),
  }
}

/** Formata no padrão brasileiro: 24.7 vira "24,7". */
export function formatNumber(value: number, fractionDigits = 1): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}

/** Texto da faixa para tabelas e legendas: "Abaixo de 18,5", "18,5 a 24,9", "30,0 ou mais". */
export function formatCategoryRange(category: BmiCategory): string {
  const highest = highestDisplayedBmi(category)
  if (category.min === 0 && category.max !== null) return `Abaixo de ${formatNumber(category.max)}`
  if (highest === null) return `${formatNumber(category.min)} ou mais`
  return `${formatNumber(category.min)} a ${formatNumber(highest)}`
}

/** Junta validação, cálculo e classificação: transforma os dois textos digitados em um resultado. */
export function evaluateBmi(rawWeight: string, rawHeight: string): BmiEvaluation {
  const weight = validateWeight(rawWeight)
  const height = validateHeight(rawHeight)

  if (!weight.ok || !height.ok) {
    const errors: BmiFieldErrors = {}
    if (!weight.ok) errors.weight = weight.error
    if (!height.ok) errors.height = height.error
    return { ok: false, errors }
  }

  const bmi = calculateBmi(weight.value, height.value)
  return {
    ok: true,
    result: {
      bmi,
      category: classifyBmi(bmi),
      healthyWeight: healthyWeightRange(height.value),
    },
  }
}
