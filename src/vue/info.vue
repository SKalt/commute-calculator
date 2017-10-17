<template v-if="type === 'commute'">
  <commute-info
  :id="id"
  ></commute-info>
</template>
<template v-else>
  <location-info
  v-show="type !== 'commute'"
  :id="id"
  ></location-info>
</template>
<script>
import debug from 'debug';
const log = debug('vue:info-panel');
import commute from './commute/info.vue';
import location from './location/info.vue';

export default {
  computed:{
    id:function() {
      return this.$store.state.selection.id;
    },
    type(){
      return this.$store.state.selection.type;
    }
  },
  components : {
    'commute-info': commute,
    'location-info': location
  }
}
</script>
