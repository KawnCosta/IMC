import { calculateBmi, formatNumber, healthyWeightRange } from '@/lib/bmi'

export interface InfoSource {
  /** Nome curto, usado em "Fonte: OMS". */
  shortLabel: string
  label: string
  url: string
}

export type SourceKey = keyof typeof SOURCES

export interface InfoSection {
  id: string
  title: string
  paragraphs: readonly string[]
  /** Fontes que sustentam as afirmações da seção, mostradas logo abaixo do texto. */
  sources: readonly SourceKey[]
  /** Quando verdadeiro, a seção mostra a tabela gerada a partir de BMI_CATEGORIES. */
  showCategoriesTable?: boolean
}

export const SOURCES = {
  who: {
    shortLabel: 'OMS',
    label: 'OMS — Obesity and overweight',
    url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
  },
  cdcAdult: {
    shortLabel: 'CDC',
    label: 'CDC — Adult BMI Calculator',
    url: 'https://www.cdc.gov/bmi/adult-calculator/index.html',
  },
  cdcAbout: {
    shortLabel: 'CDC',
    label: 'CDC — About Body Mass Index (BMI)',
    url: 'https://www.cdc.gov/bmi/about/index.html',
  },
  cdcChildTeen: {
    shortLabel: 'CDC',
    label: 'CDC — Child and Teen BMI Calculator',
    url: 'https://www.cdc.gov/bmi/child-teen-calculator/index.html',
  },
  healthMinistryElderly: {
    shortLabel: 'Ministério da Saúde',
    label: 'Ministério da Saúde — Linhas de Cuidado: obesidade no adulto (classificação para idosos)',
    url: 'https://linhasdecuidado.saude.gov.br/portal/obesidade-no-adulto/unidade-de-atencao-primaria/planejamento-terapeutico/',
  },
} as const satisfies Record<string, InfoSource>

/** Exemplos calculados pelas mesmas funções da calculadora: o texto nunca diverge do resultado. */
const FORMULA_EXAMPLE = { weightKg: 80, heightM: 1.8 } as const
const IDEAL_WEIGHT_EXAMPLE_HEIGHT_M = 1.7
const idealWeightExample = healthyWeightRange(IDEAL_WEIGHT_EXAMPLE_HEIGHT_M)

