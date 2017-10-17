<template>
  <div class="location-row col-xs-12" @click="select">
    <span class="col-xs-6">{{address}}</span>
    <span class="col-xs-3">{{type}}</span>
    <span class="col-xs-2 col-xs-offset-2 btn btn-default" @click="remove">delete</span>
  </div>
</template>

<script>
  import lookupLocation from '../../js/lookups';
  export default {
    props:['id', 'type', 'address'],
    methods: {
      select(){
        this.$store.commit('select', {
          id:this.id, type:'location'
        });
      },
      remove(){
        this.$store.commit('removeLocation', {id:this.id});
      }
    }
  }
</script>
