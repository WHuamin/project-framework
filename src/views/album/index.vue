<template>
  <div class="fill-wrapper album-wrapper">
    <el-tabs
      type="border-card"
      tab-position="left"
      class="fill-wrapper album-tabs"
    >
      <el-tab-pane v-for="(item, index) in albumList" :key="index">
        <template #label>
          <el-icon size="18px"><PictureFilled /></el-icon>
          <span>{{ item.title }}({{ item.count }})</span>
        </template>
        <el-image
          class="album-img"
          :src="item.cover"
          fit="fill"
          v-for="i in 40"
          :key="i"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'village-album',
  data() {
    return {
      albumList: [
        {
          cover:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '小区图片',
          count: 0,
          type: 'village'
        },
        {
          cover:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '户型图片',
          count: 0,
          type: 'houseType'
        },
        {
          cover:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '消防图片',
          count: 0,
          type: 'fireControl'
        },
        {
          cover:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          title: '装修图片',
          count: 0,
          type: 'renovation'
        }
      ]
    };
  },
  methods: {
    toNextPage(data) {
      this.$router.push({
        name: 'villageAlbumDetail',
        query: {
          title: data.title,
          id: data.id || '1234567890'
        },
        params: { type: data.type }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.album-wrapper {
  // @include flex-box(row, flex-start, flex-start, wrap);
  padding-bottom: 16px;
}
.album-box {
  @include box-config(120px, 120px);
  margin: 10px;
  text-align: center;
  cursor: pointer;
  p {
    @include text-config();
    text-align: center;
  }
}
.album-tabs {
  // @include flex-box();
  width: 100%;
  ::v-deep(.el-tabs--border-card > .el-tabs__content) {
    flex: 1 0 0;
    min-height: 100%;
  }
  .album-img {
    width: 160px;
    height: 160px;
    margin: 6px;
  }
}
</style>
