import {createStore, combineReducers} from 'redux';
import mapMode from './reducers/map-modes.js';
import locations from './reducers/locations.js';
import commutes from './reducers/commutes.js';
import selection from './reducers/commutes.js';
// localStorage.getItem('cached_locations_and_commutes')
export default createStore(
  combineReducers({
    mapMode,
    locations,
    commutes,
    selection
  })
);
