import express from 'express';
import { studentRouter } from './routes/studentRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
app.use(studentRouter);

const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(console.log('Banco conectado'))
  .catch((err) => {
    console.log('Erro ao conectar ' + err);
  });

app.listen(process.env.PORT, () =>
  console.log('App Iniciada: ' + process.env.PORT)
);
