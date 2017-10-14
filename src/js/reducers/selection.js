import {combineReducers} from 'redux';

function id(state='-1', action={}){
  if (action.type == 'SELECT'){
    return action.id;
  }
  return state;
}

function type(state='location', action={}){
  if (action.type == 'SELECT'){
    return action.selectionType; // must commute or other
  }
  return state;
}

export default combineReducers({ id, type });
