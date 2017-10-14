<template v-if="selectionType === 'commute'">
  <commute-info
  :id="id"
  ></commute-info>
</template>
<template v-else>
  <location-info
  v-show="selectionType !== 'commute'"
  :id="id"
  ></location-info>
</template>
<script>
import debug from 'debug';
const log = debug('vue:info-panel');
import commute from './commute/info.vue';
import location from './location/info.vue';

export default {
  data:function(){
    log('data', this.getState());
    return Object.assign({}, this.getState().selection);
  },
  components : {
    'commute-info': commute,
    'location-info': location
  }
}
</script>
