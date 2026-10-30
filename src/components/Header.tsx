import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/missoes', label: 'Missões' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/carteira', label: 'Carteira' },
  { to: '/usuarios', label: 'Usuários' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/solucao', label: 'Solução' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-azul-escuro to-[#162b5e] px-8 py-6 text-center after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-gradient-to-r after:from-azul after:to-teal">
      <h1 className="mb-3.5 font-heading text-3xl font-bold tracking-tight text-white">NUVA</h1>
      <nav className="flex flex-wrap justify-center gap-1.5">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/12 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
