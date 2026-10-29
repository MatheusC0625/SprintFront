interface SeloProps {
  cor: string
  children: string
}

export default function Selo({ cor, children }: SeloProps) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${cor}`}>{children}</span>
}