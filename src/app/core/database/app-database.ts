import Dexie, { Table } from 'dexie';
import type { Log } from '../../features/logs/models/log.model';

export class AppDatabase extends Dexie {
    // A propriedade 'tabelas' usa Table<Tipo, ChavePrimária> para tipagem estrita
    logs!: Table<Log, number>;

    constructor() {
        super('AppDatabase');

        // Define a versão do banco de dados e os índices (o que será buscado/filtrado)
        this.version(1).stores({
            logs: '++id, dataHoraInicio, dataHoraFim, execucoes' // '++' para autoIncrement
        });
    }
}

// Cria uma única instância (Singleton) para ser usada em toda a aplicação
export const db = new AppDatabase();
