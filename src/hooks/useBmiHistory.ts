import { useSyncExternalStore } from 'react'
import { BMI_CATEGORIES, type BmiCategoryId, type BmiResult } from '@/lib/bmi'
import { parseStoredJson, readStoredRaw, removeStoredValue, writeStoredJson } from '@/lib/storage'

export interface BmiHistoryEntry {
  id: string
  /** Data e hora do cálculo em ISO 8601. */
  calculatedAt: string
  bmi: number
  categoryId: BmiCategoryId
}

const HISTORY_STORAGE_KEY = 'bmi-history'
const MAX_HISTORY_ENTRIES = 10
const EMPTY_HISTORY: readonly BmiHistoryEntry[] = []

const CATEGORY_IDS: readonly string[] = BMI_CATEGORIES.map((category) => category.id)

function isHistoryEntry(value: unknown): value is BmiHistoryEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.id === 'string' &&
    typeof entry.calculatedAt === 'string' &&
    typeof entry.bmi === 'number' &&
    Number.isFinite(entry.bmi) &&
    typeof entry.categoryId === 'string' &&
    CATEGORY_IDS.includes(entry.categoryId)
  )
}

function isHistory(value: unknown): value is BmiHistoryEntry[] {
  return Array.isArray(value) && value.every(isHistoryEntry)
}

/**
 * O localStorage é um "sistema externo" ao React; useSyncExternalStore é a forma indicada de lê-lo.
 * getSnapshot precisa devolver o mesmo objeto enquanto nada mudar, por isso o resultado fica em cache
 * e só é recalculado quando o texto salvo muda.
 */
const listeners = new Set<() => void>()
let cachedRaw: string | null = null
let cachedEntries: readonly BmiHistoryEntry[] = EMPTY_HISTORY

function notify(): void {
  listeners.forEach((listener) => listener())
}

/** O evento "storage" avisa quando outra aba do mesmo site muda o histórico. */
function handleStorageEvent(event: StorageEvent): void {
  if (event.key === HISTORY_STORAGE_KEY || event.key === null) notify()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  if (listeners.size === 1) window.addEventListener('storage', handleStorageEvent)
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) window.removeEventListener('storage', handleStorageEvent)
  }
}

function getSnapshot(): readonly BmiHistoryEntry[] {
  const raw = readStoredRaw(HISTORY_STORAGE_KEY)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedEntries = parseStoredJson(raw, isHistory) ?? EMPTY_HISTORY
  }
  return cachedEntries
}

/** No build não há localStorage: o HTML sai sem histórico, e a hidratação começa igual. */
function getServerSnapshot(): readonly BmiHistoryEntry[] {
  return EMPTY_HISTORY
}

/** Histórico salvo só neste navegador (localStorage), sem backend. Guarda o IMC, nunca peso ou altura. */
export function useBmiHistory() {
  const entries = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function addEntry(result: BmiResult): void {
    const entry: BmiHistoryEntry = {
      id: crypto.randomUUID(),
      calculatedAt: new Date().toISOString(),
      bmi: result.bmi,
      categoryId: result.category.id,
    }
    writeStoredJson(HISTORY_STORAGE_KEY, [entry, ...getSnapshot()].slice(0, MAX_HISTORY_ENTRIES))
    notify()
  }

  function clearHistory(): void {
    removeStoredValue(HISTORY_STORAGE_KEY)
    notify()
  }

  return { entries, addEntry, clearHistory }
}
