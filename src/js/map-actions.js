import {debug} from 'debug';
// import {point} from '@turf/helpers';
const log = debug('app:map-actions');
import map, {} from './map.js';
import store from './store.js';
import events from './events.js';
import Reverse from './geocoder.js';
var mode = store.getState().mapMode;
events.on('UPDATE_MAP_MODE', e => mode = e.mode);
events.on('ADD_LOCATION', e => {
  map.getSource('locations').setData(/*TODO*/)
});
events.on('SELECT', ({id}) => map.setFilter('selected', ['==', '$id', id]));
const params = {
  layers:['locations', 'commutes', 'prelim']
};

const reverse = new Reverse;
reverse.accessToken = MB_ACCESS_TOKEN;

const addOrSelect = e =>{
  let features = map.queryRenderedFeatures(e.point, params);

  return new Promise(()=>{
    if (features.length){
      store.dispatch({
        type: 'SELECT', selectionType:'location', id:features[0].id
      });
    }
    else {
      reverse.geocode(e.lngLat).then(featureCollection => {
        if (featureCollection.features.length != 1){
          log('odd', featureCollection);
          if (featureCollection.length == 0) throw new Error('no results');
          return featureCollection.features[0];
        }
      }).then(
        feature => {
          store.dispatch(Object.assign(
            {}, feature, {type:'ADD_LOCATION'},
            feature.place_name ? {name:feature.place_name } : {}
          ));
        });
    }
  });
};

const remove = (e) => {
  let feature = map.queryRenderedFeatures(e.point, params)[0];
  if (feature) store.dispatch({type:'REMOVE_LOCATION', id:feature.id});
};

const click = (e) =>{
  mode == 'remove' ? remove(e) : addOrSelect(e);
}

map.on('click', click)
