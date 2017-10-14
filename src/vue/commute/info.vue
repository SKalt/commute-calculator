<template>
  <div>
    <h3 class="col-xs-12">Commute {{from}} → {{to}}</h3>
    <!-- time -->
    <span class="col-xs-12">
      <span
      class="col-xs-2"
      :class="{active:departAt}"
      @click="updateTime"
      >arrive</span>
      <span
      class="col-xs-2"
      :class="{active:departAt}"
      @click="updateTime"
      >depart</span>
      <span class="col-xs-1">@</span>
      <input
      class="col-xs-7"
      @keyup.13="updateTime"
      :value="departAt || arriveBy"
      >
    </span>
    <span class="col-xs-12">
      <span class="col-xs-2">Duration</span>
      <span class="col-xs-4">{{duration}}</span>

      <span
      data-mode="walking"
      class="col-xs-1"
      title="Walking"
      :class="{active: mode === 'walking'}"
      @click="updateMode"
      >P</span>
      <span
      data-mode="bicycling"
      class="col-xs-1"
      :class="{active: mode === 'bicycling'}"
      @click="updateMode"
      >B</span>
      <span
      data-mode="driving"
      class="col-xs-1"
      :class="{active: mode === 'driving'}"
      @click="updateMode"
      >D</span>
      <span
      class="col-xs-1"
      :class="{active: mode === 'transit'}"
      @click="updateMode"
      >T</span>
    </span>
    <span class="col-xs-12">
      <span
      class="col-xs-12"
      @click="remove">Remove Commute</span>
    </span>
  </div>
</template>
<script>
// import events from '../../src/js/events.js';
import {lookupCommute} from '../../js/lookups.js'

export default {
  props: ['commuteId'],
  data:function(){
    return lookupCommute(this.commuteId, this.getState());
  },
  created: function(){
    events.$on('REMOVE_LOCATION', function(e){
      if (e.id == this.commuteId){
        this.$destroy();
      }
    });
  },
  methods: {
    updateMode: function(event){
      let mode = event.target.textContent;
      this.dispatch({type:'UPDATE_COMMUTE', mode:event.target.dataset.mode});
    },
    remove: function(){
      this.dispatch({type:'REMOVE_COMMUTE', id:this.id});
    }
  }
};
</script>
