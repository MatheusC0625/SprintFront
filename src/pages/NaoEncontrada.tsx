import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { classeBotao } from '../utils/estilos'

export default function NaoEncontrada() {
  useEffect(() => {
    document.title = 'Página não encontrada - NUVA'
  }, [])

  return (
    <Card>
      <p className="mb-1 text-center font-heading text-5xl font-bold text-azul">404</p>
      <h1 className="mb-2 text-center font-heading text-2xl font-bold text-azul-escuro">Página não encontrada</h1>
      <p className="mb-6 text-center text-gray-700">
        O endereço que você tentou abrir não existe ou mudou de lugar. Que tal voltar para o começo?
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/" className={classeBotao()}>
          Ir para a Home
        </Link>
        <Link to="/missoes" className={classeBotao('secundario')}>
          Ver missões
        </Link>
      </div>
    </Card>
  )
}