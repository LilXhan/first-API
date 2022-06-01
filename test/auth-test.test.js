const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;

describe('suite for the authentication:', () => {
  it('should return 401 when no jwt toke available', (done) => {
    // cuando la llamada no tiene correctamente la llave puesta
    chai.request(app)
      .get('/team')
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401)
        done();
      });
  });

  it('should return 200 when jwt is valid', (done) => {
    chai.request(app)
      .post('/login')
      .end((err, res) => {
        chai.request(app)
          .get('/team')
          .set('Authorization', `JWT ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 200)
            done();
          });
      })
  });
});
