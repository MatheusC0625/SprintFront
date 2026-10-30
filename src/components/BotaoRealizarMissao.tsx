import { useState } from 'react'
import Button from './Button'
import { useFeedback } from '../contexts/FeedbackContext'
import { useUsuario } from '../contexts/UsuarioContext'
import { registrarExecucao } from '../services/execucoes'
import type { Missao } from '../types/api'
import { mensagemDeErro } from '../utils/erros'

export default function BotaoRealizarMissao({ missao }: { missao: Missao }) {
  const { usuarioAtual } = useUsuario()
  const { mostrarMensagem } = useFeedback()
  const [enviando, setEnviando] = useState(false)

  async function realizar() {
    if (!usuarioAtual) return

    setEnviando(true)
    try {
      const execucao = await registrarExecucao({
        usuarioId: usuarioAtual.idUsuario,
        missaoId: missao.idMissao,
      })

      if (execucao.status === 'PENDENTE') {
        mostrarMensagem(`"${missao.titulo}" foi enviada e aguarda a validação do vídeo.`, 'aviso')
      } else {
        mostrarMensagem(`Missão "${missao.titulo}" concluída! Confira seus SoulCoins na carteira.`)
      }
    } catch (erro) {
      mostrarMensagem(mensagemDeErro(erro, 'Não foi possível registrar a missão.'), 'erro')
    } finally {
      setEnviando(false)
    }
  }

  const semUsuario = !usuarioAtual
  const titulo = semUsuario ? 'Escolha um usuário antes de realizar a missão' : undefined

  return (
    <Button
      onClick={realizar}
      disabled={semUsuario || !missao.ativa || enviando}
      title={titulo}
      className="whitespace-nowrap"
    >
      {enviando ? 'Enviando...' : missao.ativa ? 'Realizar missão' : 'Missão inativa'}
    </Button>
  )
}