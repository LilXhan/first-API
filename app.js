const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // req (request) es la request, la peticion
  // res (response) es la respuesta
  res.status(200).send('Hello World!');
})

app.post('/team/pokemons', () => {
  res.status(200).send('Hello World!');
})
app.get('/team', () => {
  res.status(200).send('Hello World!');
})
app.delete('/team/pokemons/:pokeid', () => {
  res.status(200).send('Hello World!');
})
app.put('/team', () => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Server started at por 3000');
})

exports.app = app;
