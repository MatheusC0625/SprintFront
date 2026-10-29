import type { Comunidade } from '../types/api'
import { requisicao } from './http'

export function listarComunidades() {
  return requisicao<Comunidade[]>('/comunidades')
}

export function listarComunidadesVencedoras() {
  return requisicao<Comunidade[]>('/comunidades/vencedoras')
}