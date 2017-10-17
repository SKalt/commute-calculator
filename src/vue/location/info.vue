<template>
  <div>
    <h3 class="col-xs-12">{{alias || address || 'Location Info'}}</h3>
    <div class="col-xs-12" v-if="address">
      <div contenteditable
      class="col-xs-12 notes-box"
      type="text"
      title="notes"
      data-placeholder="notes on this location"
      :content="notes"
      @input="updateNotes"
      ></div>
      <button class="btn btn-default"
      @click="updateNotes">
        Save Notes
      </button>
      <select
        :value="type"
        @change="e => updateType(e)"
        class="btn btn-default">
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
  data(){
    return {notes:(this.$store.state.locations.byId[this.id] || {}).notes};
  },
  watch:{
    id(current, old){
      console.log('foo');
      this.notes = (this.$store.state.locations.byId[this.id] || {}).notes;
      this.$nextTick(()=>{
        this.$el.querySelector('div.notes-box').innerText = this.notes;
      });
    }
  },
  computed:{
    address(){
      return (this.$store.state.locations.byId[this.id] || {}).address;
    },
    type: function(){
      return this.$store.state.selection.type;
    },
    alias: function(){
      return (this.$store.state.locations.byId[this.id] || {}).alias;
    }
    // notes: function(){
    //   return (this.$store.state.locations.byId[this.id] || {}).notes;
    // }
  },
  methods:{
    removeLocation(){
      this.$store.commit('removeLocation', {id:this.id});
      this.$store.commit('select', {id:-1, type:'location'});
    },
    updateNotes(event){
      let notes = event.target.innerText;
      this.$store.commit(
        'updateLocationNotes',
        {
          id:this.id,
          notes
        }
      );
    },
    updateType(event){
      let type = event.target.value;
      this.$store.commit('updateLocationType', {id:this.id, type});
    },
    updateLocationAlias(){
      this.$store.commit('updateLocationAlias', {id:this.id, alias:this.alias});
    }
  }
}
</script>
