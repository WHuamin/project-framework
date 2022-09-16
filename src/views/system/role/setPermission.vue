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
const permissionOptions = [
  { label: '新增', value: 'add' },
  { label: '编辑', value: 'edit' },
  { label: '查看', value: 'detail' },
  { label: '删除', value: 'delete' },
  { label: '审核', value: 'approval' },
  { label: '导入', value: 'import' },
  { label: '导出', value: 'export' }
];
const pageList = [
  {
    pageName: '页面名称 - 列表',
    allPermissions: permissionOptions
  },
  {
    pageName: '页面名称 - form',
    allPermissions: permissionOptions
  }
];
export default {
  name: 'permission-form',
  data() {
    return {
      resetForm: false,
      formItems: [
        {
          title: '角色名称',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '角色名称 必填' }]
        },
        {
          title: '设置权限',
          type: 'checkbox',
          name: 'phoneNumber',
          required: false,
          default: permissionOptions.map((item) => item.value), // 默认值
          rules: [{ required: true, message: '权限 必选' }],
          options: pageList
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
