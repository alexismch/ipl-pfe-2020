const detectCircularDeps = require("detect-circular-deps");
 
describe('Circular Dependencies Issues', () => {
  it('Should not cause a problem', async () => {
    const promise = detectCircularDeps.problems();
    require('../dist/app');
    const results = await promise;
    if (results[0]) {
      throw new Error(results[0].message);
    }
    process.exit(0);
  });
});

const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), 0);
    });
  });
});
