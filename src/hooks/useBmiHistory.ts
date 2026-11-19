import { useState } from 'react'
import { BMI_CATEGORIES, type BmiCategoryId, type BmiResult } from '@/lib/bmi'
import { readStoredJson, removeStoredValue, writeStoredJson } from '@/lib/storage'

export interface BmiHistoryEntry {
  id: string
  /** Data e hora do cálculo em ISO 8601. */
  calculatedAt: string
  bmi: number
  categoryId: BmiCategoryId
}

const HISTORY_STORAGE_KEY = 'bmi-history'
const MAX_HISTORY_ENTRIES = 10

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

function loadHistory(): BmiHistoryEntry[] {
  return readStoredJson(HISTORY_STORAGE_KEY, isHistory) ?? []
}

/** Histórico salvo só neste navegador (localStorage), sem backend. Guarda o IMC, nunca peso ou altura. */
export function useBmiHistory() {
  const [entries, setEntries] = useState<BmiHistoryEntry[]>(loadHistory)

  function addEntry(result: BmiResult): void {
    const entry: BmiHistoryEntry = {
      id: crypto.randomUUID(),
      calculatedAt: new Date().toISOString(),
      bmi: result.bmi,
      categoryId: result.category.id,
    }
    setEntries((current) => {
      const next = [entry, ...current].slice(0, MAX_HISTORY_ENTRIES)
      writeStoredJson(HISTORY_STORAGE_KEY, next)
      return next
    })
  }

  function clearHistory(): void {
    removeStoredValue(HISTORY_STORAGE_KEY)
    setEntries([])
  }

  return { entries, addEntry, clearHistory }
}
