<template>
  <div class="fill-wrapper">
    <basic-table
      :columns="tableColumns"
      :loadTableData="loadingTable"
      @link="bindTableLink"
      @operate="handleOperate"
    >
      <template #tableNav>
        <el-button type="primary" @click="handleOperate({ name: 'add' })"
          >新增</el-button
        >
      </template>
      <!-- <template #zip="{ data, column }"> {{ data[column.prop] }}</template> -->
      <!-- <template #operate="{ data }"></template> -->
    </basic-table>
  </div>
</template>
<script>
import { fetchVillages } from '@api/house.js';
import { permissionColumns } from '@columns/systemPermission.js';

export default {
  name: 'housing-village',
  data() {
    return {
      tableColumns: permissionColumns
    };
  },
  methods: {
    bindTableLink(name, data) {
      this.$router.push({
        name: 'systemPermissionDetail',
        query: { id: data.id }
      });
    },
    handleOperate({ name, data }) {
      switch (name) {
        case 'add':
          this.$router.push({ name: 'addSystemPermission', query: { id: '' } });
          break;
        case 'edit':
          this.$router.push({
            name: 'addSystemPermission',
            query: { id: data.id }
          });
          break;
        case 'detail':
          this.$router.push({
            name: 'systemPermissionDetail',
            query: { id: data.id }
          });
          break;
      }
    },
    loadingTable(pagingParams) {
      return fetchVillages(pagingParams).then((res) => {
        return res;
      });
    }
  }
};
</script>
