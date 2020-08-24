function CalcularJuros(CapitalInicial, TaxaJuros, Tempo) {
  const JurosCompostos = [];
  GerarJurosCompostos(
    JurosCompostos,
    GerarParametrosParcela(CapitalInicial, TaxaJuros, Tempo)
  );
  return JurosCompostos;
}

function GerarJurosCompostos(jurosCompostos, parametros) {
  const { CapitalInicial, TaxaJuros, Tempo, Parcela } = parametros;
  if (Parcela > Tempo) {
    return false;
  }
  let tx = TaxaJuros / 100;
  tx = tx + 1;

  // Calculando o Juros de 1 Mes
  const TotalCapitalInicial = CapitalInicial * Math.pow(tx, 1);
  const PrimeiroRendimento = TotalCapitalInicial - CapitalInicial;

  // Calculando o Juros de N Meses
  parametros.TotalRendimento = CapitalInicial * Math.pow(tx, Parcela);
  parametros.Rendimento = parametros.TotalRendimento - CapitalInicial;
  parametros.JurosMes =
    (parametros.Rendimento * (TaxaJuros / 100)) / PrimeiroRendimento;

  jurosCompostos.push(parametros);
  GerarJurosCompostos(
    jurosCompostos,
    GerarParametrosParcela(CapitalInicial, TaxaJuros, Tempo, Parcela + 1)
  );
  return true;
}

function GerarParametrosParcela(CapitalInicial, TaxaJuros, Tempo, Parcela = 1) {
  const parcela = {
    CapitalInicial,
    TaxaJuros,
    Tempo,
    Parcela,
    TotalRendimento: 0,
    Rendimento: 0,
    JurosMes: 0,
  };
  return parcela;
}

export { CalcularJuros };
