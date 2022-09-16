<template>
  <div class="fill-wrapper">
    <div class="basic-map" id="vellageMap"></div>
  </div>
</template>
<script>
import GDMap from '@/util/AMapConfig';
export default {
  name: 'visual-data',
  data() {
    return { villageMap: undefined };
  },

  mounted() {
    this.villageMap = new GDMap(
      'vellageMap',
      {
        center: [113, 28.21]
      },
      {
        plugin: ['ToolBar', 'Scale']
      }
    );
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.basic-map {
  width: 100%;
  height: 100%;
}
</style>
