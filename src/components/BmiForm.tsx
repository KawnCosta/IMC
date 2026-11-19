import type { FormEvent, RefObject } from 'react'
import { Info } from 'lucide-react'
import { NumberField } from '@/components/NumberField'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BmiFormValues } from '@/hooks/useBmiCalculator'
import { formatNumber, INPUT_LIMITS, type BmiField, type BmiFieldErrors } from '@/lib/bmi'

export type BmiInputRefs = Record<BmiField, RefObject<HTMLInputElement | null>>

type BmiFormProps = {
  values: BmiFormValues
  errors: BmiFieldErrors
  inputRefs: BmiInputRefs
  onFieldChange: (field: BmiField, value: string) => void
  onSubmit: () => void
}

const { weight, height } = INPUT_LIMITS
const WEIGHT_HINT = `Entre ${formatNumber(weight.min, 0)} e ${formatNumber(weight.max, 0)} ${weight.unit}. Ex.: 72,5`
const HEIGHT_HINT = `Em metros, entre ${formatNumber(height.min, 2)} e ${formatNumber(height.max, 2)}. Ex.: 1,75`

export function BmiForm({ values, errors, inputRefs, onFieldChange, onSubmit }: BmiFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    onSubmit()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Calcule seu IMC</CardTitle>
        <CardDescription>Informe seu peso e sua altura. Você pode usar vírgula ou ponto.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form noValidate onSubmit={handleSubmit} className="grid gap-5" aria-label="Calculadora de IMC">
          <NumberField
            id="weight"
            label="Peso"
            unit="kg"
            hint={WEIGHT_HINT}
            placeholder="72,5"
            value={values.weight}
            error={errors.weight}
            inputRef={inputRefs.weight}
            onValueChange={(value) => onFieldChange('weight', value)}
          />
          <NumberField
            id="height"
            label="Altura"
            unit="m"
            hint={HEIGHT_HINT}
            placeholder="1,75"
            value={values.height}
            error={errors.height}
            inputRef={inputRefs.height}
            onValueChange={(value) => onFieldChange('height', value)}
          />
          <Button type="submit" size="lg" className="h-12 text-base">
            Calcular IMC
          </Button>
        </form>

        {/* role="note": aviso fixo; role="alert" (padrão) faria o leitor de tela anunciá-lo ao carregar. */}
        <Alert role="note">
          <Info aria-hidden="true" />
          <AlertDescription>
            Calculadora para adultos (20 anos ou mais). Não use para crianças, adolescentes ou gestantes. Tem 60 anos
            ou mais? Veja os <a href="#imc-idosos">valores usados para idosos</a>.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
