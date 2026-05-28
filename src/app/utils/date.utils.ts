export function tempoTotalEmMinutosSegundos(dataInicio: Date, dataFim: Date): string {
  const diff = dataFim.getTime() - dataInicio.getTime();
  const minutos = Math.floor(diff / (1000 * 60));
  const segundos = Math.floor((diff / 1000) % 60);
  const minutosSufixo = minutos === 1 ? "minuto" : "minutos";
  const segundosSufixo = segundos === 1 ? "segundo" : "segundos";
  return minutos + " " + minutosSufixo + " e " + segundos + " " + segundosSufixo;
}

export function formatarDataHoraPadrao(data: Date): string {
  const dia = data.getDate().toString().padStart(2, '0');
  const mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`;
}
