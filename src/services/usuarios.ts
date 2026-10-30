import type { Usuario } from '../types/api'
import { requisicao } from './http'

export function listarUsuarios() {
  return requisicao<Usuario[]>('/usuarios')
}

export function excluirUsuario(id: number) {
  return requisicao<null>(`/usuarios/${id}`, { method: 'DELETE' })
}