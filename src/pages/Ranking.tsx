import Card from '../components/Card'
import EstadoDaTela from '../components/EstadoDaTela'
import PageTitle from '../components/PageTitle'
import Selo from '../components/Selo'
import { corDoTema, nomeDoTema } from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { buscarRanking } from '../services/comunidades'

export default function Ranking() {
  const { dados, carregando, erro, tentarNovamente } = useRequisicao(buscarRanking)
  const ranking = dados?.ranking ?? []
  const vencedoras = dados?.vencedoras ?? []
  const maiorPontuacao = Math.max(1, ...ranking.map((comunidade) => comunidade.pontuacaoTotal))

  return (
    <>
      <PageTitle>Ranking das comunidades</PageTitle>

      <EstadoDaTela
        carregando={carregando}
        erro={erro}
        vazio={ranking.length === 0}
        textoVazio="Nenhuma comunidade cadastrada ainda."
        aoTentarNovamente={tentarNovamente}
      >
        {vencedoras.length > 0 && (
          <Card title={vencedoras.length > 1 ? 'Comunidades vencedoras' : 'Comunidade vencedora'} accent="teal">
            <ul className="space-y-1">
              {vencedoras.map((comunidade) => (
                <li key={comunidade.idComunidade} className="text-gray-700">
                  <strong className="text-azul-escuro">{comunidade.nome}</strong> com {comunidade.pontuacaoTotal}{' '}
                  SoulCoins
                </li>
              ))}
            </ul>
          </Card>
        )}

        <ol className="space-y-3">
          {ranking.map((comunidade) => (
            <li
              key={comunidade.idComunidade}
              className="rounded-xl bg-white p-4 shadow-sm sm:flex sm:items-center sm:gap-4 sm:p-5"
            >
              <span className="mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azul font-heading font-bold text-white sm:mb-0">
                {comunidade.posicao}º
              </span>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-heading font-semibold text-azul-escuro">{comunidade.nome}</span>
                  <Selo cor={corDoTema[comunidade.tema]}>{nomeDoTema[comunidade.tema]}</Selo>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-azul to-teal"
                    style={{ width: `${(comunidade.pontuacaoTotal / maiorPontuacao) * 100}%` }}
                  />
                </div>
              </div>
              <p className="mt-2 font-heading text-lg font-bold text-teal sm:mt-0 sm:w-32 sm:text-right">
                {comunidade.pontuacaoTotal} pts
              </p>
            </li>
          ))}
        </ol>
      </EstadoDaTela>
    </>
  )
}