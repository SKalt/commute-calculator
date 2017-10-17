import map from './map.js';
// import events from './events.js';
import {featureCollection} from '@turf/helpers';
import {debug} from 'debug';
const log = debug('app:mapDisplay');
import locationStyle from '../json/location-style.json';
import commuteStyle from '../json/commute-style.json';
import locationSelectStyle from '../json/location-select-style.json';
import commuteSelectStyle from '../json/commute-select-style.json';
map.once('load', ()=>{
  log('map loaded');
  map.addSource('locations-src', {
    type:'geojson',
    data:featureCollection([])
  });
  map.addLayer(locationSelectStyle);
  map.addLayer(locationStyle);
  map.addSource('commutes-src', {
    type:'geojson',
    data:featureCollection([])
  });
  map.addLayer(commuteStyle);
});
