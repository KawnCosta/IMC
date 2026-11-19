import { ExternalLink } from '@/components/ExternalLink'
import { ProsePage } from '@/components/ProsePage'
import { SOURCES } from '@/content/bmiInfo'
import { formatNumber, INPUT_LIMITS } from '@/lib/bmi'
import { AUTHOR, LAST_UPDATED, REPOSITORY_URL } from '@/site/config'
import { getPage } from '@/site/pages'

const { weight, height } = INPUT_LIMITS

export function AboutPage() {
  return (
    <ProsePage title="Sobre a Calculadora de IMC" updatedAt={LAST_UPDATED.about}>
      <section aria-labelledby="quem-fez">
        <h2 id="quem-fez">Quem fez</h2>
        <p>
          A calculadora foi desenvolvida por <ExternalLink href={AUTHOR.url}>{AUTHOR.name}</ExternalLink>, desenvolvedor
          de software, como projeto de estudo de React e TypeScript. O autor não é profissional de saúde: por isso, todas
          as faixas e fórmulas seguem fontes oficiais, citadas abaixo, e nenhum texto do site faz diagnóstico, indica
          dieta ou promete resultado.
        </p>
        <p>
          O código é aberto e pode ser conferido no <ExternalLink href={REPOSITORY_URL}>repositório do projeto</ExternalLink>
          .
        </p>
      </section>

      <section aria-labelledby="por-que">
        <h2 id="por-que">Por que existe</h2>
        <p>
          A ideia é oferecer uma calculadora simples, que explique o resultado em vez de mostrar só um número, deixe
          claros os limites do IMC e não colete dados de quem usa. Veja a{' '}
          <a href={getPage('privacy').path}>política de privacidade</a>.
        </p>
      </section>

      <section aria-labelledby="fontes-faixas">
        <h2 id="fontes-faixas">De onde vêm as faixas</h2>
        <ul>
          <li>
            Adultos: faixas da Organização Mundial da Saúde, com sobrepeso a partir de 25 e obesidade a partir de 30 kg/m²
            (<ExternalLink href={SOURCES.who.url}>OMS</ExternalLink>).
          </li>
          <li>
            Uso do IMC como triagem, e não diagnóstico, e a orientação de usar a calculadora de adultos a partir dos 20
            anos (<ExternalLink href={SOURCES.cdcAdult.url}>CDC</ExternalLink>).
          </li>
          <li>
            Pessoas com 60 anos ou mais: no Brasil, o Ministério da Saúde usa pontos de corte próprios (
            <ExternalLink href={SOURCES.healthMinistryElderly.url}>Ministério da Saúde</ExternalLink>).
          </li>
        </ul>
      </section>

      <section aria-labelledby="como-funciona">
        <h2 id="como-funciona">Como o cálculo funciona</h2>
        <ul>
          <li>A fórmula é IMC = peso (kg) ÷ altura (m)².</li>
          <li>
            O resultado é arredondado para 1 casa decimal antes de ser classificado, para que a faixa sempre corresponda
            ao número mostrado na tela.
          </li>
          <li>
            A faixa de peso adequada para a sua altura vai de 18,5 a 24,9 vezes a altura ao quadrado, os limites da faixa
            considerada adequada para adultos.
          </li>
          <li>
            São aceitos pesos de {formatNumber(weight.min, 0)} a {formatNumber(weight.max, 0)} kg e alturas de{' '}
            {formatNumber(height.min, 2)} a {formatNumber(height.max, 2)} m, com vírgula ou ponto. Uma altura como
            “180” é reconhecida como centímetros, e a calculadora pede o valor em metros.
          </li>
          <li>Tudo é calculado no seu navegador; nenhum valor é enviado para servidores.</li>
        </ul>
      </section>

      <section aria-labelledby="revisao">
        <h2 id="revisao">Revisão do conteúdo</h2>
        <p>
          Os textos são revisados comparando cada afirmação com as fontes citadas. A data da última revisão aparece no
          conteúdo da calculadora e no topo desta página. Encontrou um erro? Ele pode ser relatado no repositório.
        </p>
      </section>
    </ProsePage>
  )
}
