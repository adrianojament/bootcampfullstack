import express from 'express';
import carrosRouter from './carrosRouters.js';
import winston from 'winston';

const app = express();
app.use(express.json());

// Aula 2.5. Gravação de logs
const { label, combine, printf, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-log.log' }),
  ],
  format: combine(label({ label: 'my-app' }), timestamp(), myFormat),
});
// Aula 2.5. Gravação de logs

// Aula 2.3. Middlewares
// Um codigo que sempre seja executada
app.use((req, res, next) => {
  console.log(new Date());
  next();
});
// Um codigo que sempre seja executada

app.use('/carros', carrosRouter);

app.get('/teste', (req, res) => {
  res.end();
});
// Aula 2.3. Middlewares

// Aula 2.4. Tratamento de erros
app.get('/', (req, res) => {
  throw new Error('Error message text');
});

// Tratamento erro nas função assincrona
app.post('/', async (req, res, next) => {
  try {
    throw new Error('Error message async');
  } catch (error) {
    next(error);
  }
});
// Aula 2.4. Tratamento de erros

// Aula 2.5. Gravação de logs
logger.error('Erro log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('debug log');
logger.silly('silly log');
logger.log('info', 'Hello with parameter');
// Aula 2.5. Gravação de logs

// Aula 2.6. Servindo arquivos estáticos
app.use(express.static('public'));
app.use('/images', express.static('public'));
// Aula 2.6. Servindo arquivos estáticos

// Os tratamentos de erro devem vir apenas no final
app.use((err, req, res, next) => {
  console.log('Erro 01');
  next(err);
});
app.use((err, req, res, next) => {
  console.log('Erro 02');
  logger.error('Ocorreu um falha, tente mais tarde. ' + err.message);
  res.status(500).send('Ocorreu um falha, tente mais tarde. ' + err.message);
});
// Os tratamentos de erro devem vir apenas no final
app.listen(3000, () => {
  console.log('app rodando');
});
