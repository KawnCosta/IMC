import { describe, expect, it } from 'vitest'
import {
  BMI_CATEGORIES,
  calculateBmi,
  classifyBmi,
  evaluateBmi,
  formatCategoryRange,
  formatNumber,
  healthyWeightRange,
  parseDecimal,
  validateHeight,
  validateWeight,
} from './bmi'

describe('parseDecimal', () => {
  it.each([
    ['1,80', 1.8],
    ['1.80', 1.8],
    ['72', 72],
    [' 72,5 ', 72.5],
  ])('converte %j em %d', (raw, expected) => {
    expect(parseDecimal(raw)).toBe(expected)
  })

  it.each(['abc', '1,7a', '1.7abc', '', '1,', ',5', '1,2,3', '-5', '1e2'])('rejeita %j', (raw) => {
    expect(parseDecimal(raw)).toBeNull()
  })
})

describe('validateWeight', () => {
  it('aceita um peso válido', () => {
    expect(validateWeight('80')).toEqual({ ok: true, value: 80 })
  })

  it('pede o peso quando o campo está vazio', () => {
    expect(validateWeight('  ')).toEqual({ ok: false, error: 'Informe seu peso.' })
  })

  it('tem mensagem própria para negativo', () => {
    expect(validateWeight('-5')).toEqual({ ok: false, error: 'O peso não pode ser negativo.' })
  })

  it('trata zero como fora do limite, não como campo vazio', () => {
    expect(validateWeight('0')).toEqual({ ok: false, error: 'Informe um peso entre 20 e 350 kg.' })
  })

  it('recusa texto', () => {
    const result = validateWeight('abc')
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toContain('só com números')
  })

  it.each(['20', '350'])('aceita o limite %s', (raw) => {
    expect(validateWeight(raw).ok).toBe(true)
  })

  it.each(['19,9', '350,1'])('recusa %s fora do limite', (raw) => {
    expect(validateWeight(raw).ok).toBe(false)
  })
})

describe('validateHeight', () => {
  it.each(['1,80', '1.80'])('aceita %s', (raw) => {
    expect(validateHeight(raw)).toEqual({ ok: true, value: 1.8 })
  })

  it('detecta altura em centímetros e sugere o valor em metros', () => {
    expect(validateHeight('180')).toEqual({
      ok: false,
      error: 'Parece que a altura está em centímetros. Use metros: 1,80 em vez de 180.',
    })
  })

  it('tem mensagem própria para vazio e negativo', () => {
    expect(validateHeight('')).toEqual({ ok: false, error: 'Informe sua altura.' })
    expect(validateHeight('-1,7')).toEqual({ ok: false, error: 'A altura não pode ser negativa.' })
  })

  it.each(['0,5', '3', '300'])('recusa %s fora do limite', (raw) => {
    const result = validateHeight(raw)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toBe('Informe uma altura entre 0,80 e 2,50 m.')
  })
})

describe('calculateBmi', () => {
  it('calcula 80 kg e 1,80 m como 24,7', () => {
    expect(calculateBmi(80, 1.8)).toBe(24.7)
  })
})

describe('classifyBmi', () => {
  it.each([
    [18.4, 'underweight'],
    [18.5, 'healthy'],
    [24.9, 'healthy'],
    [25, 'overweight'],
    [29.9, 'overweight'],
    [30, 'obesity'],
    [55, 'obesity'],
  ])('classifica %d como %s', (bmi, expected) => {
    expect(classifyBmi(bmi).id).toBe(expected)
  })

  it('classifica pelo valor arredondado, igual ao exibido', () => {
    // Peso escolhido para o IMC bruto dar 24,96: aparece como "25,0", então precisa ser sobrepeso.
    const bmi = calculateBmi(24.96 * 1.8 * 1.8, 1.8)
    expect(bmi).toBe(25)
    expect(classifyBmi(bmi).id).toBe('overweight')
  })
})

describe('healthyWeightRange', () => {
  it('usa 18,5 e 24,9 vezes a altura ao quadrado', () => {
    expect(healthyWeightRange(1.8)).toEqual({ min: 59.9, max: 80.7 })
  })
})

describe('formatação', () => {
  it('usa vírgula decimal', () => {
    expect(formatNumber(24.7)).toBe('24,7')
    expect(formatNumber(25)).toBe('25,0')
  })

  it('descreve cada faixa sem buracos entre elas', () => {
    expect(BMI_CATEGORIES.map(formatCategoryRange)).toEqual([
      'Abaixo de 18,5',
      '18,5 a 24,9',
      '25,0 a 29,9',
      '30,0 ou mais',
    ])
  })
})

describe('evaluateBmi', () => {
  it('devolve resultado completo para entradas válidas', () => {
    const evaluation = evaluateBmi('80', '1,80')
    expect(evaluation.ok).toBe(true)
    if (evaluation.ok) {
      expect(evaluation.result.bmi).toBe(24.7)
      expect(evaluation.result.category.id).toBe('healthy')
    }
  })

  it('devolve erro por campo', () => {
    expect(evaluateBmi('', '180')).toEqual({
      ok: false,
      errors: {
        weight: 'Informe seu peso.',
        height: 'Parece que a altura está em centímetros. Use metros: 1,80 em vez de 180.',
      },
    })
  })
})
