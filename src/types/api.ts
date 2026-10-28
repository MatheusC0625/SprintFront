export type Tema = 'ENERGIA' | 'AGUA' | 'FLORESTA' | 'RESIDUOS'
export type TipoMissao = 'ONBOARDING' | 'DIARIA' | 'CIRCULO' | 'CAMPO'
export type StatusExecucao = 'PENDENTE' | 'VALIDADA' | 'REJEITADA'
export type OrigemPontuacao = 'MISSAO' | 'BONUS_SOCIAL' | 'AJUSTE'
export type StatusPontuacao = 'ATIVO' | 'EXPIRADO' | 'CONVERTIDO'

export interface Comunidade {
  idComunidade: number
  nome: string
  tema: Tema
  pontuacaoTotal: number
  dataCriacao: string
}

export interface Missao {
  idMissao: number
  titulo: string
  descricao: string
  categoria: Tema
  tipoMissao: TipoMissao
  recompensaBase: number
  ativa: boolean
}

export interface Usuario {
  idUsuario: number
  nome: string
  email: string
  comunidade: Comunidade
  dataCadastro: string
  saldoAtual: number | null
}

export interface Execucao {
  idExecucao: number
  usuario: Usuario
  missao: Missao
  dataConclusao: string
  status: StatusExecucao
}

export interface Pontuacao {
  idPontuacao: number
  usuario: Usuario
  execucao: Execucao | null
  origem: OrigemPontuacao
  pontos: number
  dataGeracao: string
  dataExpiracao: string
  status: StatusPontuacao
}

export interface Saldo {
  usuarioId: number
  saldoSoulCoins: number
  creditoReais: number
}

export interface ErroApi {
  timestamp: string
  status: number
  erro: string
  mensagem: string
}

export interface NovoUsuario {
  nome: string
  email: string
  comunidade: { idComunidade: number }
}

export interface NovaExecucao {
  usuarioId: number
  missaoId: number
  dataConclusao?: string
}

export interface NovoBonusSocial {
  usuarioId: number
  reacoes: number
}

export type ComunidadeRanqueada = Comunidade & { posicao: number }

export type CarteiraUsuario = Saldo & {
  extrato: Pontuacao[]
  execucoes: Execucao[]
}