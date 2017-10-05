/*global mapboxgl, MapboxGeocoder*/
import select from './shorthand.js';
import debug from './debug.js';
const log = debug('app:geocode');
var map, events, store;
export default function setupGeocoder(external){
  map = external.map;
  events = external.events;
  store = external.store;

  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: 'Search by address'
  });
  geocoder.on('result', ({result}) => {
    log('result',result);
    let properties = Object.assign(
      {address: result.place_name},
      {type: store.getState().additionType.slice(0, -1)},
      ...result.context.map(c =>({[c.id.split('.')[0]]: c.text}))
    );
    let location = Object.assign(result, {properties});
    log('location', location);
    store.dispatch({type:'ADD_LOCATION', location});
  });
  map.addControl(geocoder);
  select.byId('geocoder-holder').appendChild(
    select.first('.mapboxgl-ctrl-geocoder')
  );
}

// event handling here...
