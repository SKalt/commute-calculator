<template>
  <div>
    <div id="location-rows">
      <div id="origins-rows" class="col-xs-12">
        <h3>Origins</h3>
        <location-row
        v-for="location in origins"
        :key="location.id"
        type="origin"
        ></location-row>
      </div>
      <div id="destinations-rows" class="col-xs-12">
        <h3 class="col-xs-12">Destinations</h3>
        <location-row
        v-for="location in destinations"
        :key="location.id"
        type="destination"
        ></location-row>
      </div>
    </div>
    <div id="commute-rows">
      <span class="col-xs-3">from</span>
      <span class="col-xs-3">to</span>
      <span class="col-xs-2">via</span>
      <span class="col-xs-2">at</span>
      <span class="col-xs-2">duration</span>
      <commute-row
      v-for="commute in commutes"
      :key="commute.id"></commute-row>
    </div>
  </div>
</template>
<script>
import {lookupLocation, lookupCommute} from '../js/lookups.js';
import commute from './commute/row.vue';
import location from './location/row.vue';

export default {
  data(){
    let state = store.getState();
    let selected = state.selection.id;
    let locations = Object.entries(state.locations.ids)
      .filter((id, included) => id !== selected && included)
      .map((id, included) => lookupLocation(id, state));
    let commutes = Object.entries(state.commutes.ids)
      .filter((id, included) => id !== selected && included)
      .map((id, included) => lookupCommute(id, state))
      .filter(commute => commute.from !== selected && commute.to !== selected );
    const filter = (type) =>  locations.filter( loc => loc.type == type );
    let origins = filter('origin');
    let destinations = filter('destination');
    return {
      commutes, // sorting?
      origins,
      destinations
    }
  },
  components: {
    'location-row': location,
    'commute-row': commute
  }
};

</script>
