import { createContext, useContext } from 'react'
import type { Usuario } from '../types/api'

interface UsuarioContextoValor {
  usuarioAtual: Usuario | null
  entrar: (usuario: Usuario) => void
  sair: () => void
}

export const UsuarioContext = createContext<UsuarioContextoValor | null>(null)

export function useUsuario() {
  const contexto = useContext(UsuarioContext)
  if (!contexto) {
    throw new Error('useUsuario precisa ser usado dentro do UsuarioProvider')
  }
  return contexto
}