export interface Task {
  id: number,
  titulo: string;
  feito: boolean,
  criadoEm: Date,
  atualizadoEm: Date | undefined
}
