import select from './shorthand.js';
import debug from './debug.js';
const log = debug('app:locationTables');
import Sortable from 'sortablejs';
var map, store, events;
const parser = new DOMParser();
class DivTable {
  constructor(types, group){
    this.types = types;
    this.type = types.slice(0, -1);
    this.id = `${types}-list`;
    this.renderedIds = new Set();
    this.sortable = new Sortable(
      select.byId(this.id),
      {
        draggable: '.item',  // Specifies which items inside the element should be draggable
        group,
        // Element dragging ended
        onEnd: function (/**Event*/evt) {
          log('end', evt);  // dragged HTMLElement
          evt.to;    // target list
          evt.from;  // previous list
          evt.oldIndex;  // element's old index within old parent
          evt.newIndex;  // element's new index within new parent
        },

        // Element is dropped into the list from another list
        onAdd: function (/**Event*/evt) {
          // same properties as onEnd
          log('onAdd', evt)
        },

        // Changed sorting within list
        onUpdate: function (/**Event*/evt) {
          // same properties as onEnd
          log('onUpdate', evt)
        },

        // Called by any change to the list (add / update / remove)
        onSort: function (/**Event*/evt) {
          // same properties as onEnd
          log('onSort', evt)
        },

        // Element is removed from the list into another list
        onRemove: function (/**Event*/evt) {
          // same properties as onEnd
          log('onRemove', evt)
        },
    });
  }
  render({locations}){
    Object.entries(locations).forEach(
      ([id, location]) => {
        select.byId(`${this.types}-section`)
      }
    );
  }
}

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
}
//const div = (text, ...classes) => `<div class="${classes}"`
export default function setupLocationTables(external){
  map = external.map;
  store = external.store;
  events = external.events;
  const originsList = new DivTable('origins');
  const destinationsList = new DivTable('destinations');
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
  });
  // });
}
