/*global mapboxgl, MapboxGeocoder*/
import select from './shorthand.js';
import store from './store/index.js';
import {debug} from 'debug';
debug.enable('app:*');
const log = debug('app:geocode');
import map from './map.js';

let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Search by address',
  types:'district,place,locality,neighborhood,address,poi'
});
geocoder.on('result', ({result}) => {
  log('result',result);
  let location = Object.assign(
    {
      address: result.place_name || result.properties.address || result.address,
      type: 'prelim',
      coords: result.center
    },
    ...result.context.map(c =>({[c.id.split('.')[0]]: c.text}))
  );
  log('location', location);
  store.commit('addLocation', location);
  store.commit('select', {type:'location', id:location.id});
});
map.addControl(geocoder);
select.byId('geocoder-holder').appendChild(
  select.first('.mapboxgl-ctrl-geocoder')
);

export default geocoder;
