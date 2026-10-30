import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Aviso from '../components/Aviso'
import type { AvisoNaTela, TipoAviso } from '../types/feedback'
import { FeedbackContext } from './FeedbackContext'

export default function FeedbackProvider({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<AvisoNaTela | null>(null)
  const temporizador = useRef<number | undefined>(undefined)

  const mostrarMensagem = useCallback((texto: string, tipo: TipoAviso = 'sucesso') => {
    window.clearTimeout(temporizador.current)
    setAviso({ texto, tipo })
    temporizador.current = window.setTimeout(() => setAviso(null), 6000)
  }, [])

  function fechar() {
    window.clearTimeout(temporizador.current)
    setAviso(null)
  }

  useEffect(() => {
    return () => window.clearTimeout(temporizador.current)
  }, [])

  return (
    <FeedbackContext.Provider value={{ mostrarMensagem }}>
      {children}
      {aviso && <Aviso aviso={aviso} aoFechar={fechar} />}
    </FeedbackContext.Provider>
  )
}