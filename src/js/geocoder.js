/*global mapboxgl, MapboxGeocoder*/
import select from './shorthand.js';
import store from './store.js';
import {debug} from 'debug';
const log = debug('app:geocode');
import map from './map.js';
import {stringify} from 'querystring';

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

export class Reverse {
  constructor(){
    let predefined = global.window
      && window.mapboxgl
      && mapboxgl.accessToken;
    this.accessToken = predefined || '';
  }
  geocode(lngLatLike={}, opts){
    let  { lng, lat } = lngLatLike;
    if (!lng && !lat) [lng, lat] = lngLatLike;
    if (!lng || !lat) return new Promise(
      (resolve,reject)=>reject(new Error('missing coordinate(s)'))
    );

    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?` +
        stringify(Object.assign({access_token:this.accessToken}, opts))
    ).then(response =>{
      if (response.ok){
        return response.json();
      }
      throw new Error(`${response.code}:${response.message}`);
    });
  }
}
