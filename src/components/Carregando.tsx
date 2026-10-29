import { useEffect, useState } from 'react'

export default function Carregando() {
  const [demorando, setDemorando] = useState(false)

  useEffect(() => {
    const temporizador = setTimeout(() => setDemorando(true), 5000)
    return () => clearTimeout(temporizador)
  }, [])

  return (
    <div role="status" className="py-10 text-center">
      <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-azul/20 border-t-azul" />
      <p className="font-semibold text-azul-escuro">Carregando...</p>
      {demorando && (
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Isso está levando mais tempo que o normal. Se o servidor estava parado, ele pode levar até 1 minuto para
          acordar, então aguarde um instante.
        </p>
      )}
    </div>
  )
}