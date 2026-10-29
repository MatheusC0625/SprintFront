export type VarianteBotao = 'primario' | 'secundario' | 'perigo'

const variantes: Record<VarianteBotao, string> = {
  primario: 'bg-azul text-white hover:bg-teal',
  secundario: 'border border-azul bg-white text-azul hover:bg-azul hover:text-white',
  perigo: 'bg-red-600 text-white hover:bg-red-700',
}

export function classeBotao(variante: VarianteBotao = 'primario') {
  return `inline-block rounded-lg px-5 py-2.5 text-center text-sm font-semibold transition-all hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 ${variantes[variante]}`
}

export function classeCampo(comErro = false) {
  const borda = comErro
    ? 'border-red-400 focus:ring-red-100'
    : 'border-gray-300 focus:border-azul focus:ring-azul/12'
  return `block w-full rounded-lg border bg-gray-50 px-3.5 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-3 ${borda}`
}