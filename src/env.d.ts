/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID do Google Analytics 4 (G-XXXXXXX). Sem ele, nenhum script de medição é carregado. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
