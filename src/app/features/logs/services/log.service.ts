import { Injectable } from '@angular/core';
import { db } from '../../../core/database/app-database';
import { liveQuery } from 'dexie';
import { from } from 'rxjs';
import type { Log } from '../models/log.model';
import type { Execucao } from '../models/execucao.model';


@Injectable({
    providedIn: 'root'
})
export class LogService {

    // Retorna um Observable do RxJS, ótimo para o Angular
    async obterLogs(): Promise<Log[]> {
        // liveQuery atualiza os dados automaticamente se houver mudanças no IndexedDB
        return await db.logs.toArray();
    }

    async adicionarLog(log: Log): Promise<number> {
        const id = await db.logs.add(log);
        return id;
    }

    async atualizarLog(id: number, mudancas: Partial<Log>): Promise<number> {
        return await db.logs.update(id, mudancas);
    }

    async adicionarExecucao(id: number, execucao: Execucao): Promise<void> {
        const log = await db.logs.get(id);
        if (log) {
            log.execucoes.push(execucao);
            await db.logs.update(id, { execucoes: log.execucoes });
        }
    }

    async deletarLog(id: number): Promise<void> {
        await db.logs.delete(id);
    }

    async exportLog(id: number): Promise<Log | undefined> {
        return await db.logs.get(id);
    }
}
