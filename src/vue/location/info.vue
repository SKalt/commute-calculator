<template>
  <div>
    <h3 class="col-xs-12">{{alias || address || 'Location Info'}}</h3>
    <div class="col-xs-12">
      <div contenteditable
      class="col-xs-12"
      type="text"
      title="notes"
      data-placeholder="notes on this location"
      :value="notes"
      v-model="notes"
      ></div>
      <button class="btn btn-default"
      @click="updateNotes">
        Save Notes
      </button>
      <select v-model="type" @change="updateType" class="btn btn-default">
        <option disabled selected value="prelim">Add as a(n)...</option>
        <option
        title="a house or apartment whose commutes you'd like to compare"
        value="origin">
          origin
        </option>
        <option
        title="A place you'd commute to and from regularly, no matter where you live"
        value="destination">
          destination
        </option>
        <option
        title="A place you'd only visit if you lived nearby, like a grocery store"
        value="amenity">
          amenity
        </option>
      </select>
      <button class="btn btn-default"
      @click="removeLocation">
        delete
      </button>
    <div id="commutes-from-here" class="col-xs-12">
      </div><!-- to/from rows -->
    </div>
  </div>
</template>
<script>
import {lookupLocation} from '../../js/lookups';
import debug from 'debug';
const log = debug('info-panel');
export default {
  props: ['id'],
  computed:{
    address(){
      return (this.$store.state.locations.byId[this.id] || {}).address;
    },
    type: function(){
      return this.$store.state.selection.type;
    },
    alias: function(){
      return (this.$store.state.locations.byId[this.id] || {}).alias;
    },
    notes: function(){
      return (this.$store.state.locations.byId[this.id] || {}).notes;
    }
  },
  methods:{
    removeLocation(){
      this.$store.commit('removeLocation', {id:this.id});
      this.$store.commit('select', {id:-1, type:'location'});
    },
    updateNotes(){
      this.$store.commit('updateLocationType', {id:this.id, notes:this.notes});
    },
    updateType(){
      this.$store.commit('updateLocationType', {id:this.id, type:this.type});
    },
    updateLocationAlias(){
      this.$store.commit('updateLocationAlias', {id:this.id, alias:this.alias});
    }
  }
}
</script>
