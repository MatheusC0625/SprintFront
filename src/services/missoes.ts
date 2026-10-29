import type { Missao } from '../types/api'
import { requisicao } from './http'

export function listarMissoes() {
  return requisicao<Missao[]>('/missoes')
}

export function buscarMissao(id: number) {
  return requisicao<Missao>(`/missoes/${id}`)
}