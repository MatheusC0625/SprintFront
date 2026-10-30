import { useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BotaoRealizarMissao from '../components/BotaoRealizarMissao'
import Card from '../components/Card'
import EstadoDaTela from '../components/EstadoDaTela'
import Selo from '../components/Selo'
import { corDoTema, nomeDoTema, nomeDoTipo, regraDoTipo } from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { buscarMissao } from '../services/missoes'
import { classeBotao } from '../utils/estilos'

export default function MissaoDetalhe() {
  const { id } = useParams<{ id: string }>()
  const buscar = useCallback(() => buscarMissao(Number(id)), [id])
  const { dados: missao, carregando, erro, tentarNovamente } = useRequisicao(buscar)

  useEffect(() => {
    document.title = missao ? `${missao.titulo} - NUVA` : 'Missão - NUVA'
  }, [missao])

  return (
    <EstadoDaTela carregando={carregando} erro={erro} aoTentarNovamente={tentarNovamente}>
      {missao && (
        <Card>
          <div className="mb-3 flex flex-wrap gap-2">
            <Selo cor={corDoTema[missao.categoria]}>{nomeDoTema[missao.categoria]}</Selo>
            <Selo cor="bg-azul/10 text-azul">{nomeDoTipo[missao.tipoMissao]}</Selo>
            {!missao.ativa && <Selo cor="bg-gray-200 text-gray-700">Inativa</Selo>}
          </div>

          <h1 className="mb-2 font-heading text-2xl font-bold text-azul-escuro sm:text-3xl">{missao.titulo}</h1>
          <p className="mb-4 leading-relaxed text-gray-700">{missao.descricao}</p>

          <p className="mb-2 font-heading text-xl font-bold text-teal">+{missao.recompensaBase} SoulCoins</p>
          <p className="mb-6 text-sm text-gray-600">{regraDoTipo[missao.tipoMissao]}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <BotaoRealizarMissao missao={missao} />
            <Link to="/missoes" className={classeBotao('secundario')}>
              Voltar para as missões
            </Link>
          </div>
        </Card>
      )}
    </EstadoDaTela>
  )
}