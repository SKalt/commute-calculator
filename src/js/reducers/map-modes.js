import debug from 'debug';
const log = debug('reducers:mapModes');

export default function mapMode(state='ADD_LOCATIONS', action){
  if (action.type == 'UPDATE_MAP_MODE' && action.mode != state){
    if(action.mode == 'REMOVE_LOCATIONS'){
      log('map mode set to: REMOVE_LOCATIONS');
      return 'REMOVE_LOCATIONS';
    } else {
      log('map mode set to: ADD_LOCATIONS');
      return 'ADD_LOCATIONS';
    }
  }
  log('pass', action);
  return state;
}
