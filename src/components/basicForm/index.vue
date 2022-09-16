<template>
  <el-form
    label-suffix="："
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
            <!-- <template v-if="_isFuntion(formItem.options)"> -->
            <el-option
              v-for="item in formItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            <!-- </template> -->
          </el-select>
        </template>

        <template v-else-if="formItem.type === 'date'">
          <el-date-picker
            v-bind="formItem"
            v-model="basicForm[formItem.name]"
            :placeholder="'请选择 ' + formItem.title"
          />
        </template>

        <template v-else-if="formItem.type === 'cascader'">
          <el-cascader
            v-bind="formItem"
            v-model="basicForm[formItem.name]"
            :placeholder="'请选择 ' + formItem.title"
            :options="formItem.options"
          ></el-cascader>
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
import { confirmMsg } from '../../util/messageDialog';
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
    },
    // 是否需要提交表单前确认操作
    submitConfirm: {
      type: Boolean,
      default: true
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
        if (this.submitConfirm) {
          confirmMsg('确定提交？', '表单确认')
            .then(() => {
              this.$emit('submit', { ...this.basicForm });
            })
            .catch(() => {
              console.log('cancel');
            });
        } else {
          this.$emit('submit', { ...this.basicForm });
        }
      });
    },
    _resetForm() {
      if (!this.$refs.basicForm) return;
      this.$refs.basicForm.resetFields();
    },
    _isFuntion(data) {
      return data instanceof Function;
    },
    async _isFuntionOptions(data) {
      return data instanceof Function ? await data() : data;
    }
  }
};
</script>
<style lang="scss" scoped>
.form-row-box {
  @include flex-box(row, space-between, center, wrap);
  .basic-form-item {
    width: calc(50% - 10px);
  }
}
.basic-form-item {
  ::v-deep(.el-form-item__label) {
    display: block;
    min-width: 60px;
    padding-left: 10px;
    text-align-last: justify;
    text-align: justify;
  }
  ::v-deep(.el-select, .el-cascader) {
    width: 100%;
  }
  ::v-deep(.el-cascader) {
    width: 100%;
  }
}

::v-deep(.basic-form-item.is-required:not(.is-no-asterisk)
    > .el-form-item__label:before) {
  position: absolute;
  left: 18px;
}
.nav-btn {
  width: 100%;
  @include flex-box(row, space-around);
}
</style>
