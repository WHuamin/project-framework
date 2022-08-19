<template>
  <el-form
    label-suffix=":"
    size="default"
    scroll-to-error
    ref="basicForm"
    v-bind="$attrs"
    :model="basicForm"
  >
    <template v-for="formItem in formItems" :key="formItem.name">
      <el-form-item
        class="basic-form-item"
        :label="formItem.title"
        :prop="formItem.required ? formItem.name : ''"
        :rules="formItem.rules"
        :name="formItem.name"
      >
        <template v-if="formItem.type === 'slot'">
          <slot :name="formItem.name" :data="formItem" :form="basicForm"></slot>
        </template>

        <template v-else-if="formItem.type === 'number'">
          <el-input
            clearable
            v-bind="formItem"
            :placeholder="'请输入 ' + formItem.title"
            v-model.number="basicForm[formItem.name]"
          />
        </template>

        <template v-else-if="formItem.type === 'password'">
          <el-input
            type="password"
            clearable
            autocomplete="off"
            v-bind="formItem"
            :placeholder="'请输入 ' + formItem.title"
            v-model="basicForm[formItem.name]"
          />
        </template>

        <template v-else-if="formItem.type === 'radio'">
          <el-radio-group v-bind="formItem" v-model="basicForm[formItem.name]">
            <el-radio
              v-for="(item, index) in formItem.options"
              :key="index"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </template>

        <template v-else-if="formItem.type === 'checkbox'">
          <el-checkbox-group
            v-bind="formItem"
            v-model="basicForm[formItem.name]"
          >
            <el-checkbox
              v-for="(item, index) in formItem.options"
              :key="index"
              v-bind="item"
              :label="item.value"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </template>

        <template v-else-if="formItem.type === 'select'">
          <el-select
            v-bind="formItem"
            v-model="basicForm[formItem.name]"
            :placeholder="'请选择 ' + formItem.title"
          >
            <el-option
              v-for="item in formItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>

        <template v-else-if="formItem.type === 'date'">
          <el-date-picker
            v-bind="formItem"
            v-model="basicForm[formItem.name]"
            :placeholder="'请选择 ' + formItem.title"
          />
        </template>

        <template v-else>
          <el-input
            clearable
            v-bind="formItem"
            :placeholder="'请输入 ' + formItem.title"
            v-model="basicForm[formItem.name]"
          />
        </template>
      </el-form-item>
    </template>

    <div class="nav-btn">
      <el-button type="primary" @click="_validateForm">{{
        formConfig.submitBtnText
      }}</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  name: 'basic-form',
  inheritAttrs: false,
  props: {
    formConfig: {
      type: Object,
      default: () => ({
        submitBtnText: ' 提 交 '
      })
    },
    formItems: {
      type: Array,
      required: true
    },
    // 是否重置表单
    resetForm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      basicForm: {}
    };
  },
  watch: {
    resetForm: {
      handler(val) {
        if (val) {
          this._resetForm();
          this.formItems.forEach((item) => {
            this.basicForm[item.name] = item.default || '';
          });
          this.$emit('update:resetForm', false);
        }
      },
      immediate: true
    }
  },
  methods: {
    // 函数前面加_ 表示组件内部调用
    _validateForm() {
      if (!this.$refs.basicForm) return;
      this.$refs.basicForm.validate((valid) => {
        if (!valid) return false;
        this.$emit('submit', { ...this.basicForm });
      });
    },
    _resetForm() {
      if (!this.$refs.basicForm) return;
      this.$refs.basicForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.basic-form-item {
  ::v-deep(.el-form-item__label) {
    display: block;
    min-width: 60px;
    text-align-last: justify;
    text-align: justify;
  }
}
.nav-btn {
  display: flex;
  justify-content: space-around;
}
</style>
