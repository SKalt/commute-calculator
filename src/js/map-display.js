import map from './map.js';
import events from './events.js';
import {featureCollection} from '@turf/helpers';
import {debug} from 'debug';
const log = debug('app:mapDisplay');
//TODO: load style json from static files;

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

map.once('load', ()=>{
  map.addSource('locations-src', {
    type:'geojson',
    data:featureCollection([])
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
