const chai = require('chai');
const chaiHTTP = require('chai-http');
const teamsController = require('../controllers/teams');
const usersController = require('../controllers/users');

chai.use(chaiHTTP);

const app = require('../app').app;

before((done) => {
  usersController.registerUser('Xhan', '1234');
  usersController.registerUser('Bryle', '4321');
  done();
});

afterEach((done) => {
  teamsController.cleanUpTeam();
  done();
})

describe('test suite teams', () => {
  it('should return the team of the given user', (done) => {
    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Bryle', password: '4321' })
      .end((err, res) => {
        let token = res.body.token;
        //Expect valid login
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .put('/teams')
          .send({
            team: team
          })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                // tiene un equipo con 2 pokemon
                // {trainer: 'bryle', team: [pokemon]}
                chai.assert.equal(res.body.trainer, 'Bryle');
                chai.assert.equal(res.body.team.length, team.length);
                chai.assert.equal(res.body.team[0].name, team[0].name);
                chai.assert.equal(res.body.team[1].name, team[1].name);
                chai.assert.equal(res.statusCode, 200);
                done();
              });
          });
      });
  });
  it('should return the pokedex number', (done) => {
    let pokemonName = 'bulbasaur';
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Bryle', password: '4321' })
      .end((err, res) => {
        let token = res.body.token;
        //Expect valid login
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .post('/teams/pokemons')
          .send({ name: pokemonName })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .get('/teams')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                // tiene un equipo con 2 pokemon
                // {trainer: 'bryle', team: [pokemon]}
                chai.assert.equal(res.body.trainer, 'Bryle');
                chai.assert.equal(res.body.team.length, 1);
                chai.assert.equal(res.body.team[0].name, pokemonName);
                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                chai.assert.equal(res.statusCode, 200);
                done();
              });
          });
      });
  });
});

after((done) => {
  usersController.cleanUpUsers();
  done();
});
