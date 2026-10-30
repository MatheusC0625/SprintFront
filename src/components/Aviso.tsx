import type { AvisoNaTela, TipoAviso } from '../types/feedback'

interface AvisoProps {
  aviso: AvisoNaTela
  aoFechar: () => void
}

const cores: Record<TipoAviso, string> = {
  sucesso: 'border-teal bg-teal/10 text-azul-escuro',
  erro: 'border-red-400 bg-red-50 text-red-700',
  aviso: 'border-amber-400 bg-amber-50 text-amber-800',
}

export default function Aviso({ aviso, aoFechar }: AvisoProps) {
  return (
    <div
      role={aviso.tipo === 'erro' ? 'alert' : 'status'}
      className={`fixed inset-x-4 top-4 z-50 flex items-start justify-between gap-3 rounded-lg border-l-4 p-4 text-sm font-medium shadow-lg sm:left-auto sm:w-96 ${cores[aviso.tipo]}`}
    >
      <p>{aviso.texto}</p>
      <button type="button" onClick={aoFechar} aria-label="Fechar aviso" className="text-lg leading-none">
        ×
      </button>
    </div>
  )
}