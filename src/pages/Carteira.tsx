import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import EstadoDaTela from '../components/EstadoDaTela'
import PageTitle from '../components/PageTitle'
import SeletorDeUsuario from '../components/SeletorDeUsuario'
import Selo from '../components/Selo'
import { useFeedback } from '../contexts/FeedbackContext'
import { useUsuario } from '../contexts/UsuarioContext'
import {
  corDoStatusExecucao,
  corDoStatusPontuacao,
  nomeDaOrigem,
  nomeDoStatusExecucao,
  nomeDoStatusPontuacao,
} from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { buscarCarteira, registrarBonusSocial } from '../services/pontuacoes'
import type { Usuario } from '../types/api'
import { mensagemDeErro } from '../utils/erros'
import { classeCampo } from '../utils/estilos'
import { formatarData, formatarReais } from '../utils/formatar'

interface FormBonus {
  reacoes: number
}

function CarteiraDoUsuario({ usuario }: { usuario: Usuario }) {
  const buscar = useCallback(() => buscarCarteira(usuario.idUsuario), [usuario.idUsuario])
  const { dados: carteira, carregando, erro, tentarNovamente } = useRequisicao(buscar)
  const { mostrarMensagem } = useFeedback()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormBonus>()

  async function enviarBonus(valores: FormBonus) {
    try {
      await registrarBonusSocial({ usuarioId: usuario.idUsuario, reacoes: valores.reacoes })
      mostrarMensagem('Bônus social registrado! Confira o extrato abaixo.')
      reset()
      tentarNovamente()
    } catch (falha) {
      mostrarMensagem(mensagemDeErro(falha, 'Não foi possível registrar o bônus social.'), 'erro')
    }
  }

  const ultimasExecucoes = [...(carteira?.execucoes ?? [])].sort((a, b) => b.idExecucao - a.idExecucao).slice(0, 5)

  return (
    <>
      <PageTitle>{`Carteira de ${usuario.nome}`}</PageTitle>

      <EstadoDaTela carregando={carregando} erro={erro} aoTentarNovamente={tentarNovamente}>
        {carteira && (
          <>
            <div className="mb-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-azul-escuro to-[#1a3a7a] p-5 text-white">
                <p className="text-sm text-white/75">Saldo em SoulCoins</p>
                <p className="font-heading text-3xl font-bold">{carteira.saldoSoulCoins}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-muted">Crédito na conta de luz</p>
                <p className="font-heading text-3xl font-bold text-teal">{formatarReais(carteira.creditoReais)}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <p className="text-sm text-muted">Comunidade</p>
                <p className="font-heading text-lg font-bold text-azul-escuro">{usuario.comunidade.nome}</p>
              </div>
            </div>
            <p className="mb-5 text-center text-sm text-muted">
              100 SoulCoins valem R$ 1,00 e cada ponto expira em 60 dias.
            </p>

            <Card title="Extrato">
              {carteira.extrato.length === 0 ? (
                <p className="text-muted">Ainda não há pontos no extrato. Que tal fazer uma missão?</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[32rem] text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-muted">
                        <th className="py-2 pr-3 font-semibold">Data</th>
                        <th className="py-2 pr-3 font-semibold">Origem</th>
                        <th className="py-2 pr-3 font-semibold">Pontos</th>
                        <th className="py-2 pr-3 font-semibold">Expira em</th>
                        <th className="py-2 font-semibold">Situação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carteira.extrato.map((item) => (
                        <tr key={item.idPontuacao} className="border-b border-gray-100 last:border-0">
                          <td className="py-2 pr-3">{formatarData(item.dataGeracao)}</td>
                          <td className="py-2 pr-3">{nomeDaOrigem[item.origem]}</td>
                          <td className="py-2 pr-3 font-semibold text-teal">+{item.pontos}</td>
                          <td className="py-2 pr-3">{formatarData(item.dataExpiracao)}</td>
                          <td className="py-2">
                            <Selo cor={corDoStatusPontuacao[item.status]}>{nomeDoStatusPontuacao[item.status]}</Selo>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            <Card title="Últimas missões" accent="teal">
              {ultimasExecucoes.length === 0 ? (
                <p className="text-muted">
                  Você ainda não realizou nenhuma missão.{' '}
                  <Link to="/missoes" className="text-azul underline">
                    Ver missões
                  </Link>
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {ultimasExecucoes.map((execucao) => (
                    <li key={execucao.idExecucao} className="flex flex-wrap items-center justify-between gap-2 py-2">
                      <span className="text-gray-700">
                        {execucao.missao.titulo}{' '}
                        <span className="text-sm text-muted">({formatarData(execucao.dataConclusao)})</span>
                      </span>
                      <Selo cor={corDoStatusExecucao[execucao.status]}>{nomeDoStatusExecucao[execucao.status]}</Selo>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card title="Bônus social">
              <p className="mb-4 text-sm text-gray-600">
                A cada 10 reações no post de uma missão você ganha 5 SoulCoins. Informe quantas reações recebeu.
              </p>
              <form onSubmit={handleSubmit(enviarBonus)} noValidate className="sm:flex sm:items-start sm:gap-3">
                <div className="mb-3 flex-1 sm:mb-0">
                  <input
                    type="number"
                    placeholder="Quantidade de reações"
                    aria-label="Quantidade de reações"
                    aria-invalid={errors.reacoes ? 'true' : 'false'}
                    className={classeCampo(Boolean(errors.reacoes))}
                    {...register('reacoes', {
                      valueAsNumber: true,
                      required: 'Informe a quantidade de reações.',
                      min: { value: 10, message: 'São necessárias pelo menos 10 reações.' },
                      validate: (valor) => Number.isInteger(valor) || 'Use um número inteiro.',
                    })}
                  />
                  {errors.reacoes && <p className="mt-1 text-xs font-medium text-red-500">{errors.reacoes.message}</p>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? 'Enviando...' : 'Registrar bônus'}
                </Button>
              </form>
            </Card>
          </>
        )}
      </EstadoDaTela>
    </>
  )
}

export default function Carteira() {
  const { usuarioAtual } = useUsuario()

  if (!usuarioAtual) {
    return (
      <>
        <PageTitle>Carteira</PageTitle>
        <SeletorDeUsuario />
      </>
    )
  }

  return <CarteiraDoUsuario usuario={usuarioAtual} />
}