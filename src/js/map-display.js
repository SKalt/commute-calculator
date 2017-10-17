import map from './map.js';
// import events from './events.js';
import {featureCollection} from '@turf/helpers';
import {debug} from 'debug';
const log = debug('app:mapDisplay');
import locationStyle from '../json/location-style.json';
//TODO: load style json from static files;

map.once('load', ()=>{
  log('map loaded');
  map.addSource('locations-src', {
    type:'geojson',
    data:featureCollection([])
  });
  map.addLayer(locationStyle);
});
