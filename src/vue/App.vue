<template lang="html">
  <div>
  <info></info>
  <rows></rows>
  </div>
</template>
<script>
import store from '../js/store/index.js';
import {mapMethods} from 'vuex';
import info from './info.vue';
import rows from './rows.vue';
export default {
  store,
  components:{
    info, rows
  }
};
</script>
