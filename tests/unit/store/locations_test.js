import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import locations, {
  initialState, mutations
} from '../../../src/js/store/locations/index.js';
import {assert} from 'chai';

describe('selection', ()=>{
  it('correctly initializes', ()=>{
    const store = new Vuex.Store({modules:{locations}});
    //console.log(JSON.stringify(store.state.locations));
    assert.deepEqual(store.state.locations, initialState);
  });
  it('correctly adds a location', ()=>{
    const store = new Vuex.Store({modules:{locations}});
    const location = {address:'foo', locationType:'origin', coords:[0,0]};
    store.commit('addLocation', location);
    //console.log(JSON.stringify(store.state.locations));
    assert.deepEqual(store.state.locations, {
      address:{foo:'foo'},
      locationType:{foo:'origin'},
      notes:{foo:''},
      alias:{foo:''},
      coords:{foo:[0,0]},
      included:{foo:true}
    });
  });
  it('correctly adds another location', ()=>{
    let locations = {
      mutations,
      state:{
        address:{foo:'foo'},
        locationType:{foo:'origin'},
        notes:{foo:''},
        alias:{foo:''},
        coords:{foo:[0,0]},
        included:{foo:true}
      }
    };
    const store = new Vuex.Store({modules:{locations}});
    store.commit('addLocation', {
      address:'bar',
      locationType:'destination',
      coords:[1,1]
    });
    assert.deepEqual(store.state.locations, {"address":{"foo":"foo","bar":"bar"},"locationType":{"foo":"origin","bar":"destination"},"notes":{"foo":"","bar":""},"alias":{"foo":"","bar":""},"coords":{"foo":[0,0],"bar":[1,1]},"included":{"foo":true,"bar":true}})
  });
  it('correclty removes a location', ()=>{
    let locations = {
      mutations,
      state:{"address":{"foo":"foo","bar":"bar"},"locationType":{"foo":"origin","bar":"destination"},"notes":{"foo":"","bar":""},"alias":{"foo":"","bar":""},"coords":{"foo":[0,0],"bar":[1,1]},"included":{"foo":true,"bar":true}}
    };
    const store = new Vuex.Store({modules:{locations}});
    store.commit('removeLocation', {id:'foo'});
    assert(!store.state.locations.included.foo);
  });
  it('correctly updates a location', ()=>{
    let locations = {
      mutations,
      state: {"address":{"foo":"foo","bar":"bar"},"locationType":{"foo":"origin","bar":"destination"},"notes":{"foo":"","bar":""},"alias":{"foo":"","bar":""},"coords":{"foo":[0,0],"bar":[1,1]},"included":{"foo":false,"bar":true}}
    };
    const store = new Vuex.Store({modules:{locations}});
    store.commit('updateLocationNotes', {id:'bar', notes:'test'});
    // console.log(JSON.stringify(store.state.locations));
    assert.equal(store.state.locations.notes.bar, 'test', 'notes not updated');
    store.commit('updateLocationAlias', {id:'foo', alias:'test'});
    assert.equal(store.state.locations.alias.foo, 'test', 'alias not updated');
    // console.log(JSON.stringify(store.state.locations));
  });
});
