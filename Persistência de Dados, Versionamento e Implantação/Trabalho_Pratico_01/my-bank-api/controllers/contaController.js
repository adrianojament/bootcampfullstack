import { db } from '../models/models.js';

const contasModel = db.contas;
const agenciaVIP = process.env.AGENCIA_VIP;

const consultarContas = async (_, res) => {
  try {
    const contas = await contasModel.find();
    res.send(contas);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const depositarValorConta = async (req, res) => {
  try {
    const nroConta = req.body.conta;
    const agencia = req.body.agencia;

    let valor = Number(req.body.valor);
    if (!valor) {
      res.status(400).send('Tipo Invalido no campo valor');
      return;
    }

    if (valor <= 0) {
      res.status(400).send('Valor tem que zero maior que zero  ');
      return;
    }

    const conta = await PesquisarAgenciaConta(nroConta, agencia);

    if (!conta) {
      res.status(404).send('Conta nao encontrada');
      return;
    }

    conta.balance += valor;

    await conta.save();

    res.send('Saldo na conta atual: ' + conta.balance);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const sacarValorConta = async (req, res) => {
  try {
    const nroConta = req.body.conta;
    const agencia = req.body.agencia;

    let valor = Number(req.body.valor);
    if (!valor) {
      res.status(400).send('Tipo Invalido no campo valor');
      return;
    }

    if (valor <= 0) {
      res.status(400).send('Valor tem que zero maior que zero  ');
      return;
    }

    const conta = await PesquisarAgenciaConta(nroConta, agencia);

    if (!conta) {
      res.status(404).send('Conta nao encontrada');
      return;
    }

    valor += 1;

    if (conta.balance - valor <= 0) {
      res.status(400).send('Conta com saldo insuficiente: ' + conta.balance);
      return;
    }

    conta.balance -= valor;

    await conta.save();
    res.send('Saldo na conta atual: ' + conta.balance);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const consultarSaldoConta = async (req, res) => {
  try {
    const nroConta = req.body.conta;
    const agencia = req.body.agencia;

    const conta = await PesquisarAgenciaConta(nroConta, agencia);

    if (!conta) {
      res.status(404).send('Conta nao encontrada');
      return;
    }

    res.send('Saldo na conta atual: ' + conta.balance);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const excluirConta = async (req, res) => {
  try {
    const nroConta = req.body.conta;
    const agencia = req.body.agencia;

    const conta = await PesquisarAgenciaConta(nroConta, agencia);

    if (!conta) {
      res.status(404).send('Conta nao encontrada');
      return;
    }

    await conta.delete();

    const constasAtivas = await contasModel.aggregate([
      { $match: { agencia: agencia } },
      { $group: { _id: '$agencia', total: { $sum: 1 } } },
    ]);

    if (constasAtivas.length === 0) {
      res.status(404).send(`Agencia ${agencia} nao possui nenhuma conta ativa`);
      return;
    }

    res.send('Total de contas ativas: ' + constasAtivas[0].total);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const transferirValoresEntreContas = async (req, res) => {
  try {
    const nroContaOrigem = req.body.origem.conta;
    const nroContaDestino = req.body.destino.conta;

    // Validando o valor da conta
    let valor = Number(req.body.valor);
    if (!valor) {
      res.status(400).send('Tipo Invalido no campo valor');
      return;
    }
    if (valor <= 0) {
      res.status(400).send('Valor tem que zero maior que zero');
      return;
    }
    // Validando o valor da conta

    // Pesquisar as contas
    const contaDestino = await PesquisarConta(nroContaDestino);
    if (!contaDestino) {
      res.status(404).send('Conta de destino nao encontrada');
      return;
    }
    const contaOrigem = await PesquisarConta(nroContaOrigem);
    if (!contaOrigem) {
      res.status(404).send('Conta de origem nao encontrada');
      return;
    }
    // Pesquisar as contas

    // Verificar se a conta origem será tarifada
    let valorTarifa = 0;
    if (contaDestino.agencia.localeCompare(contaOrigem.agencia) !== 0) {
      valorTarifa = 8;
    }
    // Verificar se a conta origem será tarifada

    // Validar o saldo da conta Origem

    let saldo = contaOrigem.balance - (valor + valorTarifa);

    if (saldo < 0) {
      res.status(400).send('Saldo insuficiente: ' + contaOrigem.balance);
      return;
    }

    contaOrigem.balance = saldo;
    // Validar o saldo da conta Origem

    // Incrementar a conta

    contaDestino.balance += valor;
    // Incrementar a conta

    await contaDestino.save();
    await contaOrigem.save();

    res.send(
      `Saldo da conta destino: ${contaOrigem.balance} valor da tarifa: ${valorTarifa}`
    );
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const consultarValoresMediosAgencia = async (req, res) => {
  try {
    const agencia = req.body.agencia;
    const valoresMedio = await contasModel.aggregate([
      { $match: { agencia: agencia } },
      { $group: { _id: '$agencia', saldoMedio: { $avg: '$balance' } } },
    ]);

    if (valoresMedio.length === 0) {
      res.status(404).send(`Agencia ${agencia} nao foi encontrada`);
      return;
    }

    res.send(
      `Agencia ${agencia} saldo medio: ${valoresMedio[0].saldoMedio.toFixed(2)}`
    );
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const consultarContascomMenoresSaldos = async (req, res) => {
  try {
    const limit = Number(req.body.qtaContas);
    const contas = await contasModel.aggregate([
      { $limit: limit },
      { $sort: { balance: 1 } },
    ]);

    const contasFiltro = contas.map(({ agencia, conta, balance }) => {
      return {
        agencia,
        conta,
        saldo: balance.toFixed(2),
      };
    });
    res.send(contasFiltro);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const consultarContascomMaioresSaldos = async (req, res) => {
  try {
    const limit = Number(req.body.qtaContas);
    const contas = await contasModel.aggregate([
      { $limit: limit },
      { $sort: { balance: -1 } },
    ]);

    const contasFiltro = contas.map(({ agencia, conta, balance, nome }) => {
      return {
        agencia,
        conta,
        nome,
        saldo: balance.toFixed(2),
      };
    });
    res.send(contasFiltro);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

const transferirClienteVIP = async (_, res) => {
  try {
    const agencias = await contasModel.aggregate([
      { $match: { agencia: { $ne: agenciaVIP } } },
      { $group: { _id: '$agencia' } },
    ]);

    const contasVIP = [];

    for (const dadosagencia of agencias) {
      let nragencia = dadosagencia._id;

      const dadosconta = await contasModel.aggregate([
        { $match: { agencia: nragencia } },
        { $sort: { balance: -1 } },
      ]);
      const { agencia, conta, balance, name } = dadosconta[0];
      contasVIP.push({ agencia, conta, balance, name });

      const contatrans = await PesquisarAgenciaConta(conta, agencia);

      contatrans.agencia = agenciaVIP;
      await contatrans.save();
    }

    res.send(contasVIP);
  } catch (error) {
    res.status(500).send('Erro na consulta das contas: ' + error);
  }
};

async function PesquisarAgenciaConta(nroConta, agencia) {
  return await contasModel.findOne({
    conta: nroConta,
    agencia: agencia,
  });
}

async function PesquisarConta(nroConta) {
  return await contasModel.findOne({
    conta: nroConta,
  });
}

export default {
  consultarContas,
  depositarValorConta,
  sacarValorConta,
  consultarSaldoConta,
  excluirConta,
  transferirValoresEntreContas,
  consultarValoresMediosAgencia,
  consultarContascomMenoresSaldos,
  consultarContascomMaioresSaldos,
  transferirClienteVIP,
};
