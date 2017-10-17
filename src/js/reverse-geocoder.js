import {stringify} from 'querystring';
// import debug from 'debug';
// const log = debug('geocoding:reverse');

class Reverse {
  constructor(){
    this.accessToken = mapboxgl.accessToken || '';
  }
  geocode(lngLatLike={}, opts){
    let  { lng, lat } = lngLatLike; // check for object {lng, lat}
    if (!lng && !lat) [lng, lat] = lngLatLike; // check for array [lng, lat]
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
export default new Reverse;
