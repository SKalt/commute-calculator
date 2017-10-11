import {combineReducers} from 'redux';
import modes from '../transit-modes';
import {v4} from 'uuid';
import debug from 'debug';
const log = debug('app:commutes');

// load previous commutes from localStorage

// const id = (function*(){
//   while (true) yield maxId++;
// })();

const getId = action =>{
  if (action.id == undefined) action.id = v4();
  return action.id;
};

const allowedModes = new Set(modes);
const isUpdate = ({type}) => type == 'ADD_COMMUTE' || type == 'UPDATE_COMMUTE';

const update = (state, action, value) => Object.assign(
  {}, state, {[getId(action)] : value}
);

function generic(state, action, lookup, check){
  const value = action[lookup];
  if (!check || check(value)){
    if (isUpdate(action) && value != null && value != undefined){
      return update(state, action, value);
    }
  }
  return state;
}
const combined = {
  mode(state={}, action={}){
    return generic(state, action, 'mode', value => allowedModes.has(value));
  },
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
  'to', 'from', 'distance', 'arriveBy', 'departAt', 'duration', 'frequency'
];
for (let column of columns){
  combined[column] = (state={}, action={}) => generic(state, action, column);
}

// function departAt(state={}, action={})

//const makeId = ({from, to}) => `${from} → ${to}`; // stylistic choice.

export default combineReducers(combined);
