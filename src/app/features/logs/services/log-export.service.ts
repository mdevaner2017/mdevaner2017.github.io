import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Log } from '../models/log.model';
import { Execucao } from '../models/execucao.model';
import { formatarDataHoraPadrao, tempoTotalEmMinutosSegundos } from '../../../utils/date.utils';

@Injectable({
  providedIn: 'root'
})
export class LogExportService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  private formatarExecucoes(execucoes: Execucao[]): string {
    let txt = "";
    const separador = "\n===================================\n\n";
    execucoes.forEach((execucao, index) => {
      txt += separador;
      txt += `Compilação ${index + 1}: ${formatarDataHoraPadrao(execucao.timestamp)}\n\n`;
      txt += `Código:\n${execucao.codigo}\n\n`;
      txt += `Saída:\n${execucao.saida}\n\n`;
    });
    txt += separador;
    return txt;
  }

  private getNomeArquivo(dataHoraInicio: Date, dataHoraFim: Date | null): string {
    const dataInicioFormatada = formatarDataHoraPadrao(dataHoraInicio);
    const dataFimFormatada = formatarDataHoraPadrao(dataHoraFim ?? new Date());
    return `log-${dataInicioFormatada}-a-${dataFimFormatada}.txt`.replace(/\s/g, "");
  }

  public exportLogTxt(log: Log | undefined): void {
    if (!log) return;

    const dataInicio = formatarDataHoraPadrao(log.dataHoraInicio);
    const dataFim = formatarDataHoraPadrao(log.dataHoraFim!);
    const tempoTotal = tempoTotalEmMinutosSegundos(log.dataHoraInicio, log.dataHoraFim ?? new Date());

    let txt = `Data Início: ${dataInicio}\n`;
    txt += `Data Fim: ${dataFim}\n`;
    txt += `Tempo total: ${tempoTotal}\n`;
    txt += `Quantidade de Compilações: ${log.execucoes.length}\n`;
    txt += `Versão Final do Código:${log.execucoes[log.execucoes.length - 1].codigo}\n\n`;
    txt += `Compilações:\n${this.formatarExecucoes(log.execucoes)}\n`;

    const nomeArquivo = this.getNomeArquivo(log.dataHoraInicio, log.dataHoraFim);
    this.downloadTxtFile(nomeArquivo, txt);
  }

  private downloadTxtFile(nomeArquivo: string, conteudo: string): void {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = this.document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    this.document.body.appendChild(a);
    a.click();
    this.document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
