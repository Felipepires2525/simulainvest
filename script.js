// script de simulação aqui...

// Simular Tesouro Selic com taxa real do BCB (SELIC atual)
async function simularTesouro() {
  const lista = document.getElementById("resultadoTexto");
  try {
    const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json";
    const res = await fetch(url);
    const data = await res.json();
    const selic = parseFloat(data[0].valor.replace(",", ".")) / 100;
    const valorInicial = 1000;
    const rendimento = valorInicial * (1 + selic);
    const resultado = `Tesouro Selic: R$ ${valorInicial} → R$ ${rendimento.toFixed(2)} a.a. (${(selic * 100).toFixed(2)}%)`;
    document.getElementById("resultadoTexto").innerText = resultado;
    recomendar();
  } catch (e) {
    lista.innerText = "Erro ao simular Tesouro Selic.";
  }
}
