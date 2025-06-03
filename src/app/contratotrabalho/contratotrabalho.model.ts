export interface ContratoTrabalho {
  id?: number;
  nivel_tecnico: string;
  carga_horaria: number;
  inicio_vigencia: Date | string;
  fim_vigencia?: Date | string;
  status: boolean;
}
