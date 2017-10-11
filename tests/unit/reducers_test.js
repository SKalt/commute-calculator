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
  let init = JSON.parse(
    fs.readFileSync(join(__dirname, '/fixtures/locations-init.json'), 'utf8')
  );
  it('should correctly add a location', ()=>{
    let action = Object.assign(
      {}, loc0, {type:'ADD_LOCATION'}, {locationType:'origin'}
    );
    const store = createStore(locations);
    store.dispatch(action);
    let id = action.id; // from getId(action)
    let expected = {
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
      },
      'types': { [id]: 'origin' }
    };
    // console.log(JSON.stringify(store.getState(), null, 2));
    assert.deepEqual(store.getState(), expected, 'unexpected state change');
    action = Object.assign({}, loc1, {type:'ADD_LOCATION', locationType:'destination'});
    store.dispatch(action);
    let id2 = action.id;
    expected = {
      'notes': { [id]: 0 },
      'types': { [id]: 'origin', [id2]:'destination' },
      'geometries': {
        [id]: { 'type': 'Point', 'coordinates': [ 0, 0 ] },
        [id2]: { 'type': 'Point', 'coordinates': [ 1, 1 ] }
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
    // console.log(JSON.stringify(store.getState(), null, 2));
    assert.deepEqual(store.getState(), expected);
  });
  it('should correctly remove a location', ()=>{
    let id = 'b44e296b-efb6-4921-a737-ea3446a52d62';
    let action = Object.assign({id}, loc0, {type:'REMOVE_LOCATION'});
    const store = createStore( locations, init );
    store.dispatch(action);
    // console.log(JSON.stringify(store.getState(), null, 2));
    let expected = Object.assign({}, init);
    expected.ids = Object.assign({}, expected.ids);
    expected.ids[id] = false;
    assert.deepEqual(store.getState().ids, expected.ids, 'unexpected ids state');
  });
  it('should correctly update a location\'s notes', ()=>{
    let id = 'b44e296b-efb6-4921-a737-ea3446a52d62';
    let action = Object.assign(
      {id},
      {properties:{notes: 'updated'}},
      {type:'UPDATE_LOCATION'}
    );
    const store = createStore( locations, init );
    store.dispatch(action);
    // console.log(JSON.stringify(store.getState(), null, 2));
    let expected = Object.assign({}, init);
    expected.notes[id] = 'updated';
    assert.deepEqual(store.getState(), expected);
  });
  it('should correctly update a location\'s type', ()=>{
    let id = 'b44e296b-efb6-4921-a737-ea3446a52d62';
    let action = {
      id,
      newType:'destination',
      type:'UPDATE_LOCATION'
    };
    const store = createStore( locations, init );
    store.dispatch(action);
    assert.equal(store.getState().types[id], 'destination');
  });
  it('should correctly update a location\'s geometry', ()=>{
    let id = 'b44e296b-efb6-4921-a737-ea3446a52d62';
    let action = {
      id,
      geometry: point([100, 100]).geometry,
      type:'UPDATE_LOCATION'
    };
    const store = createStore( locations, init );
    let expected = Object.assign({}, init);
    expected.geometries[id] = action.geometry;
    store.dispatch(action);
    assert.deepEqual(store.getState(), expected, 'unexpected state');
  });
});

describe('commutes', ()=>{
  let init = JSON.parse(
    fs.readFileSync(
      join(
        __dirname, 'fixtures/commutes-init.json'
      ),
      'utf8'
    )
  );
  it('should correctly add a commute', ()=>{
    const store = createStore(commutes);
    let action = {
      type: 'ADD_COMMUTE',
      to: 'fakeid1',
      from: 'fakeid2',
      mode:'transit',
      arriveBy: new Date('2017-10-11T04:03:46.722Z').toISOString()
    };
    store.dispatch(action);
    let {id} = action;
    let expected = {
      'mode': {[id]: 'transit'},
      'ids': { [id]: true},
      'to': { [id]: 'fakeid1'},
      'from': { [id]: 'fakeid2'},
      'distance': {},
      'arriveBy': {[id]: '2017-10-11T04:03:46.722Z' },
      'departAt': {},
      'duration': {},
      'frequency':{}
    };
    // console.log(JSON.stringify(store.getState(), null, 2));
    assert.deepEqual(expected, store.getState(), 'unexpected state');
  });
  it('should correctly remove a commute', ()=>{
    const store = createStore(commutes, init);
    let id =  '4648501e-c717-4c1d-ae96-d47327f01fe8';
    const action = {id, type:'REMOVE_COMMUTE'};
    store.dispatch(action);
    // console.log(JSON.stringify(store.getState(), null, 2));
    let expected = Object.assign({}, init, {ids:{[id]:false}});
    assert.deepEqual(expected, store.getState());
  });
  it('should correctly update a commute', ()=>{
    const store = createStore(commutes, init);
    let id =  '4648501e-c717-4c1d-ae96-d47327f01fe8';
    let action = {id, type:'UPDATE_COMMUTE', duration: 0};
    store.dispatch(action);
    // console.log(JSON.stringify(store.getState(), null, 2));
    let expected = Object.assign({}, init, {duration:{[id]:0}});
    assert.deepEqual( store.getState(), expected, '0');
    action = {id, type:'UPDATE_COMMUTE', distance:0};
    store.dispatch(action);
    expected = Object.assign({}, store.getState(), {distance: {[id]:0}});
    assert.deepEqual(expected, store.getState(), '1');
    action = {id, type:'UPDATE_COMMUTE', frequency:0};
    store.dispatch(action);
    expected = Object.assign({}, store.getState(), {frequency: {[id]:0}});
    assert.deepEqual(expected, store.getState(), '2');
  });
});

describe('map-modes', ()=>{
  it('should correctly swap map modes', ()=>{
    const store = createStore(mapMode);
    store.dispatch({type:'UPDATE_MAP_MODE', mode:'REMOVE_LOCATIONS'});
    assert.equal(store.getState(), 'REMOVE_LOCATIONS');
    // test swapping while already in a mode;
    store.dispatch({type:'UPDATE_MAP_MODE', mode:'REMOVE_LOCATIONS'});
    assert.equal(store.getState(), 'REMOVE_LOCATIONS');
    //re-swap map-modes
    store.dispatch({type:'UPDATE_MAP_MODE', mode:'ADD_LOCATIONS'});
    assert.equal(store.getState(), 'ADD_LOCATIONS');
  });
});
describe('selection', ()=>{
  it('should correctly select a new location', ()=>{
    const store = createStore(selection);
    let action = {type:'SELECT', selectionType:'location', id:'fakeid1'};
    store.dispatch(action);
    assert.equal(store.getState().id, 'fakeid1');
    assert.equal(store.getState().type, 'location');
  });
});
