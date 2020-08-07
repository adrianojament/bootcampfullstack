import express from 'express';
import carrosRouter from './carrosRouters.js';

const app = express();
app.use(express.json());

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

// Os tratamentos de erro devem vir apenas no final
app.use((err, req, res, next) => {
  console.log('Erro 01');
  next(err);
});
app.use((err, req, res, next) => {
  console.log('Erro 02');
  res.status(500).send('Ocorreu um falha, tente mais tarde. ' + err.message);
});
// Os tratamentos de erro devem vir apenas no final
app.listen(3000, () => {
  console.log('app rodando');
});
