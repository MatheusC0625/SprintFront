import { useState } from 'react'
import Card from '../components/Card'
import MemberCard from '../components/MemberCard'
import PageTitle from '../components/PageTitle'
import { members } from '../data/members'

export default function Integrantes() {
  const [busca, setBusca] = useState('')

  const filtrados = members.filter((member) =>
    member.name.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <>
      <PageTitle>Equipe</PageTitle>

      <Card>
        <p className="mb-4 text-center font-heading text-lg font-bold text-azul-escuro">Turma 1TDSPV</p>

        <input
          type="search"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Buscar integrante pelo nome..."
          className="mb-5 w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm focus:border-azul focus:bg-white focus:outline-none focus:ring-3 focus:ring-azul/12"
        />

        {filtrados.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtrados.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Nenhum integrante encontrado para "{busca}".</p>
        )}
      </Card>
    </>
  )
}
