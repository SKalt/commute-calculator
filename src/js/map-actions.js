import debug from './debug.js';
import {point} from '@turf/helpers';
const log = debug('app:mapActions');
var map, store, events;
const params = {layers:['locations']};
const add = {
  location(e, type){
    log(e, type);
    let {lng, lat} = e.lngLat;
    store.dispatch({
      type: 'ADD_LOCATION',
      location:point([lng, lat], {type})
    });
  },
  origin(e){
    add.location(e, 'origin');
  },
  destination(e){
    log('destination added --------------');
    add.location(e, 'destination');
  }
};

const remove = {
  location(e){
    let toRemove = map.queryRenderedFeatures(e.point, params)[0];
    if (toRemove){
      store.dispatch({type:'DELETE_LOCATION', locationId:toRemove.locationId});
    }
  }
};

const unbind = (...fns) => fns.forEach(fn => map.off('click', fn));

const select = {
  from(){},
  to(){} //TODO
};

const all = [add, remove, select]
  .map(Object.entries)
  .reduce((a,b) => a.concat(b), []);
all.except = function(fn){
  this.filter(e => e != fn);
};

function swap(event){
  let {mode, additionType} = event;
  mode = mode || store.getState().mapMode;
  additionType = additionType || store.getState().additionType;
  log('***', mode);
  if (mode == 'ADD_LOCATIONS'){
    log(mode);
    log('---------', additionType, store.getState());
    if (additionType == 'origins'){
      log('swap -> origns');
      unbind(all.except(add.origin));
      map.on('click', add.origin);
    } else if (additionType == 'destinations'){
      unbind(all.except(add.destination));
      map.on('click', add.destination);
    }
  } else if (mode == 'REMOVE_LOCATIONS'){
    unbind(all.except(remove.location));
    map.on('click', remove.location);
  } else {
    throw new Error('unexpected mode ' + mode);
  }
}


export default function setupMapActions(external){
  map = external.map;
  store = external.store;
  events = external.events;
  log(map, store, events);
  map.on('click', add.origin);
  events.on('mapModeChange', mode => swap(mode));
}
