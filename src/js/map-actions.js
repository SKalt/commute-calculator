import {debug} from 'debug';
import {point, featureCollection, lineString} from '@turf/helpers';
debug.enable('app:*');
const log = debug('app:map-actions');
import map from './map.js';
import store from './store/index.js';
import {getters} from './store/locations/index.js';
log(getters);
import reverse from './reverse-geocoder.js';
const {includedLocations} = getters;
// map.getSource('locations').setData(/*TODO*/)
const params = {
  layers:['locations-lyr', 'commutes-lyr'/*should be empty*/]
};

reverse.accessToken = MB_ACCESS_TOKEN;

const addOrSelect = e =>{
  let features = map.queryRenderedFeatures(e.point, params);
  return new Promise(()=>{
    if (features.length){
      log(features, 'fount at clicked point');
      store.commit('select', {type:'location', id:features[0].properties.id });
    } else {
      reverse.geocode(e.lngLat).then(featureCollection => {
        if (featureCollection.features.length != 1){
          log('odd', featureCollection);
          if (featureCollection.length == 0) throw new Error('no results');
          return featureCollection.features[0];
        }
      }).then(
        feature => {
          let location = {
            id: feature.id,
            address:feature.place_name
              || feature.properties.address
              || feature.address,
            type:'prelim',
            coords:feature.center
          };
          store.commit('addLocation', location);
          store.commit('select', {id:location.id, type:'location'});
        });
    }
  });
};

const remove = e => {
  let feature = map.queryRenderedFeatures(e.point, params)[0];
  if (feature) store.commit('removeLocation', {id:feature.id});
};

const click = (e) =>{
  log(store.state.map.mode);
  store.state.map.mode == 'ADD_LOCATIONS' ? addOrSelect(e):remove(e);
};

map.on('click', click);
map.once('load', ()=>{
  store.subscribe(({type})=>{
    log('mutation:', type);
    const locationsUpdated = (type == 'addLocation'
      || type == 'removeLocation'
      || type == 'updateLocationType');
    if (locationsUpdated){
      log('mutation of interest noted: ', type);
      let data = featureCollection(
        store.getters.includedLocations.map(loc => point(loc.coords, loc))
      );
      map.getSource('locations-src').setData(data);
      log('location geojson updated');
    } else if (type == 'select') {
      if (store.state.selection.type == 'location'){
        map.setFilter(
          'locations-selection-lyr',
          ['==', 'id', store.state.selection.id]
        );
      } else {
        map.setFilter(
          'commutes-selection-lyr',
          ['==', 'id', store.state.selection.id]
        );
      }
    }
  });
});
