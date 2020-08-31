//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const uri =
  'mongodb+srv://kmjadmin:nrjsKZAYKF7R5NP9@cluster0.tqcng.gcp.mongodb.net/grades?retryWrites=true&w=majority';

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

// Criação do modelo
const studentSchema = mongoose.Schema({
  name: { type: String, required: [true, 'informe o nome'] },
  subject: { type: String, required: [true, 'informe o subject'] },
  type: { type: String, required: [true, 'informe o type'] },
  value: {
    type: Number,
    required: [true, 'informe o value'],
    validate(value) {
      if (value < 0) {
        throw new Error('Valor negativo não é permitido');
      }
    },
  },
  lastModified: { type: Date, default: Date.now },
});

//Definindo o modelo da coleção
mongoose.model('student', studentSchema);

const student = mongoose.model('student');

//type: 'Trabalho Pratico',

new student({
  name: 'Paulo Assis',
  subject: 'Matematica',
  value: 22,
})
  .save()
  .then(() => {
    console.log('deu certo');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.log('ocorre um erro' + error);
    mongoose.connection.close();
    process.exit(0);
  });
