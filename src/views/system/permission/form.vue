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
// import Validate from '@/utils/validate.js';
// const form = {
//   phone: '',
//   code: ''
// };
// const rules = {
//   phone: [
//     { tel: true, message: '手机号输入不正确' },
//     { required: true, message: '手机号不能为空' }
//   ],
//   code: [{ required: true, message: '验证码不能为空' }]
// };
// const valid = new Validate(rules, form);

// if (valid.__validateForm()) {
//   // 验证成功执行
// } else {
//   // 验证失败提示错误 valid.errorMessage.join(',')
// }
/**
 * 功能的所有权限：
 * 查询：列表
 * 新增：新增数据
 * 编辑：编辑数据
 * 详情：查看数据详情
 * 删除：删除数据
 * 审核：审核数据
 * 导入：导入数据
 * 导出：导出数据（批量、全部导出）
 */
const permissionOptions = [
  { label: '查询', value: 'search' },
  { label: '新增', value: 'add' },
  { label: '编辑', value: 'edit' },
  { label: '详情', value: 'detail' },
  { label: '删除', value: 'delete' },
  { label: '审核', value: 'approval' },
  { label: '导入', value: 'import' },
  { label: '导出', value: 'export' }
];
export default {
  name: 'permission-form',
  data() {
    return {
      resetForm: false,
      formItems: [
        {
          title: '页面名称',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          rules: [{ required: true, message: '页面名称 必填' }]
        },
        {
          title: '页面路径',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          placeHolder: ' 在 src/views/ 目录下',
          rules: [{ required: true, message: '页面路径 必填' }]
        },
        {
          title: '页面访问路由',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          placeHolder: ' 在 src/views/ 目录下',
          rules: [{ required: true, message: '页面路径 必填' }]
        },
        {
          title: '页面访问路由名称',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          placeHolder: ' 在 src/views/ 目录下',
          rules: [{ required: true, message: '页面路径 必填' }]
        },
        {
          title: '路由所属上一级',
          type: 'text',
          name: 'residentialName',
          required: true,
          default: '', // 默认值
          placeHolder: ' 在 src/views/ 目录下',
          rules: [{ required: true, message: '路由所属上一级 必选' }]
        },
        {
          title: '权限',
          type: 'checkbox',
          name: 'phoneNumber',
          required: true,
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
  methods: {
    submitForm() {}
  }
};
</script>
