# Calculadora de IMC

Calculadora de Índice de Massa Corporal para adultos, feita com **React + TypeScript + Tailwind CSS v4 + shadcn/ui**.
Mostra o IMC, a classificação da OMS, uma escala visual, a faixa de peso adequada para a altura e conteúdo
educativo com fontes.

## Funcionalidades

- Aceita `1,80` e `1.80`; recusa texto, valores negativos e fora dos limites com mensagem específica por campo.
- Detecta altura digitada em centímetros (ex.: `180`) e sugere o valor em metros.
- Formulário acessível: `Enter` calcula, foco vai para o primeiro campo com erro, resultado anunciado por leitores de tela.
- Card de resultado com escala de 15 a 40, faixa de peso adequada, aviso de triagem e botão de compartilhar.
- Seções educativas com links para a OMS e o CDC.
- Modo escuro (segue o sistema e lembra a escolha) e histórico dos últimos 10 cálculos salvo só no navegador.
- SEO: título, descrição, canonical, Open Graph, `robots.txt` e `sitemap.xml` gerados no build.
- Sem banco de dados nem rastreamento: nada do que é digitado sai do navegador.

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

O endereço público do site fica num único lugar, a variável `VITE_SITE_URL`. Ela preenche o canonical e as tags
Open Graph e gera `robots.txt` e `sitemap.xml`. **Sem ela, o build falha de propósito**, para nunca publicar o site
com um domínio de exemplo.

```bash
cp .env.example .env.production   # e troque pelo endereço real
npm run build
npm run preview                    # confira o build localmente
```

Na Vercel ou na Netlify, cadastre `VITE_SITE_URL` nas variáveis de ambiente do projeto. As duas plataformas detectam o Vite sozinhas.

## Estrutura

```
src/
├── lib/           # regras puras, sem React (bmi.ts, storage.ts) e testes
├── hooks/         # estado e comportamento (useBmiCalculator, useShareResult, useTheme, useBmiHistory)
├── components/    # partes da interface
│   └── ui/        # componentes gerados pelo shadcn (não editar à mão)
├── content/       # textos das seções educativas e fontes
├── App.tsx
└── main.tsx
```

## Fontes

- [OMS — Obesity and overweight](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)
- [CDC — Adult BMI Calculator](https://www.cdc.gov/bmi/adult-calculator/index.html)
- [CDC — About Body Mass Index (BMI)](https://www.cdc.gov/bmi/about/index.html)

> O IMC é uma ferramenta de triagem e não substitui a avaliação de um profissional de saúde.

## Licença

Uso livre para fins de estudo e aprendizado.

Desenvolvido por Kawn 💻
