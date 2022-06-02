const express = require('express');
const router = express.Router();
const passport = require('passport');
const axios = require('axios').default;
require('../auth')(passport);

const teamsController = require('../controllers/teams');
const { getUser } = require('../controllers/users')

router.route('/')
  .get(passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
      let user = getUser(req.user.userId);
      res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
      })
    })
  .put(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      teamsController.setTeam(req.user.userId, req.body.team);
      res.status(200).send();
    })

router.route('/pokemons')
  .post(passport.authenticate('jwt', { session: false }),
    (req, res) => {
      let pokemonName = req.body.name;
      console.log('Calling pokeapi');
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(function (response) {
          // handle success
          let pokemon = {
            name: pokemonName,
            pokedexNumber: response.data.id
          };
          console.log(response.data.id);
          teamsController.addPokemon(req.user.userId, pokemon);


          res.status(201).send(pokemon)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          res.status(400).json({ message: error });
        })
        .then(function () {
          // always executed
        });
    })

router.route('/pokemons/:pokeid')
  .delete(() => {
    res.status(200).send('Hello World!');
  })

exports.router = router;