import express from 'express';

const app = express();
app.use(express.json());

//Parametros na rota
app.get('/testParam/:id', (req, res) => {
  res.send('/testParam/:id: ' + req.params.id);
});
//Parametros na rota

//Parametros via query
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});
//Parametros via query

//Next -> Executa as proximas funcoes
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    next(); //Executar os proximo callback
  },
  (req, res) => {
    console.log('Callback 2');
    res.send('Fim');
  }
);
//Next -> Executa as proximas Callback

//next -> com array
const callback01 = (req, res, next) => {
  console.log('callback01');
  next();
};
function callback02(req, res, next) {
  console.log('callback02');
  next();
}
const callback03 = (req, res, next) => {
  console.log('callback03');
  res.send('e acabou');
};
app.get('/testMultipleHandleArray', [callback01, callback02, callback03]);
//next -> com array

//route
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('get');
  })
  .post((req, res) => {
    res.send('post');
  })
  .delete((req, res) => {
    res.send('delete');
  });
//route

// all
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

//Caracteres especias na rota
app.get('/teste?', (_, res) => {
  res.send('teste?');
});

app.get('/buzz+', (_, res) => {
  res.send('buzz+');
});

app.get('/one*blue+', (req, res) => {
  res.send('one*blue: ' + req.path);
});

app.post('/test(ing)?', (req, res) => {
  res.send('test(ing): ' + req.path);
});

app.post(/.*Red$/, (req, res) => {
  res.send('/*.Red$/: ' + req.path);
});

//Caracteres especias na rota
// Parte 01

app.get('/', (req, res) => {
  res.send('Oi adriano');
});

// app.post('/', (req, res) => {
//   const a = 3;
//   const b = 5;
//   const result = a + b;
//   res.send('Oi Adriano, primeiro post, resultado: ' + result);
// });

app.listen(3000, () => {
  console.log('app online');
});
