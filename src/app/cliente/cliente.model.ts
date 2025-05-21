export interface Cliente {
    id?: number;
    id_usuario: number;
    nome: string;
    status: boolean
    inicio_vigencia: Date | string;
    fim_vigencia?: Date | string;
}
