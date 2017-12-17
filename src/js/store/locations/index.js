import {v4} from 'uuid';
import Vue from 'vue';
import debug from 'debug';
// debug.enable('store:*');
const log = debug('store:locations');
const set = Vue.set;
// mutations
const mutations = {
  addLocation(state, payload){
    if (!payload.coords){
      log('empy location');
      return 0;
    }
    payload.id = payload.id || payload.address || v4();
    if (!(payload.id in state.byId)) {
      payload.notes = payload.notes || '';
      payload.alias = payload.alias || '';
      set(state.byId, payload.id, payload);
    } else {
      log('id already present', payload.id);
    }
    set(state.included, payload.id, true);
  },
  removeLocation:(state, {id}) => {
    set(state.included, id, false);
  },
  updateLocationAlias(state, {id, alias}){
    set(state.byId[id], 'alias', alias);
  },
  updateLocationType(state, {id, type}){
    set(state.byId[id], 'type', type);
  },
  updateLocationNotes(state, {id, notes}){
    set(state.byId[id], 'notes', notes);
  },
  updateLocationCoords(state, {id, coords}){
    set(state.byId[id], 'coords', coords);
  }
};
export const getters = {
  includedLocations(state){
    return Object.keys(state.included)
      .filter(id => state.included[id])
      .map(id => state.byId[id]);
  },
  origins(state, getters){
    return getters.includedLocations.filter(loc => loc.type === 'origin');
  },
  destinations(state, getters){
    return getters.includedLocations.filter(loc => loc.type !== 'origin');
  }
};
export const initialState =  {
  byId:{}, included:{}
};
let state = localStorage.getItem('locations') || initialState;
export const columns = [ 'address', 'locationType', 'notes', 'alias', 'coords' ];
export {mutations};
export default {mutations, state, getters};
// state:{ // all map [locationId]: value
//   ids:{},
//   alias:{},
//   address:
//   notes:{},
//   locationType:{}
// },
