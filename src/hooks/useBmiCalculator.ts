import { useState } from 'react'
import { evaluateBmi, type BmiField, type BmiFieldErrors, type BmiResult } from '@/lib/bmi'

export type BmiFormValues = Record<BmiField, string>

export type CalculateOutcome =
  | { status: 'success'; result: BmiResult }
  | { status: 'invalid'; firstInvalidField: BmiField }

const EMPTY_VALUES: BmiFormValues = { weight: '', height: '' }

/** Ordem em que os campos aparecem na tela: define qual recebe o foco quando há erro. */
const FIELD_ORDER: readonly BmiField[] = ['weight', 'height']

export function useBmiCalculator() {
  const [values, setValues] = useState<BmiFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<BmiFieldErrors>({})
  const [result, setResult] = useState<BmiResult | null>(null)

  /** Editar um campo invalida o resultado anterior e o erro daquele campo. */
  function setFieldValue(field: BmiField, value: string): void {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setResult(null)
  }

  function calculate(): CalculateOutcome {
    const evaluation = evaluateBmi(values.weight, values.height)

    if (!evaluation.ok) {
      setErrors(evaluation.errors)
      setResult(null)
      const firstInvalidField = FIELD_ORDER.find((field) => evaluation.errors[field]) ?? 'weight'
      return { status: 'invalid', firstInvalidField }
    }

    setErrors({})
    setResult(evaluation.result)
    return { status: 'success', result: evaluation.result }
  }

  function reset(): void {
    setValues(EMPTY_VALUES)
    setErrors({})
    setResult(null)
  }

  return { values, errors, result, setFieldValue, calculate, reset }
}
