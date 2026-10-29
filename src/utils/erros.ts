export function mensagemDeErro(erro: unknown, padrao: string) {
  return erro instanceof Error ? erro.message : padrao
}