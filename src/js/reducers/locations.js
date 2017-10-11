import {debug} from 'debug';
import {combineReducers} from 'redux';
debug.enable('*');
const log = debug('reducers:locations');
import {v4} from 'uuid';
//const actions = new Set(['ADD', 'UPDATE', 'DELETE'].map(s=>`${s}_LOCATION`));
const getId = action =>{
  if (action.id == undefined) action.id = v4();
  return action.id;
};

// const logIdInclusion = (state, action, index) =>{
//   log(`Id ${getId(action)} ${getId(action) in state ? '': 'not'} in ${index} `);
// };

const update = (state, action, value, index) => {
  //logIdInclusion(state, action, index);
  return Object.assign({}, state, {[getId(action)]:value});
};

// const remove = (state, action, index) => {
//   logIdInclusion(state, action, index);
//   const temp =  Object.assign({}, state);
//   return Object.assign({}, delete temp[action.id] && temp);
// };
const pass = ()=>{};
const removal = (state, {id}) => {
  let newState = Object.assign({}, state);
  return id ? (delete newState[id]) && newState : newState;
};
const notNone = value => (value !== undefined) && (value !== null);
const isUpdate = action => { //TODO: refactor -> isUpdate
  return action.type == 'ADD_LOCATION'
    ||   action.type == 'UPDATE_LOCATION';
};

function generic(state={}, action={}, lookup=pass, removal){
  if (isUpdate(action)){
    let value = lookup(action);
    if (notNone(value)) return update(state, action, value);
  } else if (action.type == 'REMOVE_LOCATION'){
    if (removal) return removal(state, action);
  }
  return state;
}

const geometries = (state={}, action) => {
  return generic(state, action, action => action.geometry);
};

const addresses = (state={}, action) => {
  return generic(
    state, action,
    action=>action.address || action.properties.address
  );
};
const notes = (state={}, action) => {
  return generic(state, action, action=>action.properties.notes);
};

const ids = (state={}, action) => generic(state, action, ()=>true, ()=>false);

const types = (state={}, action) => {
  return generic(state, action, action=>action.newType);
};

export default combineReducers({ notes, geometries, addresses, ids, types });
