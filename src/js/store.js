import {combineReducers, createStore} from 'redux';
import mapMode, {additionType} from './reducers/map-modes.js';
import locations from './reducers/locations.js';

export default createStore(
  combineReducers({
    mapMode,
    locations,
    additionType
  })
);
