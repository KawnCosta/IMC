# Calculadora de IMC

Calculadora de Índice de Massa Corporal para adultos, feita com **React + TypeScript + Tailwind CSS v4 + shadcn/ui**.
Mostra o IMC, a classificação da OMS, uma escala visual, a faixa de peso adequada para a altura e conteúdo
educativo com fontes.

## Funcionalidades

- Aceita `1,80` e `1.80`; recusa texto, valores negativos e fora dos limites com mensagem específica por campo.
- Detecta altura digitada em centímetros (ex.: `180`) e sugere o valor em metros.
- Formulário acessível: `Enter` calcula, foco vai para o primeiro campo com erro, resultado anunciado por leitores de tela.
- Card de resultado com escala de 15 a 40, faixa de peso adequada, aviso de triagem e botão de compartilhar.
- Seções educativas com fonte em cada afirmação (OMS, CDC e Ministério da Saúde) e data de revisão.
- Modo escuro (segue o sistema e lembra a escolha) e histórico dos últimos 10 cálculos salvo só no navegador.
- HTML pré-renderizado no build (React 19 `prerenderToNodeStream`) e hidratado no navegador com `hydrateRoot`.
- Uma URL por intenção, cada uma com título, descrição, `<h1>` e canonical próprios: `/`, `/sobre/`,
  `/privacidade/` e `/termos/`, além de um `404.html` com `noindex`.
- SEO: Open Graph, JSON-LD `WebApplication`, `robots.txt` e `sitemap.xml` com todas as páginas.
- Sem banco de dados nem rastreamento: nada do que é digitado sai do navegador.

## Páginas

| URL             | Conteúdo                                          |
| --------------- | ------------------------------------------------- |
| `/`             | Calculadora e conteúdo educativo                  |
| `/sobre/`       | Quem fez, fontes das faixas e como o cálculo funciona |
| `/privacidade/` | O que é guardado (só no navegador) e como apagar  |
| `/termos/`      | Termos de uso                                     |

Para criar uma página: adicione os dados em `src/site/pages.ts` e o componente em `src/pages/` e registre-o em
`src/App.tsx`. O build gera a pasta da página e a inclui no sitemap automaticamente.

## Classificação usada (OMS, adultos)

| IMC (kg/m²)    | Classificação              |
| -------------- | -------------------------- |
| Abaixo de 18,5 | Baixo peso                 |
| 18,5 a 24,9    | Faixa considerada adequada |
| 25,0 a 29,9    | Sobrepeso                  |
| 30,0 ou mais   | Obesidade                  |

O IMC é arredondado para 1 casa decimal **antes** de ser classificado, para que a faixa sempre corresponda ao número
exibido.

## Como rodar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm test             # testes da lógica (Vitest)
npm run lint         # oxlint
```

### Build e publicação

O `npm run build` tem quatro etapas:

1. `tsc -b`: confere os tipos.
2. `vite build`: gera os arquivos do navegador em `dist/`.
3. `vite build --ssr src/entry-server.tsx`: gera, em `dist-server/`, o código que renderiza as páginas no Node.
4. `node scripts/prerender.ts`: escreve o HTML pronto de cada página (`dist/sobre/index.html`...), o `404.html`, o
   `robots.txt` e o `sitemap.xml`.

O endereço público do site fica num único lugar, a variável `VITE_SITE_URL`, usada no canonical, no Open Graph, no
JSON-LD, no `robots.txt` e no `sitemap.xml`. **Sem ela, o build falha de propósito**, para nunca publicar o site com
um domínio de exemplo.

```bash
cp .env.example .env.production   # e troque pelo endereço real
npm run build
npm run preview                    # confira o build localmente
```

Na Vercel ou na Netlify, cadastre `VITE_SITE_URL` nas variáveis de ambiente do projeto. As duas plataformas detectam o Vite sozinhas.

## Estrutura

```
scripts/
└── prerender.ts     # última etapa do build: HTML de cada página, robots.txt e sitemap.xml
src/
├── lib/             # regras puras, sem React (bmi.ts, storage.ts, date.ts) e testes
├── hooks/           # estado e comportamento (useBmiCalculator, useShareResult, useTheme, useBmiHistory)
├── components/      # partes da interface
│   └── ui/          # componentes gerados pelo shadcn (não editar à mão)
├── pages/           # uma página por URL (HomePage, AboutPage, PrivacyPage, TermsPage, NotFoundPage)
├── content/         # textos das seções educativas e fontes
├── site/            # dados do site, lista de páginas e tags do <head> (TypeScript puro, usado também no build)
├── App.tsx          # layout comum e escolha da página
├── entry-server.tsx # renderização no build (Node)
└── main.tsx         # entrada no navegador (hydrateRoot)
```

### Cuidados com a hidratação

No build não existem `window`, `document` nem `localStorage`. O que depende deles (tema, histórico) é lido com
`useSyncExternalStore`, que usa um valor fixo no build e na hidratação e o valor real logo depois. Assim o primeiro
render no navegador é idêntico ao HTML pronto.

## Privacidade

O histórico (IMC, faixa e data) fica só no `localStorage` do navegador. Peso e altura não são guardados, e o site não
usa cookies de rastreamento nem analytics. Ao adicionar qualquer ferramenta nova, atualize `src/pages/PrivacyPage.tsx`
e a data em `src/site/config.ts`. Ao escolher o host, preencha `HOSTING_PROVIDER` no mesmo arquivo.

## Fontes

- [OMS — Obesity and overweight](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)
- [CDC — Adult BMI Calculator](https://www.cdc.gov/bmi/adult-calculator/index.html)
- [CDC — About Body Mass Index (BMI)](https://www.cdc.gov/bmi/about/index.html)
- [Ministério da Saúde — classificação do IMC para idosos](https://linhasdecuidado.saude.gov.br/portal/obesidade-no-adulto/unidade-de-atencao-primaria/planejamento-terapeutico/)

> O IMC é uma ferramenta de triagem e não substitui a avaliação de um profissional de saúde.

## Licença

Uso livre para fins de estudo e aprendizado.

Desenvolvido por Kawn 💻
