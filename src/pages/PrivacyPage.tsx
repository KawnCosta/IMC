import { ExternalLink } from '@/components/ExternalLink'
import { ProsePage } from '@/components/ProsePage'
import { CONTACT, HOSTING_PROVIDER, LAST_UPDATED } from '@/site/config'

export function PrivacyPage() {
  return (
    <ProsePage title="Política de privacidade" updatedAt={LAST_UPDATED.privacy}>
      <section aria-labelledby="resumo">
        <h2 id="resumo">Resumo</h2>
        <p>
          Esta calculadora não tem banco de dados, não usa cookies de rastreamento e não usa ferramentas de análise de
          visitas (analytics). O cálculo do IMC acontece no seu próprio navegador.
        </p>
      </section>

      <section aria-labelledby="o-que-guardamos">
        <h2 id="o-que-guardamos">O que fica guardado</h2>
        <p>
          Para mostrar seus últimos cálculos, o site guarda no armazenamento local (localStorage) deste navegador apenas:
        </p>
        <ul>
          <li>o valor do IMC;</li>
          <li>a faixa de classificação;</li>
          <li>a data e a hora do cálculo.</li>
        </ul>
        <p>
          São guardados no máximo os 10 cálculos mais recentes. O site também lembra se você escolheu o modo claro ou
          escuro. Essas informações ficam só no seu aparelho e não são enviadas para nenhum servidor.
        </p>
      </section>

      <section aria-labelledby="o-que-nao-guardamos">
        <h2 id="o-que-nao-guardamos">O que não é guardado nem enviado</h2>
        <p>
          Peso, altura, nome, e-mail ou qualquer outro dado que identifique você não são guardados nem enviados. Não
          há cadastro, login, cookies de rastreamento nem analytics.
        </p>
      </section>

      <section aria-labelledby="como-apagar">
        <h2 id="como-apagar">Como apagar seus dados</h2>
        <ul>
          <li>
            Na calculadora, use o botão <strong>Apagar histórico</strong>, que aparece abaixo dos seus últimos cálculos.
          </li>
          <li>Ou limpe os dados deste site nas configurações do seu navegador.</li>
        </ul>
      </section>

      <section aria-labelledby="compartilhar">
        <h2 id="compartilhar">Botão Compartilhar</h2>
        <p>
          Ao tocar em Compartilhar, o texto com o seu IMC é entregue ao aplicativo que você escolher ou copiado para a
          área de transferência. O site não recebe nem guarda esse envio.
        </p>
      </section>

      <section aria-labelledby="hospedagem">
        <h2 id="hospedagem">Hospedagem</h2>
        {HOSTING_PROVIDER ? (
          <p>
            O site é hospedado pela {HOSTING_PROVIDER.name}, que pode registrar dados técnicos de acesso, como endereço
            IP, navegador e horário, nos registros (logs) dela, para segurança e funcionamento do serviço. Esses
            registros seguem a{' '}
            <ExternalLink href={HOSTING_PROVIDER.privacyUrl}>
              política de privacidade da {HOSTING_PROVIDER.name}
            </ExternalLink>
            .
          </p>
        ) : (
          <p>
            O site é hospedado por um provedor externo, que pode registrar dados técnicos de acesso, como endereço IP,
            navegador e horário, nos registros (logs) dele, para segurança e funcionamento do serviço. Esses registros
            seguem a política de privacidade do provedor.
          </p>
        )}
      </section>

      <section aria-labelledby="links-externos">
        <h2 id="links-externos">Links para outros sites</h2>
        <p>
          As fontes citadas (como OMS, CDC e Ministério da Saúde) abrem em outros sites, que têm políticas de privacidade
          próprias.
        </p>
      </section>

      <section aria-labelledby="mudancas">
        <h2 id="mudancas">Mudanças nesta política</h2>
        <p>
          Se o site passar a usar alguma ferramenta nova que trate dados, esta página será atualizada antes, com a nova
          data no topo.
        </p>
      </section>

      <section aria-labelledby="contato">
        <h2 id="contato">Contato</h2>
        <p>
          Dúvidas sobre privacidade? Você pode <ExternalLink href={CONTACT.url}>{CONTACT.label}</ExternalLink>. As
          issues são públicas: não escreva seus dados de saúde nelas.
        </p>
      </section>
    </ProsePage>
  )
}
