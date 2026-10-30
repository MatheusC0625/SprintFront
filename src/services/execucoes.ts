import type { Execucao, NovaExecucao } from '../types/api'
import { requisicao } from './http'

export function registrarExecucao(execucao: NovaExecucao) {
  return requisicao<Execucao>('/execucoes', {
    method: 'POST',
    body: JSON.stringify(execucao),
  })
}

export function listarExecucoesDoUsuario(usuarioId: number) {
  return requisicao<Execucao[]>(`/execucoes/usuario/${usuarioId}`)
}