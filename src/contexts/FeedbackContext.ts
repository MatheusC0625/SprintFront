import { createContext, useContext } from 'react'
import type { TipoAviso } from '../types/feedback'

interface FeedbackContextoValor {
  mostrarMensagem: (texto: string, tipo?: TipoAviso) => void
}

export const FeedbackContext = createContext<FeedbackContextoValor | null>(null)

export function useFeedback() {
  const contexto = useContext(FeedbackContext)
  if (!contexto) {
    throw new Error('useFeedback precisa ser usado dentro do FeedbackProvider')
  }
  return contexto
}