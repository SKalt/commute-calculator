<template>
  <div class="container-fluid commutes-from-here">
  <div class="row">
    <span class="col-xs-1">To here:</span>
    <v-select
    class="col-xs-3"
    :options="options.byOrAt"
    placeholder="arrive @ / depart by"
    :onChange="val => to.byOrAt = val"
    ></v-select>
    <v-select
    class="col-xs-2"
    :options="options.week"
    placeholder="on a..."
    :onChange="val => to.dayOrEnd = val"></v-select>
    <v-select
    class="col-xs-2"
    :options="options.transit"
    :onChange="val => to.mode = val"
    placeholder="via..."></v-select>
    <timepicker
    class="col-xs-3"
    hours="hh" minutes="mm"
    :onChange="({hour, minute}) => to.time = new Date(0,0,0,hour,minute)">
    </timepicker>
    <button class="col-xs-1 btn btn-default" @click="addCommuteTo">Add </button>
  </div>
  <div class="row">
    <span class="col-xs-1">From here:</span>
    <v-select
    class="col-xs-3"
    :options="options.byOrAt"
    placeholder="arrive @ / depart by"
    :onChange="val => from.byOrAt = val"
    ></v-select>
    <v-select
    class="col-xs-2"
    :options="options.week"
    placeholder="on a..."
    :onChange="val => from.dayOrEnd = val"></v-select>
    <v-select
    class="col-xs-2"
    :options="options.transit"
    :onChange="val => from.mode = val"
    placeholder="via..."></v-select>
    <timepicker
    class="col-xs-3"
    hours="hh" minutes="mm"
    :onChange="({hours, minutes}) => from.time = new Date(0,0,0,hours,minutes)"></timepicker>
    <button class="col-xs-1 btn btn-default" @click="addCommuteFrom">Add</button>
  </div>
  </div>
</template>
<script>
import vSelect from 'vue-select';
import {DateTimePicker} from 'element-ui';
export default {
  props:['id'/* of the location */],
  data(){
    return {
      to:{byOrAt:null, onWeek:null, time: new Date(0,0,0,9)},
      from:{byOrAt:null, onWeek:null, time: new Date(0,0,0,17)},
      options:{
        byOrAt: ['by', 'at'], /*week:['weekday', 'weekend']*/,
        transit:['transit', 'bicycling', 'walking', 'driving']
      },

    }
  },
  components:{
    timepicker, vSelect
  },
  methods:{
    addCommuteTo(){
      let addition = this.to.dayOrEnd == 'weekday'
        ? nextMonday()
        : nextSaturday();
      let time = new Date(
        this.to.time.getFullYear(),
        this.to.time.getDate() + addition,
        this.to.time.getHours(),
        this.to.time.getMinutes())
      if (this.to.mode && !isNaN(time.getDate())){
        let payload = {
          to:'all', /* origins */ from:this.id, mode:this.to.mode, time
        };
        this.$store.dispatch('addCommute', payload)
      }
    },
    addCommuteFrom(){
      let addition = this.from.dayOrEnd == 'weekday'
        ? nextMonday()
        : nextSaturday();
      let time = new Date(
        this.from.time.getFullYear(),
        this.from.time.getDate() + addition,
        this.from.time.getHours(),
        this.from.time.getMinutes())
      if (this.from.mode && !isNaN(time.getDate())){
        let payload = {
          from:'all', /* origins */ to:this.id, mode:this.from.mode, time,
          byOrAt:this.from.byOrAt
        };
        this.$store.dispatch('addCommute', payload);
      }
    }
  }
}
</script>
<style>
i.open-indicator {
  display:none!important;
}
span.selected-tag{
  position: absolute;
  padding-top: 0px!important;
  margin-top: 3px;
}
.v-select{
  min-width: 2em;
}
</style>
