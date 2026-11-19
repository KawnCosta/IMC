import { useEffect, useState } from 'react'
import { readStoredJson, writeStoredJson } from '@/lib/storage'

export type Theme = 'light' | 'dark'

/** Mesma chave usada pelo script em index.html que aplica o tema antes da primeira pintura. */
export const THEME_STORAGE_KEY = 'theme'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function getInitialTheme(): Theme {
  const stored = readStoredJson(THEME_STORAGE_KEY, isTheme)
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.style.colorScheme = theme
  }, [theme])

  function toggleTheme(): void {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    writeStoredJson(THEME_STORAGE_KEY, next)
  }

  return { theme, toggleTheme }
}
