const nacionalidade = 'pt-BR';

export function FormatarValoresMonetarios(number) {
  const formatarValor = new Intl.NumberFormat(nacionalidade, {
    style: 'currency',
    currency: 'BRL',
  });
  return formatarValor.format(number);
}

export function FormatarPercental(number) {
  const formatarValor = new Intl.NumberFormat(nacionalidade, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  let retorno = '0.00%';
  if (!!number || number > 0) retorno = formatarValor.format(number);
  return retorno;
}

export function FormatarValoresMonetariosPercentuais(valor, percentual) {
  const valorMonetario = FormatarValoresMonetarios(valor);
  percentual = FormatarPercental(percentual);
  return `${valorMonetario} (${percentual})`;
}
