import { useSyncExternalStore } from 'react'
import { writeStoredJson } from '@/lib/storage'

export type Theme = 'light' | 'dark'

/** Mesma chave usada pelo script em index.html, que aplica o tema antes da primeira pintura. */
export const THEME_STORAGE_KEY = 'theme'

/**
 * A fonte da verdade é a classe .dark no <html>, aplicada pelo script do index.html antes do React.
 * useSyncExternalStore lê esse valor de fora do React; getServerSnapshot devolve `null` no build
 * (não há document) e na hidratação, então o HTML pronto e o primeiro render no navegador batem.
 */
const listeners = new Set<() => void>()

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot(): Theme | null {
  return null
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  listeners.forEach((listener) => listener())
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getSnapshot, getServerSnapshot)

  function toggleTheme(): void {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    writeStoredJson(THEME_STORAGE_KEY, next)
  }

  return { theme, toggleTheme }
}
