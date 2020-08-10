import express from 'express';
import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('Name e balance são obrigatorios');
    }

    let data = await CarregarTodasContas();

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };

    data.accounts.push(account);
    await SalvarArquivo(data);

    res.send(account);

    global.Logger.info(
      `${req.method} ${req.baseUrl}: ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    let data = await CarregarTodasContas();
    delete data.nextId;
    res.send(data);
    global.Logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const account = await BuscarConta(parseInt(req.params.id));

    if (account === undefined) {
      res.status(404).send({ error: 'conta nao encontrada' });
    }

    res.send(account);
    global.Logger.info(`${req.method} ${req.baseUrl}`);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const account = await BuscarConta(parseInt(req.params.id));

    if (account === undefined) {
      res.status(404).send({ error: 'conta nao encontrada' });
    }

    let data = await CarregarTodasContas();
    let iID = parseInt(req.params.id);
    data.accounts = data.accounts.filter((cta) => cta.id !== iID);
    await SalvarArquivo(data);
    res.send({ messagem: 'Conta removida com sucesso.' });
    global.Logger.info(`${req.method} ${req.baseUrl} - ID: ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

// Router PUT => Atualiza todos os dados
router.put('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null || !account.id) {
      throw new Error('id, balance são obrigatorios');
    }

    let accountProcurar = await BuscarConta(account.id);
    if (accountProcurar === undefined) {
      res.status(404).send({ error: 'conta nao encontrada' });
    }

    account = req.body;
    account = {
      id: account.id,
      name: account.name,
      balance: account.balance,
    };

    let data = await CarregarTodasContas();
    const index = data.accounts.findIndex((a) => a.id === account.id);
    data.accounts[index] = account;

    await SalvarArquivo(data);
    res.send({ messagem: 'Conta salva com sucesso.', dados: account });
    global.Logger.info(
      `${req.method} ${req.baseUrl}: ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
});
// Router PUT => Atualiza todos os dados

// Router Patch =>  Atualizar apenas alguma informação
router.patch('/updateBalance', async (req, res, next) => {
  try {
    let account = req.body;

    if (account.balance == null || !account.id) {
      throw new Error('id, balance são obrigatorios');
    }

    let accountProcurar = await BuscarConta(account.id);
    if (accountProcurar === undefined) {
      res.status(404).send({ error: 'conta nao encontrada' });
    }

    account = req.body;
    let data = await CarregarTodasContas();
    const index = data.accounts.findIndex((a) => a.id === account.id);
    data.accounts[index].balance = account.balance;

    await SalvarArquivo(data);
    res.send({
      messagem: 'Conta salva com sucesso.',
      dados: data.accounts[index],
    });

    global.Logger.info(
      `${req.method} ${req.baseUrl}: ${JSON.stringify(data.accounts[index])}`
    );
  } catch (error) {
    next(error);
  }
});
// Router Patch =>  Atualizar apenas alguma informação

async function SalvarArquivo(data) {
  await writeFile(global.FileAccountsJSON, JSON.stringify(data, null, 2));
}

async function BuscarConta(id) {
  const data = await CarregarTodasContas();

  const account = data.accounts.find((d) => d.id === id);

  return account;
}

async function CarregarTodasContas() {
  return JSON.parse(await readFile(global.FileAccountsJSON));
}

// Aula 3.8. Tratamento de erros
router.use((err, req, res, next) => {
  global.Logger.error(`${req.method} ${req.baseUrl}: ${err.message}`);
  res.status(400).send({ error: err.message });
});
// Aula 3.8. Tratamento de erros

export default router;
