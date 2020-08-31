import express from 'express';
import dotenv from 'dotenv';
import { db } from './models/models.js';
import { contaRouter } from './routes/contaRouter.js';

// Configurando o Ambiente
dotenv.config();
// Configurando o Ambiente

// Configurando as rotas
const app = express();
app.use(express.json());
app.use(contaRouter);
// Configurando as rotas

// Conectando no banco de dados
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Banco conectado');
  })
  .catch((error) => {
    console.log('Erro ao conectar: ' + error);
  });

// Conectando no banco de dados

app.listen(process.env.PORT, () => {
  console.log('Api em execucao');
});
