import express from 'express';
import { promises as fs } from 'fs';
import winston from 'winston';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import accountsRouter from './routes/account.js';
import specs from './swagger.js';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.FileAccountsJSON = './json/accounts.json';
global.FileLogs = './logs/my_bank_api.log';
global.Logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: global.FileLogs }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs.default));

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  let lbErro = false;

  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  try {
    await readFile(global.FileAccountsJSON);
  } catch (error) {
    lbErro = true;
  }

  if (lbErro) {
    await writeFile(arquivo, JSON.stringify(initialJson))
      .then(() => {
        global.Logger.info('MY-BANK-API ONLINE and File Created');
      })
      .catch((err) => {
        global.Logger.error(err);
      });
  } else {
    global.Logger.info('MY-BANK-API ONLINE');
  }
});
