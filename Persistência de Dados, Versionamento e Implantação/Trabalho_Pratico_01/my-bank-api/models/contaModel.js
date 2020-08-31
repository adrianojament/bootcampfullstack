export default (mongoose) => {
  const schema = mongoose.Schema({
    agencia: {
      type: String,
      required: [true, 'Informe a agencia'],
    },
    conta: {
      type: String,
      required: [true, 'Informe a conta'],
    },
    name: {
      type: String,
      required: [true, 'Informe o nome'],
    },
    balance: {
      type: Number,
      required: [true, 'Informe o balance'],
      validate(balance) {
        if (balance < 0) {
          throw new Error('Valor negativo não é permitido');
        }
      },
    },
    //
  });

  const contaModel = mongoose.model('contas', schema);
  return contaModel;
};
