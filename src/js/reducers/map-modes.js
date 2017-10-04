import debug from '../debug.js';
const log = debug('app:mapModes');

const possibleModes = new Set([
  'ADD_LOCATIONS',
  'REMOVE_LOCATIONS',
  'ADD_COMMUTES',
  'REMOVE_COMMUTES',
  'SELECT_FROM',
  'SELECT_TO'
]);

export function additionType(state='origins', action){
  if (action.type == 'ADD_LOCATIONS'){
    return action.locationType || 'origins';
  }
  return state;
}

export default function mapMode(state='ADD_LOCATIONS', action){
  if (possibleModes.has(action.type)){
    log(action.type);
    return action.type;
  } else {
    log(action);
    return state;
  }
}
