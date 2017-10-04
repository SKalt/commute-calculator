const assert = require('assert');

// from src/js/events.js; not bothering to import it
const lookup = (obj, ...path) => {
  if (!obj || !path.length ) return undefined;
  let [next, ...rest] = path;
  return (rest.length) ? lookup(obj[next], ...rest):  obj[next];
};

describe('lookup', function(){
  it('returns correctly on an empty object', ()=>{
    let a = {};
    assert.equal(lookup(a, 'b', 'c'), undefined);
  });
  it('returns correctly without any path', ()=>{
    let a = {a:{b:1}};
    assert.equal(lookup(a), undefined);
  });
  it('returns correctly', ()=>{
    let a = {a:{b:1}};
    assert.ok(lookup(a, 'a', 'b') == 1);
    assert.ok(lookup(a, 'a', 'foo') == undefined);
    assert.equal(lookup(a, 'a'), a.a);
  });
})
