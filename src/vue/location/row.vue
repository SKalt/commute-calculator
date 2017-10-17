<template>
  <div class="location-row col-xs-12" @click="select">
    <span class="col-xs-5">{{address}}</span>
    <span class="col-xs-5">{{type}}</span>
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
    props:['id', 'types', 'address'],
    data(){
      return {_type: this.types};
    },
    methods: {
      select(){
        this.dispatch('select', {
          id:this.id,
          type: this._type == 'commute' ? 'commute' : 'location'
        });
      }
    }
  }
</script>