export const INFO_SECTIONS: readonly InfoSection[] = [
  {
    id: 'o-que-e-imc',
    title: 'O que é IMC?',
    paragraphs: [
      'IMC é a sigla de Índice de Massa Corporal. É um número que relaciona o peso com a altura e serve para estimar, de forma rápida, se o peso de um adulto está dentro da faixa usada como referência.',
      'O IMC é usado como ferramenta de triagem: ajuda a identificar quem pode precisar de uma avaliação mais completa, mas não diagnostica nenhuma doença.',
    ],
    sources: ['who', 'cdcAdult'],
  },
  {
    id: 'como-calcular',
    title: 'Como o IMC é calculado?',
    paragraphs: [
      'A fórmula divide o peso, em quilos, pela altura, em metros, elevada ao quadrado: IMC = peso ÷ (altura × altura).',
      `Exemplo: uma pessoa com ${formatNumber(FORMULA_EXAMPLE.weightKg, 0)} kg e ${formatNumber(FORMULA_EXAMPLE.heightM, 2)} m tem IMC de ${formatNumber(FORMULA_EXAMPLE.weightKg, 0)} ÷ (${formatNumber(FORMULA_EXAMPLE.heightM, 2)} × ${formatNumber(FORMULA_EXAMPLE.heightM, 2)}) = ${formatNumber(FORMULA_EXAMPLE.weightKg, 0)} ÷ ${formatNumber(FORMULA_EXAMPLE.heightM ** 2, 2)} ≈ ${formatNumber(calculateBmi(FORMULA_EXAMPLE.weightKg, FORMULA_EXAMPLE.heightM))} kg/m².`,
    ],
    sources: ['who'],
  },
  {
    id: 'faixas',
    title: 'Quais faixas são usadas?',
    paragraphs: [
      'Para adultos, a Organização Mundial da Saúde (OMS) considera sobrepeso a partir de 25 e obesidade a partir de 30. A tabela abaixo mostra as faixas usadas nesta calculadora.',
    ],
    sources: ['who'],
    showCategoriesTable: true,
  },
  {
    id: 'peso-ideal',
    title: 'Qual é o peso ideal para a minha altura?',
    paragraphs: [
      'Não existe um único número de peso ideal. O que dá para calcular é a faixa de peso em que o IMC de um adulto fica entre 18,5 e 24,9, a faixa considerada adequada: basta multiplicar esses dois valores pela altura ao quadrado.',
      `Exemplo: para ${formatNumber(IDEAL_WEIGHT_EXAMPLE_HEIGHT_M, 2)} m de altura, a faixa vai de ${formatNumber(idealWeightExample.min)} kg a ${formatNumber(idealWeightExample.max)} kg. A calculadora mostra a faixa para a sua altura junto com o resultado. Lembre que o IMC não considera massa muscular, então a faixa é uma referência, não uma meta.`,
    ],
    sources: ['who', 'cdcAbout'],
  },
  {
    id: 'imc-idosos',
    title: 'IMC para idosos: muda alguma coisa?',
    paragraphs: [
      'Muda. No Brasil, o Ministério da Saúde usa pontos de corte próprios para pessoas com 60 anos ou mais: IMC até 22 kg/m² é classificado como baixo peso, acima de 22 e abaixo de 27 como adequado (eutrófico), e 27 ou mais como sobrepeso.',
      'Esta calculadora usa as faixas de adultos da OMS. Se você tem 60 anos ou mais, compare o seu resultado com os valores acima e converse com um profissional de saúde sobre o que eles significam no seu caso.',
    ],
    sources: ['healthMinistryElderly'],
  },
  {
    id: 'criancas',
    title: 'O IMC serve para crianças?',
    paragraphs: [
      'Não da mesma forma. Crianças e adolescentes ainda estão crescendo, então o IMC deles é comparado com o de outras pessoas do mesmo sexo e da mesma idade, usando percentis.',
      'Esta calculadora usa as faixas de adultos (20 anos ou mais). Para crianças e adolescentes, use uma ferramenta própria para a idade e converse com o pediatra.',
    ],
    sources: ['cdcChildTeen'],
  },
  {
    id: 'massa-muscular',
    title: 'O IMC considera massa muscular?',
    paragraphs: [
      'Não. A fórmula usa só peso e altura, então não diferencia gordura, músculo e osso. Por isso, uma pessoa com muita massa muscular pode ter IMC alto sem excesso de gordura.',
      'Pelo mesmo motivo, duas pessoas com o mesmo IMC podem ter quantidades bem diferentes de gordura corporal.',
    ],
    sources: ['cdcAbout'],
  },
  {
    id: 'composicao-corporal',
    title: 'Peso, gordura corporal e composição corporal: qual a diferença?',
    paragraphs: [
      'Peso é o total que a balança mostra. Gordura corporal é só uma parte desse total. Composição corporal é a divisão do peso entre gordura, músculos, ossos e água.',
      'Como o IMC não mede a gordura corporal diretamente, um profissional de saúde costuma avaliá-lo junto com outras informações, como exame físico, histórico de saúde, hábitos e exames de laboratório.',
    ],
    sources: ['cdcAbout'],
  },
  {
    id: 'quando-procurar-profissional',
    title: 'Quando procurar um profissional de saúde?',
    paragraphs: [
      'Procure um profissional se o resultado ficou fora da faixa considerada adequada, se o seu peso mudou muito sem explicação ou se você tem dúvidas sobre a sua saúde.',
      'Durante a gestação, o peso muda por motivos esperados e o acompanhamento é feito no pré-natal, não com esta calculadora. A avaliação profissional considera exames, histórico e hábitos, que o IMC sozinho não mostra.',
    ],
    sources: ['cdcAbout'],
  },
]
