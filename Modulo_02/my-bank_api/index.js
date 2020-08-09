import express from 'express';
import { promises as fs } from 'fs';
import accountsRouter from './routes/account.js';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  let arquivo = './json/accounts.json';
  let lbErro = false;

  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  try {
    await readFile(arquivo);
  } catch (error) {
    lbErro = true;
  }

  if (lbErro) {
    await writeFile(arquivo, JSON.stringify(initialJson))
      .then(() => {
        console.log('MY-BANK-API ONLINE');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('MY-BANK-API ONLINE');
  }
});
