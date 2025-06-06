export interface Tecnico {
  id?: number;
  id_usuario: number;
  id_categoria: number;
  know_how: number;
  inicio_vigencia: Date | string;
  fim_vigencia?: Date | string;
  status: boolean;
  usuario?: {
    id?: number;
    nome?: string;
  };
  categoria?: {
    id?: number;
    descricao?: string;
  }
}
