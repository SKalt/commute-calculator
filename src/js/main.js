/* global mapboxgl, document, MB_ACCESS_TOKEN */
import select from './shorthand.js';
import debug from './debug.js';
import {createStore, combineReducers} from 'redux';
import {setupEvents} from './events.js';
import setupGeocoder from './geocoder.js';
import '../css/style.css';
import setupMapActions from './map-actions.js';

const log = debug('app:main');

import mapMode, {additionType} from './reducers/map-modes.js';
import locations from './reducers/locations.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const store = createStore(
    combineReducers({
      mapMode,
      locations,
      additionType
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
  map.once('load', ()=>{
    map.addSource('locations', {
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features:[]
      }
    });
  });

  let dependencyInjections = {map, store, events};
  [setupEvents, setupGeocoder, setupMapActions].forEach(
    setup => {
      log(setup);
      setup(dependencyInjections);
    }
  );
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
