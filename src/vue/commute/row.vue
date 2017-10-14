<template>
  <div
  class="commute-row col-xs-12"
  @click="select"
  >
    <!-- from     -->
    <span class="col-xs-3">  {{from}}      </span>
    <span class="col-xs-3">  {{to}}        </span>
    <span class="col-xs-1">  {{mode}}      </span>
    <span class="col-xs-1">  {{byOrAt}}    </span>
    <span class="col-xs-2">  {{time}}      </span>
    <span class="col-xs-2">  {{duration}}  </span>
    <!-- <span class="col-xs-1" @click="remove"> X </span> -->
  </div>
</template>
<script>
  import events from '../../js/events';
  import {lookupCommute} from '../../js/lookups';

  export default {
    props:['commuteId'],
    data: function(){
      return lookupCommute(commuteId, this.getState());
    },
    methods:{
      select: function(){
        this.dispatch({type:'SELECT', id:this.id, selectionType:'commute'});
      },
      remove: function(){
        this.dispatch({type:'REMOVE_COMMUTE', id:this.id});
      }
    }
  };
</script>
