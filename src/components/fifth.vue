<template>
<div class="fourth">
    <div class="title">设备指纹风险</div>
    <div class="tab">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="查询日期">
            </el-table-column>
            <el-table-column prop="type" label="查询机构类型">
            </el-table-column>
            <el-table-column prop="is" label="是否为本机构">
                <template slot-scope="scope">
                    <span>{{scope.row.is == 0 ? '是' : '否'}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="5" layout="prev, pager, next, jumper" :total="gRecordCount">
        </el-pagination>
    </div>
</div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      fifthChart: null,
      gRecordCount: 15,
      tableData: [
        {
          date: "2017-9-5",
          type: "2",
          is: 0
        },
        {
          date: "2017-9-5",
          type: "2",
          is: 0
        },
        {
          date: "2017-9-5",
          type: "2",
          is: 0
        },
        {
          date: "2017-9-5",
          type: "2",
          is: 0
        }
      ]
    };
  },
  mounted() {
    let that = this;
  },
  watch: {},
  methods: {
    handleQuery() {}
  }
};
</script>
<style lang='scss' scoped >
.fourth {
  margin: 5px;
  padding: 20px;
  box-shadow: 0px 0px 1px 0px #2b282826;
  &:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
  .title {
    font-size: 14px;
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    border-bottom: 1px solid #e9e9e9;
    height: 48px;
    line-height: 48px;
  }
  .tab {
    .pages {
      margin: 10px 5px;
      text-align: right;
    }
  }
}
</style>