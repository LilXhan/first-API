const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);


describe('Suite de prueba', () => {
  it('Devolver hola', (done) => {
    console.log('hola')
    done();
  })
})
