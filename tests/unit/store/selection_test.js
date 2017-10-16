import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import selection, {initialState} from '../../../src/js/store/selection/index.js';
import {assert} from 'chai';

describe('selection', ()=>{
  it('correctly initializes', ()=>{
    const store = new Vuex.Store({modules:{selection}});
    assert.deepEqual(store.state.selection, initialState);
  });
  it('correctly updates', ()=>{
    const store = new Vuex.Store({modules:{selection}});
    const mutation = {id:'foo', type:'location'};
    store.commit('select', mutation);
    assert.deepEqual(store.state.selection, mutation);
  });
});
