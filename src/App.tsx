import { useEffect, useRef } from 'react'
import { BmiForm, type BmiInputRefs } from '@/components/BmiForm'
import { BmiHistory } from '@/components/BmiHistory'
import { BmiResultCard } from '@/components/BmiResultCard'
import { InfoSections } from '@/components/InfoSections'
import { SiteFooter } from '@/components/SiteFooter'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useBmiCalculator } from '@/hooks/useBmiCalculator'
import { useBmiHistory } from '@/hooks/useBmiHistory'
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
  const history = useBmiHistory()
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
    if (outcome.status === 'invalid') {
      inputRefs[outcome.firstInvalidField].current?.focus()
      return
    }
    history.addEntry(outcome.result)
  }

  function handleReset(): void {
    reset()
    inputRefs.weight.current?.focus()
  }

  // O card do histórico some ao apagar; o foco iria para o <body> se não fosse movido.
  function handleClearHistory(): void {
    history.clearHistory()
    inputRefs.weight.current?.focus()
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col gap-6 px-4 py-10">
      <header className="grid gap-2">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Calculadora de IMC</h1>
          <ThemeToggle />
        </div>
        <p className="text-base text-muted-foreground">
          Calcule seu Índice de Massa Corporal e veja a classificação para adultos, com a faixa de peso adequada para
          a sua altura.
        </p>
      </header>

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

      <BmiHistory entries={history.entries} onClear={handleClearHistory} />

      <div className="mt-8 border-t pt-10">
        <InfoSections />
      </div>

      <SiteFooter />
    </main>
  )
}

export default App
