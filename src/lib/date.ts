/**
 * Formata datas fixas do conteúdo ("2026-11-19" vira "19 de novembro de 2026").
 * O fuso UTC é fixo de propósito: o texto gerado no build e o do navegador precisam ser idênticos,
 * senão a data pode "voltar um dia" em fusos negativos, como o do Brasil.
 */
const longDateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' })

export function formatIsoDate(isoDate: string): string {
  return longDateFormatter.format(new Date(`${isoDate}T00:00:00Z`))
}
