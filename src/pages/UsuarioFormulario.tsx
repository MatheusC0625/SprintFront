import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import EstadoDaTela from '../components/EstadoDaTela'
import PageTitle from '../components/PageTitle'
import { useFeedback } from '../contexts/FeedbackContext'
import { useUsuario } from '../contexts/UsuarioContext'
import { nomeDoTema } from '../data/rotulos'
import useRequisicao from '../hooks/useRequisicao'
import { listarComunidades } from '../services/comunidades'
import { atualizarUsuario, buscarUsuario, cadastrarUsuario } from '../services/usuarios'
import type { Comunidade, NovoUsuario, Usuario } from '../types/api'
import { mensagemDeErro } from '../utils/erros'
import { classeBotao, classeCampo } from '../utils/estilos'

interface FormUsuario {
  nome: string
  email: string
  idComunidade: number
}

interface FormularioProps {
  comunidades: Comunidade[]
  usuario: Usuario | null
}

function Formulario({ comunidades, usuario }: FormularioProps) {
  const navigate = useNavigate()
  const { mostrarMensagem } = useFeedback()
  const { usuarioAtual, entrar } = useUsuario()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormUsuario>({
    defaultValues: {
      nome: usuario?.nome ?? '',
      email: usuario?.email ?? '',
      idComunidade: usuario?.comunidade.idComunidade,
    },
  })

  async function enviar(valores: FormUsuario) {
    const corpo: NovoUsuario = {
      nome: valores.nome.trim(),
      email: valores.email.trim(),
      comunidade: { idComunidade: Number(valores.idComunidade) },
    }

    try {
      if (usuario) {
        const atualizado = await atualizarUsuario(usuario.idUsuario, corpo)
        if (usuarioAtual?.idUsuario === atualizado.idUsuario) entrar(atualizado)
        mostrarMensagem('Usuário atualizado com sucesso.')
      } else {
        await cadastrarUsuario(corpo)
        mostrarMensagem('Usuário cadastrado com sucesso.')
      }
      navigate('/usuarios')
    } catch (falha) {
      mostrarMensagem(mensagemDeErro(falha, 'Não foi possível salvar o usuário.'), 'erro')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(enviar)} noValidate>
        <div className="mb-4">
          <label htmlFor="nome" className="mb-1 block text-sm font-semibold text-azul-escuro">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            aria-invalid={errors.nome ? 'true' : 'false'}
            className={classeCampo(Boolean(errors.nome))}
            {...register('nome', {
              required: 'Informe o nome.',
              minLength: { value: 2, message: 'O nome deve ter pelo menos 2 caracteres.' },
            })}
          />
          {errors.nome && <p className="mt-1 text-xs font-medium text-red-500">{errors.nome.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="mb-1 block text-sm font-semibold text-azul-escuro">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            className={classeCampo(Boolean(errors.email))}
            {...register('email', {
              required: 'Informe o e-mail.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Informe um e-mail válido.' },
            })}
          />
          {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="idComunidade" className="mb-1 block text-sm font-semibold text-azul-escuro">
            Comunidade
          </label>
          <select
            id="idComunidade"
            aria-invalid={errors.idComunidade ? 'true' : 'false'}
            className={classeCampo(Boolean(errors.idComunidade))}
            {...register('idComunidade', { required: 'Escolha uma comunidade.' })}
          >
            <option value="">Selecione uma comunidade</option>
            {comunidades.map((comunidade) => (
              <option key={comunidade.idComunidade} value={comunidade.idComunidade}>
                {comunidade.nome} ({nomeDoTema[comunidade.tema]})
              </option>
            ))}
          </select>
          {errors.idComunidade && (
            <p className="mt-1 text-xs font-medium text-red-500">{errors.idComunidade.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : usuario ? 'Salvar alterações' : 'Cadastrar usuário'}
          </Button>
          <Link to="/usuarios" className={classeBotao('secundario')}>
            Cancelar
          </Link>
        </div>
      </form>
    </Card>
  )
}

export default function UsuarioFormulario() {
  const { id } = useParams<{ id: string }>()
  const buscar = useCallback(async (): Promise<[Comunidade[], Usuario | null]> => {
    const comunidades = await listarComunidades()
    const usuario = id ? await buscarUsuario(Number(id)) : null
    return [comunidades, usuario]
  }, [id])
  const { dados, carregando, erro, tentarNovamente } = useRequisicao(buscar)

  return (
    <>
      <PageTitle>{id ? 'Editar usuário' : 'Novo usuário'}</PageTitle>
      <EstadoDaTela carregando={carregando} erro={erro} aoTentarNovamente={tentarNovamente}>
        {dados && <Formulario comunidades={dados[0]} usuario={dados[1]} />}
      </EstadoDaTela>
    </>
  )
}