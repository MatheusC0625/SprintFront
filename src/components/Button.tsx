import type { ButtonHTMLAttributes } from 'react'
import { classeBotao } from '../utils/estilos'
import type { VarianteBotao } from '../utils/estilos'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBotao
}

export default function Button({ variante = 'primario', className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${classeBotao(variante)} ${className}`} {...props}>
      {children}
    </button>
  )
}