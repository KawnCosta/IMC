import type { Ref } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type NumberFieldProps = {
  id: string
  label: string
  unit: string
  hint: string
  placeholder: string
  value: string
  error?: string
  inputRef?: Ref<HTMLInputElement>
  onValueChange: (value: string) => void
}

/** Campo numérico em texto + inputMode="decimal": aceita vírgula e ainda abre o teclado numérico no celular. */
export function NumberField({
  id,
  label,
  unit,
  hint,
  placeholder,
  value,
  error,
  inputRef,
  onValueChange,
}: NumberFieldProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = error ? `${hintId} ${errorId}` : hintId

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-base">
        {label} <span className="font-normal text-muted-foreground">({unit})</span>
      </Label>
      <Input
        ref={inputRef}
        id={id}
        name={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="h-12 px-3 text-base md:text-base"
      />
      <p id={hintId} className="text-sm text-muted-foreground">
        {hint}
      </p>
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
