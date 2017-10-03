/* global maboxgl, ENV, document */
import select from './shorthand.js';
import {debug} from './debug.js';
import {createStore} from 'redux';
import {setupEvents} from './events.js';

import {modes} from './reducers/map-modes.js';

const store = createStore({
  modes
});
const events = mapboxgl.Evented;
const map = mapboxgl.map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9' // TODO: toggle dark/light
});
setupEvents(store, events);
