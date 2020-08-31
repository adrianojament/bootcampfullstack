import express from 'express';
import contaController from '../controllers/contaController.js';

const contaRouter = express();

contaRouter.get('/contas', contaController.consultarContas);
contaRouter.patch('/contas/depositar', contaController.depositarValorConta);
contaRouter.patch('/contas/saque', contaController.sacarValorConta);
contaRouter.get('/contas/consultasaldo', contaController.consultarSaldoConta);
contaRouter.get(
  '/contas/consultaMenoresSaldos',
  contaController.consultarContascomMenoresSaldos
);
contaRouter.get(
  '/contas/consultaMaioresSaldos',
  contaController.consultarContascomMaioresSaldos
);
contaRouter.post(
  '/contas/transferenciaClienteVIP',
  contaController.transferirClienteVIP
);
contaRouter.patch(
  '/contas/transferencia',
  contaController.transferirValoresEntreContas
);
contaRouter.delete('/contas', contaController.excluirConta);

contaRouter.get(
  '/agencias/consultasaldomedio',
  contaController.consultarValoresMediosAgencia
);

export { contaRouter };
