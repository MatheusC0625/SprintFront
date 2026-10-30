import Card from './Card'
import EstadoDaTela from './EstadoDaTela'
import { useUsuario } from '../contexts/UsuarioContext'
import useRequisicao from '../hooks/useRequisicao'
import { listarUsuarios } from '../services/usuarios'
import { classeCampo } from '../utils/estilos'

export default function SeletorDeUsuario() {
  const { entrar } = useUsuario()
  const { dados, carregando, erro, tentarNovamente } = useRequisicao(listarUsuarios)
  const usuarios = dados ?? []

  function escolher(valor: string) {
    const escolhido = usuarios.find((usuario) => usuario.idUsuario === Number(valor))
    if (escolhido) entrar(escolhido)
  }

  return (
    <Card title="Quem está jogando?" accent="teal">
      <p className="mb-4 text-gray-700">Escolha um usuário para realizar missões e ver a carteira de SoulCoins.</p>
      <EstadoDaTela
        carregando={carregando}
        erro={erro}
        vazio={usuarios.length === 0}
        textoVazio="Nenhum usuário cadastrado ainda."
        aoTentarNovamente={tentarNovamente}
      >
        <select
          defaultValue=""
          onChange={(event) => escolher(event.target.value)}
          aria-label="Escolher usuário"
          className={classeCampo()}
        >
          <option value="" disabled>
            Selecione um usuário
          </option>
          {usuarios.map((usuario) => (
            <option key={usuario.idUsuario} value={usuario.idUsuario}>
              {usuario.nome} — {usuario.comunidade.nome}
            </option>
          ))}
        </select>
      </EstadoDaTela>
    </Card>
  )
}