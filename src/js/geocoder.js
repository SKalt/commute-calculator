/*global mapboxgl, MapboxGeocoder*/
import select from './shorthand.js';

var map;//, events;
export default function setup(external){
  map = external.map;
  //events = external.events;

  let geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: 'Search by address'
  });
  map.addControl(geocoder);
  select.byId('geocoder-holder').appendChild(
    select.first('.mapboxgl-ctrl-geocoder')
  );
}

// event handling here...
