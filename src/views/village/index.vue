<template>
  <div class="fill-wrapper">
    <basic-table
      :columns="tableColumns"
      :loadTableData="loadingTable"
      :operate="{
        name: 'village',
        column: { width: '180px', fixed: 'right' }
      }"
      @link="bindTableLink"
      @operate="handleOperate"
    >
      <template #tableNav>
        <el-button type="primary" @click="handleOperate({ name: 'add' })"
          >新增小区</el-button
        >
      </template>
      <!-- <template #zip="{ data, column }"> {{ data[column.prop] }}</template> -->
      <!-- <template #operate="{ data }"></template> -->
    </basic-table>
  </div>
</template>
<script>
import { fetchVillages } from '@api/house.js';
import { villageColumns } from '@columns/villageList.js';

export default {
  name: 'housing-village',
  data() {
    return {
      tableColumns: villageColumns
    };
  },
  methods: {
    bindTableLink(name, data) {
      this.$router.push({
        name: 'villageDetail',
        query: { id: data.id }
      });
    },
    handleOperate({ name, data }) {
      switch (name) {
        case 'add':
          this.$router.push({ name: 'addVillage', query: { id: '' } });
          break;
        case 'edit':
          this.$router.push({ name: 'addVillage', query: { id: data.id } });
          break;
        case 'device':
          this.$router.push({ name: 'addVillage', query: { id: data.id } });
          break;
        case 'album':
          this.$router.push({
            name: 'villageAlbum',
            query: {
              id: data.id,
              meta: JSON.stringify({ name: `${data.residentialName}相册管理` })
            }
          });
          break;
      }
    },
    loadingTable(pagingParams) {
      return fetchVillages(pagingParams).then((res) => {
        const records = (res.records || []).map((item) => {
          let { residentialAddress, storageCode, residentialAddressName } =
            item;
          if (storageCode) {
            storageCode = storageCode.split(',');
          } else if (!storageCode && residentialAddress) {
            storageCode = ['110000', '110100', residentialAddress];
          }

          residentialAddressName = 'test residentialAddressName';
          return {
            ...item,
            examineStatusName: 'test',
            storageCode,
            residentialAddressName,
            projectName: item.projectName || '-',
            projectId: item.projectId || ''
          };
        });
        res.records = records;
        return res;
      });
    }
  }
};
</script>
