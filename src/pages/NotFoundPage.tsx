import { ProsePage } from '@/components/ProsePage'
import { getPage } from '@/site/pages'

export function NotFoundPage() {
  return (
    <ProsePage title="Página não encontrada">
      <p>
        O endereço acessado não existe. <a href={getPage('home').path}>Voltar para a Calculadora de IMC</a>.
      </p>
    </ProsePage>
  )
}
