import {v4} from 'uuid';

// mutations
const add = (state, {address, locationType, coords}) => {
  let id = address || v4();
  state.included[id] = true;
  state.address[id] = address;
  state.locationType[id] = locationType;
  state.notes[id] = state.alias[id] = '';
  state.coords[id] = coords;
};
const mutations = {
  addLocation: add,
  removeLocation:(state, {id}) => {
    state.included[id] = false;
  },
  updateLocationAlias: (state, {id, alias}) => state.alias[id] = alias,
  updateLocationType: (state, {id, locationType}) => state.locationType[id] = locationType,
  updateLocationNotes: (state, {id, notes}) => state.notes[id] = notes,
  updateLocationCoords:(state, {id, coords}) => state.coords[id] = coords
};
// const getters = {
//   locations(state){
//     return state.included;
//   }
// };
export const initialState =  {
  included:{}, locationType:{}, address:{}, notes:{}, alias:{}, coords:{}
};
let state = localStorage.getItem('locations') || initialState;
export const columns = [ 'address', 'locationType', 'notes', 'alias', 'coords' ];
export {mutations};
export default {mutations, state};
// state:{ // all map [locationId]: value
//   ids:{},
//   alias:{},
//   address:
//   notes:{},
//   locationType:{}
// },
