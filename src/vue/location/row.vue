<template>
  <div class="location-row col-xs-12" @click="select">
    <span class="col-xs-6">{{address}}</span>
    <span class="col-xs-2">{{type}}</span>
    <span class="col-xs-2 btn btn-default" @click="remove">delete</span>
    <!-- maybe some aggregate statitics here -->
    <!-- maybe a delete button -->
  </div>
<!-- wrap as row -->
<!-- address -->
<!-- type: dropdown? -->
<!-- delete -->
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
