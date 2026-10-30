import type { NovoUsuario, Usuario } from '../types/api'
import { requisicao } from './http'

export function listarUsuarios() {
  return requisicao<Usuario[]>('/usuarios')
}

export function buscarUsuario(id: number) {
  return requisicao<Usuario>(`/usuarios/${id}`)
}

export function cadastrarUsuario(usuario: NovoUsuario) {
  return requisicao<Usuario>('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
}

export function atualizarUsuario(id: number, usuario: NovoUsuario) {
  return requisicao<Usuario>(`/usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(usuario),
  })
}

export function excluirUsuario(id: number) {
  return requisicao<null>(`/usuarios/${id}`, { method: 'DELETE' })
}