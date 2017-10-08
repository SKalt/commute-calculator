import select from './shorthand.js';
import {debug} from 'debug';
const log = debug('app:locationTables');
import Sortable from 'sortablejs';
import map from './map.js'
import store from './store.js'
import events from './events.js';

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
          {title:'Location name'},
          loc.properties.name
            || loc.properties.notes
            || loc.properties.address
            || loc.id
        ),
        render.text.div(
          'col-xs-6 delete btn btn-default',
          {title:'delete'},
          'delete'
        )
      ];
      return render.text.div('col-xs-12 item', {'data-id':loc.id}, inner.join(''));
    }
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
        onSort:  (/**Event*/evt) => {
          // TODO: save order to localStorage
          log(`sort:${evt.to.id}->${evt.from.id}|id:${evt.item.dataset.id}`);
          let {item, from, to} = evt;
          let {id} = item.dataset;
          if (from == to){
            // TODO: update internal order
          } else {
            let location = store.getState().locations[id];
            log('original location:', location);
            location.properties.type = this.type;
            log('updated location:', location);
            this.renderedIds.add(id);
            store.dispatch({
              type:'UPDATE_LOCATION', location
            });
          }
        }
      }
    );
    log(this.id + ' init\'d');
  }
  update({locations}){
    // update order
    // remove updated/deleted locations
    let toRender = {ids:new Set(), locations:[]};
    Object.entries(locations).filter(
      ([id, loc])=>loc.properties.type == this.type && !this.renderedIds.has(id)
    ).forEach(([id, loc]) => {
      toRender.ids.add(id);
      toRender.locations.push(loc);
    });
    toRender.ids.forEach(e => this.renderedIds.add(e));
    this.render(toRender.locations);
    // using innerHTML kills all element-specific listeners
    this.el.querySelectorAll('.item')
      .forEach(el => el.children[1].addEventListener('click',
        () => {
          let {id} = el.dataset;
          this.renderedIds.delete(id) && el.remove();
          store.dispatch({ type:'DELETE_LOCATION', id });
          log(this.renderedIds);
        })
      );
  }
  render(locations){
    this.el.innerHTML += locations.map(render.text.location).join('');
  }
}


//const div = (text, ...classes) => `<div class="${classes}"`
export default function setupLocationTables(){
  const originsList = new SortableList('origins');
  const destinationsList = new SortableList('destinations');
  events.on('locationUpdate', (e) =>{
    log('locationUpdate recieved', e);
    originsList.update(e);
    destinationsList.update(e);
  });
}
