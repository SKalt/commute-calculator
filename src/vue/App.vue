<template lang="html">
  <div>
  <info>
    <!-- <commute-info></commute>
    <prelim-info></commute>
    <origin-info></origin>
    <destination-info></destination> -->
  </info>
  <rows>
    <!-- <location-rows>
      <origin-rows>
        <origin-row></origin-row>
      </origin-rows>
      <destination-rows>
        <destination-row></destination-row>
      </destination-rows>
    </location-rows>
    <commute-rows>
      <commute-row></commute-row>
    </commute-rows> -->
  </rows>
  </div>
</template>
<script>
import info from './info.vue';
import rows from './rows.vue';
export default {
  components:{
    info, rows
  }
};
</script>
