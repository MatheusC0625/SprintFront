import { Link } from 'react-router-dom'
import BotaoRealizarMissao from './BotaoRealizarMissao'
import Selo from './Selo'
import { corDoTema, nomeDoTema, nomeDoTipo } from '../data/rotulos'
import type { Missao } from '../types/api'

export default function MissaoCard({ missao }: { missao: Missao }) {
  return (
    <li className="flex flex-col rounded-xl border border-azul/15 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex flex-wrap gap-2">
        <Selo cor={corDoTema[missao.categoria]}>{nomeDoTema[missao.categoria]}</Selo>
        <Selo cor="bg-azul/10 text-azul">{nomeDoTipo[missao.tipoMissao]}</Selo>
      </div>
      <Link
        to={`/missoes/${missao.idMissao}`}
        className="mb-1 font-heading text-lg font-semibold text-azul-escuro hover:underline"
      >
        {missao.titulo}
      </Link>
      <p className="mb-4 flex-1 text-sm text-gray-600">{missao.descricao}</p>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-heading font-bold whitespace-nowrap text-teal">+{missao.recompensaBase} SoulCoins</span>
        <BotaoRealizarMissao missao={missao} />
      </div>
    </li>
  )
}