import {combineReducers} from 'redux';

//import {v4} from 'uuid/v4';
import debug from 'debug';
const log = debug('app:commutes');
const hash = ({to, from, byOrAt, time, mode}) => {
  from = from.slice(0,8);
  to = to.slice(0,8);
  return `${from}-[${mode}]->${to} ${byOrAt || '?'} ${time}`;
};
// load previous commutes from localStorage

// const id = (function*(){
//   while (true) yield maxId++;
// })();

const getId = action =>{
  if (action.id == undefined) action.id = hash(action);
  return action.id;
};
const isUpdate = ({type}) => type == 'ADD_COMMUTE' || type == 'UPDATE_COMMUTE';

const update = (state, action, value) => Object.assign(
  {}, state, {[getId(action)] : value}
);

function generic(state, action, lookup){
  const value = action[lookup];
  if (isUpdate(action) && value != null && value != undefined){
    return update(state, action, value);
  }
  return state;
}
const combined = {
  ids(state={}, action={}){
    if (action.type == 'ADD_COMMUTE'){
      return update(state, action, true);
    } else if (action.type == 'REMOVE_COMMUTE'){
      return update(state, action, false);
    } // will have to remove commutes based on location elsewhere
    return state;
  }
};
let columns = [
  'to', 'from', 'mode', 'distance', 'byOrAt', 'duration',
  'frequency', 'time'
];
for (let column of columns){
  combined[column] = (state={}, action={}) => generic(state, action, column);
}

// function departAt(state={}, action={})

//const makeId = ({from, to}) => `${from} → ${to}`; // stylistic choice.

export default combineReducers(combined);
