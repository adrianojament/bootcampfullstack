import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    // Validando os campos
    ValidarDados(grade);
    // Validando os campos

    // Importando os dados
    const dados = await CarregarDados();
    // Importando os dados

    // Criando um novo objeto
    grade = GerarNovaGrade(grade, dados.nextId++);
    // Criando um novo objeto

    // Salvar os dados
    dados.grades.push(grade);
    await SalvarArquivo(dados);
    // Salvar os dados

    res.send({ messagem: 'Grade salva com sucesso.', dados: grade });
    global.Logger.info(
      `${req.method} ${req.baseUrl}: ${JSON.stringify(grade)}`
    );
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let grade = req.body;
    // Validando os dados
    ValidarDados(grade);
    // Validando os dados

    // Recuperando os dados
    let posicao = await RecuperarPosicaoID(grade);
    // Recuperando os dados

    // Gravar a alteracao
    const dados = await CarregarDados();
    grade = GerarNovaGrade(grade, grade.id);
    dados.grades[posicao] = grade;
    await SalvarArquivo(dados);
    // Gravar a alteracao

    res.send({ messagem: 'Grade salva com sucesso.', dados: grade });
    global.Logger.info(
      `${req.method} ${req.baseUrl}: ${JSON.stringify(grade)}`
    );
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // Recuperando os dados
    let grade = { id: parseInt(req.params.id) };
    await RecuperarPosicaoID(grade);
    // Recuperando os dados

    // Excluir
    let dados = await CarregarDados();
    let id = grade.id;
    dados.grades = dados.grades.filter((grd) => grd.id !== id);
    await SalvarArquivo(dados);
    // Excluir

    res.send({ messagem: 'Grade Excluida com sucesso.', id: id });
    global.Logger.info(`${req.method} ${req.baseUrl}: Grade Excluida ${id}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // Recuperando os dados
    let grade = { id: parseInt(req.params.id) };
    let posicao = await RecuperarPosicaoID(grade);
    // Recuperando os dados

    // Retornar os dados
    let dados = await CarregarDados();
    grade = dados.grades[posicao];
    // Retornar os dados
    res.send({ messagem: 'Grade recuperada com sucesso.', dados: grade });
    global.Logger.info(
      `${req.method} ${req.baseUrl}: Grade recuperada ${grade.id}`
    );
  } catch (error) {
    next(error);
  }
});

router.get('/consulta/nota', async (req, res, next) => {
  try {
    // Ler os parametros
    let dadosPesquisa = req.body;
    // Ler os parametros

    // Validando os parametros
    if (!dadosPesquisa.student || !dadosPesquisa.subject) {
      throw new Error('Student, Subject são obrigatorios');
    }
    // Validando os parametros

    // Buscando os dados
    const dados = await CarregarDados();
    let consulta = dados.grades.filter(
      (grd) =>
        grd.student === dadosPesquisa.student &&
        grd.subject === dadosPesquisa.subject
    );

    if (consulta.length === 0) {
      throw new Error('Student ou Subject não encontrado.');
    }
    // Buscando os dados

    // Calculando as notas
    let total = consulta.reduce((total, item) => total + item.value, 0);
    // Calculando as notas

    let dadosRetorno = {
      student: dadosPesquisa.student,
      subject: dadosPesquisa.subject,
      total: total,
    };

    res.send({
      messagem: 'Calculo realizado com sucesso.',
      dados: dadosRetorno,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/consulta/media_materia', async (req, res, next) => {
  try {
    // Ler os parametros
    let dadosPesquisa = req.body;
    // Ler os parametros

    // Validando os parametros
    if (!dadosPesquisa.type || !dadosPesquisa.subject) {
      throw new Error('Subject, Type são obrigatorios');
    }
    // Validando os parametros

    // Buscando os dados
    const dados = await CarregarDados();
    let consulta = dados.grades.filter(
      (grd) =>
        grd.type === dadosPesquisa.type && grd.subject === dadosPesquisa.subject
    );

    if (consulta.length === 0) {
      throw new Error('Subject, Type não encontrado.');
    }
    // Buscando os dados

    // Calculando as notas
    let total = consulta.reduce((total, item) => total + item.value, 0);
    // Calculando as notas

    let dadosRetorno = {
      type: dadosPesquisa.type,
      subject: dadosPesquisa.subject,
      total: total,
      media: parseFloat(total / consulta.length).toFixed(2),
    };

    res.send({
      messagem: 'Calculo realizado com sucesso.',
      dados: dadosRetorno,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/consulta/melhoresnotas', async (req, res, next) => {
  try {
    // Ler os parametros
    let dadosPesquisa = req.body;
    // Ler os parametros

    // Validando os parametros
    if (!dadosPesquisa.type || !dadosPesquisa.subject) {
      throw new Error('Subject, Type são obrigatorios');
    }
    // Validando os parametros

    // Buscando os dados
    const dados = await CarregarDados();
    let consulta = dados.grades.filter(
      (grd) =>
        grd.type === dadosPesquisa.type && grd.subject === dadosPesquisa.subject
    );

    if (consulta.length === 0) {
      throw new Error('Subject, Type não encontrado.');
    }
    // Buscando os dados

    // Ordenando
    consulta.sort((a, b) => b.value - a.value);
    // Ordenando

    // Retornar os 3 melhores
    let melhores = [];
    for (let index = 0; index < 3; index++) {
      melhores.push(consulta[index]);
    }
    // Retornar os 3 melhores

    res.send({
      messagem: 'Calculo realizado com sucesso.',
      dados: melhores,
    });
  } catch (error) {
    next(error);
  }
});

async function RecuperarPosicaoID(grade) {
  const dados = await CarregarDados();
  const id = dados.grades.findIndex((a) => a.id === grade.id);
  if (id < 1) {
    throw new Error('Student nao encontrado');
  }
  return id;
}

function ValidarDados(grade) {
  if (!grade.student || !grade.subject || !grade.type || !grade.value) {
    throw new Error('Student, Subject, type e value são obrigatorios');
  }
}

function GerarNovaGrade(grade, id) {
  grade = {
    id: id,
    student: grade.student,
    subject: grade.subject,
    type: grade.type,
    value: grade.value,
    timestamp: RecuperarDataJSON(),
  };
  return grade;
}

// Retornar data formato JSON
function RecuperarDataJSON() {
  const data = new Date();
  return data.toJSON();
}
// Retornar data formato JSON

// Salvar os dados
async function SalvarArquivo(data) {
  await writeFile(global.FileStudentsJSON, JSON.stringify(data, null, 2));
}
// Salvar os dados

// Listar todas as grades
router.get('/', async (req, res, next) => {
  try {
    let data = await CarregarDados();
    delete data.nextId;
    res.send(data);
    global.Logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
});
// Listar todas as grades

// Carregar os dados das grades
async function CarregarDados() {
  return JSON.parse(await readFile(global.FileStudentsJSON));
}
// Carregar os dados das grades

// Aula 3.8. Tratamento de erros
router.use((err, req, res, next) => {
  global.Logger.error(`${req.method} ${req.baseUrl}: ${err.message}`);
  res.status(400).send({ error: err.message });
});
// Aula 3.8. Tratamento de erros

export default router;
