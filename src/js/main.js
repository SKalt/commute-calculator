/* global ENV, document, window */
import {debug} from 'debug';
import map from './map.js';
import './map-display.js';
import './map-actions.js';
import geocoder from './geocoder.js';
// import events from './events.js';
import store from './store/index.js';
// import select from './shorthand.js';
import '../css/style.css';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
if (ENV != 'production'){
  debug.disable('*');
  debug.enable('app:*');
  window.map = map;
  // window.events = events;
  window.store = store;
} else {
  debug.disable();
}
import app from '../vue/App.vue';
// import map from './map.js';
Vue.component(app);
const log = debug('app:main');

document.addEventListener('DOMContentLoaded', ()=>{
  new Vue(app).$mount('#app');
  log('app mounted');
});
