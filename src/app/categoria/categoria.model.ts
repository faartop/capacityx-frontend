export interface Categoria {
  id?: number;
  descricao: string;
  inicio_vigencia: Date | string;
  fim_vigencia?: Date | string;
  id_categoria_pai: number;
  id_responsavel: number;
  categoria_pai?: {
    id?: number;
    descricao?: string;
  };
  responsavel?: {
    id?: number;
    nome?: string;
  }
}
