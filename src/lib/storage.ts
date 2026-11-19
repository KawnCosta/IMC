/**
 * Acesso ao localStorage que nunca derruba a página: ele pode lançar erro (modo privado,
 * armazenamento cheio) e o conteúdo salvo pode ter sido alterado à mão ou por uma versão antiga.
 */

/** Texto bruto salvo na chave, ou `null` se não existir ou não for possível ler. */
export function readStoredRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Converte o texto salvo e só devolve o valor se ele tiver o formato esperado. */
export function parseStoredJson<T>(raw: string | null, isValid: (value: unknown) => value is T): T | null {
  if (raw === null) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : null
  } catch {
    return null
  }
}

/** Retorna `false` quando não foi possível salvar, para quem chamou decidir se avisa o usuário. */
export function writeStoredJson(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStoredValue(key: string): void {
  try {
    window.localStorage.removeItem(key)
  } catch {
    // Sem acesso ao armazenamento não há nada salvo para apagar.
  }
}
