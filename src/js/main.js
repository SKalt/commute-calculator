/* global ENV, document, window */
import {debug} from 'debug';
import map from './map.js';
import './geocoder.js'
import events from './events.js';
import store from './store.js';
import select from './shorthand.js';
import '../css/style.css';
import Vue from 'vue';
if (ENV != 'production'){
  debug.disable('*');
  debug.enable('app:*');
  window.map = map;
  window.events = events;
  window.store = store;
} else {
  debug.disable();
}
Vue.mixin({
  methods: {
    dispatch(action){
      return store.dispatch(action);
    },
    getState(){
      return store.getState();
    },
    on(e, fn){
      events.on(e, fn);
    },
    once(e, fn){
      events.on(e, fn);
    },
    off(e, fn){
      events.off(e, fn);
    }
  }
});
import app from '../vue/App.vue';
console.log('&&&&&&&&&&&&&&&&&&&', app);
// import map from './map.js';
Vue.component(app);
const log = debug('app:main');

document.addEventListener('DOMContentLoaded', ()=>{
  new Vue(app).$mount('#app');
});
