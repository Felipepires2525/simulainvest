async function simularCDB() {
  const inst = document.getElementById("instituicao").value;
  const valor = 1000;

  const taxas = {
    nubank: 0.13,
    inter: 0.127,
    xp: 0.132
  };

  const taxa = taxas[inst];
  const rendimento = valor * (1 + taxa) ** 1;

  document.getElementById("resultadoTexto").innerText = 
    `Simulação CDB - ${inst.toUpperCase()}: Investindo R$ ${valor}, você terá R$ ${rendimento.toFixed(2)} em 1 ano a ${taxa * 100}% a.a.`;

  recomendar();
}

async function simularTesouro() {
  try {
    const response = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json");
    const data = await response.json();
    const selicHoje = parseFloat(data[0].valor.replace(",", ".")) / 100;

    const valor = 1000;
    const rendimento = valor * (1 + selicHoje) ** 1;

    document.getElementById("resultadoTexto").innerText = 
      `Simulação Tesouro Selic: R$ ${valor} → R$ ${rendimento.toFixed(2)} em 1 ano com taxa Selic atual de ${(selicHoje * 100).toFixed(2)}%`;

    recomendar();
  } catch (error) {
    document.getElementById("resultadoTexto").innerText = "Erro ao buscar taxa Selic.";
  }
}

async function simularAcao() {
  const ticker = document.getElementById("tickerAcao").value;
  const response = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/${ticker}?apikey=demo`);
  const data = await response.json();

  if (!data.length) {
    document.getElementById("resultadoTexto").innerText = "Ação não encontrada.";
    return;
  }

  const preco = data[0].price;
  document.getElementById("resultadoTexto").innerText =
    `Último preço da ação ${ticker.toUpperCase()}: $${preco}`;

  recomendar();
}

async function simularCripto() {
  const moeda = document.getElementById("tickerCripto").value.toLowerCase();
  const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`);
  const data = await response.json();

  const key = Object.keys(data)[0];
  if (!key || !data[key]) {
    document.getElementById("resultadoTexto").innerText = "Criptomoeda não encontrada.";
    return;
  }

  const preco = data[key].bid;
  document.getElementById("resultadoTexto").innerText =
    `Cotação atual de ${moeda.toUpperCase()} → R$ ${parseFloat(preco).toFixed(2)}`;

  recomendar();
}

function recomendar() {
  const recomendacoes = [
    "Diversifique entre CDB e Tesouro IPCA+ para proteger seu poder de compra.",
    "Invista parte em criptomoedas se tiver perfil moderado a agressivo.",
    "Prefira LCIs para rendimentos isentos de IR.",
    "Tesouro Prefixado pode ser vantajoso se a Selic cair nos próximos anos."
  ];
  const aleatoria = recomendacoes[Math.floor(Math.random() * recomendacoes.length)];
  document.getElementById("recomendacao").innerText = aleatoria;
}
