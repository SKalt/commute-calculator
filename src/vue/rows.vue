<template language="html">
  <div>
    <div id="location-rows">
      <div id="origins-rows" class="col-xs-12">
        <h3>Origins</h3>
        <location-row
        v-for="location in origins"
        v-bind="location"
        v-show="selectedId != location.id"
        :key="location.id"
        type="origin"
        ></location-row>
      </div>
      <div id="destinations-rows" class="col-xs-12">
        <h3>Destinations</h3>
        <location-row
        v-for="location in destinations"
        v-bind="location"
        v-show="selectedId != location.id"
        :key="location.id"
        type="destination"
        ></location-row>
      </div>
    </div>
    <div v-if="commutes.length" id="commute-rows">
      <span class="col-xs-3">from</span>
      <span class="col-xs-3">to</span>
      <span class="col-xs-2">via</span>
      <span class="col-xs-2">at</span>
      <span class="col-xs-2">duration</span>
      <commute-row
      v-for="commute in commutes"
      :key="commute.id"
      v-show="selectedId != location.id"
      ></commute-row>
    </div>
  </div>
</template>
<script>
import {lookupLocation, lookupCommute} from '../js/lookups.js';
import commute from './commute/row.vue';
import location from './location/row.vue';

export default {
  computed: {
    origins(){
      return this.$store.getters.origins;
    },
    destinations(){
      return this.$store.getters.destinations;
    },
    selectedId(){
      return this.$store.state.selection.id;
    },
    selectedType(){
      return this.$store.state.selection.type;
    },
    // locations(){
    //   return this.$store.getters.includedLocations;
    // },
    commutes(){
      return Object.keys(this.$store.getters.includedCommutes)
        .map(id => this.$store.commutes.byId[id])
        .filter(({id, from, to}) => {
          return [from, to, id].every(_id => _id != selectedId)
        });
    }
  },
  components: {
    'location-row': location,
    'commute-row': commute
  }
};
</script>
