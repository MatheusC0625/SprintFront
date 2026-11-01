import { Link } from 'react-router-dom'
import Card from '../components/Card'

const atalhos = [
  {
    to: '/missoes',
    titulo: 'Missões',
    texto: 'Escolha uma missão sustentável, realize e ganhe SoulCoins.',
  },
  {
    to: '/ranking',
    titulo: 'Ranking',
    texto: 'Veja qual comunidade está na frente da disputa.',
  },
  {
    to: '/carteira',
    titulo: 'Carteira',
    texto: 'Acompanhe seu saldo, o extrato e o crédito na conta de luz.',
  },
]

export default function Home() {
  return (
    <>
      <div className="mb-7 rounded-2xl bg-gradient-to-br from-azul-escuro to-[#1a3a7a] px-5 py-8 text-center text-white sm:px-9 sm:py-11 lg:py-14">
        <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
          Engajamento que gera valor real
        </h2>
        <p className="mx-auto mb-5 max-w-md text-white/75 lg:max-w-xl lg:text-lg">
          Plataforma de gamificação que transforma ações sustentáveis em dinheiro na conta de luz.
        </p>
        <span className="inline-block rounded-full bg-gradient-to-r from-azul to-teal px-5 py-2.5 font-heading text-base font-bold sm:px-7 sm:text-lg">
          100 SoulCoins = R$1,00 na sua fatura ⚡
        </span>
      </div>

      <ul className="mb-5 grid gap-4 md:grid-cols-3">
        {atalhos.map((atalho) => (
          <li key={atalho.to}>
            <Link
              to={atalho.to}
              className="block h-full rounded-xl border border-azul/15 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="mb-1 font-heading text-lg font-semibold text-azul">{atalho.titulo}</h3>
              <p className="text-sm text-gray-600">{atalho.texto}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Card title="Como funciona?">
        <ol className="ml-5 list-decimal space-y-2 text-gray-700">
          <li>Receba uma <strong>missão sustentável</strong> diária personalizada</li>
          <li>Realize a ação no mundo real</li>
          <li>Filme e envie — a <strong>IA valida na hora</strong></li>
          <li>Acumule <strong>SoulCoins</strong> e converta em crédito na conta de luz</li>
        </ol>
      </Card>

      <Card title="Por que a NUVA + SoulUp?">
        <p className="mb-2.5 leading-relaxed text-gray-700">
          Somos a única plataforma que converte ação sustentável comprovada em recompensa financeira real.
          Sem pontos fictícios, sem autodeclaração — cada ação é validada por inteligência artificial.
        </p>
        <p className="leading-relaxed text-gray-700">
          E o melhor: sua <strong>comunidade compete junto com você</strong>. Quanto mais sua liga age, mais
          todo mundo ganha.
        </p>
      </Card>
    </>
  )
}