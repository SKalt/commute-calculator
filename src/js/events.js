var old = {};
var current = {};

const lookup = (obj, ...path) => {
  if (!obj || !path.length ) return undefined;
  let [next, ...rest] = path;
  return (rest.length) ? lookup(obj[next], ...rest):  obj[next];
};
const changeAt = (...path) => lookup(old, ...path) === lookup(current, ...path);

export function setupEvents(store, events){
  store.subscribe(()=>{
    old = current;
    current = store.getState();
    if (changeAt('mapMode')){
      events.fire('mapModeChange', {mapModeUpdate:lookup(current, 'mapMode')});
    }
  });
}
