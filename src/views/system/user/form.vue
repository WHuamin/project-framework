<template>
  <basic-form
    class="form-row-box"
    ref="permissionForm"
    label-position="right"
    label-width="100px"
    :formItems="formItems"
    v-model:resetForm="resetForm"
    @submit="submitForm"
  >
  </basic-form>
</template>
<script>
export default {
  name: 'permission-form',
  data() {
    return {
      resetForm: false,
      formItems: [
        {
          title: '用户名称',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '用户名称 必填' }]
        },
        {
          title: '公司名称',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '用户名称 必填' }]
        },
        {
          title: '所在区域',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '用户名称 必填' }]
        },
        {
          title: '手机号',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '手机号 必填' }]
        },
        {
          title: '账号角色',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '账号角色 必填' }]
        },
        {
          title: '备注',
          type: 'textarea',
          name: 'introduction',
          autosize: { minRows: 5 }
        }
      ]
    };
  },
  mounted() {},
  methods: {
    submitForm() {}
  }
};
</script>
