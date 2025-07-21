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
    `Simulação CDB - ${inst.toUpperCase()}: R$ ${valor} → R$ ${rendimento.toFixed(2)} em 1 ano a ${taxa * 100}% a.a.`;
  recomendar();
}

async function simularTesouro() {
  try {
    const response = await fetch("https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados/ultimos/1?formato=json");
    const data = await response.json();
    const selicHoje = parseFloat(data[0].valor.replace(",", ".")) / 100;
    const valor = 1000;
    const rendimento = valor * (1 + selicHoje);
    document.getElementById("resultadoTexto").innerText =
      `Tesouro Selic: R$ ${valor} → R$ ${rendimento.toFixed(2)} em 1 ano com Selic a ${(selicHoje * 100).toFixed(2)}%`;
    recomendar();
  } catch (error) {
    document.getElementById("resultadoTexto").innerText = "Erro ao buscar Selic.";
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
    `Preço da ação ${ticker.toUpperCase()}: US$ ${preco}`;
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
    `Cotação de ${moeda.toUpperCase()}: R$ ${parseFloat(preco).toFixed(2)}`;
  recomendar();
}

async function buscarCotacoes() {
  const moedas = ['USD-BRL', 'EUR-BRL', 'BTC-BRL'];
  const lista = document.getElementById('cotacoesLista');
  lista.innerHTML = 'Carregando...';

  try {
    const response = await fetch(`https://economia.awesomeapi.com.br/last/${moedas.join(',')}`);
    const data = await response.json();

    lista.innerHTML = '';
    moedas.forEach(moeda => {
      const info = data[moeda.replace('-', '')];
      const li = document.createElement('li');
      li.textContent = `${info.name}: R$ ${parseFloat(info.bid).toFixed(2)}`;
      lista.appendChild(li);
    });
  } catch (error) {
    lista.innerHTML = 'Erro ao buscar cotações.';
  }
}

function recomendar() {
  const sugestoes = [
    "Considere diversificar entre renda fixa e variável.",
    "Criptomoedas podem ser voláteis, invista com cautela.",
    "Tesouro IPCA+ protege contra inflação.",
    "LCIs e LCAs são isentas de IR, boas para médio prazo."
  ];
  const aleatoria = sugestoes[Math.floor(Math.random() * sugestoes.length)];
  document.getElementById("recomendacao").innerText = aleatoria;
}
