const assert = require('chai').assert;

function addValue(a, b) {
  return a + b;
}

describe('Suite de prueba', () => {
  it('should return 5', () => {
    let va = addValue(2, 3);
    assert.equal(va, 5);
  })
});



