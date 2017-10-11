import {debug} from 'debug';
import {combineReducers} from 'redux';
const log = debug('app:locations');
import {v4} from 'uuid';
//const actions = new Set(['ADD', 'UPDATE', 'DELETE'].map(s=>`${s}_LOCATION`));
const getId = action =>{
  if (action.id == undefined) action.id = v4();
  return action.id;
};

const logIdInclusion = (state, action, index) =>{
  log(`Id ${getId(action)} ${getId(action) in state ? '': 'not'} in ${index} `);
};

const add = (state, action, lookup, index) =>{
  logIdInclusion(state, action, index);
  return Object.assign({}, state, {[getId(action)]:lookup(action)});
};

// const remove = (state, action, index) => {
//   logIdInclusion(state, action, index);
//   const temp =  Object.assign({}, state);
//   return Object.assign({}, delete temp[action.id] && temp);
// };

const isAddition = action => {
  return action.type == 'ADD_ORIGIN'
    ||   action.type == 'ADD_DESTINATION';
};

// function generic(state={}, action={}, lookup, check){
//   const value = action[lookup];
//   if (!check || check(value)){
//     if (isAddition(action) && value != null && value != undefined){
//       return add(state, action, value);
//     }
//   }
//   return state;
// }

function geometries(state={}, action){
  // ids <=> points
  if (isAddition(action)) {
    return add(state, action, a=>a.geometry, 'points');
  }
  //  else if (action.type == 'REMOVE_LOCATION'){
  //   return remove(state, action);
  // }
  return state;
}

function addresses(state={}, action){
  if (isAddition(action) || action.type == 'UPDATE_ADDRESS'){ // for reverse-geocoding returns
    return add(state, action, a=>a.address || a.properties.address, 'addresses');
  }
  // else if (action.type == 'REMOVE_LOCATION'){
  //   return remove(state, action);
  // }
  return state;
}

function notes(state={}, action={}){
  if (isAddition(action) || action.type == 'UPDATE_LOCATION'){
    return add(state, action, a=>a.properties.notes, 'notes');
  }
  // else if (action.type == 'REMOVE_LOCATION'){
  //   return remove(state, action);
  // }
  return state;
}

function ids(state={}, action={}){
  if (isAddition(action)){
    return add(state, action, ()=>true, 'ids');
  } else if (action.type == 'REMOVE_LOCATION'){
    return add(state, action, ()=>false, 'ids');
  }
  return state;
}

function type(type){
  const TYPE = type.toUpperCase();
  return (state={}, action) => {
    if (action.type == `ADD_${TYPE}`){
      return add(state, action, ()=>true, type);
    }
    else if (action.type == `REMOVE_${TYPE}`){
      let temp = Object.assign({}, state);
      return (delete temp[getId(action)]) && temp;
    }
    return state;
  };
}
const origins = type('origin');
const destinations = type('destination');
const prelim = type('prelim');

export default combineReducers({
  origins, destinations, prelim, notes, geometries, addresses, ids
});
