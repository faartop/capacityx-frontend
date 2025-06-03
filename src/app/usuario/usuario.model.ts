export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  nivel_acesso: number;
  id_contrato_trabalho: number;
  inicio_vigencia: Date | string;
  fim_vigencia?: Date | string;
  status: boolean;
  contrato_trabalho?: {
    id?: number;
    nivel_tecnico?: string;
  };
}
