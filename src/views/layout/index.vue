<template>
  <el-container class="fill-wrapper">
    <el-aside class="layout-aside">
      <div class="layout-aside-logo">
        <el-image
          class="fill-wrapper"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="fill"
        ></el-image>
      </div>
    </el-aside>
    <el-container>
      <el-header class="layout-header flex-row-center">
        <el-icon :size="24">
          <Fold />
          <!-- <Expand /> -->
        </el-icon>
        <div class="flex-1 header-title">
          {{ systemTitle }}
        </div>
        <el-dropdown @command="handleCommand">
          <div class="flex-row-center el-dropdown-link">
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main class="layout-main">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue';
import { websiteConfig } from '@/util/websiteConfig';

export default defineComponent({
  name: 'page-layout',
  data() {
    return {
      avatarUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      systemTitle: websiteConfig.enterpriseName + websiteConfig.systemName
    };
  },
  methods: {
    handleCommand(val) {
      console.log(val);
    }
  }
});
</script>

<style lang="scss" scoped>
.flex-row-center {
  display: flex;
  align-items: center;
  .flex-1 {
    flex: 1 0 0;
  }
}
.layout {
  $height: 80px;
  $space: 16px;
  &-aside {
    width: 200px;
    height: 100%;
    background-color: #20222a;
    &-logo {
      width: 100%;
      height: $height;
    }
  }
  &-header {
    height: $height;
    padding: $space;
  }
  &-main {
    flex: 1 0 0;
    padding: 0;

    ::v-deep .el-scrollbar__view {
      padding: $space;
    }
  }
}
.header-title {
  font-size: 24px;
  color: #000;
}
</style>
