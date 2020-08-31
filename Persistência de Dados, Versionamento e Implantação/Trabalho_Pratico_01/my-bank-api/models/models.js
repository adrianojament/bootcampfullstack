import mongoose from 'mongoose';
import contaModel from './contaModel.js';
import dotenv from 'dotenv';

// Configurando o Ambiente
dotenv.config();
// Configurando o Ambiente

const db = {};

db.url = process.env.MONGO_URL;
db.mongoose = mongoose;
db.contas = contaModel(mongoose);

export { db };
