import {combineReducers} from 'redux';

const locationAdditionActions = new Set([
  'ADD_SOURCE', 'ADD_DESTINATION'
]);
const locationTypeActions = new Set([
  'ADD_SOURCE', 'ADD_DESTINATION', 'UPDATE_LOCATION', 'DELETE_LOCATION'
]);
var nextLocationId = 0;

function points(state={}, action){
  if (action.type in locationAdditionActions){
    return Object.assign({}, state, { [nextLocationId++]: action.point});
  } else if (action.type == 'DELETE_LOCATION') {
    let newState = Object.assign({}, state);
    delete state[action.locationId];
    return newState;
  } else {
    return state;
  }
}

function locationTypes(state={}, action){
  if (action.type in locationTypeActions){
    return Object.assign({}, state, {[action.id] : action.locationType});
  } else if (action.type == 'DELETE_LOCATION'){
    let newState = Object.assign({}, state);
    delete state[action.locationId];
    return newState; //TODO: DRY
  } else {
    return state;
  }
}

export default combineReducers({
  locationTypes,
  points
});
