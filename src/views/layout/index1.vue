<template>
  <el-container class="fill-wrapper">
    <el-aside
      class="flex-column-box layout-aside"
      :class="{ 'layout-aside-collapse': isCollapse }"
    >
      <div class="layout-aside-logo">
        <img class="layout-logo-img" src="../../assets/images/logo-title.png" />
      </div>
      <div class="flex-1">
        <el-scrollbar>
          <el-menu
            default-active="2"
            class="aside-menu"
            :collapse="isCollapse"
            background-color="rgba(0,0,0,0)"
            text-color="#fff"
            active-text-color="#409EFF"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group>
                <template #title><span>Group One</span></template>
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title><span>item four</span></template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header class="layout-header flex-row-center">
        <el-icon :size="24" @click="changeMenuCollapse">
          <Fold v-show="!isCollapse" />
          <Expand v-show="isCollapse" />
        </el-icon>
        <div class="flex-1 header-title">
          {{ systemTitle }} {{ isCollapse }}
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
      <!-- <el-row>
        <el-col :span="24">123</el-col>
      </el-row> -->
      <el-main class="layout-main">
        <el-tabs
          class="fill-wrapper"
          type="card"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane
            class="fill-wrapper"
            :closable="false"
            label="首页"
            name="first"
          >
            <!-- <el-scrollbar> -->
            <router-view />
            <!-- </el-scrollbar> -->
          </el-tab-pane>
          <el-tab-pane closable label="Config" name="second"
            >Config</el-tab-pane
          >
          <el-tab-pane closable label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane closable label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent } from 'vue';
import { websiteConfig } from '@util//websiteConfig';

export default defineComponent({
  name: 'page-layout',
  data() {
    return {
      avatarUrl: '',
      systemTitle: websiteConfig.enterpriseName + websiteConfig.systemName,
      isCollapse: false,
      activeName: 'first'
    };
  },
  methods: {
    handleCommand(val) {
      console.log(val);
    },
    handleOpen() {},
    handleClose() {},
    changeMenuCollapse() {
      this.isCollapse = !this.isCollapse;
      // isCollapse
    },
    handleClick() {}
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
.flex-column-box {
  display: flex;
  flex-direction: column;
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
      display: flex;
      align-items: center;
      justify-content: center;
    }
    transition: width 0.5s;
  }
  &-aside-collapse {
    width: 68px;
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
.layout-logo-img {
  width: 80%;
  height: 60%;
}
</style>
<style lang="scss">
.layout-aside {
  .el-menu {
    border-right-color: transparent;
  }
}
.aside-menu {
  .el-menu-item {
    border-left: solid 2px transparent;
    &.is-active {
      border-left-color: #409eff;
      background-color: #000;
    }
  }
}
.layout-main .el-tabs__content {
  width: 100%;
  height: calc(100% - 56px);
}
</style>
