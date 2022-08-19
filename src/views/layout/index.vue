<template>
  <el-container class="fill-wrapper">
    <el-aside
      class="layout-aside"
      :class="{ 'layout-aside-collapse': isCollapse }"
    >
      <div class="layout-aside-logo">
        <img class="layout-logo-img" src="../../assets/images/logo-title.png" />
      </div>
      <div class="flex-1">
        <el-scrollbar>
          <el-menu
            class="aside-menu"
            :default-active="defaultActiveMenu"
            :collapse="isCollapse"
            :default-openeds="defaultOpeneds"
            background-color="rgba(0,0,0,0)"
            text-color="#fff"
            active-text-color="#409EFF"
          >
            <el-sub-menu
              v-for="item in userAuthMenus"
              :key="item.name"
              :index="item.name"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <template v-if="item.children && item.children.length">
                <el-menu-item
                  v-for="subitem in item.children"
                  :key="subitem.name"
                  :index="subitem.name"
                  @click="changeActiveMenu"
                  >{{ subitem.title }}</el-menu-item
                >
              </template>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <el-icon :size="24" @click="changeMenuCollapse">
          <Fold v-show="!isCollapse" />
          <Expand v-show="isCollapse" />
        </el-icon>
        <div class="flex-1 header-title">
          {{ systemTitle }}
        </div>

        <el-avatar
          :size="50"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <el-dropdown @command="handleCommand">
          <div class="flex-row-center el-dropdown-link">
            {{ userInfo.account || '' }}
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
      <el-row>
        <el-tabs
          class="fill-wrapper"
          type="card"
          :model-value="activePageName"
          @tab-click="changeActiveTab"
          @tab-remove="removeOpenPage"
        >
          <el-tab-pane
            class="fill-wrapper"
            v-for="item in openPages"
            :key="item.name"
            :closable="!isHomePage(item)"
            :label="isHomePage(item) ? '首页' : item.meta.name"
            :name="item.name"
          />
        </el-tabs>
      </el-row>
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
import { mapGetters, mapMutations } from 'vuex';
import { websiteConfig } from '@util//websiteConfig';

export default defineComponent({
  name: 'page-layout',
  data() {
    return {
      avatarUrl: '',
      systemTitle: websiteConfig.enterpriseName + websiteConfig.systemName,
      isCollapse: false,
      defaultActiveMenu: '', // 默认活动的菜单
      defaultOpeneds: [] // 默认打开的菜单
    };
  },
  created() {
    const defaultRouteName = this.$route.name;
    this.$store.dispatch('user/doLogin');
    this.defaultActiveMenu = defaultRouteName;
    this.defaultOpeneds = this.openPages.map((item) => item.name);
  },
  computed: {
    ...mapGetters(['openPages', 'userAuthMenus', 'activePageName', 'userInfo'])
  },
  methods: {
    ...mapMutations('system', ['removeOpenPage']),
    isHomePage(data) {
      return data.name === 'home';
    },
    handleCommand(val) {
      console.log(val);
    },
    changeMenuCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    changeActiveTab({ paneName, active }) {
      if (active) return false;
      this.$router.replace({ name: paneName });
    },
    changeActiveMenu({ index }) {
      this.$router.replace({ name: index });
    }
  }
});
</script>

<style lang="scss" scoped>
.layout {
  @include flex-box(column);
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
    @include flex-box();
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
