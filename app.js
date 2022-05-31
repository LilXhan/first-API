const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // req (request) es la request, la peticion
  // res (response) es la respuesta
  console.log(req);
  res.status(200).send('Hello World!')
})

app.listen(port, () => {
  console.log('Server started at por 3000');
})
