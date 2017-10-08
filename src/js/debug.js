/* global ENV */
const dbg = require('debug');
debugger;
import map from './map.js';
import events from './events.js';
import store from './store.js';
if (ENV != 'production'){
  dbg.disable('*');
  dbg.enable('app:*');
  window.map = map;
  window.events = events;
  window.store = store;
} else {
  dbg.disable();
}

export default dbg;
