import mongoose from 'mongoose';

// Criação do modelo
const studentSchema = mongoose.Schema({
  name: { type: String, required: [true, 'informe o nome'] },
  subject: { type: String, required: [true, 'informe o subject'] },
  type: { type: String, required: [true, 'informe o type'] },
  value: {
    type: Number,
    required: [true, 'informe o value'],
    min: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Valor negativo não é permitido');
      }
    },
  },
  lastModified: { type: Date, default: Date.now },
});

const studentModel = mongoose.model('students', studentSchema);

export { studentModel };
