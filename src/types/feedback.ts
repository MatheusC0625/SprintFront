export type TipoAviso = 'sucesso' | 'erro' | 'aviso'

export interface AvisoNaTela {
  texto: string
  tipo: TipoAviso
}