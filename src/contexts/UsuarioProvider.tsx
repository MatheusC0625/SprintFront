import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Usuario } from '../types/api'
import { UsuarioContext } from './UsuarioContext'

const CHAVE_NO_NAVEGADOR = 'nuva_usuario_atual'

function lerUsuarioSalvo(): Usuario | null {
  try {
    const texto = localStorage.getItem(CHAVE_NO_NAVEGADOR)
    return texto ? JSON.parse(texto) : null
  } catch {
    return null
  }
}

function guardarNoNavegador(usuario: Usuario | null) {
  try {
    if (usuario) {
      localStorage.setItem(CHAVE_NO_NAVEGADOR, JSON.stringify(usuario))
    } else {
      localStorage.removeItem(CHAVE_NO_NAVEGADOR)
    }
  } catch {
    console.warn('Não foi possível guardar o usuário no navegador.')
  }
}

export default function UsuarioProvider({ children }: { children: ReactNode }) {
  const [usuarioAtual, setUsuarioAtual] = useState<Usuario | null>(lerUsuarioSalvo)

  function entrar(usuario: Usuario) {
    setUsuarioAtual(usuario)
    guardarNoNavegador(usuario)
  }

  function sair() {
    setUsuarioAtual(null)
    guardarNoNavegador(null)
  }

  return <UsuarioContext.Provider value={{ usuarioAtual, entrar, sair }}>{children}</UsuarioContext.Provider>
}