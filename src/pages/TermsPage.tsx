import { ExternalLink } from '@/components/ExternalLink'
import { ProsePage } from '@/components/ProsePage'
import { CONTACT, LAST_UPDATED } from '@/site/config'
import { getPage } from '@/site/pages'

export function TermsPage() {
  return (
    <ProsePage title="Termos de uso" updatedAt={LAST_UPDATED.terms}>
      <section aria-labelledby="finalidade">
        <h2 id="finalidade">Para que serve esta calculadora</h2>
        <p>
          A Calculadora de IMC é uma ferramenta informativa e de triagem, feita para adultos (20 anos ou mais). Ela
          calcula o Índice de Massa Corporal a partir do peso e da altura e mostra a faixa correspondente.
        </p>
        <p>
          Ela não deve ser usada para crianças, adolescentes ou gestantes, que têm formas próprias de avaliação.
        </p>
      </section>

      <section aria-labelledby="nao-substitui">
        <h2 id="nao-substitui">Não substitui um profissional de saúde</h2>
        <p>
          O resultado não é um diagnóstico. O IMC não mede a gordura corporal diretamente e não considera exames,
          histórico ou hábitos. Decisões sobre a sua saúde devem ser tomadas com um profissional de saúde.
        </p>
      </section>

      <section aria-labelledby="garantias">
        <h2 id="garantias">Sem garantias</h2>
        <p>
          O site é oferecido gratuitamente, como está. Não há garantia de que ficará sempre disponível ou livre de
          erros, e o uso das informações é de responsabilidade de quem usa. O conteúdo se baseia em fontes públicas,
          que podem ser atualizadas pelos órgãos responsáveis.
        </p>
      </section>

      <section aria-labelledby="privacidade">
        <h2 id="privacidade">Privacidade</h2>
        <p>
          O que o site guarda e como apagar está explicado na{' '}
          <a href={getPage('privacy').path}>política de privacidade</a>.
        </p>
      </section>

      <section aria-labelledby="alteracoes">
        <h2 id="alteracoes">Alterações nestes termos</h2>
        <p>Estes termos podem mudar. A data da última atualização aparece no topo da página.</p>
      </section>

      <section aria-labelledby="contato">
        <h2 id="contato">Contato</h2>
        <p>
          Para dúvidas ou para relatar um erro, você pode <ExternalLink href={CONTACT.url}>{CONTACT.label}</ExternalLink>.
        </p>
      </section>
    </ProsePage>
  )
}
