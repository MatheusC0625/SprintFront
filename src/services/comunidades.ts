import type { Comunidade } from '../types/api'
import { montarRanking } from '../utils/ranking'
import { requisicao } from './http'

export function listarComunidades() {
  return requisicao<Comunidade[]>('/comunidades')
}

export function listarComunidadesVencedoras() {
  return requisicao<Comunidade[]>('/comunidades/vencedoras')
}

export async function buscarRanking() {
  const [comunidades, vencedoras] = await Promise.all([listarComunidades(), listarComunidadesVencedoras()])
  return { ranking: montarRanking(comunidades), vencedoras }
}