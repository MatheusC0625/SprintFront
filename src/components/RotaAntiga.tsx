import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFeedback } from '../contexts/FeedbackContext'

export default function RotaAntiga({ para }: { para: string }) {
  const navigate = useNavigate()
  const { mostrarMensagem } = useFeedback()

  useEffect(() => {
    mostrarMensagem('Esse endereço mudou. Levamos você para a página nova.', 'aviso')
    navigate(para, { replace: true })
  }, [para, navigate, mostrarMensagem])

  return null
}