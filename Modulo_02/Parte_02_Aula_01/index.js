import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Oi adriano');
});

app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const result = a + b;
  res.send('Oi Adriano, primeiro post, resultado: ' + result);
});

app.listen(3000, () => {
  console.log('app online');
});
