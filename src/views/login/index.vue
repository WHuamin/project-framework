<template>
  <div class="fill-wrapper login-page">
    <section class="flex-1 login-content">
      <div class="login-form">
        <header class="login-header">
          <img class="logo-img" src="../../assets/images/logo-login.png" />
          <div>
            <h2 class="title-large">{{ websiteConfig.enterpriseName }}</h2>
            <p class="title-large">{{ websiteConfig.systemName }}</p>
          </div>
        </header>
        <basic-form
          ref="loginForm"
          label-suffix=":"
          :hide-required-asterisk="true"
          :formConfig="{ submitBtnText: '登 录' }"
          :formItems="formItems"
          v-model:resetForm="resetForm"
          @submit="submitForm"
        >
          <template #code="{ data, form }">
            <el-input
              :placeholder="`请输入 ${data.title}`"
              v-model="form[data.name]"
            >
              <template #suffix>
                <img
                  class="code-img"
                  @click="updateCodeImg"
                  :src="verify.img"
                />
              </template>
            </el-input>
          </template>
        </basic-form>
      </div>
    </section>
    <footer class="login-footer">
      <p class="text-base">
        {{ websiteConfig.enterpriseName }} Copyright ©
        {{ websiteConfig.copyright }},All Rights Reserved
      </p>
      <p class="text-base">{{ websiteConfig.recordNumber }}</p>
    </footer>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
import basicForm from '@components/basicForm';
import { websiteConfig } from '@util/websiteConfig';
import { getImageCode, doLogin } from '@api/auth';
import { openFullScreen } from '@util/globalFn';

export default {
  name: 'project-login',
  components: { basicForm },
  data() {
    return {
      websiteConfig,
      formItems: [
        {
          title: '账号',
          type: 'text',
          name: 'username',
          required: true,
          default: '18888888888', // 默认值
          rules: [
            { required: true, message: '账号 必填' }
            // { type: 'number', message: '账号 必须是数字' }
          ]
        },
        {
          title: '密码',
          type: 'password',
          name: 'password',
          default: 'Admin123', // 默认值
          required: true,
          rules: [{ required: true, message: '密码 必填' }]
        },
        {
          title: '验证码',
          type: 'slot',
          name: 'code',
          default: '', // 默认值
          required: true,
          rules: [{ required: true, message: '验证码 必填' }]
        }
      ],
      verify: {
        img: '', // 验证码图片路径
        id: '' // 验证码id
      },
      resetForm: true
    };
  },
  mounted() {
    this.updateCodeImg();
  },
  methods: {
    ...mapMutations('user', ['updateToken', 'updateUserInfo']),
    ...mapMutations('system', ['updateAuthMenus']),
    submitForm(data) {
      const loading = openFullScreen();
      doLogin({
        phoneNum: data.username,
        loginMethod: 2,
        imageCode: data.code,
        imageCodePath: this.verify.id,
        password: data.password
      })
        .then(({ accessToken, menu, user }) => {
          this.updateToken(accessToken);
          this.updateUserInfo(user);
          this.updateAuthMenus();
          this.$router.replace('/');
          this.resetForm = true;
        })
        .finally((_) => {
          this.updateCodeImg();
          loading.close();
        });
    },
    updateCodeImg() {
      getImageCode().then(({ imageBase64, requestId }) => {
        this.verify = {
          img: imageBase64,
          id: requestId
        };
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$padding: 16px;
.login {
  &-page {
    @include flex-box(column, flex-end, center);
    background: url(../../assets/images/bg-login.jpg) no-repeat;
    background-size: 100% 100%;
  }
  &-content {
    @include flex-box(column, center, center);
  }
  &-form {
    @include box-config(480px, auto, 32px, 8px, #fff);
  }
  &-footer {
    padding: $padding;
  }
  &-header {
    @include flex-box();
    padding-bottom: $padding;
  }
}

.logo-img {
  width: 64px;
  height: 64px;
  margin-right: $padding;
}
.code-img {
  height: 42px;
}
</style>
