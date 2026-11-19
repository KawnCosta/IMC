import { useEffect, useRef } from 'react'
import { BmiForm, type BmiInputRefs } from '@/components/BmiForm'
import { BmiResultCard } from '@/components/BmiResultCard'
import { useBmiCalculator } from '@/hooks/useBmiCalculator'
import { formatNumber, type BmiResult } from '@/lib/bmi'

function describeResult(result: BmiResult | null): string {
  if (!result) return ''
  return `Seu IMC é ${formatNumber(result.bmi)}: ${result.category.label.toLowerCase()}.`
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function App() {
  const { values, errors, result, setFieldValue, calculate, reset } = useBmiCalculator()
  const resultRef = useRef<HTMLElement>(null)
  const inputRefs: BmiInputRefs = {
    weight: useRef<HTMLInputElement>(null),
    height: useRef<HTMLInputElement>(null),
  }

  // No celular o card aparece abaixo da dobra; sem rolar, parece que nada aconteceu.
  useEffect(() => {
    if (!result) return
    resultRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'nearest',
    })
  }, [result])

  function handleSubmit(): void {
    const outcome = calculate()
    if (outcome.status === 'invalid') inputRefs[outcome.firstInvalidField].current?.focus()
  }

  function handleReset(): void {
    reset()
    inputRefs.weight.current?.focus()
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Calculadora de IMC</h1>

      <BmiForm
        values={values}
        errors={errors}
        inputRefs={inputRefs}
        onFieldChange={setFieldValue}
        onSubmit={handleSubmit}
      />

      {/* Sempre montado: leitores de tela só anunciam mudanças em regiões que já existiam na página. */}
      <p aria-live="polite" className="sr-only">
        {describeResult(result)}
      </p>

      {result && <BmiResultCard result={result} cardRef={resultRef} onReset={handleReset} />}
    </main>
  )
}

export default App
