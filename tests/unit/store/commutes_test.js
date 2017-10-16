import {expect, assert} from 'chai';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import commuteState3 from '../fixtures/commutes-state-3.json';

import commutes, {
  initialState, mutations, actions, getters
} from '../../../src/js/store/commutes/index.js';
// mock locations :
import {
  mutations as locationMutations
} from '../../../src/js/store/locations/index.js';
const mockCommutes = (state) =>{
  if (state) return {state, mutations, actions, getters};
  return {state:{byId:{}, included:{} }, mutations, actions, getters};
};
const mockLocations = (state)=>{
  let result= {mutations:locationMutations};
  if (state) return Object.assign(result, {state });
  return result;
};
const _locations = {
  one: {
    state:{
      included:{foo:true},
      coords:{foo:[0,0]}
    }
  },
  two:{
    state:{
      included:{foo:true, bar:true},
      coords:{foo:[0,0], bar:[1,2]}
    }
  },
  minusOne:{
    state:{
      included:{foo:true, bar:false},
      coords:{foo:[0,0], bar:[1,2]}
    }
  }
};

describe('commutes', ()=>{
  it('correctly initializes', ()=>{
    const store = new Vuex.Store({modules:{commutes:mockCommutes()}});
    assert.deepEqual(store.state.commutes, initialState);
  });
  it('correctly adds a commute', ()=>{
    const store = new Vuex.Store({
      modules:{
        commutes:mockCommutes(), locations:_locations.two
      }
    });
    //console.log(JSON.stringify(store.state.locations));
    const payload = {
      to:'foo', from:'bar', byOrAt:'by', mode:'walking',
      time: new Date('2017-10-16T17:41:49.716Z'),
    };
    store.dispatch('addCommute', payload);
    // console.log(payload.id);
    assert.deepEqual(store.state.commutes.byId[payload.id], payload );
    //console.log(JSON.stringify(store.state, null, 2));
  });
  it('correctly updates a commute', ()=>{
    const commutes = mockCommutes({
      byId:{
        fakeId:{
          to:'foo', from:'bar', mode:'walking', duration:0,
          time: new Date('2017-10-16T17:41:49.716Z'), byOrAt:'by'
        }
      },
      included:{fakeId:true}
    });
    const store = new Vuex.Store({modules:{
      commutes, locations:_locations.two
    }});

    store.dispatch('cloneByMode', {id:'fakeId', mode:'transit'});
    let id = 'bar-[transit]->foo by Mon Oct 16 2017 13:41:49 GMT-0400 (EDT)';
    assert.equal(store.state.commutes.byId.fakeId.mode, 'walking');
    assert.equal(store.state.commutes.byId[id].mode, 'transit');
    // console.log(JSON.stringify(store.state.commutes, null, 2));
    store.dispatch('clone', {id, by:'byOrAt', byOrAt:'at'});
    id = id.replace('by', 'at');
    // console.log(JSON.stringify(store.state.commutes, null, 2));
    assert.equal(store.state.commutes.byId.fakeId.byOrAt, 'by');
    assert.equal(store.state.commutes.byId[id].byOrAt, 'at');

  });
  it('correctly removes a commute', ()=>{
    let state = commuteState3;
    let commutes = mockCommutes(state);
    let store = new Vuex.Store({modules:{commutes, locations:_locations.two}});
    store.commit('removeCommute', {id:'fakeId'});
    assert.equal(store.state.commutes.included.fakeId, false);
  });
  it('correctly removes a commute when a dependent location is removed', ()=>{
    let store = new Vuex.Store({
      modules:{
        locations:mockLocations(_locations.two.state),
        commutes:mockCommutes(commuteState3)
      }});
      // console.log(mockLocations(_locations.two));
    // console.log(store.getters.includedCommutes);
    let expectedSize = Object
      .values(store.state.commutes.included)
      .filter(f=>f)
      .length;
    // console.log(JSON.stringify(store.state.locations, null, 2));
    assert.equal(store.getters.includedCommutes.size, expectedSize);
    store.commit('removeLocation', {id:'foo'});
    assert.equal(store.getters.includedCommutes.size, 0);

  });
  it('correctly rejects a commute missing a location', ()=>{
    let store = new Vuex.Store({
      modules:{
        commutes:mockCommutes(), locations:_locations.one
      }
    });
    const payload = {
      to:'foo', from:'bar', byOrAt:'by', mode:'walking',
      time: new Date('2017-10-16T17:41:49.716Z'),
    };
    store.dispatch('addCommute', payload);
    assert.deepEqual(store.state.commutes.included, {}, 'absent location does not prevent commute addition');
    store = new Vuex.Store({
      modules:{
        commutes: mockCommutes(), locations:_locations.minusOne
      }
    });
    store.dispatch('addCommute', payload);
    expect(store.state.commutes.included).to.deep.equal({});
  });
  it('correctly skips a commute missing a mode', ()=>{
    let store = new Vuex.Store({
      modules:{
        commutes:mockCommutes(),
        locations:_locations.two
      }
    });
    //console.log(JSON.stringify(store.state.locations));
    let payload = {
      to:'foo', from:'bar', byOrAt:'by',
      time: new Date('2017-10-16T17:41:49.716Z'),
    };
    store.dispatch('addCommute', payload);
    expect(store.state.commutes.included).to.deep.equal({});
    payload.mode = 'invalid';
    store.dispatch('addCommute', payload);
    expect(store.state.commutes.included).to.deep.equal({});
  });
});
