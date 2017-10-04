import debug from './debug.js';
import pass from './shorthand.js';

const log = debug('app:redux');
var old = {};
var current = {};
var events, store;

const lookup = (obj, ...path) => {
  if (!obj || !path.length ) return undefined;
  let [next, ...rest] = path;
  return (rest.length) ? lookup(obj[next], ...rest):  obj[next];
};

//TODO: hold paths, checks in memory

const emit = (type, cb, update) => events.fire(type, cb(update));
const nothing = {emit:pass};

function onChangeOf(...path){
  let update = lookup(current, ...path);
  if (!(update === lookup(old, ...path))){
    log(path.join('.') + ' update:', update);
    return {emit: (type, cb)=>emit(type, cb, update)};
  } else {
    log(path.join('.') + 'not fired');
    return nothing;
  }
}

export function setupEvents(external){
  events = external.events;
  store = external.store;
  log('initial state:', store.getState());
  store.subscribe(()=>{
    old = current;
    current = store.getState();
    onChangeOf('mapMode').emit('mapModeChange', mode => ({mode}));
    onChangeOf('locations').emit('locationUpdate', (locations)=>({locations}));
  });
  //store.dispatch({type:'REMOVE_LOCATIONS'});
}
