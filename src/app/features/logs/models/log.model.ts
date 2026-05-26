import type { Execucao } from "./execucao.model";

export interface Log {
    id?: number;
    dataHoraInicio: Date;
    dataHoraFim: Date | null;
    execucoes: Execucao[];
}