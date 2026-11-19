import { useCallback, useEffect, useState } from 'react'

export type ShareStatus = 'idle' | 'shared' | 'copied' | 'error'

export interface ShareContent {
  title: string
  text: string
  url: string
}

/** Tempo que a mensagem "Copiado!" (ou de erro) fica visível. */
const FEEDBACK_DURATION_MS = 2500

function isUserCancellation(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

/** Usa o compartilhamento nativo quando existe (celular) e, se não, copia o texto. */
export function useShareResult() {
  const [status, setStatus] = useState<ShareStatus>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timeoutId = window.setTimeout(() => setStatus('idle'), FEEDBACK_DURATION_MS)
    return () => window.clearTimeout(timeoutId)
  }, [status])

  const share = useCallback(async (content: ShareContent): Promise<void> => {
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(content)
        setStatus('shared')
        return
      }
      await navigator.clipboard.writeText(`${content.text} ${content.url}`)
      setStatus('copied')
    } catch (error) {
      if (isUserCancellation(error)) return
      setStatus('error')
    }
  }, [])

  return { status, share }
}
