import { useState } from 'react'
import { Link } from 'react-router-dom'
import EstadoDaTela from '../components/EstadoDaTela'
import MissaoCard from '../components/MissaoCard'
import PageTitle from '../components/PageTitle'
import SeletorDeUsuario from '../components/SeletorDeUsuario'
import { useUsuario } from '../contexts/UsuarioContext'
import { nomeDoTema, nomeDoTipo, temas, tiposDeMissao } from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { listarMissoes } from '../services/missoes'
import type { Tema, TipoMissao } from '../types/api'
import { classeCampo } from '../utils/estilos'

export default function Missoes() {
  const { dados, carregando, erro, tentarNovamente } = useRequisicao(listarMissoes)
  const { usuarioAtual } = useUsuario()
  const [categoria, setCategoria] = useState<Tema | 'TODAS'>('TODAS')
  const [tipo, setTipo] = useState<TipoMissao | 'TODOS'>('TODOS')

  const todas = dados ?? []
  const filtradas = todas.filter(
    (missao) =>
      (categoria === 'TODAS' || missao.categoria === categoria) &&
      (tipo === 'TODOS' || missao.tipoMissao === tipo),
  )

  return (
    <>
      <PageTitle>Missões</PageTitle>

      {usuarioAtual ? (
        <p className="mb-6 text-center text-sm text-muted">
          Jogando como <strong className="text-azul-escuro">{usuarioAtual.nome}</strong> ·{' '}
          <Link to="/usuarios" className="text-azul underline">
            trocar usuário
          </Link>
        </p>
      ) : (
        <SeletorDeUsuario />
      )}

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-azul-escuro">
          Categoria
          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value as Tema | 'TODAS')}
            className={`mt-1 ${classeCampo()}`}
          >
            <option value="TODAS">Todas as categorias</option>
            {temas.map((tema) => (
              <option key={tema} value={tema}>
                {nomeDoTema[tema]}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-azul-escuro">
          Tipo de missão
          <select
            value={tipo}
            onChange={(event) => setTipo(event.target.value as TipoMissao | 'TODOS')}
            className={`mt-1 ${classeCampo()}`}
          >
            <option value="TODOS">Todos os tipos</option>
            {tiposDeMissao.map((item) => (
              <option key={item} value={item}>
                {nomeDoTipo[item]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <EstadoDaTela
        carregando={carregando}
        erro={erro}
        vazio={todas.length === 0}
        textoVazio="Nenhuma missão cadastrada por enquanto."
        aoTentarNovamente={tentarNovamente}
      >
        {filtradas.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtradas.map((missao) => (
              <MissaoCard key={missao.idMissao} missao={missao} />
            ))}
          </ul>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-muted shadow-sm">
            Nenhuma missão encontrada com esses filtros.
          </p>
        )}
      </EstadoDaTela>
    </>
  )
}