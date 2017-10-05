var map, store, events;
import {featureCollection} from '@turf/helpers';
import debug from './debug.js';
const log = debug('app:mapDisplay');

const proto = {
  layer: {
    source: 'locations-src',
    type:'circle'
  },
  paint:{
    'circle-opacity': .8,
    'circle-radius' : 8
  }
};
const newLayer = (id, filter, color) => Object.assign(
  {id, filter},
  proto.layer,
  {paint:Object.assign({'circle-color': color}, proto.paint)}
);

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
    map.addLayer(
      newLayer('origins', ['==', 'type', 'origin'], '#C22745')
    );
    map.addLayer(
      newLayer('destinations', ['==', 'type', 'destination'], '#5727C2')
    );
    events.on('locationUpdate', ({locations}) => {
      let features = featureCollection(Object.values(locations));
      log(features);
      log('src', map.getSource('locations-src')._data);
      map.getSource('locations-src').setData(features);
      log('src', map.getSource('locations-src')._data);
    });
  });
}
