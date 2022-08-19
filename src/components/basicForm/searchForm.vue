<template>
  <el-form
    label-suffix=":"
    :inline="true"
    ref="searchForm"
    v-bind="$attrs"
    :model="searchForm"
  >
    <template v-if="!isSubsidiary">
      <el-form-item name="orgId" label="公司名称">
        <el-select v-model="searchForm.orgId">
          <el-option label="全部公司" value=""></el-option>
          <el-option
            v-for="item of departments"
            :key="item.value"
            v-bind="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </template>
    <template v-for="formItem in formItems" :key="formItem.name">
      <el-form-item
        class="basic-form-item"
        :label="formItem.title"
        :name="formItem.name"
      >
        <template v-if="formItem.type === 'slot'">
          <slot
            :name="formItem.name"
            :data="formItem"
            :form="searchForm"
          ></slot>
        </template>

        <template v-else-if="formItem.type === 'select'">
          <el-select
            v-bind="formItem"
            v-model="searchForm[formItem.name]"
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
            v-model="searchForm[formItem.name]"
            :placeholder="'请选择 ' + formItem.title"
          />
        </template>

        <template v-else>
          <el-input
            clearable
            v-bind="formItem"
            :placeholder="'请输入 ' + formItem.title"
            v-model="searchForm[formItem.name]"
          />
        </template>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="toSearchForm">搜 索</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapGetters } from 'vuex';
import { getAllDepartment } from '@api/auth';
import { getAllVillages } from '@api/house';
export default {
  name: 'search-form',
  inheritAttrs: false,
  props: {
    formConfig: {
      type: Object,
      default: () => ({
        submitBtnText: '搜 索'
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
    console.log('---123321---', this.isSubsidiary);
    return {
      searchForm: {},
      departments: [],
      villages: []
    };
  },
  mounted() {
    this._resetForm();
  },
  computed: {
    ...mapGetters(['isSubsidiary', 'orgId'])
  },
  methods: {
    toSearchForm() {
      this.$emit('search', { ...this.searchForm });
    },
    _resetForm() {
      if (!this.$refs.searchForm) return;
      this.$refs.searchForm.resetFields();
      this.formItems.forEach((item) => {
        this.searchForm[item.name] = item.default || '';
      });
      if (this.isSubsidiary) {
        this.searchForm.orgId = this.orgId;
        this.getAllOptions();
      }
    },

    async getAllOptions() {
      this.departments = await getAllDepartment();
      this.villages = await getAllVillages({
        orgId: this.orgId,
        roleEliminate: true
      });
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
</style>
