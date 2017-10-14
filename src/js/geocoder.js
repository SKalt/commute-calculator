/*global mapboxgl, MapboxGeocoder*/
import select from './shorthand.js';
import store from './store.js';
import {debug} from 'debug';
const log = debug('app:geocode');
import map from './map.js';

let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  placeholder: 'Search by address',
  types:'district,place,locality,neighborhood,address,poi'
});
geocoder.on('result', ({result}) => {
  log('result',result);
  let properties = Object.assign(
    {address: result.place_name},
    {type: store.getState().additionType.slice(0, -1)},
    ...result.context.map(c =>({[c.id.split('.')[0]]: c.text}))
  );
  let action = Object.assign(result, {properties}, {
    type:'ADD_LOCATION',
    locationType:'prelim'
  });
  log('location', location);
  store.dispatch(action);
});
map.addControl(geocoder);
select.byId('geocoder-holder').appendChild(
  select.first('.mapboxgl-ctrl-geocoder')
);


// event handling here...
