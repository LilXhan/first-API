const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('./users');



router.route('/')
  .get((req, res) => {
    res.send(' GET Auth router')
  })
  .post((req, res) => {
    res.send(' POST Auth router')
  })

router.route('/login')
  .post((req, res) => {
    if (!req.body) {
      return res.status(400).json({ message: 'Missing Data' })
    } else if (!req.body.user || !req.body.password) {
      return res.status(400).json({ message: 'Missing Data' })
    }
    // Comprobamos credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
      //Si no son validas error
      if (err || !result) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
      //Si son validas, generamos un JWT y lo devolvemos
      let user = usersController.getUserIdFromUserName(req.body.user)
      const token = jwt.sign({ userId: user.userId }, 'secret');
      res.status(200).json(
        { token: token }
      );
    });
  });

exports.router = router;
