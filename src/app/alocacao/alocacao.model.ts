export interface Alocacao {
  id?: number;
  competencia: Date | string;
  id_tecnico: number;
  id_contrato?: number;
  id_item_projeto_categoria?: number;
  qtd_hrs_alocadas: number;
  qtd_hrs_comerciais: number;
  data_exclusao?: Date | string;
  tecnico?: {
    id?: number;
    usuario?: { nome: string };
    categoria?: { descricao: string };
  };
  contrato?: {
    id?: number;
    cliente?: { nome: string };
    categoria?: { descricao: string };
    prioridade?: { descricao: string };
    tipo_atendimento?: { descricao: string };
    tipo_contrato?: { descricao: string };
  };
  item_projeto_categoria?: {
    id?: number;
    descricao: string;
    projeto_categoria?: {
      projeto?: { nome: string; cliente?: { nome: string } };
      categoria?: { descricao: string };
    };
  };
}
