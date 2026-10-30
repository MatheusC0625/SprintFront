import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import EstadoDaTela from '../components/EstadoDaTela'
import PageTitle from '../components/PageTitle'
import Selo from '../components/Selo'
import { useFeedback } from '../contexts/FeedbackContext'
import { useUsuario } from '../contexts/UsuarioContext'
import { corDoTema, nomeDoTema } from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { excluirUsuario, listarUsuarios } from '../services/usuarios'
import type { Usuario } from '../types/api'
import { mensagemDeErro } from '../utils/erros'
import { classeBotao } from '../utils/estilos'
import { formatarData } from '../utils/formatar'

export default function Usuarios() {
  const { dados, carregando, erro, tentarNovamente } = useRequisicao(listarUsuarios)
  const { usuarioAtual, entrar, sair } = useUsuario()
  const { mostrarMensagem } = useFeedback()
  const [excluindo, setExcluindo] = useState<number | null>(null)
  const usuarios = dados ?? []

  async function excluir(usuario: Usuario) {
    if (!window.confirm(`Excluir o usuário ${usuario.nome}?`)) return

    setExcluindo(usuario.idUsuario)
    try {
      await excluirUsuario(usuario.idUsuario)
      if (usuarioAtual?.idUsuario === usuario.idUsuario) sair()
      mostrarMensagem(`Usuário ${usuario.nome} excluído com sucesso.`)
      tentarNovamente()
    } catch (falha) {
      const mensagem = mensagemDeErro(falha, 'Não foi possível excluir o usuário.')
      const temRegistros = mensagem.includes('ORA-02292')
      mostrarMensagem(
        temRegistros ? 'Este usuário já tem missões ou pontos registrados e não pode ser excluído.' : mensagem,
        'erro',
      )
    } finally {
      setExcluindo(null)
    }
  }

  return (
    <>
      <PageTitle>Usuários</PageTitle>

      <div className="mb-6 text-center">
        <Link to="/usuarios/novo" className={classeBotao()}>
          Novo usuário
        </Link>
      </div>

      <EstadoDaTela
        carregando={carregando}
        erro={erro}
        vazio={usuarios.length === 0}
        textoVazio="Nenhum usuário cadastrado ainda. Cadastre o primeiro!"
        aoTentarNovamente={tentarNovamente}
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {usuarios.map((usuario) => {
            const jogando = usuarioAtual?.idUsuario === usuario.idUsuario

            return (
              <li
                key={usuario.idUsuario}
                className={`rounded-xl bg-white p-5 shadow-sm ${jogando ? 'ring-2 ring-teal' : ''}`}
              >
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-heading text-lg font-semibold text-azul-escuro">{usuario.nome}</span>
                  {jogando && <Selo cor="bg-teal/15 text-teal">Jogando agora</Selo>}
                </div>
                <p className="mb-2 break-all text-sm text-muted">{usuario.email}</p>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <Selo cor={corDoTema[usuario.comunidade.tema]}>{nomeDoTema[usuario.comunidade.tema]}</Selo>
                  <span>{usuario.comunidade.nome}</span>
                </div>
                <p className="mb-4 text-xs text-muted">
                  Cadastro em {formatarData(usuario.dataCadastro)} · saldo de {usuario.saldoAtual ?? 0} SoulCoins
                </p>
                <div className="flex flex-wrap gap-2">
                  {!jogando && (
                    <Button variante="secundario" onClick={() => entrar(usuario)}>
                      Usar este usuário
                    </Button>
                  )}
                  <Link to={`/usuarios/${usuario.idUsuario}/editar`} className={classeBotao('secundario')}>
                    Editar
                  </Link>
                  <Button
                    variante="perigo"
                    onClick={() => excluir(usuario)}
                    disabled={excluindo === usuario.idUsuario}
                  >
                    {excluindo === usuario.idUsuario ? 'Excluindo...' : 'Excluir'}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </EstadoDaTela>
    </>
  )
}