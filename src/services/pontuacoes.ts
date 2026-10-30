import type { CarteiraUsuario, NovoBonusSocial, Pontuacao, Saldo } from '../types/api'
import { listarExecucoesDoUsuario } from './execucoes'
import { requisicao } from './http'

export function buscarSaldo(usuarioId: number) {
  return requisicao<Saldo>(`/pontuacoes/usuario/${usuarioId}/saldo`)
}

export function buscarExtrato(usuarioId: number) {
  return requisicao<Pontuacao[]>(`/pontuacoes/usuario/${usuarioId}`)
}

export function registrarBonusSocial(bonus: NovoBonusSocial) {
  return requisicao<Pontuacao>('/pontuacoes/bonus-social', {
    method: 'POST',
    body: JSON.stringify(bonus),
  })
}

export async function buscarCarteira(usuarioId: number): Promise<CarteiraUsuario> {
  const [saldo, extrato, execucoes] = await Promise.all([
    buscarSaldo(usuarioId),
    buscarExtrato(usuarioId),
    listarExecucoesDoUsuario(usuarioId),
  ])
  return { ...saldo, extrato, execucoes }
}