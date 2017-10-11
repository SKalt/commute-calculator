// import {createStore} from '../../src/js/redux.js';
import store from '../../src/js/redux.js';
import {assert} from 'chai';

describe('#filter', ()=>{
  it('correctly passes', ()=>{
    //correct actions here;
    let action = {
      type:'ADD_LOCATION',
      geometry:{type:'Point', coordinates:[0,0]},
      properties: {
        address:'foo rd, barton, baz',
        notes: 'non-musical'
      },
      newType: 'prelim'
    };
    store.dispatch(action);
    let {id} = action;
    assert.deepEqual(
      store.getState().locations,
      {
        geometries:{ [id]: {type:'Point', coordinates:[0,0]} },
        types: { [id]: 'prelim' },
        addresses: {[id]:'foo rd, barton, baz'},
        notes: {[id]: 'non-musical'},
        ids: {[id]:true}
      },
      'unexpected location state on additon'
    );
    action = {
      id,
      type: 'UPDATE_LOCATION',
      newType: 'origin'
    };
    store.dispatch(action);
    assert.deepEqual(
      store.getState().locations,
      {
        geometries:{ [id]: {type:'Point', coordinates:[0,0]} },
        types: { [id]: 'origin' },
        addresses: {[id]:'foo rd, barton, baz'},
        notes: {[id]: 'non-musical'},
        ids: {[id]:true}
      },
      'unexpected location state on update'
    );

    action = { type:'SELECT', selectionType:'location', id};
    store.dispatch(action);
    assert.deepEqual(
      {id, type:'location'},
      store.getState().selection,
      'selection incorrectly updated'
    );
  });
  it('correctly filters', ()=>{
    // invalid filters here;
    let action = { // missing id!
      type: 'UPDATE_LOCATION',
      newType: 'origin'
    };
    let sameState = store.getState();
    store.dispatch(action);
    assert.deepEqual(sameState, store.getState(), 'location incorrectly updated');

    action = {type: 'ADD_COMMUTE'};
    store.dispatch(action);
    assert.deepEqual(sameState, store.getState(), 'commute incorrectly added');

    action = { type:'UPDATE_COMMUTE'};
    store.dispatch(action);
    assert.deepEqual(sameState, store.getState(), 'commute incorrectly updated');

    action = { type:'SELECT', selectionType:'foo'};
    store.dispatch(action);
    assert.deepEqual(sameState, store.getState(), 'selection incorrectly updated');
  });
});
