import {createStore, combineReducers, applyMiddleware} from 'redux';
import mapMode from './reducers/map-modes.js';
import locations from './reducers/locations.js';
import commutes from './reducers/commutes.js';
import selection from './reducers/selection.js';
import {debug} from 'debug';
// debug.enable('*');
debug.disable('*')
import modes from './transit-modes';
const allowedModes = new Set(modes);
// localStorage.getItem('cached_locations_and_commutes')
// check:
// - commute ids are included in from & to
// - commutes w/ transit include either an arriveBy / departAt but not both.
// - selection in location / commute / prelim ids.
const dbg = (msg, action) =>{
  // debugger;
  debug('rdx:mddlwrFilter')(msg, action || '');
  (action||{}).type = 'null';
};

export const filter = store => next => action => {
  const state = store.getState();
  let locationIds = state.locations.ids;
  switch(action.type.slice(0,3)){
  case 'ADD':
    switch(action.type.slice(4)){
    case 'COMMUTE':
      if (!(action.to in locationIds)) dbg('`to` absent', action);
      if (!(action.from in locationIds)) dbg('`from` absent', action);
      if (!(allowedModes.has(action.mode))) dbg('invalid mode', action);
      break;
    case 'LOCATION':
      if (!action.geometry){
        dbg('missing location geometry', action);
      } else if (!(action.address || (action.properties || {}).address)){
        dbg('missing address', action);
      }
    }
    break;
  case 'UPD': //update
    switch(action.type.slice(7)){
    case 'LOCATION':

      if (!(action.id in locationIds)) dbg('locatin @ id absent ', action);
      break;
    case 'COMMUTE':
      if (action.id in state.commutes.ids) dbg('no commute @ id', action);
      action.to = action.from = undefined; // will be filtered out in reducer
      if (!(allowedModes.has(action.mode))) dbg('invalid mode', action);
      break;
    }
    break;
  case 'SEL': //select
    switch(action.selectionType){
    case 'location':
      if (!(action.id in locationIds)) dbg('no location for id ', action);
      break;
    case 'commute':
      if (!(action.id in state.commutes.ids)) dbg('no commute @ id ', action);
      break;
    default:
      dbg('invalid selectionType ', action);
      break;
    }
  }
  return next(action);
};
const logger = store => next => action => {
  debug('rdx:mddlwr')('dispatching', action);
  let result = next(action);
  debug('rdx:mddlwr')('next state', store.getState());
  return result;
};


export default createStore(
  combineReducers({
    mapMode,
    locations,
    commutes,
    selection
  }),
  {},//initialState,
  applyMiddleware(logger, filter)//middleware
);
