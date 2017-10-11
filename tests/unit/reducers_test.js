import {createStore} from 'redux';
import {assert} from 'chai';
import locations from '../../src/js/reducers/locations.js';
import commutes from '../../src/js/reducers/commutes.js';
import selection from '../../src/js/reducers/selection.js';
import mapMode from '../../src/js/reducers/map-modes.js';
import {point} from '@turf/helpers'
// command is
// mocha --require mock-local-storage tests/unit/reducers_test.js --compilers js:babel-core/register

// describe('importing', function(){
//   it('works', function(){
//     console.log(store, store.getState);
//     console.log(localStorage);
//   })
// })

//TODO:fixture initial states
//TODO:fixture actions
//TODO: manage initial state/ counter conflict.

const loc0 = point([0,0], {
  address:'1 first st, footown, BA, BAZ',
  notes: 0,

});
const loc1 = point([1,1], {
  notes: null,
});
loc1.address = '234 fury rd, Mad, MA';
const loc2 = point([2,2], {
  address: '\t \r \n \v \0 -1 yellow brick rd, Emerald City',
  notes: 'five stars'
});


describe('locations', ()=>{
  it('should correctly add a location', ()=>{
    let action = Object.assign({}, loc0, {type:'ADD_ORIGIN'});
    const store = createStore(locations);
    store.dispatch(action);
    let id = action.id; // from getId(action)
    const expected = {
      destinations:{},
      origins:{[id]:true},
      ids: {[id]:true},
      notes: {[id]:loc0.properties.notes},
      geometries: {[id]:loc0.geometry},
      addresses: {[id]: loc0.properties.address},
    };
    assert.deepEqual(store.getState(), expected);
    action = Object.assign({}, loc1, {type:'ADD_DESTINATION'});
    store.dispatch(action);
    id = Object.keys(store.getState())[1];
    expected.ids[id] = expected.destinations[id] = true;
    expected.notes[id] = loc1.properties.notes;
    expected.geometries[id] = loc1.geometry;
    expected.addresses[id] = loc1.properties.address;
    assert.deepEqual(store.getState(), expected);
  });
  it('should correctly remove a location', ()=>{

  });
  it('should correctly update a location\'s notes', ()=>{});
  it('should correctly update a location\'s type', ()=>{});
  it('should correctly update a location\'s geometry', ()=>{});
});

describe('commutes', ()=>{
  it('should correctly add a commute', ()=>{

  });
  it('should correctly remove a commute', ()=>{});
  it('should correctly update a commute', ()=>{}); // TODO: check to/from only set on additon
});

describe('map-modes', ()=>{
  it('should correctly swap map modes', ()=>{});
});
describe('selection', ()=>{
  it('should correctly select a new location', ()=>{});
  it('should correctly select a new commute', ()=>{});
});
