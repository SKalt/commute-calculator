import lineString from '@turf/helpers';

function lookup(keys, id, state){
  return keys
    .map(key => ({[key]: state.locations[key][id]}))
    .reduce(Object.assign, {id});
}

export function lookupLocation(id, state){
  let {locations} = state;
  return {
    geometry: locations.geometries[id],
    type: locations.types[id],
    address: locations.addresses[id],
    notes: locations.notes[id]
  };
}
export function lookupCommute(id, state){
  return lookup(
    [
      'to', 'from', 'mode', 'distance', 'byOrAt', 'duration',
      'frequency', 'time'
    ],
    id, state);
}
export function lookupCommuteGeometry(id, state){
  return lineString(
    ['to', 'from']
      .map(key => state.commutes[key][id])
      .map(loc => state.locations.geometries[loc])
      .map(geom => geom.coordinates || geom),
    {id, 'duration': state.commutes.duration[id]}
  );
}
