<template language="html">
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
      @click="updateByOrAt"
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
  props: ['id'],
  computed: mapState(['commutes', 'byId' this.id]),
  // created: function(){},
  methods: {
    ...mapMethods([
      'updateCommuteDuration',
      'updateCommuteFrequency'
    ]),
    updateTime(time){
      this.$store.dispatch('clone', {by:'time', time});
      // this.remove();
    },
    updateMode: function(mode){
      this.$store.dispatch('clone', {by:'mode', mode});
      // this.remove();
    },
    remove: function(){
      this.$store.commit('removeCommute', {id:this.id});
    },
    updateByOrAt(byOrAt){
      this.$store.dispatch('clone', {by:'byOrAt', byOrAt})
    }
  }
};
</script>
