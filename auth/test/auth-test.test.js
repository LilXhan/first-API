const chai = require('chai');
const chaiHTTP = require('chai-http');
const usersController = require('../users');

chai.use(chaiHTTP);

const app = require('../../app').app;

before((done) => {
  usersController.registerUser('Xhan', '1234');
  usersController.registerUser('Bryle', '4321');
  done();
});

describe('suite for the authentication:', () => {
  it('should return 401 when no jwt toke available', (done) => {
    // cuando la llamada no tiene correctamente la llave puesta
    chai.request(app)
      .get('/teams')
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401)
        done();
      });
  });

  it('should return 400 when no data is provided', (done) => {
    chai.request(app)
      .post('/auth/login')
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 400);
        done();
      });
  });

  it('should return 200 and token for succesful login', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Xhan', password: '1234' })
      .end((err, res) => {
        //Expect valid login
        chai.assert.equal(res.statusCode, 200);
        done();
      })
  })

  it('should return 200 when jwt is valid', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('content-type', 'application/json')
      .send({ user: 'Bryle', password: '4321' })
      .end((err, res) => {
        //Expect valid login
        chai.assert.equal(res.statusCode, 200);
        chai.request(app)
          .get('/teams')
          .set('Authorization', `JWT ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 200);
            done();
          })
      })
  })
});

after((done) => {
  usersController.cleanUpUsers();
  done();
});
