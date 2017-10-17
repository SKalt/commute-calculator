import Vue from 'vue';
import Vuex from 'vuex';
import locations from './locations/index.js';
import commutes from './commutes/index.js';
import selection from './selection/index.js';
import mapMode from './map/index.js';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {  locations, commutes, mapMode, selection }
});
