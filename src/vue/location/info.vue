<template>
  <div>


    <!-- address -->
    <h3 class="col-xs-12">{{address || 'Location Info'}}</h3>
    <!-- Notes -->
      <textarea
      class="col-xs-12"
      rows=3
      cols=40
      type="text"
      title="notes"
      placeholder="notes on this location"
      :value="notes"
      v-model="notes"
      />
      <button class="btn btn-default"
      @click="updateNotes">
        Save Notes
      </button>
      <select v-model="type" @change="updateType" class="btn btn-default">
        <option disabled selected value="prelim">Add as a...</option>
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

    <!-- name/label? -->
    <!-- type -->
    <div id="commutes-from-here" class="col-xs-12">
      </div><!-- to/from rows -->
</div>
</template>
<script>
import {lookupLocation} from '../../js/lookups';

export default {
  // props: [id],
  created(){
    debugger;
  },
  data(){
    debugger;
    let data = lookupLocation(this.id, this.getState());
    // let _notes = data.notes || '';
    // console.log(_type);
    data.type = data.type || 'prelim';
    return Object.assign({id:this.id}, data);
  },
  methods:{
    updateNotes(){
      this.dispatch({
        type:'UPDATE_LOCATION', id:this.id, notes: this.notes
      });
    },
    removeLocation(){
      this.dispatch({
        type:'REMOVE_LOCATION', id:thid.id
      });
    },
    updateType(){
      this.dispatch({
        type:'UPDATE_LOCATION', id:thid.id, newType:this.type
      });
    }
  }
}
</script>
