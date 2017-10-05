var map, store, events;
import {point, feature, featureCollection} from '@turf/helpers';
import debug from './debug.js'
const log = debug('app:mapDisplay')

export default function setupDisplay(external){
  map = external.map;
  store = external.store;
  events = external.events;
  map.once('load', ()=>{
    map.addSource('locations-src', {
      type:'geojson',
      data:{
        type:'FeatureCollection',
        features:[]
      }
    });
    map.addLayer({
      id: 'origins-lyr',
      source: 'locations-src',
      type: 'circle',
      filter: ['==', 'type', 'origin']
      // layout:{
      //   'icon-image': 'monument-15',
      //   'text-field': 'title',
      //   'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      //   'text-offset': [0, 0.6],
      //   'text-anchor': 'top'
      // }
    });
    map.addLayer({
      id: 'destinations-lyr',
      source: 'locations-src',
      type:'symbol'
    });
    events.on('locationUpdate', ({locations}) => {
      let features = featureCollection(Object.values(locations));
      log(features);
      log('src', map.getSource('locations-src')._data);
      map.getSource('locations-src').setData(features);
      log('src', map.getSource('locations-src')._data);
    });
  });
}
