import debug from '../debug.js';
const log = debug('app:mapModes');

const possible_modes = new Set([
  'ADD_LOCATIONS',
  'REMOVE_LOCATIONS',
  'ADD_COMMUTES',
  'REMOVE_COMMUTES'
]);

export function mapMode(state='ADD_LOCATIONS', action){
  if (action.type in possible_modes){
    log(action.type);
    return action.type;
  } else {
    return state;
  }
}
