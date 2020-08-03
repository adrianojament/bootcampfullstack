const fs = require('fs');
const _ = require('lodash');
const DiretorioEstados = './estados';
const JsonEstadosDados = './json/Estados.json';
const JsonCidadeDados = './json/Cidades.json';
const JsonEstados = LerEstados();
const JsonCidades = LerCidades();

//GerarArquivosCidadesPorEstados();
// CriarQtdCidadesPorEstados(true);
RetornarMaioresMenoresCidades();
//RetornarMaioresNomesCidadesEstados();
//RetornarMenoresNomesCidadesEstados();
//RetornarMaiorNomedeCidade();
//RetornarMenorNomedeCidade();

function RetornarMenorNomedeCidade() {
  let maioresNomesPorEstados = [];
  JsonEstados.forEach((estado) => {
    let cidades = RetornarCidadesporEstado(estado.Sigla);
    cidades.sort((a, b) => a.Nome.length - b.Nome.length);
    let cidade = cidades[0];
    maioresNomesPorEstados.push({
      EstadoCidade: `Estado: ${estado.Sigla} - Cidade: ${cidade.Nome}`,
      Cidade: cidade.Nome,
      Tamanho: cidade.Nome.length,
    });
  });
  let newmaioresNomesPorEstados = _.sortBy(maioresNomesPorEstados, [
    'Tamanho',
    'Cidade',
  ]);
  console.log(newmaioresNomesPorEstados[0].EstadoCidade);
}

function RetornarMaiorNomedeCidade() {
  let maioresNomesPorEstados = [];
  JsonEstados.forEach((estado) => {
    let cidades = RetornarCidadesporEstado(estado.Sigla);
    cidades.sort((a, b) => b.Nome.length - a.Nome.length);
    let cidade = cidades[0];
    maioresNomesPorEstados.push({
      EstadoCidade: `Estado: ${estado.Sigla} - Cidade: ${cidade.Nome}`,
      Cidade: cidade.Nome,
      Tamanho: cidade.Nome.length,
    });
  });
  let newmaioresNomesPorEstados = _.sortBy(maioresNomesPorEstados, [
    'Tamanho',
    'Cidade',
  ]);
  newmaioresNomesPorEstados.reverse();
  console.log(newmaioresNomesPorEstados[0].EstadoCidade);
}

function RetornarMenoresNomesCidadesEstados(params) {
  let menoresNomesPorEstados = [];
  JsonEstados.forEach((estado) => {
    let cidades = RetornarCidadesporEstado(estado.Sigla);
    cidades.sort((a, b) => a.Nome.length - b.Nome.length);
    let cidade = cidades[0];
    menoresNomesPorEstados.push(`${cidade.Nome} - ${estado.Sigla} `);
  });
  console.log(menoresNomesPorEstados);
}

function RetornarMaioresNomesCidadesEstados(params) {
  let maioresNomesPorEstados = [];
  JsonEstados.forEach((estado) => {
    let cidades = RetornarCidadesporEstado(estado.Sigla);
    cidades.sort((a, b) => b.Nome.trim().length - a.Nome.trim().length);
    let cidade = cidades[0];
    maioresNomesPorEstados.push(
      `Estado: ${estado.Sigla} - Cidade: ${cidade.Nome} - Tamanho: ${cidade.Nome.length} `
    );
  });
  console.log(maioresNomesPorEstados);
}

function RetornarMaioresMenoresCidades() {
  let estados = CriarQtdCidadesPorEstados();
  estados.sort((a, b) => b.qtd - a.qtd);
  ImprimirEstados5Cidades(estados);
  estados.sort((a, b) => a.qtd - b.qtd);
  ImprimirEstados5Cidades(estados);
}

function ImprimirEstados5Cidades(estados) {
  let cidades5 = [];
  let soma = 0;
  for (let index = 0; index < 5; index++) {
    let estado = estados[index];
    cidades5.push(`${estado.estado} - ${estado.qtd}`);
    soma += estado.qtd;
  }
  console.log(cidades5 + ' Total: ' + soma);
}

function CriarQtdCidadesPorEstados(imprimir) {
  let qtdCidades = [];
  let jsonCidades = [];
  JsonEstados.forEach((estado) => {
    let cidades = RetornarCidadesporEstado(estado.Sigla);
    qtdCidades.push(`${estado.Sigla} - ${cidades.length}`);
    jsonCidades.push({ estado: estado.Sigla, qtd: cidades.length });
  });
  if (imprimir) {
    console.log(qtdCidades);
  }
  return jsonCidades;
}

function RetornarCidadesporEstado(siglaEstado) {
  let nomeArquivo = RetornarNomeArquivo(siglaEstado);
  return LerJson(nomeArquivo);
}

function GerarArquivosCidadesPorEstados() {
  JsonEstados.forEach((estado) => {
    let cidades = JsonCidades.filter((cid) => cid.Estado === estado.ID);
    let json = JSON.stringify(cidades);
    let arquivo = RetornarNomeArquivo(estado.Sigla);
    fs.writeFileSync(arquivo, json);
  });
}

function RetornarNomeArquivo(sigla) {
  return DiretorioEstados + '/' + sigla + '.JSON';
}

function LerEstados() {
  return LerJson(JsonEstadosDados);
}

function LerCidades() {
  return LerJson(JsonCidadeDados);
}

function LerJson(tcPath) {
  let json = [];
  try {
    const jsonString = fs.readFileSync(tcPath);
    json = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return null;
  }
  return json;
}
