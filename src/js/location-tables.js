import select from './shorthand.js';
import debug from './debug.js';
const log = debug('app:locationTables');
import Sortable from 'sortablejs';
var map, store, events;
const render = {
  text : {
    div(classes, attrs, text){
      attrs = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
      return `<div class="${classes}" ${attrs}>${text}</div>`;
    },
    location(loc){
      log( 'location -> text: ', loc);
      let inner = [
        render.text.div(
          'col-xs-6',
          {title:'Location role: origin or destiation'},
          loc.properties.type
        ),
        render.text.div(
          'col-xs-6',
          {title:'Location name'},
          loc.properties.name || loc.properties.notes || loc.id
        )
      ];
      return render.text.div('col-xs-12 item', {'data-id':loc.id}, inner.join(''));
    }
  },
  locations(locs){
    log('locations to render', locs);
    select.byId('origins-list').innerHTML = locs.map(this.text.location).join('');
  }
};

class SortableList {
  constructor(types, group='locations'){
    this.types = types;
    this.type = types.slice(0, -1);
    this.id = `${types}-list`;
    this.el = select.byId(this.id);
    this.renderedIds = new Set();
    this.order = []; //ids
    this.sortable = new Sortable(
      this.el,
      {
        draggable: '.item',  // Specifies which items inside the element should be draggable
        group,
        // Called by any change to the list (add / update / remove)
        onSort: function (/**Event*/evt) {
          // TODO: save order to localStorage
          log(`sort:${evt.to.id}->${evt.from.id}|id:${evt.item.dataset.id}`);
          let {item, from, to} = evt;
          let {id} = item.dataset;
          if (from == to){
            // TODO: update internal order
          } else {
            let newType = to.dataset.type;
            let location = store.getState().locations[id];
            log(location);
            location.properties.type = newType;
            log(location);
              // store.dispatch({
              //   type:'UPDATE_LOCATION', location
              // });
          }
        }
      }
    );
    log(this.id + ' init\'d');
  }
  update({locations}){
    // update order
    // remove updated/deleted locations
    let toRender = [];
    Object.entries(locations).filter(
      ([id, loc])=>loc.property.type == this.type && !this.renderedIds.has(id)
    ).forEach(([id, loc]) => {
      toRender.push(loc);
      this.rendered.add(id);
    });
    this.render(toRender);
  }
  render(locations){
    this.el.innerHTML += locations.map(render.text.location).join('');
  }
}


//const div = (text, ...classes) => `<div class="${classes}"`
export default function setupLocationTables(external){
  map = external.map;
  store = external.store;
  events = external.events;
  const originsList = new SortableList('origins');
  const destinationsList = new SortableList('destinations');
  events.on('locationUpdate', (e) =>{
    log('locationUpdate recieved', e);
    let {locations} = e;
    let origins = [];
    let destinations = [];
    Object.values(locations).forEach(
      loc => {
        if (loc.properties.type == 'origin'){
          origins.push(loc);
        } else {
          destinations.push(loc);
        }
      }
    );
    render.locations(origins);
    //render.locations(destinations);
  });
  // });
}
