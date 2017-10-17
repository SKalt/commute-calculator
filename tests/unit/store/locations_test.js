import Vue from 'vue';
import Vuex from 'vuex';
import oneLocationState from '../fixtures/locations-init.json';
Vue.use(Vuex);
import locations, {
  initialState, mutations, getters
} from '../../../src/js/store/locations/index.js';
import {assert} from 'chai';
const mockStore = (state) => {
  return new Vuex.Store({
    modules:{
      locations:{
        mutations, getters, state:state || {...initialState}
      }
    }
  })
}
describe('selection', ()=>{
  it('correctly initializes', ()=>{
    const store = mockStore();
    //console.log(JSON.stringify(store.state.locations));
    assert.deepEqual(store.state.locations, initialState);
  });
  it('correctly adds a location', ()=>{
    const store = mockStore();
    const location = {address:'foo', type:'origin', coords:[0,0]};
    store.commit('addLocation', location);
    // console.log(JSON.stringify(store.state.locations, null, 2));
    assert.deepEqual(store.state.locations, {
      byId:{
        foo:{...location, id:'foo'}
      },
      included:{foo:true}
    });
    assert.deepEqual(store.getters.origins[0], {
      ...location, id:'foo', alias:'', notes:''
    })
    // console.log(JSON.stringify(store.getters.origins[0], null, 2));
  });
  it('correctly adds another location', ()=>{
    const store = mockStore(oneLocationState);
    const location = {
      address:'bar',
      locationType:'destination',
      coords:[1,1]
    };
    store.commit('addLocation', location);
    assert.deepEqual(store.state.locations, {
      byId:{...oneLocationState.byId,
        bar:{...location, id:'bar', notes:'', alias:''}
      },
      included:{foo:true, bar:true}
    });
  });
  it('correclty removes a location', ()=>{
    const store = mockStore(oneLocationState);
    store.commit('removeLocation', {id:'foo'});
    assert(!store.state.locations.included.foo);
  });
  it('correctly updates a location', ()=>{
    const store = mockStore(oneLocationState);
    store.commit('updateLocationNotes', {id:'bar', notes:'test'});
    // console.log(JSON.stringify(store.state.locations));
    assert.equal(
      store.state.locations.byId.bar.notes,
      'test',
      'notes not updated'
    );
    store.commit('updateLocationAlias', {id:'foo', alias:'test'});
    assert.equal(
      store.state.locations.byId.foo.alias,
      'test',
      'alias not updated'
    );
    // console.log(JSON.stringify(store.state.locations));
  });
});
