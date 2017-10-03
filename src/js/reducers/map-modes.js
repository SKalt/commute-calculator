const possible_modes = new Set([
  'ADD_SOURCES',
  'ADD_DESTINATIONS',
  'REMOVE_PLACES',
  'ADD_COMMUTES',
  'REMOVE_COMMUTES'
]);

export function mapModes(state, action){
  if (action.type in possible_modes){
    return action.type;
  } else {
    return state;
  }
}
