import type { ReactNode } from 'react'
import Carregando from './Carregando'
import MensagemErro from './MensagemErro'

interface EstadoDaTelaProps {
  carregando: boolean
  erro: string
  vazio?: boolean
  textoVazio?: string
  aoTentarNovamente: () => void
  children: ReactNode
}

export default function EstadoDaTela({
  carregando,
  erro,
  vazio = false,
  textoVazio = 'Nada por aqui ainda.',
  aoTentarNovamente,
  children,
}: EstadoDaTelaProps) {
  if (carregando) {
    return <Carregando />
  }

  if (erro) {
    return <MensagemErro mensagem={erro} aoTentarNovamente={aoTentarNovamente} />
  }

  if (vazio) {
    return <p className="rounded-xl bg-white p-8 text-center text-muted shadow-sm">{textoVazio}</p>
  }

  return <>{children}</>
}