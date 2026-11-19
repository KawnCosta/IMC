import { useRef } from 'react'
import { BmiForm, type BmiInputRefs } from '@/components/BmiForm'
import { useBmiCalculator } from '@/hooks/useBmiCalculator'
import { formatNumber } from '@/lib/bmi'

function App() {
  const { values, errors, result, setFieldValue, calculate } = useBmiCalculator()
  const inputRefs: BmiInputRefs = {
    weight: useRef<HTMLInputElement>(null),
    height: useRef<HTMLInputElement>(null),
  }

  function handleSubmit(): void {
    const outcome = calculate()
    if (outcome.status === 'invalid') inputRefs[outcome.firstInvalidField].current?.focus()
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
      {result && (
        <p className="text-lg">
          Seu IMC é <strong>{formatNumber(result.bmi)}</strong>: {result.category.label}
        </p>
      )}
    </main>
  )
}

export default App
