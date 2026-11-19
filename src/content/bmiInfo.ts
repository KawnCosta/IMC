export interface InfoSource {
  label: string
  url: string
}

export interface InfoSection {
  id: string
  title: string
  paragraphs: readonly string[]
  /** Quando verdadeiro, a seção mostra a tabela gerada a partir de BMI_CATEGORIES. */
  showCategoriesTable?: boolean
}

export const SOURCES = {
  who: {
    label: 'OMS — Obesity and overweight',
    url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
  },
  cdcAdult: {
    label: 'CDC — Adult BMI Calculator',
    url: 'https://www.cdc.gov/bmi/adult-calculator/index.html',
  },
  cdcAbout: {
    label: 'CDC — About Body Mass Index (BMI)',
    url: 'https://www.cdc.gov/bmi/about/index.html',
  },
  cdcChildTeen: {
    label: 'CDC — Child and Teen BMI Calculator',
    url: 'https://www.cdc.gov/bmi/child-teen-calculator/index.html',
  },
  healthMinistryElderly: {
    label: 'Ministério da Saúde — Linhas de Cuidado: obesidade no adulto (classificação para idosos)',
    url: 'https://linhasdecuidado.saude.gov.br/portal/obesidade-no-adulto/unidade-de-atencao-primaria/planejamento-terapeutico/',
  },
} as const satisfies Record<string, InfoSource>

export const INFO_SECTIONS: readonly InfoSection[] = [
  {
    id: 'o-que-e-imc',
    title: 'O que é IMC?',
    paragraphs: [
      'IMC é a sigla de Índice de Massa Corporal. É um número que relaciona o peso com a altura e serve para estimar, de forma rápida, se o peso de um adulto está dentro da faixa usada como referência.',
      'Por ser simples e barato, o IMC é usado no mundo todo como ferramenta de triagem: ele ajuda a identificar quem pode precisar de uma avaliação mais completa, mas não diagnostica nenhuma doença.',
    ],
  },
  {
    id: 'como-calcular',
    title: 'Como o IMC é calculado?',
    paragraphs: [
      'A fórmula divide o peso, em quilos, pela altura, em metros, elevada ao quadrado: IMC = peso ÷ (altura × altura).',
      'Exemplo: uma pessoa com 80 kg e 1,80 m tem IMC de 80 ÷ (1,80 × 1,80) = 80 ÷ 3,24 ≈ 24,7 kg/m².',
    ],
  },
  {
    id: 'faixas',
    title: 'Quais faixas são usadas?',
    paragraphs: [
      'Para adultos, a Organização Mundial da Saúde (OMS) considera sobrepeso a partir de 25 e obesidade a partir de 30. A tabela abaixo mostra as faixas usadas nesta calculadora.',
    ],
    showCategoriesTable: true,
  },
  {
    id: 'criancas',
    title: 'O IMC serve para crianças?',
    paragraphs: [
      'Não da mesma forma. Crianças e adolescentes ainda estão crescendo, então o IMC deles é comparado com o de outras pessoas do mesmo sexo e da mesma idade, usando curvas de percentis.',
      'Esta calculadora usa as faixas de adultos (20 anos ou mais). Para crianças e adolescentes, use uma ferramenta própria para a idade e converse com o pediatra.',
    ],
  },
  {
    id: 'massa-muscular',
    title: 'O IMC considera massa muscular?',
    paragraphs: [
      'Não. A fórmula usa só peso e altura, então não diferencia gordura, músculo e osso. Uma pessoa muito musculosa, como alguns atletas, pode ter IMC alto sem excesso de gordura.',
      'O contrário também acontece: alguém com pouca massa muscular pode ter IMC na faixa adequada e, ainda assim, ter mais gordura corporal do que o recomendado.',
    ],
  },
  {
    id: 'composicao-corporal',
    title: 'Peso, gordura corporal e composição corporal: qual a diferença?',
    paragraphs: [
      'Peso é o total que a balança mostra. Gordura corporal é só uma parte desse total. Composição corporal é a divisão do peso entre gordura, músculos, ossos e água.',
      'Duas pessoas com o mesmo peso e a mesma altura têm o mesmo IMC, mas podem ter composições corporais bem diferentes. Por isso, profissionais de saúde costumam combinar o IMC com outras medidas, como a circunferência da cintura.',
    ],
  },
  {
    id: 'quando-procurar-profissional',
    title: 'Quando procurar um profissional de saúde?',
    paragraphs: [
      'Procure um profissional se o resultado ficou fora da faixa considerada adequada, se o seu peso mudou muito sem explicação ou se você tem dúvidas sobre a sua saúde.',
      'Durante a gestação, o peso muda por motivos esperados e o acompanhamento é feito no pré-natal, não com esta calculadora. A avaliação profissional considera exames, histórico e hábitos, que o IMC sozinho não mostra.',
    ],
  },
]
