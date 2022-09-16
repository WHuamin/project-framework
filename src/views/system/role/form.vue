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
// 应该在数据字典中
const permissionOptions = [
  { label: '新增', value: 'add' },
  { label: '编辑', value: 'edit' },
  { label: '查看', value: 'detail' },
  { label: '删除', value: 'delete' },
  { label: '审核', value: 'approval' },
  { label: '导入', value: 'import' },
  { label: '导出', value: 'export' }
];
export default {
  name: 'role-form',
  data() {
    return {
      resetForm: false,
      formItems: [
        {
          title: '角色名称（CN）',
          type: 'text',
          name: 'roleName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '角色名称 必填' }]
        },
        {
          title: '角色名称（EN）',
          type: 'text',
          name: 'roleName',
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
          options: permissionOptions
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
