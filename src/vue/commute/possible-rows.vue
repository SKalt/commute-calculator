<template v-if="fromOrigin">
  <div class="possible-commute-row col-xs-12">

  </div>
</template>
<template v-else>
  <div class="possible-commute-row col-xs-12">
    <!-- add -->
    <!-- from -->
    <!-- to -->
    <!-- time default: 9am -->
    <!-- byOrAt -->
    <!-- mode -->
    <!-- frequency -->
  </div>
</template>
<script>
  export default {
    props:['type', 'id'],
    computed:{
      locations(){
        return this.$store.getters.locationsIncluded;
      },
      fromOrigin(){
        return this.$store.state.locations.byId[this.id].type == 'origin';
      }
    },
    watch:{
      id(){
        this.$nexTick(()=>{

        });
      }
    }

  }
</script>
