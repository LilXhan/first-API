const express = require('express')
const bodyParser = require('body-parser')
// Router
const authRouters = require('./auth/auth.router').router
const teamsRouters = require('./teams/teams.router').router

const app = express()
const port = 3000
app.use(bodyParser.json())

app.get('/', (req, res) => {
  // req (request) es la request, la peticion
  // res (response) es la respuesta
  res.status(200).send('Hello World!')
})

app.use('/auth', authRouters)
app.use('/teams', teamsRouters)

app.listen(port, () => {
  console.log('Server started at port 3000')
})

exports.app = app
