import {createStore} from 'redux';
import {assert} from 'chai';
import locations from '../../src/js/reducers/locations.js';
import commutes from '../../src/js/reducers/commutes.js';
import selection from '../../src/js/reducers/selection.js';
import mapMode from '../../src/js/reducers/map-modes.js';
import {point} from '@turf/helpers';
import fs from 'fs';
import {join} from 'path';
// console.log(__dirname);
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


describe('#locations', ()=>{
  it('should correctly add a location', ()=>{
    let action = Object.assign({}, loc0, {type:'ADD_ORIGIN'});
    const store = createStore(locations);
    store.dispatch(action);
    let id = action.id; // from getId(action)
    let expected = {
      'origins': { [id]: true },
      'destinations': {},
      'prelim': {},
      'notes': { [id]: 0 },
      'geometries': {
        [id]: {
          'type': 'Point',
          'coordinates': [ 0, 0 ]
        }
      },
      'addresses': {
        [id]: '1 first st, footown, BA, BAZ'
      },
      'ids': {
        [id]: true
      }
    };

    assert.deepEqual(store.getState(), expected);
    action = Object.assign({}, loc1, {type:'ADD_DESTINATION'});
    store.dispatch(action);
    let id2 = action.id;
    expected = {
      'origins': {
        [id]: true
      },
      'destinations': {
        [id2]: true
      },
      'prelim': {},
      'notes': {
        [id]: 0,
        [id2]: null
      },
      'geometries': {
        [id]: {
          'type': 'Point', 'coordinates': [ 0, 0 ]
        },
        [id2]: {
          'type': 'Point', 'coordinates': [ 1, 1 ]
        }
      },
      'addresses': {
        [id]: '1 first st, footown, BA, BAZ',
        [id2]: '234 fury rd, Mad, MA'
      },
      'ids': {
        [id]: true,
        [id2]: true
      }
    };
    assert.deepEqual(store.getState(), expected);
  });
  it('should correctly remove a location', ()=>{
    let action = Object.assign(
      {id:'b4e82757-d749-479d-828c-deb74d915aed'},
      loc0,
      {type:'REMOVE_LOCATION'}
    );
    let init = JSON.parse(
      fs.readFileSync(join(__dirname, '/fixtures/init.json'), 'utf8')
    );
    const store = createStore( locations, init );
    store.dispatch(action);
    let expected = Object.assign({}, init);
    expected.ids['b4e82757-d749-479d-828c-deb74d915aed'] = false;
    assert.deepEqual(store.getState(), expected);
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
