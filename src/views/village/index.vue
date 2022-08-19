<template>
  <div class="fill-wrapper">
    <basic-table
      :columns="tableColumns"
      :loadTableData="loadingTable"
      @link="bindTableLink"
    >
      <!-- <template #zip="{ data, column }"> {{ data[column.prop] }}</template> -->
      <template #operate="{ data }">
        <el-button type="text">编辑{{ data.id }}</el-button>
      </template>
    </basic-table>
  </div>
</template>
<script>
import basicTable from '@components/basicTable';
import { fetchVillages } from '@api/house.js';
import { villageColumns } from '@columns/villageList.js';
export default {
  name: 'housing-village',
  components: { basicTable },
  data() {
    return {
      tableColumns: villageColumns
    };
  },
  methods: {
    bindTableLink(name, data) {
      console.log(name, data);
    },
    loadingTable(pagingParams) {
      return fetchVillages(pagingParams).then((res) => {
        const records = res.records.map((item) => {
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
