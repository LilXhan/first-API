const express = require('express');
const passport = require('passport');
require('./auth')(passport);
const app = express();
const port = 3000;



app.get('/', (req, res) => {
  // req (request) es la request, la peticion
  // res (response) es la respuesta
  res.status(200).send('Hello World!');
})

app.post('/login', (req, res) => {
  res.status(200).json(
    { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o' }
  )
})

app.post('/team/pokemons', () => {
  res.status(200).send('Hello World!');
})

app.get('/team',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).send('Hello World!');
  })


app.delete('/team/pokemons/:pokeid', () => {
  res.status(200).send('Hello World!');
})
app.put('/team', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Server started at por 3000');
})

exports.app = app;
