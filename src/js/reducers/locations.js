import debug from '../debug.js';
const log = debug('app:locations');

//const actions = new Set(['ADD', 'UPDATE', 'DELETE'].map(s=>`${s}_LOCATION`));
var nextId = 0;

export default function locations(state={}, action){
  if (action.type == 'ADD_LOCATION'){
    log(action);
    let id = action.location.id || nextId++;
    return Object.assign({}, state, {
      [id]: Object.assign({}, action.location, {id})
    });
  } else if (action.type == 'UPDATE_LOCATION'){
    log(action);
    return Object.assign({}, state, {[action.location.id] : action.location});
  } else if (action.type == 'DELETE_LOCATION') {
    log(action);
    let newState = Object.assign({}, state);
    delete newState[action.id];
    return newState;
  } else {
    return state;
  }
}
