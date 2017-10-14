<template>
  <div>


    <!-- address -->
    <span class="col-xs-12">{{address}}</span>
    <!-- Notes -->
    <form>
      <label>Notes</label>
      <input
      type="text"
      title="notes"
      placeholder="notes on this location"
      :value="notes"
      v-model="_note"
      />
      <button
      @click="updateNotes">
        Save Notes
      </button>
      <select v-model="_type" @change="updateType">
        <option disabled value="prelim">Add as a...</option>
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
      <button
      @click="removeLocation">
        delete
      </button>
    </form>

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
  data(){
    let data = lookupLocation(this.id, this.getState());
    let _notes = data.notes;
    let _type = data.types; //locationType?
    return Object.assign(data, {_notes, _type})
  },
  methods:{
    updateNote(){
      this.dispatch({
        type:'UPDATE_LOCATION', id:this.id, notes: this._notes
      });
    },
    removeLocation(){
      this.dispatch({
        type:'REMOVE_LOCATION', id:thid.id
      });
    },
    updateType(){
      this.dispatch({
        type:'UPDATE_LOCATION', id:thid.id, newType:this._type
      });
    }
  }
}
</script>
