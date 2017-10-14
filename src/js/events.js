/*global mapboxgl*/
// import {debug} from 'debug';
// import {pass} from './shorthand.js';
// import store from './store.js';

// const log = debug('app:redux');
// var old = store.getState();
// var current = store.getState();
const events = new mapboxgl.Evented;

// const lookup = (obj, ...path) => {
//   if (!obj || !path.length ) return undefined;
//   let [next, ...rest] = path;
//   return (rest.length) ? lookup(obj[next], ...rest):  obj[next];
// };
//
// //TODO: more efficient lookups.
//
// const emit = (type, cb, update) => events.fire(type, cb(update));
// const nothing = {emit:pass};
//
// function onChangeOf(...path){
//   let update = lookup(current, ...path);
//   if (!(update === lookup(old, ...path))){
//     log('*******', old, current);
//     log(path.join('.') + ' update:', update);
//     return {emit: (type, cb)=>emit(type, cb, update)};
//   } else {
//     log(path.join('.') + 'not fired');
//     return nothing;
//   }
// }
//
// log('initial state:', store.getState());
// store.subscribe(()=>log('state is now ', store.getState()));
// store.subscribe(()=>{
//   old = current;
//   current = store.getState();
//   // onChangeOf('')
//   onChangeOf('mapMode').emit('mapModeChange', mode => ({mode}));
//   onChangeOf('locations').emit('locationUpdate', locations=>({locations}));
//   onChangeOf('commutes').emit('commuteUpdate', commutes =>({commutes}));
// });

export default events;
