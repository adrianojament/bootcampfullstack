import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  let lcRetorno = 'GET /CARROS';
  console.log(lcRetorno);
  res.send(lcRetorno);
});

router.get('/precos', (req, res) => {
  let lcRetorno = 'GET /carros/ precos';
  console.log(lcRetorno);
  res.send(lcRetorno);
});

export default router;
