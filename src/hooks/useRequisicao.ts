import { useEffect, useState } from 'react'
import { mensagemDeErro } from '../utils/erros'

interface Resposta<T> {
  buscar: () => Promise<T>
  tentativa: number
  dados: T | null
  erro: string
}

export default function useRequisicao<T>(buscar: () => Promise<T>) {
  const [resposta, setResposta] = useState<Resposta<T> | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true

    buscar()
      .then((dados) => {
        if (ativo) setResposta({ buscar, tentativa, dados, erro: '' })
      })
      .catch((falha) => {
        const erro = mensagemDeErro(falha, 'Algo deu errado ao carregar os dados.')
        if (ativo) setResposta({ buscar, tentativa, dados: null, erro })
      })

    return () => {
      ativo = false
    }
  }, [buscar, tentativa])

  const atual = resposta && resposta.buscar === buscar && resposta.tentativa === tentativa ? resposta : null

  function tentarNovamente() {
    setTentativa((valor) => valor + 1)
  }

  return {
    dados: atual?.dados ?? null,
    carregando: atual === null,
    erro: atual?.erro ?? '',
    tentarNovamente,
  }
}