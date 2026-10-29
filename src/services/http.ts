import type { ErroApi } from '../types/api'

const URL_BASE = import.meta.env.VITE_API_URL ?? 'https://sprint4java-api.onrender.com/api'
const TEMPO_LIMITE_MS = 90000

export class ErroDeRequisicao extends Error {
  status: number

  constructor(mensagem: string, status: number) {
    super(mensagem)
    this.status = status
  }
}

export async function requisicao<T>(caminho: string, opcoes: RequestInit = {}): Promise<T> {
  const controlador = new AbortController()
  const temporizador = setTimeout(() => controlador.abort(), TEMPO_LIMITE_MS)

  try {
    const resposta = await fetch(URL_BASE + caminho, {
      ...opcoes,
      headers: { 'Content-Type': 'application/json', ...opcoes.headers },
      signal: controlador.signal,
    })

    if (!resposta.ok) {
      const erroApi: ErroApi | null = await resposta.json().catch(() => null)
      throw new ErroDeRequisicao(erroApi?.mensagem ?? 'O servidor devolveu um erro inesperado.', resposta.status)
    }

    const texto = await resposta.text()
    return (texto ? JSON.parse(texto) : null) as T
  } catch (erro) {
    if (erro instanceof ErroDeRequisicao) {
      throw erro
    }
    if (erro instanceof DOMException && erro.name === 'AbortError') {
      throw new ErroDeRequisicao('O servidor demorou demais para responder. Tente novamente.', 0)
    }
    throw new ErroDeRequisicao('Não foi possível falar com a API. Confira sua internet e tente novamente.', 0)
  } finally {
    clearTimeout(temporizador)
  }
}