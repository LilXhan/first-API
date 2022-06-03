const chai = require('chai');
const chaiHTTP = require('chai-http');
const teamsController = require('../teams.controller');
const usersController = require('../../auth/users');

chai.use(chaiHTTP);

const app = require('../../app').app;

before((done) => {
  usersController.registerUser('Xhan', '1234');
  usersController.registerUser('Bryle', '4321');
  done();
});

afterEach(async () => {
  await teamsController.cleanUpTeam()
});


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
          .send({ team: team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app)
              .delete('/teams/pokemons/1')
              .set('Authorization', `JWT ${token}`)
              .end((err, res) => {
                chai.request(app)
                  .get('/teams')
                  .set('Authorization', `JWT ${token}`)
                  .end((err, res) => {
                    // tiene un equipo con 2 pokemon
                    // {trainer: 'bryle', team: [pokemon]}
                    chai.assert.equal(res.statusCode, 200);
                    chai.assert.equal(res.body.trainer, 'Bryle');
                    chai.assert.equal(res.body.team.length, (team.length - 1));
                    done();
                  })
              });
          });
      });
  });
})

after((done) => {
  usersController.cleanUpUsers();
  done();
});
