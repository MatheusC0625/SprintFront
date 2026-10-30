import type { Comunidade, ComunidadeRanqueada } from '../types/api'

export function montarRanking(comunidades: Comunidade[]): ComunidadeRanqueada[] {
  const ordenadas = [...comunidades].sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)
  const ranking: ComunidadeRanqueada[] = []

  ordenadas.forEach((comunidade, indice) => {
    const anterior = ranking[indice - 1]
    const empatou = anterior && anterior.pontuacaoTotal === comunidade.pontuacaoTotal
    ranking.push({ ...comunidade, posicao: empatou ? anterior.posicao : indice + 1 })
  })

  return ranking
}