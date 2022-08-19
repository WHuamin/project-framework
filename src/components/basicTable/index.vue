<template>
  <div class="fill-wrapper basic-table-wrapper" v-loading="loading">
    <search-form :formItems="searchItems"></search-form>
    <el-table
      ref="basicTable"
      class="flex-1 basic-table"
      empty-text="暂无数据"
      border
      :header-cell-class-name="headerCellClass"
      :data="tableData"
      :highlight-current-row="tableType == 'radio'"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
    >
      <!-- 多选 -->
      <template v-if="tableType == 'checkbox'">
        <el-table-column type="selection" align="center" width="55" />
      </template>

      <!-- 单选 -->
      <template v-else-if="tableType == 'radio'">
        <el-table-column align="center" width="55">
          <template v-slot="{ row }">
            <el-checkbox
              v-if="selectedData.id == row.id"
              :checked="true"
              size="large"
            />
            <el-checkbox
              v-if="selectedData.id != row.id"
              :checked="false"
              size="large"
            />
          </template>
        </el-table-column>
      </template>

      <!-- 显示序列号 -->
      <template v-if="showSort">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60"
          :index="indexMethod"
        />
      </template>

      <template v-for="(item, index) in columns" :key="index">
        <template v-if="item.type == 'slot'">
          <el-table-column v-bind="item">
            <template v-slot="scope">
              <slot :name="item.prop" :data="scope.row" :column="item"></slot>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type == 'link'">
          <el-table-column v-bind="item">
            <template v-slot="scope">
              <el-link @click.stop="toNextPage(item.prop, scope.row)">
                {{ scope.row[item.prop] }}
              </el-link>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column v-bind="item" />
        </template>
      </template>

      <template v-if="showOperate">
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <slot name="operate" :data="row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="basic-paging"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="changeTableSize"
      @current-change="changeTablePage"
    />
  </div>
</template>
<script>
import searchForm from '@components/basicForm/searchForm.vue';
export default {
  name: 'basic-table',
  props: {
    // 是否显示序号
    showSort: {
      type: Boolean,
      default: true
    },
    // 是否显示操作
    showOperate: {
      type: Boolean,
      default: true
    },
    // table类型 checkbox:多选 radio:单选
    tableType: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    loadTableData: {
      type: Function,
      default: () => {},
      required: true
    }
  },
  components: { searchForm },
  data() {
    return {
      loading: false,
      currentPage: 0,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 15, 20, 30, 50, 100],
      tableData: [],
      checkedList: [], // 多选
      selectedData: {} // 单选
    };
  },
  mounted() {
    this.changeTablePage(1);
  },
  computed: {
    searchItems() {
      const list = this.columns
        .filter((item) => item.isSearch)
        .map((item) => ({
          type: item.searchType,
          title: item.label,
          name: item.prop
        }));
      console.log(list);
      return list;
    }
  },
  methods: {
    // 自定义索引
    indexMethod(index) {
      return index + 1;
    },
    headerCellClass() {
      return 'basic-header-cell';
    },
    // 多选
    handleSelectionChange(val) {
      this.checkedList = val;
    },
    // 清空/设置多选数据
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.basicTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.basicTable.clearSelection();
      }
    },
    handleCurrentChange(val) {
      this.selectedData = val;
    },
    toggleRadio(row) {
      this.$refs.basicTable.setCurrentRow(row);
    },
    // 分页-每页条数改变
    changeTableSize(val) {
      this.pageSize = val;
      this.fetchTableData({ pageSize: val });
    },
    // 分页-当前页码改变
    changeTablePage(val) {
      this.currentPage = val;
      this.fetchTableData({ currentPage: val });
    },
    // 链接
    toNextPage(name, data) {
      this.$emit('link', name, data);
    },
    fetchTableData(params) {
      this.loading = true;
      const pagingParams = {
        current: params.currentPage || this.currentPage,
        size: params.pageSize || this.pageSize
      };
      this.loadTableData(pagingParams)
        .then(({ current, total, size, records }) => {
          this.tableData = records;
          this.currentPage = current;
          this.total = total;
          this.pageSize = size;
        })
        .finally((_) => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.basic-table-wrapper {
  @include flex-box(column, flex-start, flex-start);
}
.basic-paging {
  margin-top: 10px;
  text-align: right;
}
</style>
<style lang="scss">
.basic-table {
  th.basic-header-cell {
    text-align: center;
    font-size: 16px;
    color: #000;
    padding: 0;
    background-color: var(--el-fill-color-light);
    .cell {
      padding: 12px 0;
      background-color: var(--el-fill-color-light);
    }
  }
  .el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
  }
}
</style>
