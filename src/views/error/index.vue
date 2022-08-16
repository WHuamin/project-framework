<template>
  <div class="error-page">
    <div class="img" :style="{ 'background-image': errorData.bgImg }"></div>
    <div class="content">
      <h1>{{ errorData.title }}</h1>
      <div class="desc">{{ errorData.content }}</div>
      <div class="actions">
        <el-button type="primary" size="medium" @click="$router.replace('/')"
          >返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ERROR_CONFIG } from '@/constant/error.js';
export default {
  name: 'page-error',
  computed: {
    errorData() {
      return ERROR_CONFIG[this.$route.params.id || '404'];
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/error.scss';
</style>
