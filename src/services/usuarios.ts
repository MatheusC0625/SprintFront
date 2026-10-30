import type { Usuario } from '../types/api'
import { requisicao } from './http'

export function listarUsuarios() {
  return requisicao<Usuario[]>('/usuarios')
}