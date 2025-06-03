export interface CategoriaPai {
  id?: number;
  descricao: string;
  inicio_vigencia: Date | string;
  fim_vigencia?: Date | string;
}
