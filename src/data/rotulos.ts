import type { OrigemPontuacao, StatusExecucao, StatusPontuacao, Tema, TipoMissao } from '../types/api'

export const temas: Tema[] = ['ENERGIA', 'AGUA', 'FLORESTA', 'RESIDUOS']
export const tiposDeMissao: TipoMissao[] = ['ONBOARDING', 'DIARIA', 'CIRCULO', 'CAMPO']

export const nomeDoTema: Record<Tema, string> = {
  ENERGIA: 'Energia',
  AGUA: 'Água',
  FLORESTA: 'Floresta',
  RESIDUOS: 'Resíduos',
}

export const corDoTema: Record<Tema, string> = {
  ENERGIA: 'bg-amber-100 text-amber-800',
  AGUA: 'bg-sky-100 text-sky-800',
  FLORESTA: 'bg-green-100 text-green-800',
  RESIDUOS: 'bg-orange-100 text-orange-800',
}

export const nomeDoTipo: Record<TipoMissao, string> = {
  ONBOARDING: 'Onboarding',
  DIARIA: 'Diária',
  CIRCULO: 'Círculo',
  CAMPO: 'Campo',
}

export const regraDoTipo: Record<TipoMissao, string> = {
  ONBOARDING: 'Vale uma única vez por usuário e rende 20 SoulCoins.',
  DIARIA: 'Pode ser feita uma vez por dia e rende 15 SoulCoins, com bônus de 50 a cada 7 dias seguidos.',
  CIRCULO: 'Missão em grupo: cada membro da comunidade que conclui rende 10 SoulCoins.',
  CAMPO: 'Exige validação por vídeo e, depois de aprovada, rende 150 SoulCoins.',
}

export const nomeDoStatusExecucao: Record<StatusExecucao, string> = {
  PENDENTE: 'Pendente',
  VALIDADA: 'Validada',
  REJEITADA: 'Rejeitada',
}

export const corDoStatusExecucao: Record<StatusExecucao, string> = {
  PENDENTE: 'bg-amber-100 text-amber-800',
  VALIDADA: 'bg-green-100 text-green-800',
  REJEITADA: 'bg-red-100 text-red-800',
}

export const nomeDaOrigem: Record<OrigemPontuacao, string> = {
  MISSAO: 'Missão',
  BONUS_SOCIAL: 'Bônus social',
  AJUSTE: 'Ajuste',
}

export const nomeDoStatusPontuacao: Record<StatusPontuacao, string> = {
  ATIVO: 'Ativo',
  EXPIRADO: 'Expirado',
  CONVERTIDO: 'Convertido',
}

export const corDoStatusPontuacao: Record<StatusPontuacao, string> = {
  ATIVO: 'bg-green-100 text-green-800',
  EXPIRADO: 'bg-gray-200 text-gray-700',
  CONVERTIDO: 'bg-blue-100 text-blue-800',
}