/* global mapboxgl, document, MB_ACCESS_TOKEN */
import select from './shorthand.js';
//import {debug} from './debug.js';
import {createStore, combineReducers} from 'redux';
import {setupEvents} from './events.js';
import setupGeocoder from './geocoder.js';
import '../css/style.css';

import {mapMode} from './reducers/map-modes.js';
document.addEventListener('DOMContentLoaded', ()=>{
  const store = createStore(
    combineReducers({
      mapMode
    })
  );
  const events = new mapboxgl.Evented;
  mapboxgl.accessToken = MB_ACCESS_TOKEN;
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
    center: [-84.388, 33.749], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
  let dependencyInjections = {map, store, events};
  [setupEvents, setupGeocoder].forEach(setup => setup(dependencyInjections));
  ['origins', 'destinations', 'commutes']
    .forEach(
      mode => select.byId('add-' + mode)
        .addEventListener(
          'click', ()=>store.dispatch({type:'TOGGLE_MODE', mode})
        )
    );
});
