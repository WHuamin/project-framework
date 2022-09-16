<template>
  <div>
    <el-input placeholder="请输入内容" id="searchMap" v-model="searchWords">
      <template v-slot:prepend>关键字搜索</template>
      <template v-slot:append>
        <el-button type="primary" @click="toSearchMap">搜 索</el-button>
      </template>
    </el-input>
    <div id="searchData"></div>
    <div class="basic-map" id="vellageMap"></div>
    <basic-form
      class="form-row-box"
      ref="villageForm"
      label-position="right"
      label-width="100px"
      :formItems="formItems"
      v-model:resetForm="resetForm"
      @submit="submitForm"
    >
      <template #propertyFee="{ data, form }">
        <el-input-number
          v-model="form[data.name]"
          :precision="2"
          :step="0.1"
          :min="0"
        ></el-input-number>
        元 / ㎡
      </template>
    </basic-form>
  </div>
</template>
<script>
import GDMap from '@/util/AMapConfig';
import {
  getAllProjects,
  getAllReginsCodes,
  getAllProperties
} from '@api/house.js';

export default {
  name: 'village-form',
  data() {
    return {
      villageMap: undefined,
      searchWords: '',
      resetForm: false,
      formItems: []
    };
  },
  async mounted() {
    this.formItems = [
      {
        title: '小区名称',
        type: 'text',
        name: 'residentialName',
        required: true,
        default: '', // 默认值
        rules: [{ required: true, message: '小区名称 必填' }]
      },
      {
        title: '项目名称',
        type: 'select',
        name: 'projectId',
        required: true,
        default: '', // 默认值
        rules: [{ required: true, message: '项目名称 必选' }],
        options: await getAllProjects()
      },
      {
        title: '所属地区',
        type: 'cascader',
        name: 'storageCode',
        props: {
          value: 'code',
          label: 'name'
        },
        required: true,
        default: '', // 默认值
        rules: [{ required: true, message: '所属地区 必选' }],
        options: await getAllReginsCodes()
      },
      {
        title: '联系方式',
        type: 'number',
        name: 'phoneNumber'
      },
      {
        title: '物业单位',
        type: 'select',
        name: 'realtyManagementId',
        options: await getAllProperties()
      },
      {
        title: '物业费',
        type: 'slot',
        name: 'propertyFee',
        default: 0 // 默认值
      },
      {
        title: '详细地址',
        type: 'textarea',
        autosize: { minRows: 5 },
        name: 'residentialAddressDetailed'
      },
      {
        title: '小区简介',
        type: 'textarea',
        name: 'introduction',
        autosize: { minRows: 5 },
        options: await getAllProperties()
      }
    ];
    this.villageMap = new GDMap(
      'vellageMap',
      {
        center: [113.307649675, 23.1200491021]
      },
      {
        inputPromptId: 'searchMap',
        plugin: ['ToolBar', 'Scale']
      }
    );
  },
  beforeUnmount() {
    this.villageMap && this.villageMap.destroyMap();
  },
  methods: {
    toSearchMap() {
      this.villageMap && this.villageMap.getSearchWordsData(this.searchWords);
    },
    submitForm() {}
  }
};
</script>
<style lang="scss" scoped>
.basic-map {
  width: 100%;
  height: 400px;
}
</style>
