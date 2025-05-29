export interface Cliente {
    id?: number;
    nome: string;
    status: boolean
    inicio_vigencia: Date | string;
    fim_vigencia?: Date | string;
}
