import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useUsuario } from '../contexts/UsuarioContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/missoes', label: 'Missões' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/carteira', label: 'Carteira' },
  { to: '/usuarios', label: 'Usuários' },
  { to: '/solucao', label: 'Solução' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/integrantes', label: 'Integrantes' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const { usuarioAtual } = useUsuario()
  const textoDoUsuario = usuarioAtual ? `Jogando como ${usuarioAtual.nome}` : 'Escolher usuário'

  return (
    <header className="relative bg-gradient-to-br from-azul-escuro to-[#162b5e] px-4 py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-gradient-to-r after:from-azul after:to-teal sm:px-6 lg:py-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          NUVA
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/usuarios"
            className="hidden max-w-[14rem] truncate rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20 sm:block"
          >
            {textoDoUsuario}
          </Link>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuAberto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        className={`mx-auto mt-3 max-w-6xl flex-col gap-1 lg:mt-3 lg:flex lg:flex-row lg:flex-wrap lg:justify-center ${
          menuAberto ? 'flex' : 'hidden'
        }`}
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setMenuAberto(false)}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition-colors lg:py-1.5 ${
                isActive ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/12 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <Link
          to="/usuarios"
          onClick={() => setMenuAberto(false)}
          className="mt-2 rounded-full bg-white/10 px-4 py-2 text-center text-xs font-medium text-white sm:hidden"
        >
          {textoDoUsuario}
        </Link>
      </nav>
    </header>
  )
}