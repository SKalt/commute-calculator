<template>
  <div
  class="commute-row col-xs-12"
  @click="select"
  >
    <!-- from     -->
    <span class="col-xs-3">  {{from}}      </span>
    <span class="col-xs-3">  {{to}}        </span>
    <span class="col-xs-1">  {{mode}}      </span>
    <span class="col-xs-1">  {{arrival}}    </span>
    <span class="col-xs-2">  {{time}}      </span>
    <span class="col-xs-2">  {{duration}}  </span>
    <!-- <span class="col-xs-1" @click="remove"> X </span> -->
  </div>
</template>
<script>
  import events from '../../js/events';
  import {lookupCommute} from '../../js/lookups';

  export default {
    props:['id', 'to', 'from', 'mode', 'byOrAt', 'time', 'duration'],
    computed:{
      arrival(){
        return this.byOrAt == 'by' ? 'arrive by' : 'depart at';
      }
    },
    methods:{
      select: function(){
        this.$store.commit('select',{id:this.id, type:'commute'});
      },
      remove: function(){
        this.$store.commit('removeCommute', {id:this.id});
      }
    }
  };
</script>
