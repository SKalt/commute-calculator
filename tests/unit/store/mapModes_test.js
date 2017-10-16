import {assert} from 'chai';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import map from '../../../src/js/store/map/index.js';
describe('map modes', ()=>{
  it('works', ()=>{
    const store = new Vuex.Store({modules:{map}});
    store.commit('updateMapMode', {mode:'REMOVE_LOCATIONS'});
    assert.equal(store.state.map.mode, 'REMOVE_LOCATIONS');
    // test swapping while already in a mode;
    store.commit({type:'updateMapMode', mode:'REMOVE_LOCATIONS'});
    assert.equal(store.state.map.mode, 'REMOVE_LOCATIONS');
    //re-swap map-modes
    store.commit({type:'updateMapMode', mode:'ADD_LOCATIONS'});
    assert.equal(store.state.map.mode, 'ADD_LOCATIONS');
  });
});
