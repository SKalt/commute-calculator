import {combineReducers} from 'redux';
import debug from '../debug.js';
const log = debug('app:locations');

//const actions = new Set(['ADD', 'UPDATE', 'DELETE'].map(s=>`${s}_LOCATION`));
var nextId = 0;
function getId(action){
  if (!action.id) action.id = nextId++;
  return action.id;
}

function points(state={}, action){
  if (action.type == 'ADD_LOCATION'){
    log(action, getId(action), getId(action));
    return Object.assign({}, state, { [getId(action)]: action.point});
  } else if (action.type == 'DELETE_LOCATION') {
    log(action);
    let newState = Object.assign({}, state);
    delete newState[action.id];
    return newState;
  } else {
    return state;
  }
}

function types(state={}, action){
  if (action.type == 'ADD_LOCATION'){
    return Object.assign({}, state, {[getId(action)]:action.locationType});
  } else if (action.type == 'UPDATE_LOCATION'){
    log(action, nextId(action), nextId(action));
    return Object.assign({}, state, {[action.id] : action.locationType});
  } else if (action.type == 'DELETE_LOCATION'){
    log(action);
    let newState = Object.assign({}, state);
    delete state[action.id];
    return newState; //TODO: DRY
  } else {
    return state;
  }
}

export default combineReducers({
  types,
  points
});
