function lookup(keys, id, state){
  return keys
    .map(key => ({[key]: state.locations[key][id]}))
    .reduce(Object.assign, {id});
}
export function lookupLocation(id, state){
  return lookup(
    ['geometries', 'types', 'addresses', 'notes'],
    id, state
  );
}
export function lookupCommute(id, state){
  return lookup(
    [
      'to', 'from', 'mode', 'distance', 'byOrAt', 'duration',
      'frequency', 'time'
    ],
    id, state);
}
