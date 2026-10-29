import Button from './Button'

interface MensagemErroProps {
  mensagem: string
  aoTentarNovamente: () => void
}

export default function MensagemErro({ mensagem, aoTentarNovamente }: MensagemErroProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="mb-1 font-heading font-semibold text-red-700">Não foi possível carregar</p>
      <p className="mb-4 text-sm text-red-600">{mensagem}</p>
      <Button onClick={aoTentarNovamente}>Tentar novamente</Button>
    </div>
  )
}