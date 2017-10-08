/* global ENV, document, window */
import {debug} from 'debug';
import map from './map.js';
import events from './events.js';
import store from './store.js';
import select from './shorthand.js';
import '../css/style.css';

if (ENV != 'production'){
  debug.disable('*');
  debug.enable('app:*');
  window.map = map;
  window.events = events;
  window.store = store;
} else {
  debug.disable();
}

// import map from './map.js';
const log = debug('app:main');

document.addEventListener('DOMContentLoaded', ()=>{
  ['origins', 'destinations'].forEach(
    mode => select.byId('add-' + mode)
      .addEventListener(
        'click', ()=>{
          log(`${mode} clicked`);
          store.dispatch({type:'ADD_LOCATIONS', locationType:mode});
        })
  );
  select('.delete:not(#delete-commutes)').forEach(
    btn => btn.addEventListener(
      'click',
      ()=>store.dispatch({type:'REMOVE_LOCATIONS'})
    )
  );

});
