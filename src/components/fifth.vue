<template>
<div class="fourth">
    <div class="title">设备指纹风险</div>
    <div class="tab">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="loanCnt" label="对应的借贷APP数量">
            </el-table-column>
            <el-table-column prop="loanCntRatio" label="对应的借贷APP数量占比">
            </el-table-column>
            <el-table-column prop="consumptionCnt" label="对应的消费分期APP数量">
            </el-table-column>
            <el-table-column prop="consumptionCntRatio" label="对应的消费分期APP数量占比">
            </el-table-column>
            <el-table-column prop="lotteryCnt" label="对应的彩票APP数量">
            </el-table-column>
            <el-table-column prop="lotteryCntRatio" label="对应的彩票APP数量占比">
            </el-table-column>
        </el-table>
        <el-pagination class="pages" ref="pager" @current-change="handleQuery" @size-change="handleQuery" :page-size="10" layout="prev, pager, next, jumper" :total="gRecordCount">
        </el-pagination>
    </div>
</div>
</template>
<script>
import service from "./service";
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
  created() {
    this.handleQuery();
  },
  mounted() {
    let that = this;
  },
  watch: {},
  methods: {
    handleQuery() {
      let that = this,
        page,
        pageSize;
      if (this.$refs["pager"] == undefined) {
        page = 1;
        pageSize = 10;
      } else {
        page = this.$refs["pager"].internalCurrentPage;
        pageSize = this.$refs["pager"].internalPageSize;
      };
      popupOper.showLoading();
      service.getInfo({
        url: "api_scorpion_wand_risk_device/" + utilsOper.GetUserId(),
        data: {
          pageNum: page,
          pageSize: pageSize
        },
        successFunc: data => {
          if (data.code == 200) {
            that.tableData = data.list;
            that.gRecordCount = data.count;
          }
          popupOper.closeLoading();
        }
      });
    }
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